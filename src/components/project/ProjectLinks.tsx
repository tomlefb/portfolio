import type { Project } from '../../types';

interface ProjectLinksProps {
  project: Project;
  className: string;
}

/** Liens sortants d’un projet : le site en ligne et le code, quand ils existent. */
export function ProjectLinks({ project, className }: ProjectLinksProps) {
  if (!project.liveUrl && !project.githubUrl) return null;
  return (
    <p className={className}>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pj-head__link">
          Voir le site
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pj-head__link">
          Voir le code
        </a>
      )}
    </p>
  );
}
