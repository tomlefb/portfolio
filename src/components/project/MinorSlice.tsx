import type { CSSProperties } from 'react';
import { fitTitle, titleEm } from '../../lib/titleMetrics';
import type { Project } from '../../types';
import { MinorSliceArt } from './MinorSliceArt';
import { MinorSliceText } from './MinorSliceText';

interface MinorSliceProps {
  project: Project;
  open: boolean;
  onOpen: () => void;
}

/**
 * Une tranche : fermée, un dos de livre avec le nom à la verticale ; ouverte, une composition comme
 * celles de l’accueil (grand nom sur l’aplat, texte dans la couleur, images qui débordent sur le gris).
 */
export function MinorSlice({ project, open, onOpen }: MinorSliceProps) {
  const style = {
    '--pc': project.color,
    '--pon': project.onColor,
    '--spine-fs': `${Math.min(6.4, 40 / titleEm(project.title)).toFixed(2)}cqw`,
    '--big': `${fitTitle(project.title, 32, 8.5, 6).toFixed(2)}cqw`,
  } as CSSProperties;
  const bodyId = `${project.id}-detail`;

  return (
    <article
      id={project.id}
      className={`mn-slice${open ? ' is-open' : ''}`}
      style={style}
      data-testid="minor-project"
    >
      <h2 className="mn-slice__heading">
        <button type="button" className="mn-spine" aria-expanded={open} aria-controls={bodyId} onClick={onOpen}>
          <span className="title-xl mn-spine__name">{project.title}</span>
        </button>
      </h2>
      <div className="mn-body" id={bodyId} aria-hidden={!open}>
        <div className="mn-body__inner">
          <span className="mn-body__plate" aria-hidden="true" />
          <div className={`mn-art mn-art--${project.id}`}>
            <MinorSliceArt project={project} />
          </div>
          <div className="mn-body__copy">
            <p className="title-xl mn-body__title" aria-hidden="true">
              {project.title}
            </p>
            <MinorSliceText project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
