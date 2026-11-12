import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { BigTitle } from '../ui/BigTitle';

interface ProjectHeaderProps {
  project: Project;
}

/** Taille du titre selon sa longueur, pour qu'il déborde sur l'aplat sans sortir de la page. */
function titleSize(title: string): string {
  return `${Math.min(30, 112 / title.length).toFixed(1)}cqw`;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const style = {
    '--pc': project.color,
    '--pon': project.onColor,
    '--title-size': titleSize(project.title),
  } as CSSProperties;

  return (
    <header className="pj-head" style={style}>
      <div className="pj-head__block">
        <p className="pj-head__meta">{project.meta}</p>
        <ul className="pj-head__stack" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
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
