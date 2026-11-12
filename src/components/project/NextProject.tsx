import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  return (
    <Link
      to={`/projets/${project.id}`}
      className="pj-next"
      style={{ background: project.color, color: project.onColor }}
    >
      <span className="pj-next__label">Projet suivant</span>
      <span className="title-xl pj-next__title">{project.title}</span>
    </Link>
  );
}
