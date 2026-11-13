import type { CSSProperties } from 'react';
import type { ProjectFact } from '../../types';

interface FigureStripProps {
  figures: ProjectFact[];
  /** Couleurs du projet : quand la page n’a pas d’images, les chiffres prennent l’aplat. */
  color?: string;
  onColor?: string;
}

/** Chiffres clés du projet, en très grand. */
export function FigureStrip({ figures, color, onColor }: FigureStripProps) {
  const style = color ? ({ '--pc': color, '--pon': onColor } as CSSProperties) : undefined;

  return (
    <ul className={`pj-figures ${color ? 'pj-figures--color' : ''}`} style={style}>
      {figures.map((figure) => (
        <li key={figure.label}>
          <strong className="title-xl">{figure.value}</strong>
          <span>{figure.label}</span>
        </li>
      ))}
    </ul>
  );
}
