import type { ParcoursGroup, ParcoursItem } from '../../types';

interface ParcoursTableProps {
  groups: ParcoursGroup[];
  items: ParcoursItem[];
}

/** Expériences et formation côte à côte, chacune du plus récent au plus ancien. */
export function ParcoursTable({ groups, items }: ParcoursTableProps) {
  return (
    <div className="pc-cols">
      {groups.map((group) => (
        <section key={group.kind} className="pc-col" data-testid="parcours-group">
          <h2 className="pc-col__label">{group.label}</h2>
          <ol>
            {items
              .filter((item) => item.kind === group.kind)
              .map((item) => (
                <li
                  key={`${item.period}-${item.title}`}
                  className="pc-row"
                  data-testid="parcours-row"
                  data-current={item.current ? 'true' : undefined}
                >
                  <p className="pc-row__period">{item.period}</p>
                  <h3 className="title-md">{item.title}</h3>
                  <p className="pc-row__place">{item.place}</p>
                  <p className="pc-row__text">{item.text}</p>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
