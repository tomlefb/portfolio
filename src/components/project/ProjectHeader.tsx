import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { BigTitle } from '../ui/BigTitle';

interface ProjectHeaderProps {
  project: Project;
}

/** Largeur approchée du titre en em (Archivo 900, largeur 68 %) : le « I » est étroit. */
function titleEm(title: string): number {
  return [...title.toUpperCase()].reduce((width, char) => width + (char === 'I' ? 0.23 : char === ' ' ? 0.2 : 0.53), 0);
}

/** Taille du titre pour qu’il occupe à peu près la même largeur quel que soit le projet. */
function titleSize(title: string, width: number, max: number): string {
  return `${Math.min(max, width / titleEm(title)).toFixed(2)}cqw`;
}

/** Titre court (TTI) : il plafonne à sa taille maximale et laisserait une colonne trop étroite à la phrase. */
function isShortTitle(title: string): boolean {
  return 50 / titleEm(title) > 30;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const style = {
    '--pc': project.color,
    '--pon': project.onColor,
    '--title-size': titleSize(project.title, 50, 30),
    '--title-size-sm': titleSize(project.title, 62, 44),
  } as CSSProperties;

  return (
    <header className={`pj-head${isShortTitle(project.title) ? ' pj-head--short' : ''}`} style={style}>
      <div className="pj-head__block">
        {project.figures && (
          <ul className="pj-head__figures">
            {project.figures.map((figure) => (
              <li key={figure.label}>
                <strong className="title-xl">{figure.value}</strong>
                <span>{figure.label}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="pj-head__meta">{project.meta}</p>
        <ul className="pj-head__stack" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pj-head__link">
            Voir le site
          </a>
        )}
      </div>
      <p className="pj-head__back">
        <Link to="/#projets">Tous les projets</Link>
      </p>
      <BigTitle as="h1" className="pj-head__title">
        {project.title}
      </BigTitle>
      <p className="pj-head__tagline">{project.tagline}</p>
    </header>
  );
}
