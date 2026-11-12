import { NodeText } from './NodeText';
import { INK, PAPER, toLines } from './theme';

interface CylinderProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string | readonly string[];
}

/** Base de données : cylindre vertical, ellipses très plates, tenu dans son rectangle. */
export function Cylinder({ x, y, w, h, label, sub }: CylinderProps) {
  const rx = w / 2;
  const ry = Math.min(6, w * 0.07);
  const body = [
    `M ${x} ${y + ry}`,
    `L ${x} ${y + h - ry}`,
    `A ${rx} ${ry} 0 0 0 ${x + w} ${y + h - ry}`,
    `L ${x + w} ${y + ry}`,
    `A ${rx} ${ry} 0 0 0 ${x} ${y + ry}`,
    'Z',
  ].join(' ');
  const rim = `M ${x} ${y + ry} A ${rx} ${ry} 0 0 0 ${x + w} ${y + ry}`;
  const stroke = { stroke: INK, strokeWidth: 2, vectorEffect: 'non-scaling-stroke' as const };

  return (
    <g data-dg="node">
      <path data-dg-shape="" d={body} fill={PAPER} {...stroke} />
      <path d={rim} fill="none" {...stroke} />
      <NodeText
        x={x}
        y={y + 2 * ry}
        w={w}
        h={h - 2 * ry}
        label={[label]}
        sub={toLines(sub)}
        color={INK}
        align="middle"
      />
    </g>
  );
}
