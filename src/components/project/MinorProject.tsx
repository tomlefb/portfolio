import type { CSSProperties } from 'react';
import type { Project } from '../../types';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Shot } from '../ui/Shot';

interface MinorProjectProps {
  project: Project;
}

/** Projet mineur : une composition réduite (aplat, capture qui dépasse) et quelques lignes. */
export function MinorProject({ project }: MinorProjectProps) {
  const style = { '--pc': project.color, '--pon': project.onColor } as CSSProperties;
  const desktop = project.images.find((image) => image.kind === 'desktop');
  const phones = project.images.filter((image) => image.kind === 'phone').slice(0, 2);
  const kind = desktop ? 'desktop' : 'phones';

  return (
    <article id={project.id} className={`mn mn--${kind}`} style={style} data-testid="minor-project">
      <div className="mn__art">
        <h2 className="title-xl mn__title">{project.title}</h2>
        {/* La scène remonte sous la dernière ligne du titre : l’aplat mord le bas des lettres. */}
        <div className="mn__stage">
          <span className="mn__block" aria-hidden="true" />
          {desktop && <Shot image={desktop} className="mn__shot" />}
          {!desktop &&
            phones.map((image, index) => (
              <PhoneFrame key={image.src} image={image} className={`mn__phone mn__phone--${index + 1}`} />
            ))}
        </div>
      </div>
      <div className="mn__text">
        <p data-testid="minor-tagline">{project.tagline}</p>
        <p className="mn__meta">{project.meta}</p>
        <ul className="mn__stack" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="mn__link">
            Voir sur GitHub
          </a>
        )}
      </div>
    </article>
  );
}
