import type { ProjectFact } from '../../types';

interface FigureStripProps {
  figures: ProjectFact[];
}

/** Chiffres clés du projet, en très grand. */
export function FigureStrip({ figures }: FigureStripProps) {
  return (
    <ul className="pj-figures">
      {figures.map((figure) => (
        <li key={figure.label}>
          <strong className="title-xl">{figure.value}</strong>
          <span>{figure.label}</span>
        </li>
      ))}
    </ul>
  );
}
