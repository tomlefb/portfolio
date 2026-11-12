import { INK, useDiagram } from './theme';

interface NoteProps {
  x: number;
  /** Ligne de base de la première ligne. */
  y: number;
  lines: readonly string[];
  anchor?: 'start' | 'middle' | 'end';
  /** Début de la première ligne mis en gras, pour un compteur. */
  lead?: string;
}

/** Annotation libre, hors boîte, en sous-texte. */
export function Note({ x, y, lines, anchor = 'start', lead }: NoteProps) {
  const { m } = useDiagram();
  return (
    <text data-dg="note" x={x} y={y} fontSize={m.sub} textAnchor={anchor} className="dg-sub" fill={INK}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : m.sub * 1.3}>
          {i === 0 && lead && <tspan className="dg-strong">{lead} </tspan>}
          {line}
        </tspan>
      ))}
    </text>
  );
}
