import { useEffect } from 'react';
import { PhoneFrame } from '../components/ui/PhoneFrame';
import { Shot } from '../components/ui/Shot';
import { Diagram } from '../components/diagrams/Diagram';
import type { DiagramId, ProjectImage } from '../types';

/** Couleurs de contrôle, une par projet. */
const diagramSamples: { id: DiagramId; color: string }[] = [
  { id: 'cyna-architecture', color: '#5B3FF0' },
  { id: 'tti-boucle', color: '#F2431D' },
  { id: 'vizly-parcours', color: '#F1B434' },
];

const missingPhone: ProjectImage = {
  src: '/images/absent-telephone.webp',
  alt: 'Écran introuvable de démonstration',
  kind: 'phone',
};
const missingShot: ProjectImage = {
  src: '/images/absent-capture.webp',
  alt: 'Capture introuvable de démonstration',
  kind: 'desktop',
};
const present: ProjectImage = {
  src: '/images/profile/tom-detoure.webp',
  alt: 'Image de démonstration présente',
  kind: 'phone',
};

/** Page de contrôle des briques visuelles, non liée depuis le site. */
export function BricksPage() {
  // Page technique de contrôle : jamais indexée.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="shell gutter flex flex-wrap items-start gap-8 py-8">
      <h1 className="title-md w-full text-[28px]">Briques</h1>
      <PhoneFrame image={missingPhone} className="w-[220px]" testId="phone-missing" />
      <PhoneFrame image={present} className="w-[220px]" testId="phone-ok" eager />
      <Shot image={missingShot} className="h-[240px] w-[420px]" testId="shot-missing" />
      {diagramSamples.map((d) => (
        <section key={d.id} className="w-full rule-3 pt-6" data-testid={`diagram-${d.id}`}>
          <h2 className="title-md mb-6 text-[20px]">{d.id}</h2>
          <Diagram id={d.id} color={d.color} />
        </section>
      ))}
    </div>
  );
}
