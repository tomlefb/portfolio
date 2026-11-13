import type { CSSProperties } from 'react';
import type { Project } from '../../types';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Shot } from '../ui/Shot';

interface ImageBandProps {
  project: Project;
}

/** Bande d’images imbriquées : une capture large qui sort du bord, des téléphones posés dessus. */
export function ImageBand({ project }: ImageBandProps) {
  const desktops = project.images.filter((image) => image.kind === 'desktop').slice(0, 2);
  const phones = project.images.filter((image) => image.kind === 'phone').slice(0, 2);

  if (desktops.length === 0 && phones.length === 0) return null;

  const style = { '--pc': project.color } as CSSProperties;
  const layout = desktops.length > 0 ? 'pj-band--mixed' : 'pj-band--phones';

  return (
    <div className={`pj-band ${layout}`} style={style}>
      <span className="pj-band__block" aria-hidden="true" />
      {desktops.map((image, index) => (
        <Shot key={image.src} image={image} className={`pj-band__shot pj-band__shot--${index + 1}`} eager={index === 0} />
      ))}
      {phones.map((image, index) => (
        <PhoneFrame key={image.src} image={image} className={`pj-band__phone pj-band__phone--${index + 1}`} />
      ))}
    </div>
  );
}
