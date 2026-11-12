import { NodeText } from './NodeText';
import { INK, PAPER, toLines, useDiagram, type NodeVariant } from './theme';

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string | readonly string[];
  sub?: string | readonly string[];
  variant?: NodeVariant;
  align?: 'start' | 'middle';
  rotate?: boolean;
}

/** Boîte à angles droits, filet encre de 2 px. */
export function Node({ x, y, w, h, label, sub, variant = 'plain', align = 'middle', rotate }: NodeProps) {
  const { accent, onAccent } = useDiagram();
  const fill = variant === 'solid' ? INK : variant === 'accent' ? accent : PAPER;
  const color = variant === 'solid' ? PAPER : variant === 'accent' ? onAccent : INK;

  return (
    <g data-dg="node">
      <rect
        data-dg-shape=""
        x={x}
        y={y}
        width={w}
        height={h}
        fill={fill}
        stroke={INK}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      <NodeText
        x={x}
        y={y}
        w={w}
        h={h}
        label={toLines(label)}
        sub={toLines(sub)}
        color={color}
        align={align}
        rotate={rotate}
      />
    </g>
  );
}
