import type { ReactNode } from 'react';
import { Cylinder } from './kit/Cylinder';
import { DiagramFrame } from './kit/DiagramFrame';
import { Edge } from './kit/Edge';
import { Node } from './kit/Node';
import type { Point } from './kit/theme';

interface CynaArchitectureProps {
  color: string;
}

const TITLE =
  "Architecture de CYNA : l’app web et mobile, le back-office et Stripe n’entrent que par la passerelle API, qui passe par le bus RabbitMQ ; les huit services n’échangent que par ce bus, jamais directement, et reposent sur PostgreSQL et Redis.";

/*
 * Les services sont rangés en trois groupes, du haut vers le bas :
 * Payment, Auth et User (PostgreSQL seul), Notification (aucune base,
 * SMTP à sa droite), puis Analytics, Content, Order et Catalog
 * (PostgreSQL et Redis). Chaque groupe rejoint ses bases par un seul
 * peigne. Payment en tête touche Stripe posé juste au-dessus ; Catalog
 * en pied touche Cloudflare R2 posé juste en dessous.
 */
const SERVICES = ['Payment', 'Auth', 'User', 'Notification', 'Analytics', 'Content', 'Order', 'Catalog'] as const;
const PG_ONLY = [0, 1, 2];
const NOTIFICATION = 3;
const PG_AND_REDIS = [4, 5, 6, 7];

/** Géométrie de la colonne des services et de leurs bases, propre à chaque composition. */
interface Block {
  bus: { x: number; y: number; w: number };
  services: { x: number; w: number };
  /** Abscisse des peignes qui regroupent les services d’une même base. */
  spine: number;
  smtp: { x: number; w: number };
  db: { x: number; w: number };
  row: (i: number) => number;
  rowH: number;
  postgres: { y: number; h: number };
  redis: { y: number; h: number };
  /** Ordonnée sous le dernier service, où se pose Cloudflare R2. */
  r2: { y: number; h: number };
}

const rowMid = (b: Block, i: number) => b.row(i) + b.rowH / 2;
/** Sortie d’un peigne : à mi-chemin entre deux dents, jamais dans l’axe d’un service. */
const between = (b: Block, i: number) => (rowMid(b, i) + rowMid(b, i + 1)) / 2;

/** Dents d’un groupe : un crochet pour la première et la dernière, une dent par service entre les deux. */
function comb(b: Block, rows: readonly number[], name: string): ReactNode[] {
  const right = b.services.x + b.services.w;
  const first = rowMid(b, rows[0]);
  const last = rowMid(b, rows[rows.length - 1]);
  const bracket: Point[] = [
    [right, first],
    [b.spine, first],
    [b.spine, last],
    [right, last],
  ];
  return [
    <Edge key={`${name}-crochet`} name={`${name} : peigne`} arrow={false} points={bracket} />,
    ...rows.slice(1, -1).map((i) => (
      <Edge
        key={`${name}-${SERVICES[i]}`}
        name={`${name} : ${SERVICES[i]}`}
        arrow={false}
        points={[
          [right, rowMid(b, i)],
          [b.spine, rowMid(b, i)],
        ]}
      />
    )),
  ];
}

function servicesAndData(b: Block): ReactNode {
  const right = b.services.x + b.services.w;
  const notification = rowMid(b, NOTIFICATION);
  const catalog = b.row(SERVICES.length - 1) + b.rowH;
  const r2x = b.services.x + b.services.w / 2;

  return (
    <>
      <Node
        x={b.bus.x}
        y={b.bus.y}
        w={b.bus.w}
        h={catalog - b.bus.y}
        variant="accent"
        label="RabbitMQ"
        sub={b.bus.w < 60 ? 'bus de messages' : ['bus de', 'messages']}
        rotate={b.bus.w < 60}
      />
      {SERVICES.map((s, i) => (
        <Edge
          key={`tap-${s}`}
          name={`bus — ${s}`}
          arrow={false}
          points={[
            [b.bus.x + b.bus.w, rowMid(b, i)],
            [b.services.x, rowMid(b, i)],
          ]}
        />
      ))}
      {SERVICES.map((s, i) => (
        <Node key={s} x={b.services.x} y={b.row(i)} w={b.services.w} h={b.rowH} label={s} />
      ))}

      {/* Payment, Auth, User → PostgreSQL. */}
      {comb(b, PG_ONLY, 'PostgreSQL seul')}
      <Edge
        name="Payment, Auth, User → PostgreSQL"
        points={[
          [b.spine, between(b, 1)],
          [b.db.x, between(b, 1)],
        ]}
      />

      {/* Notification → SMTP, dans le couloir entre les peignes. */}
      <Node x={b.smtp.x} y={b.row(NOTIFICATION)} w={b.smtp.w} h={b.rowH} label="SMTP" />
      <Edge
        name="Notification → SMTP"
        points={[
          [right, notification],
          [b.smtp.x, notification],
        ]}
      />

      {/* Analytics, Content, Order, Catalog → PostgreSQL et Redis. */}
      {comb(b, PG_AND_REDIS, 'PostgreSQL et Redis')}
      <Edge
        name="Analytics, Content, Order, Catalog → PostgreSQL"
        points={[
          [b.spine, between(b, 4)],
          [b.db.x, between(b, 4)],
        ]}
      />
      <Edge
        name="Analytics, Content, Order, Catalog → Redis"
        points={[
          [b.spine, between(b, 6)],
          [b.db.x, between(b, 6)],
        ]}
      />

      <Cylinder x={b.db.x} y={b.postgres.y} w={b.db.w} h={b.postgres.h} label="PostgreSQL" />
      <Cylinder x={b.db.x} y={b.redis.y} w={b.db.w} h={b.redis.h} label="Redis" />

      <Node x={b.services.x} y={b.r2.y} w={b.services.w} h={b.r2.h} label="Cloudflare R2" />
      <Edge
        name="Catalog → R2"
        points={[
          [r2x, catalog],
          [r2x, b.r2.y],
        ]}
      />
    </>
  );
}

