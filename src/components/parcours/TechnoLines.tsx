import type { TechnoGroup } from '../../types';

interface TechnoLinesProps {
  groups: TechnoGroup[];
}

/** Les technos en lignes de texte, par fréquence d'usage. */
export function TechnoLines({ groups }: TechnoLinesProps) {
  return (
    <section aria-label="Technologies">
      <p className="hm-rubric">Ce avec quoi je travaille</p>
      <dl>
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
