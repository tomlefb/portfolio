#!/usr/bin/env node
/**
 * Prépare les captures du portfolio : sélection, recadrage, nettoyage, export WebP.
 *
 * Usage : node scripts/prepare-images.mjs
 *
 * `sharp` n'est PAS une dépendance du projet. Le script le cherche d'abord dans
 * node_modules, puis dans un dossier temporaire (SHARP_DIR ou <tmp>/prepare-images-sharp),
 * et l'y installe avec `npm install --no-save` s'il est absent. package.json n'est jamais modifié.
 *
 * Règles de sortie :
 *  - desktop : largeur max 1600 px, hauteur coupée depuis le haut à 16:10 au plus ;
 *  - phone   : largeur max 860 px, recadré depuis le haut au ratio 430:932 ;
 *  - WebP qualité 82 ; jamais d'agrandissement.
 *
 * Champs d'une entrée :
 *  - source      : chemin du fichier source
 *  - cible       : chemin de sortie, relatif à public/images/projects
 *  - type        : 'desktop' | 'phone'
 *  - largeur     : largeur maximale de sortie (px)
 *  - recadrage?  : { x, y, w, h } zone gardée dans la source avant les règles ci-dessus
 *                  (sert surtout à couper la pastille Next.js en bas à gauche)
 *  - masques?    : retouches sur aplat, appliquées avant le recadrage
 *                  { x, y, w, h, depuis: { x, y } }   copie une zone voisine identique
 *                  { x, y, w, h, echantillon: [x, y] } remplit avec la couleur de ce pixel
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(racine, 'public/images/projects');
const QUALITE = 82;
const RATIO_DESKTOP = 16 / 10;
const RATIO_PHONE = 430 / 932;

const vizly = (f) => path.resolve(racine, '../appPortfolio', f);
const local = (p) => path.join(racine, 'public/images/projects', p);
const hackathon = (p) => path.resolve(racine, '../projethackaton', p);

const IMAGES = [
  // ── Vizly ──────────────────────────────────────────────────────────────
  { source: vizly('landing-wall.png'), cible: 'vizly/landing.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1280, h: 720 } },
  { source: vizly('desktop-dashboard.png'), cible: 'vizly/dashboard.webp', type: 'desktop', largeur: 1600,
    // coupe sous la navigation : retire le bloc utilisateur (nom + e-mail) et la pastille Next.js
    recadrage: { x: 0, y: 0, w: 1440, h: 745 } },
  { source: vizly('step-publish-republish.png'), cible: 'vizly/editeur.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1470, h: 700 } },
  { source: vizly('templates-listing-rich.png'), cible: 'vizly/templates.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1280, h: 726 } },
  { source: vizly('tarifs-pricing.png'), cible: 'vizly/tarifs.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1440, h: 828 } },
  { source: vizly('brutalist-desktop.png'), cible: 'vizly/portfolio-brutalist.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1440, h: 818 } },
  { source: vizly('colore-desktop.png'), cible: 'vizly/portfolio-colore.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 1440, h: 820 } },
  { source: vizly('mobile-landing-hero.png'), cible: 'vizly/mobile-landing.webp', type: 'phone', largeur: 860,
    // pastille Next.js posée sur le fond uni : on recopie le fond voisin des mêmes lignes
    masques: [{ x: 0, y: 742, w: 80, h: 70, depuis: { x: 90, y: 742 } }] },
  { source: vizly('editor-with-topbar.png'), cible: 'vizly/mobile-editeur.webp', type: 'phone', largeur: 860,
    // badge « 1 Issue » sur la barre d'actions blanche (bordure en y=748 conservée)
    masques: [{ x: 0, y: 750, w: 175, h: 62, echantillon: [210, 790] }] },
  { source: vizly('kenza-v3.png'), cible: 'vizly/mobile-portfolio.webp', type: 'phone', largeur: 860 },

  // ── CYNA ───────────────────────────────────────────────────────────────
  { source: local('cyna/Web App - Landing - Desktop.png'), cible: 'cyna/landing.webp', type: 'desktop', largeur: 1600 },
  { source: local('cyna/Mobile App - Home.png'), cible: 'cyna/mobile-accueil.webp', type: 'phone', largeur: 860 },
  { source: local('cyna/Mobile App - Catalogue.png'), cible: 'cyna/mobile-catalogue.webp', type: 'phone', largeur: 860 },
  { source: local('cyna/Mobile App - Register.png'), cible: 'cyna/mobile-produit.webp', type: 'phone', largeur: 860 },
  { source: local('cyna/Mobile App - Settings.png'), cible: 'cyna/mobile-compte.webp', type: 'phone', largeur: 860 },

  // ── NutriAI ────────────────────────────────────────────────────────────
  // libellé iOS « ◀ Scanner de code » (retour vers l'app appareil photo) effacé de la barre d'état
  { source: local('nutriai/IMG_4539.PNG'), cible: 'nutriai/accueil.webp', type: 'phone', largeur: 860,
    masques: [{ x: 28, y: 86, w: 330, h: 46, echantillon: [600, 110] }] },
  { source: local('nutriai/IMG_4540.PNG'), cible: 'nutriai/generateur-ia.webp', type: 'phone', largeur: 860,
    masques: [{ x: 28, y: 86, w: 330, h: 46, echantillon: [600, 110] }] },
  { source: local('nutriai/IMG_4541.PNG'), cible: 'nutriai/ajout-repas.webp', type: 'phone', largeur: 860,
    masques: [{ x: 28, y: 86, w: 330, h: 46, echantillon: [600, 110] }] },

  // ── IALocal ────────────────────────────────────────────────────────────
  // coupe au-dessus de l'infobulle « Xcode » du Dock et des coins arrondis de la fenêtre
  { source: local('ialocal/screenshot-1.png'), cible: 'ialocal/conversation.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 2880, h: 1330 } },
  { source: local('ialocal/screenshot-3.png'), cible: 'ialocal/accueil.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 0, w: 2880, h: 1330 } },

  // ── Lycée hôtelier ─────────────────────────────────────────────────────
  { source: local('lycee-hotelier/screenshot-2.png'), cible: 'lycee-hotelier/accueil.webp', type: 'desktop', largeur: 1600 },
  // la barre de navigation est coupée au ras du bord dans la source : on démarre au contenu
  { source: local('lycee-hotelier/screenshot-4.png'), cible: 'lycee-hotelier/fiche-stage.webp', type: 'desktop', largeur: 1600,
    recadrage: { x: 0, y: 180, w: 2152, h: 862 } },

  // ── EcoPursue ──────────────────────────────────────────────────────────
  { source: hackathon('assets/Capture d’écran 2026-03-16 à 23.09.18.png'), cible: 'ecopursue/dashboard.webp', type: 'desktop', largeur: 1600 },
  { source: hackathon('slides-assets/login-full.png'), cible: 'ecopursue/connexion.webp', type: 'desktop', largeur: 1600 },
];

async function chargerSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    const dossier = process.env.SHARP_DIR ?? path.join(os.tmpdir(), 'prepare-images-sharp');
    if (!existsSync(path.join(dossier, 'node_modules/sharp'))) {
      console.log(`sharp absent : installation temporaire dans ${dossier}`);
      mkdirSync(dossier, { recursive: true });
      execSync('npm install --no-save --no-package-lock --no-audit --no-fund sharp@0.34', {
        cwd: dossier,
        stdio: 'inherit',
      });
    }
    return createRequire(path.join(dossier, 'index.js'))('sharp');
  }
}

/** Zone finale (dans la source) selon le type, toujours ancrée en haut. */
function zoneFinale(type, base) {
  const { x, y, w, h } = base;
  if (type === 'desktop') {
    return { left: x, top: y, width: w, height: Math.min(h, Math.floor(w / RATIO_DESKTOP)) };
  }
  const hCible = Math.round(w / RATIO_PHONE);
  if (hCible <= h) return { left: x, top: y, width: w, height: hCible };
  const wCible = Math.round(h * RATIO_PHONE);
  return { left: x + Math.floor((w - wCible) / 2), top: y, width: wCible, height: h };
}

