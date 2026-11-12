import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { SpreadCaption } from './SpreadCaption';

interface SpreadTtiProps {
  project: Project;
}

/** TTI : pas de capture, une composition typographique faite de ses chiffres de recherche. */
export function SpreadTti({ project }: SpreadTtiProps) {
  const style = { '--pc': project.color, '--pon': project.onColor } as CSSProperties;
  const figures = project.figures ?? [];

  return (
    <Link to={`/projets/${project.id}`} className="hm-spread hm-tti" style={style} data-testid="spread" aria-label={`Voir le projet ${project.title}`}>
      <div className="hm-art">
        <span className="hm-block" aria-hidden="true" />
        <h2 className="title-xl hm-title">{project.title}</h2>
        <ul className="hm-tti__figures">
          {figures.map((figure) => (
            <li key={figure.label}>
              <strong className="title-xl">{figure.value}</strong>
              <span>{figure.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <SpreadCaption project={project} />
    </Link>
  );
}
