import type { ComponentType } from 'react';
import type { DiagramId } from '../../types';
import { CynaArchitecture } from './CynaArchitecture';
import { TtiBoucle } from './TtiBoucle';
import { VizlyParcours } from './VizlyParcours';

interface DiagramProps {
  id: DiagramId;
  /** Couleur du projet, utilisée pour l’unique élément mis en avant. */
  color: string;
}

interface DiagramComponentProps {
  color: string;
}

const DIAGRAMS: Record<DiagramId, ComponentType<DiagramComponentProps>> = {
  'cyna-architecture': CynaArchitecture,
  'tti-boucle': TtiBoucle,
  'vizly-parcours': VizlyParcours,
};

/** Schéma d’un projet, en composition large ou étroite selon la place disponible. */
export function Diagram({ id, color }: DiagramProps) {
  const Component = DIAGRAMS[id];
  return (
    <div className="diagram" data-diagram={id}>
      <Component color={color} />
    </div>
  );
}