/** Rangées de services, avec un blanc supplémentaire entre deux groupes. */
const rows = (top: number, step: number, groupGap: number) => (i: number) =>
  top + step * i + (i >= NOTIFICATION ? groupGap : 0) + (i > NOTIFICATION ? groupGap : 0);

const WIDE: Block = {
  bus: { x: 392, y: 64, w: 104 },
  services: { x: 520, w: 136 },
  spine: 676,
  smtp: { x: 692, w: 64 },
  db: { x: 776, w: 120 },
  row: rows(64, 48, 16),
  rowH: 40,
  postgres: { y: 112, h: 256 },
  redis: { y: 392, h: 80 },
  r2: { y: 496, h: 40 },
};

const NARROW: Block = {
  bus: { x: 0, y: 176, w: 44 },
  services: { x: 60, w: 112 },
  spine: 188,
  smtp: { x: 200, w: 48 },
  db: { x: 268, w: 92 },
  row: rows(236, 44, 12),
  rowH: 36,
  postgres: { y: 272, h: 228 },
  redis: { y: 520, h: 84 },
  r2: { y: 628, h: 36 },
};

export function CynaArchitecture({ color }: CynaArchitectureProps) {
  const wStripe = { x: WIDE.services.x, y: 0, w: WIDE.services.w, h: 40 };
  const wPayment = WIDE.services.x + WIDE.services.w / 2;
  const nStripe = { x: NARROW.services.x, y: 176, w: NARROW.services.w, h: 36 };

  return (
    <>
      <DiagramFrame layout="wide" width={896} height={536} title={TITLE} accent={color}>
        {/* Tout ce qui appelle la plateforme entre par la passerelle. */}
        <Node x={0} y={176} w={160} h={56} label="App web et mobile" sub="Angular, Ionic" />
        <Node x={0} y={312} w={160} h={40} label="Back-office" />
        <Edge name="app → passerelle" points={[[160, 204], [192, 204]]} />
        <Edge name="back-office → passerelle" points={[[160, 332], [192, 332]]} />

        <Node
          x={192}
          y={152}
          w={160}
          h={232}
          variant="solid"
          label="Passerelle API"
          sub={['NestJS', 'routage, JWT,', 'limitation de débit']}
        />
        <Edge name="passerelle → bus" points={[[352, 268], [WIDE.bus.x, 268]]} />

        {/* Stripe, juste au-dessus de Payment ; ses confirmations repassent par la passerelle. */}
        <Node {...wStripe} label="Stripe" />
        <Edge name="Payment → Stripe" points={[[wPayment, WIDE.row(0)], [wPayment, wStripe.h]]} />
        <Edge
          name="confirmations Stripe → passerelle"
          points={[
            [wStripe.x, wStripe.h / 2],
            [272, wStripe.h / 2],
            [272, 152],
          ]}
        />

        {servicesAndData(WIDE)}
      </DiagramFrame>

      <DiagramFrame layout="narrow" width={360} height={664} title={TITLE} accent={color}>
        <Node x={0} y={0} w={168} h={48} label="App web et mobile" sub="Angular, Ionic" />
        <Node x={192} y={0} w={168} h={48} label="Back-office" />
        <Edge name="app → passerelle" points={[[84, 48], [84, 88]]} />
        <Edge name="back-office → passerelle" points={[[276, 48], [276, 88]]} />

        <Node
          x={0}
          y={88}
          w={360}
          h={64}
          variant="solid"
          label="Passerelle API"
          sub={['NestJS', 'routage, JWT, limitation de débit']}
        />
        <Edge name="passerelle → bus" points={[[22, 152], [22, NARROW.bus.y]]} />

        <Node {...nStripe} label="Stripe" />
        <Edge name="Payment → Stripe" points={[[92, NARROW.row(0)], [92, nStripe.y + nStripe.h]]} />
        <Edge name="confirmations Stripe → passerelle" points={[[140, nStripe.y], [140, 152]]} />

        {servicesAndData(NARROW)}
      </DiagramFrame>
    </>
  );
}
