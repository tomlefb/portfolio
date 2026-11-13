import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Shot } from '../ui/Shot';
import { SpreadCaption } from './SpreadCaption';

interface SpreadVizlyProps {
  project: Project;
}

/** Vizly : le titre à cheval sur l’aplat, la landing qui sort à droite, un téléphone posé dessus. */
export function SpreadVizly({ project }: SpreadVizlyProps) {
  const desktops = project.images.filter((image) => image.kind === 'desktop');
  const phone = project.images.filter((image) => image.kind === 'phone')[1] ?? project.images.find((image) => image.kind === 'phone');
  const style = { '--pc': project.color, '--pon': project.onColor } as CSSProperties;

  return (
    <Link to={`/projets/${project.id}`} className="hm-spread hm-vizly" style={style} data-testid="spread" aria-label={`Voir le projet ${project.title}`}>
      <div className="hm-art">
        <span className="hm-block" aria-hidden="true" />
        <h2 className="title-xl hm-title">{project.title}</h2>
        {desktops[1] && <Shot image={desktops[1]} className="hm-vizly__back" />}
        {desktops[0] && <Shot image={desktops[0]} className="hm-vizly__shot" />}
        {phone && <PhoneFrame image={phone} className="hm-vizly__phone" />}
      </div>
      <SpreadCaption project={project} onBlock />
    </Link>
  );
}
