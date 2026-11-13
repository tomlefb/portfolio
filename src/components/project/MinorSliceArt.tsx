import type { Project } from '../../types';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Shot } from '../ui/Shot';

interface MinorSliceArtProps {
  project: Project;
}

/**
 * Images d’une tranche : les fragments d’écran recadrés en priorité, sinon les écrans mobiles, sinon une capture.
 * Chargées tout de suite (elles sont légères) : une tranche fermée est masquée, et une image différée
 * n’arriverait qu’au milieu de l’animation d’ouverture.
 */
export function MinorSliceArt({ project }: MinorSliceArtProps) {
  const fragments = project.images.filter((image) => image.kind === 'fragment');
  const phones = project.images.filter((image) => image.kind === 'phone').slice(0, 3);
  const desktop = project.images.find((image) => image.kind === 'desktop');

  if (fragments.length > 0) {
    return (
      <>
        {fragments.map((image, index) => (
          <Shot key={image.src} image={image} className={`mn-frag mn-frag--${index + 1}`} eager />
        ))}
      </>
    );
  }
  if (phones.length > 0) {
    return (
      <>
        {phones.map((image, index) => (
          <PhoneFrame key={image.src} image={image} className={`mn-phone mn-phone--${index + 1}`} eager />
        ))}
      </>
    );
  }
  return desktop ? <Shot image={desktop} className="mn-frag mn-frag--1" eager /> : null;
}
