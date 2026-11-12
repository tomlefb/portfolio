import { createContext, useContext } from 'react';

export const INK = '#0E0E0E';
export const PAPER = '#E7E8E9';

export type Layout = 'wide' | 'narrow';
export type NodeVariant = 'plain' | 'solid' | 'accent';
export type Point = readonly [number, number];

/**
 * Tailles en unités du viewBox. La composition large fait au plus ~900 unités
 * et s'affiche dès 640 px : 15,5 × 640 / 900 ≈ 11 px au minimum. La composition
 * étroite fait 360 unités, affichée à ~358 px sur un écran de 390 px.
 */
export interface Metrics {
  label: number;
  sub: number;
  /** Longueur d'une pointe de flèche. */
  arrow: number;
}

export const METRICS: Record<Layout, Metrics> = {
  wide: { label: 17, sub: 15.5, arrow: 10 },
  narrow: { label: 14, sub: 12.5, arrow: 8 },
};

export interface DiagramTheme {
  m: Metrics;
  accent: string;
  /** Encre ou papier, selon ce qui se lit le mieux sur la couleur du projet. */
  onAccent: string;
}

export const DiagramContext = createContext<DiagramTheme>({
  m: METRICS.wide,
  accent: INK,
  onAccent: PAPER,
});

export function useDiagram(): DiagramTheme {
  return useContext(DiagramContext);
}

function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function readableOn(color: string): string {
  const l = luminance(color);
  const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return contrast(l, luminance(INK)) >= contrast(l, luminance(PAPER)) ? INK : PAPER;
}

export function toLines(value: string | readonly string[] | undefined): readonly string[] {
  if (value === undefined) return [];
  return typeof value === 'string' ? [value] : value;
}
