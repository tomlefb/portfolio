import type { Project } from '../../types';

interface MinorSliceTextProps {
  project: Project;
}

/** Texte d’une tranche : la phrase, trois faits en grand, les technos. */
export function MinorSliceText({ project }: MinorSliceTextProps) {
  return (
    <div className="mn-copy">
      <p className="mn-copy__tagline" data-testid="minor-tagline">
        {project.tagline}
      </p>
      {project.facts && (
        <dl className="mn-copy__facts">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className="title-md">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div>
        <ul className="mn-copy__stack" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="mn-copy__link">
            Voir sur GitHub
          </a>
        )}
      </div>
    </div>
  );
}
