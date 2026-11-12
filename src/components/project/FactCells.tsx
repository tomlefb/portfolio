import type { ProjectFact } from '../../types';

interface FactCellsProps {
  facts: ProjectFact[];
}

export function FactCells({ facts }: FactCellsProps) {
  return (
    <dl className="pj-facts">
      {facts.map((fact) => (
        <div key={fact.label} data-testid="fact">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
