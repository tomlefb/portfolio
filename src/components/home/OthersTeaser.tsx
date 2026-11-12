import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface OthersTeaserProps {
  projects: Project[];
}

/** Renvoi vers la page des autres projets : leurs noms en grand, chacun dans sa couleur au survol. */
export function OthersTeaser({ projects }: OthersTeaserProps) {
  return (
    <Link to="/autres-projets" className="hm-others" data-testid="others-teaser">
      <span className="hm-others__label">Autres projets</span>
      <ul className="hm-others__names">
        {projects.map((project) => (
          <li key={project.id} className="title-xl" style={{ background: project.color, color: project.onColor }}>
            {project.title}
          </li>
        ))}
      </ul>
      <span className="hm-others__more">Les voir tous</span>
    </Link>
  );
}
