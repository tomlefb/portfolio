import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { PhoneFrame } from '../ui/PhoneFrame';
import { SpreadCaption } from './SpreadCaption';

interface SpreadCynaProps {
  project: Project;
}

/** CYNA : trois écrans de l'application mobile en escalier sur l'aplat. */
export function SpreadCyna({ project }: SpreadCynaProps) {
  const phones = project.images.filter((image) => image.kind === 'phone').slice(0, 3);
  const style = { '--pc': project.color, '--pon': project.onColor } as CSSProperties;

  return (
    <Link to={`/projets/${project.id}`} className="hm-spread hm-cyna" style={style} data-testid="spread">
      <div className="hm-art">
        <span className="hm-block" aria-hidden="true" />
        <h2 className="title-xl hm-title">{project.title}</h2>
        {phones.map((image, index) => (
          <PhoneFrame key={image.src} image={image} className={`hm-cyna__phone hm-cyna__phone--${index + 1}`} />
        ))}
      </div>
      <SpreadCaption project={project} />
    </Link>
  );
}
