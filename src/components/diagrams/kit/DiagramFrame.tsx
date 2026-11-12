import { useId, useMemo, type ReactNode } from 'react';
import { DiagramContext, METRICS, readableOn, type Layout } from './theme';

interface DiagramFrameProps {
  layout: Layout;
  width: number;
  height: number;
  /** Une phrase qui décrit le schéma, lue par les lecteurs d'écran. */
  title: string;
  accent: string;
  children: ReactNode;
}

/** Marge autour de la grille, pour les filets et les flèches posés sur le bord. */
const BLEED = 4;

/** Un SVG par composition ; la feuille diagrams.css montre la large ou l'étroite. */
export function DiagramFrame({ layout, width, height, title, accent, children }: DiagramFrameProps) {
  const titleId = useId();
  const theme = useMemo(
    () => ({ m: METRICS[layout], accent, onAccent: readableOn(accent) }),
    [layout, accent],
  );
  const vw = width + 2 * BLEED;
  const vh = height + 2 * BLEED;

  return (
    <svg
      className={`dg dg--${layout}`}
      data-layout={layout}
      role="img"
      aria-labelledby={titleId}
      viewBox={`${-BLEED} ${-BLEED} ${vw} ${vh}`}
      style={{ aspectRatio: `${vw} / ${vh}` }}
    >
      <title id={titleId}>{title}</title>
      <DiagramContext.Provider value={theme}>{children}</DiagramContext.Provider>
    </svg>
  );
}
