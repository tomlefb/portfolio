import type { DiagramId } from '../../types';

interface DiagramProps {
  id: DiagramId;
  /** Couleur du projet, utilisée pour l'unique élément mis en avant. */
  color: string;
}

/** Provisoire : remplacé par les vrais schémas. */
export function Diagram({ id }: DiagramProps) {
  return <div data-diagram={id} />;
}
