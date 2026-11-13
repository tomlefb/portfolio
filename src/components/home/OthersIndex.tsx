import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface OthersIndexProps {
  projects: Project[];
  title: string;
  allLabel: string;
}

/** Les autres projets en sommaire : une ligne par projet, qui prend sa couleur au survol. */
export function OthersIndex({ projects, title, allLabel }: OthersIndexProps) {
  return (
    <section className="hm-index" data-testid="others-index" aria-label={title}>
      <div className="hm-index__head">
        <h2 className="hm-index__title">{title}</h2>
        <Link to="/autres-projets" className="hm-index__all">
          {allLabel}
        </Link>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/autres-projets#${project.id}`}
              className="hm-index__row"
              data-testid="others-row"
            >
              <h3 className="title-md hm-index__name">{project.title}</h3>
              <p className="hm-index__line">{project.indexLine ?? project.tagline}</p>
              <p className="hm-index__meta">{project.indexMeta ?? project.meta}</p>
              <span className="hm-index__go" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
