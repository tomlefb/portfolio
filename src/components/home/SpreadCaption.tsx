import type { Project } from '../../types';

interface SpreadCaptionProps {
  project: Project;
  onBlock?: boolean;
}

/** Texte court d'un projet sur l'accueil. */
export function SpreadCaption({ project, onBlock = false }: SpreadCaptionProps) {
  return (
    <div className={`hm-cap ${onBlock ? 'hm-cap--on' : ''}`}>
      <p>{project.tagline}</p>
      <p className="hm-cap__meta">{project.meta}</p>
      <p className="hm-cap__more">Voir le projet</p>
    </div>
  );
}
