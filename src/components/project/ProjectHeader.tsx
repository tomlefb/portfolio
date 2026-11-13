import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { titleEm } from '../../lib/titleMetrics';
import { BigTitle } from '../ui/BigTitle';
import { ProjectLinks } from './ProjectLinks';

interface ProjectHeaderProps {
  project: Project;
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
        <ProjectLinks project={project} className="pj-head__links" />
      </div>
      <p className="pj-head__back">
        <Link to="/#projets">Tous les projets</Link>
      </p>
      <BigTitle as="h1" className="pj-head__title">
        {project.title}
      </BigTitle>
      <p className="pj-head__tagline">{project.tagline}</p>
      {/* Sur mobile, l’aplat ne montre pas son contenu : les liens passent sous la phrase. */}
      <ProjectLinks project={project} className="pj-head__links pj-head__links--mobile" />
    </header>
  );
}
