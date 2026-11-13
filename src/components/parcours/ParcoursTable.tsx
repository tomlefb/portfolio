import type { ParcoursItem } from '../../types';

interface ParcoursTableProps {
  items: ParcoursItem[];
}

/** Le parcours en liste, pour les lecteurs d’écran (la frise est un dessin). */
export function ParcoursTable({ items }: ParcoursTableProps) {
  return (
    <ol className="sr-only" aria-label="Parcours détaillé">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} data-testid="parcours-row">
          {item.period} : {item.title}, {item.place}. {item.text}
        </li>
      ))}
    </ol>
  );
}
