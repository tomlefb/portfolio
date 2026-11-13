import type { TechnoGroup } from '../../types';

interface TechnoLinesProps {
  label: string;
  groups: TechnoGroup[];
}

/** Les technos en texte, par fréquence d’usage. */
export function TechnoLines({ label, groups }: TechnoLinesProps) {
  return (
    <section aria-label="Technologies">
      <h2 className="pc-col__label pc-col__label--wide">{label}</h2>
      <dl className="pc-techs">
        {groups.map((group) => (
          <div key={group.label} className="pc-tech" data-testid="techno-line">
            <dt>{group.label}</dt>
            <dd>{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
