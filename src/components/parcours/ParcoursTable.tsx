import type { ParcoursItem } from '../../types';

interface ParcoursTableProps {
  items: ParcoursItem[];
}

export function ParcoursTable({ items }: ParcoursTableProps) {
  return (
    <section aria-label="Expériences et formation">
      <p className="hm-rubric">Expériences et formation</p>
      <ol>
        {items.map((item) => (
          <li
            key={`${item.period}-${item.title}`}
            className="pc-row"
            data-testid="parcours-row"
            data-current={item.current ? 'true' : undefined}
          >
            <p className="pc-row__period">{item.period}</p>
            <div>
              <h2 className="title-md">{item.title}</h2>
              <p className="pc-row__place">{item.place}</p>
            </div>
            <p className="pc-row__text">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
