import type { ParcoursHighlight } from '../../types';

interface ParcoursHighlightsProps {
  items: ParcoursHighlight[];
}

export function ParcoursHighlights({ items }: ParcoursHighlightsProps) {
  return (
    <div className="pc-high">
      {items.map((item) => (
        <section key={item.title} className="pc-high__item" data-testid="parcours-highlight">
          <p className="pc-high__label">{item.label}</p>
          <h2 className="title-md pc-high__title">{item.title}</h2>
          <p className="pc-high__text">{item.text}</p>
        </section>
      ))}
    </div>
  );
}
