import { INK, useDiagram, type Point } from './theme';

interface EdgeProps {
  /** Points successifs ; chaque segment doit être horizontal ou vertical. */
  points: readonly Point[];
  /** Nom lisible, utilisé par les tests et le débogage. */
  name: string;
  arrow?: boolean;
  /** Liaison du chemin mis en avant : bande de couleur sous le filet. */
  accent?: boolean;
}

/** Liaison orthogonale, filet encre de 2 px, petite flèche pleine à l'arrivée. */
export function Edge({ points, name, arrow = true, accent = false }: EdgeProps) {
  const { m, accent: color } = useDiagram();

  if (import.meta.env.DEV) {
    points.forEach((p, i) => {
      const q = points[i - 1];
      if (q && q[0] !== p[0] && q[1] !== p[1]) {
        console.error(`Liaison « ${name} » : segment ${i} en diagonale.`);
      }
    });
  }

  const tip = points[points.length - 1];
  const prev = points[points.length - 2];
  const len = Math.hypot(tip[0] - prev[0], tip[1] - prev[1]);
  const dx = (tip[0] - prev[0]) / len;
  const dy = (tip[1] - prev[1]) / len;
  const base: Point = [tip[0] - dx * m.arrow, tip[1] - dy * m.arrow];
  const half = m.arrow * 0.45;
  const line = arrow ? [...points.slice(0, -1), base] : points;
  const d = line.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const full = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');

  return (
    <g data-dg="edge" data-name={name} data-points={points.map((p) => p.join(',')).join(' ')}>
      {accent && (
        <path
          d={full}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      )}
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={2}
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
      {arrow && (
        <polygon
          points={[
            tip,
            [base[0] - dy * half, base[1] + dx * half],
            [base[0] + dy * half, base[1] - dx * half],
          ]
            .map((p) => p.join(','))
            .join(' ')}
          fill={INK}
        />
      )}
    </g>
  );
}
