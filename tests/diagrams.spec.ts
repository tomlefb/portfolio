import { expect, test, type Locator } from '@playwright/test';

const DIAGRAMS = [
  { id: 'cyna-architecture', color: '#5B3FF0' },
  { id: 'tti-boucle', color: '#F2431D' },
  { id: 'vizly-parcours', color: '#F1B434' },
] as const;

const VIEWPORTS = [
  { width: 1440, height: 900, layout: 'wide', hidden: 'narrow' },
  { width: 390, height: 844, layout: 'narrow', hidden: 'wide' },
] as const;

/** Mesures prises dans le navigateur sur le SVG visible d'un schéma. */
interface Audit {
  smallestText: number;
  colors: string[];
  textOverflow: string[];
  diagonals: string[];
  edgeThroughNode: string[];
  overlaps: string[];
}

function audit(svgLocator: Locator): Promise<Audit> {
  return svgLocator.evaluate((svg: SVGSVGElement) => {
    type R = { l: number; t: number; r: number; b: number; name: string };
    const rect = (el: Element, name: string): R => {
      const b = el.getBoundingClientRect();
      return { l: b.left, t: b.top, r: b.right, b: b.bottom, name };
    };
    const intersects = (a: R, b: R, m: number) =>
      a.l < b.r - m && a.r > b.l + m && a.t < b.b - m && a.b > b.t + m;
    const textOf = (el: Element) => (el.textContent ?? '').trim();

    // Taille de texte rendue : taille calculée × échelle de l'élément.
    let smallestText = Infinity;
    for (const t of Array.from(svg.querySelectorAll('text'))) {
      const m = (t as SVGTextElement).getScreenCTM();
      if (!m) continue;
      const size = parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b);
      smallestText = Math.min(smallestText, size);
    }

    // Palette : encre, papier, couleur du projet, rien d'autre.
    const colors = new Set<string>();
    for (const el of Array.from(svg.querySelectorAll('rect, path, polygon, polyline, line, text, ellipse'))) {
      const cs = getComputedStyle(el);
      for (const c of [cs.fill, cs.stroke]) if (c && c !== 'none') colors.add(c);
    }

    const nodes = Array.from(svg.querySelectorAll('[data-dg="node"]')).map((g) => {
      const shape = g.querySelector('[data-dg-shape]')!;
      return { g, box: rect(shape, textOf(g)) };
    });

    // Aucun texte ne sort de sa boîte.
    const textOverflow: string[] = [];
    for (const { g, box } of nodes) {
      for (const t of Array.from(g.querySelectorAll('text'))) {
        const tb = rect(t, textOf(t));
        if (tb.l < box.l + 2 || tb.r > box.r - 2 || tb.t < box.t + 1 || tb.b > box.b - 1) {
          textOverflow.push(`« ${tb.name} » dépasse de ${box.name}`);
        }
      }
    }

    // Liaisons orthogonales, qui ne traversent aucun nœud.
    const ctm = svg.getScreenCTM()!;
    const diagonals: string[] = [];
    const edgeThroughNode: string[] = [];
    const segments: { a: DOMPoint; b: DOMPoint; name: string }[] = [];
    for (const e of Array.from(svg.querySelectorAll('[data-dg="edge"]'))) {
      const pts = (e.getAttribute('data-points') ?? '')
        .trim()
        .split(/\s+/)
        .map((p) => {
          const [x, y] = p.split(',').map(Number);
          return new DOMPoint(x, y);
        });
      const name = e.getAttribute('data-name') ?? 'liaison';
      for (let i = 1; i < pts.length; i++) {
        const [p, q] = [pts[i - 1], pts[i]];
        if (p.x !== q.x && p.y !== q.y) diagonals.push(`${name} : segment ${i} en diagonale`);
        const a = p.matrixTransform(ctm);
        const b = q.matrixTransform(ctm);
        segments.push({ a, b, name });
        const seg: R = {
          l: Math.min(a.x, b.x),
          r: Math.max(a.x, b.x),
          t: Math.min(a.y, b.y),
          b: Math.max(a.y, b.y),
          name,
        };
        for (const { box } of nodes) {
          // Un segment de largeur nulle : on teste contre l'intérieur strict du nœud.
          const inner = { l: box.l + 1.5, r: box.r - 1.5, t: box.t + 1.5, b: box.b - 1.5 };
          if (seg.l < inner.r && seg.r > inner.l && seg.t < inner.b && seg.b > inner.t) {
            edgeThroughNode.push(`${name} traverse ${box.name}`);
          }
        }
      }
    }

    // Nœuds qui se chevauchent (se toucher est permis), annotations qui touchent quoi que ce soit.
    const overlaps: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (intersects(nodes[i].box, nodes[j].box, 1.5)) {
          overlaps.push(`${nodes[i].box.name} / ${nodes[j].box.name}`);
        }
      }
    }
    const notes = Array.from(svg.querySelectorAll('[data-dg="note"]')).map((n) => rect(n, textOf(n)));
    for (let i = 0; i < notes.length; i++) {
      for (const { box } of nodes) {
        if (intersects(notes[i], box, -2)) overlaps.push(`note « ${notes[i].name} » / ${box.name}`);
      }
      for (let j = i + 1; j < notes.length; j++) {
        if (intersects(notes[i], notes[j], -2)) overlaps.push(`notes « ${notes[i].name} » / « ${notes[j].name} »`);
      }
      for (const s of segments) {
        const seg: R = {
          l: Math.min(s.a.x, s.b.x),
          r: Math.max(s.a.x, s.b.x),
          t: Math.min(s.a.y, s.b.y),
          b: Math.max(s.a.y, s.b.y),
          name: s.name,
        };
        const n = notes[i];
        if (seg.l < n.r + 2 && seg.r > n.l - 2 && seg.t < n.b + 2 && seg.b > n.t - 2) {
          overlaps.push(`note « ${n.name} » / ${s.name}`);
        }
      }
    }

    return {
      smallestText,
      colors: Array.from(colors),
      textOverflow,
      diagonals,
      edgeThroughNode,
      overlaps,
    };
  });
}

function rgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}

for (const vp of VIEWPORTS) {
  test.describe(`schémas à ${vp.width} px`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/__bricks');
      await page.evaluate(() => document.fonts.ready);
    });

    test('la page ne défile pas horizontalement', async ({ page }) => {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const d of DIAGRAMS) {
      test(`${d.id} : composition ${vp.layout}, lisible et propre`, async ({ page }) => {
        const box = page.getByTestId(`diagram-${d.id}`);
        const svg = box.locator(`svg[role="img"][data-layout="${vp.layout}"]`);
        await expect(svg).toBeVisible();
        await expect(box.locator(`svg[data-layout="${vp.hidden}"]`)).toBeHidden();
        await expect(svg).toHaveAccessibleName(/\S{3,}/);

        const b = await svg.boundingBox();
        expect(b!.x).toBeGreaterThanOrEqual(0);
        expect(b!.x + b!.width).toBeLessThanOrEqual(vp.width);

        const a = await audit(svg);
        expect(a.smallestText).toBeGreaterThanOrEqual(11);
        const allowed = [rgb('#0E0E0E'), rgb('#E7E8E9'), rgb(d.color)];
        expect(a.colors.filter((c) => !allowed.includes(c))).toEqual([]);
        expect(a.colors).toContain(rgb(d.color));
        expect(a.textOverflow).toEqual([]);
        expect(a.diagonals).toEqual([]);
        expect(a.edgeThroughNode).toEqual([]);
        expect(a.overlaps).toEqual([]);
      });
    }
  });
}
