import { useDiagram } from './theme';

interface NodeTextProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: readonly string[];
  sub: readonly string[];
  color: string;
  align: 'start' | 'middle';
  /** Texte tourné d’un quart de tour, lu de bas en haut. */
  rotate?: boolean;
}

/** Hauteur des capitales d’Archivo, en fraction du corps. */
const CAP = 0.71;

/** Bloc de texte d’un nœud : étiquette en capitales, sous-texte en dessous, centré verticalement. */
export function NodeText({ x, y, w, h, label, sub, color, align, rotate = false }: NodeTextProps) {
  const { m } = useDiagram();
  const lines = [
    ...label.map((text) => ({ text: text.toLocaleUpperCase('fr-FR'), size: m.label, lh: m.label * 1.12, cls: 'dg-label' })),
    ...sub.map((text) => ({ text, size: m.sub, lh: m.sub * 1.3, cls: 'dg-sub' })),
  ];
  const gap = label.length > 0 && sub.length > 0 ? m.sub * 0.3 : 0;
  const total = lines.reduce((sum, l) => sum + l.lh, 0) + gap;

  const cx = x + w / 2;
  const cy = y + h / 2;
  const [bw, bh] = rotate ? [h, w] : [w, h];
  const left = cx - bw / 2;
  let cursor = cy - bh / 2 + (bh - total) / 2;
  const tx = align === 'middle' ? cx : left + m.label * 0.7;

  return (
    <g transform={rotate ? `rotate(-90 ${cx} ${cy})` : undefined}>
      {lines.map((line, i) => {
        if (i === label.length) cursor += gap;
        const baseline = cursor + (line.lh + CAP * line.size) / 2;
        cursor += line.lh;
        return (
          <text
            key={i}
            x={tx}
            y={baseline}
            fontSize={line.size}
            textAnchor={align}
            className={line.cls}
            fill={color}
          >
            {line.text}
          </text>
        );
      })}
    </g>
  );
}