async function preparer(sharp, img) {
  const meta = await sharp(img.source).metadata();
  // aplatit la transparence éventuelle (coins de fenêtre) sur du blanc
  let tampon = await sharp(img.source).flatten({ background: '#ffffff' }).png().toBuffer();

  if (img.masques?.length) {
    const calques = [];
    for (const m of img.masques) {
      if (m.depuis) {
        const patch = await sharp(tampon)
          .extract({ left: m.depuis.x, top: m.depuis.y, width: m.w, height: m.h })
          .toBuffer();
        calques.push({ input: patch, left: m.x, top: m.y });
      } else {
        const { data } = await sharp(tampon)
          .extract({ left: m.echantillon[0], top: m.echantillon[1], width: 1, height: 1 })
          .raw()
          .toBuffer({ resolveWithObject: true });
        const aplat = await sharp({
          create: { width: m.w, height: m.h, channels: 3, background: { r: data[0], g: data[1], b: data[2] } },
        })
          .png()
          .toBuffer();
        calques.push({ input: aplat, left: m.x, top: m.y });
      }
    }
    tampon = await sharp(tampon).composite(calques).png().toBuffer();
  }

  const base = img.recadrage ?? { x: 0, y: 0, w: meta.width, h: meta.height };
  const zone = zoneFinale(img.type, base);
  const largeur = Math.min(img.largeur, zone.width);
  const cible = path.join(SORTIE, img.cible);
  mkdirSync(path.dirname(cible), { recursive: true });

  const info = await sharp(tampon)
    .extract(zone)
    .resize({ width: largeur, kernel: 'lanczos3' })
    .webp({ quality: QUALITE, effort: 6, smartSubsample: true })
    .toFile(cible);
  return { ...info, cible };
}

const sharp = await chargerSharp();
let total = 0;
for (const img of IMAGES) {
  const { width, height, cible } = await preparer(sharp, img);
  const poids = statSync(cible).size;
  total += poids;
  console.log(
    `${img.type.padEnd(7)} ${String(width).padStart(4)}×${String(height).padEnd(4)} ${(poids / 1024).toFixed(0).padStart(4)} Ko  /images/projects/${img.cible}`,
  );
}
console.log(`\n${IMAGES.length} images, ${(total / 1024 / 1024).toFixed(2)} Mo au total`);
