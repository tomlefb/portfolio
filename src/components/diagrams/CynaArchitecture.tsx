import { Cylinder } from './kit/Cylinder';
import { DiagramFrame } from './kit/DiagramFrame';
import { Edge } from './kit/Edge';
import { Node } from './kit/Node';
import { Note } from './kit/Note';

interface CynaArchitectureProps {
  color: string;
}

const TITLE =
  "Architecture de CYNA : l'app web et mobile, le back-office et Stripe n'entrent que par la passerelle API, qui passe par le bus RabbitMQ ; les huit services n'échangent que par ce bus, jamais directement, et reposent sur PostgreSQL et Redis.";

/*
 * Ordre des services choisi pour que chaque base soit d'un seul tenant :
 * Redis sous les quatre premiers, PostgreSQL sous les sept premiers,
 * Notification seul en bas, au-dessus de SMTP. Auth, User et Payment
 * traversent la colonne Redis pour toucher PostgreSQL.
 */
const SERVICES = ['Catalog', 'Order', 'Content', 'Analytics', 'Auth', 'User', 'Payment', 'Notification'] as const;
const ON_REDIS = 4;
const ON_POSTGRES = 7;

/* Composition large : colonnes (x) et rangées de services (y). */
const W = {
  callers: { x: 0, w: 176 },
  gateway: { x: 224, w: 168 },
  bus: { x: 432, w: 112 },
  services: { x: 568, w: 144 },
  redis: { x: 712, w: 64 },
  postgres: { x: 776, w: 120 },
  row: (i: number) => 64 + 48 * i,
  rowH: 40,
};

/* Composition étroite. */
const N = {
  bus: { x: 0, w: 44 },
  services: { x: 60, w: 112 },
  redis: { x: 172, w: 52 },
  postgres: { x: 224, w: 104 },
  row: (i: number) => 236 + 44 * i,
  rowH: 36,
};

