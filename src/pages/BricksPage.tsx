import { PhoneFrame } from '../components/ui/PhoneFrame';
import { Shot } from '../components/ui/Shot';
import type { ProjectImage } from '../types';

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
  return (
    <div className="shell gutter flex flex-wrap items-start gap-8 py-8">
      <h1 className="title-md w-full text-[28px]">Briques</h1>
      <PhoneFrame image={missingPhone} className="w-[220px]" testId="phone-missing" />
      <PhoneFrame image={present} className="w-[220px]" testId="phone-ok" eager />
      <Shot image={missingShot} className="h-[240px] w-[420px]" testId="shot-missing" />
    </div>
  );
}