export function CynaArchitecture({ color }: CynaArchitectureProps) {
  const wRight = (i: number) => (i < ON_REDIS ? W.redis.x : i < ON_POSTGRES ? W.postgres.x : W.redis.x);
  const nRight = (i: number) => (i < ON_REDIS ? N.redis.x : i < ON_POSTGRES ? N.postgres.x : N.redis.x);
  const wMid = (i: number) => W.row(i) + W.rowH / 2;
  const nMid = (i: number) => N.row(i) + N.rowH / 2;
  const payment = SERVICES.indexOf('Payment');

  return (
    <>
      <DiagramFrame layout="wide" width={896} height={532} title={TITLE} accent={color}>
        {/* Tout ce qui appelle la plateforme entre par la passerelle. */}
        <Node x={0} y={160} w={176} h={56} label="App web et mobile" sub="Angular, Ionic" />
        <Node x={0} y={256} w={176} h={40} label="Back-office" />
        <Node x={0} y={352} w={176} h={40} label="Stripe" />
        <Note x={200} y={146} lines={['HTTPS']} anchor="middle" />
        <Edge name="app → passerelle" points={[[176, 188], [224, 188]]} />
        <Edge name="back-office → passerelle" points={[[176, 276], [224, 276]]} />
        <Edge name="confirmations Stripe → passerelle" points={[[176, 372], [224, 372]]} />

        <Node
          x={W.gateway.x}
          y={160}
          w={W.gateway.w}
          h={232}
          variant="solid"
          label="Passerelle API"
          sub={['NestJS', 'routage, JWT,', 'limitation de débit']}
        />
        <Edge name="passerelle → bus" points={[[392, 276], [432, 276]]} />

        <Node
          x={W.bus.x}
          y={W.row(0)}
          w={W.bus.w}
          h={W.row(7) + W.rowH - W.row(0)}
          variant="accent"
          label="RabbitMQ"
          sub={['bus de', 'messages']}
        />

        {SERVICES.map((s, i) => (
          <Edge
            key={`tap-${s}`}
            name={`bus — ${s}`}
            arrow={false}
            points={[[W.bus.x + W.bus.w, wMid(i)], [W.services.x, wMid(i)]]}
          />
        ))}
        {SERVICES.map((s, i) => (
          <Node key={s} x={W.services.x} y={W.row(i)} w={wRight(i) - W.services.x} h={W.rowH} label={s} />
        ))}

        <Cylinder x={W.redis.x} y={W.row(0)} w={W.redis.w} h={W.row(ON_REDIS - 1) + W.rowH - W.row(0)} label="Redis" />
        <Cylinder
          x={W.postgres.x}
          y={W.row(0)}
          w={W.postgres.w}
          h={W.row(ON_POSTGRES - 1) + W.rowH - W.row(0)}
          label="PostgreSQL"
        />

        {/* Tiers, en bout de colonne. */}
        <Node x={W.services.x} y={0} w={W.services.w} h={40} label="Cloudflare R2" />
        <Edge name="Catalog → R2" points={[[640, W.row(0)], [640, 40]]} />
        <Node x={W.services.x} y={464} w={W.services.w} h={40} label="SMTP" />
        <Edge name="Notification → SMTP" points={[[640, W.row(7) + W.rowH], [640, 464]]} />
        <Edge
          name="Payment → Stripe"
          points={[
            [744, W.row(payment) + W.rowH],
            [744, 528],
            [88, 528],
            [88, 392],
          ]}
        />
      </DiagramFrame>

      <DiagramFrame layout="narrow" width={360} height={664} title={TITLE} accent={color}>
        <Node x={0} y={0} w={144} h={48} label="App web et mobile" sub="Angular, Ionic" />
        <Node x={160} y={0} w={104} h={48} label="Back-office" />
        <Node x={280} y={0} w={80} h={48} label="Stripe" />
        <Note x={142} y={72} lines={['HTTPS']} anchor="middle" />
        <Edge name="app → passerelle" points={[[72, 48], [72, 88]]} />
        <Edge name="back-office → passerelle" points={[[212, 48], [212, 88]]} />
        <Edge name="confirmations Stripe → passerelle" points={[[300, 48], [300, 88]]} />

        <Node
          x={0}
          y={88}
          w={328}
          h={64}
          variant="solid"
          label="Passerelle API"
          sub={['NestJS', 'routage, JWT, limitation de débit']}
        />
        <Edge name="passerelle → bus" points={[[22, 152], [22, 176]]} />

        <Node
          x={N.bus.x}
          y={176}
          w={N.bus.w}
          h={N.row(7) + N.rowH - 176}
          variant="accent"
          label="RabbitMQ"
          sub="bus de messages"
          rotate
        />

        {SERVICES.map((s, i) => (
          <Edge
            key={`tap-${s}`}
            name={`bus — ${s}`}
            arrow={false}
            points={[[N.bus.x + N.bus.w, nMid(i)], [N.services.x, nMid(i)]]}
          />
        ))}
        {SERVICES.map((s, i) => (
          <Node key={s} x={N.services.x} y={N.row(i)} w={nRight(i) - N.services.x} h={N.rowH} label={s} />
        ))}

        <Cylinder x={N.redis.x} y={N.row(0)} w={N.redis.w} h={N.row(ON_REDIS - 1) + N.rowH - N.row(0)} label="Redis" />
        <Cylinder
          x={N.postgres.x}
          y={N.row(0)}
          w={N.postgres.w}
          h={N.row(ON_POSTGRES - 1) + N.rowH - N.row(0)}
          label="PostgreSQL"
        />

        <Node x={N.services.x} y={176} w={N.services.w} h={36} label="Cloudflare R2" />
        <Edge name="Catalog → R2" points={[[116, N.row(0)], [116, 212]]} />
        <Node x={N.services.x} y={604} w={N.services.w} h={36} label="SMTP" />
        <Edge name="Notification → SMTP" points={[[116, N.row(7) + N.rowH], [116, 604]]} />
        <Edge
          name="Payment → Stripe"
          points={[
            [198, N.row(payment) + N.rowH],
            [198, 664],
            [348, 664],
            [348, 48],
          ]}
        />
      </DiagramFrame>
    </>
  );
}
