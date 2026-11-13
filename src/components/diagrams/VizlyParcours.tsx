import { DiagramFrame } from './kit/DiagramFrame';
import { Edge } from './kit/Edge';
import { Node } from './kit/Node';

interface VizlyParcoursProps {
  color: string;
}

const TITLE =
  'Parcours Vizly, du formulaire au site en ligne : inscription, formulaire, template, paiement, publication puis pseudo.vizly.fr, chaque étape posée sur la brique technique qui la porte ; la confirmation de Stripe passe par un webhook qui change le plan du compte en base puis envoie un e-mail Resend.';

interface Step {
  step: string;
  brick: string | readonly string[];
  /** Coupure de l’étiquette quand la colonne large est trop étroite. */
  brickWide?: readonly string[];
  detail?: string | readonly string[];
}

const STEPS: readonly Step[] = [
  { step: 'Inscription', brick: 'Supabase Auth', brickWide: ['Supabase', 'Auth'], detail: 'Server Actions' },
  { step: 'Formulaire', brick: ['PostgreSQL', 'Storage'] },
  { step: 'Template', brick: 'React', detail: '8 composants' },
  { step: 'Paiement', brick: 'Stripe' },
  { step: 'Publication', brick: 'Server Action', brickWide: ['Server', 'Action'], detail: 'de publication' },
  { step: 'pseudo.vizly.fr', brick: 'Middleware', detail: ['Next.js, réécrit', 'le sous-domaine'] },
];
const PAYMENT = 3;

/* Large : six colonnes, la dernière plus large pour le domaine. */
const COL_X = [0, 144, 288, 432, 576, 720];
const COL_W = [120, 120, 120, 120, 120, 144];

/* Étroit : une rangée par étape. */
const rowY = (k: number) => 92 * k;

export function VizlyParcours({ color }: VizlyParcoursProps) {
  return (
    <>
      <DiagramFrame layout="wide" width={864} height={232} title={TITLE} accent={color}>
        {STEPS.map((s, k) => (
          <g key={s.step}>
            <Node x={COL_X[k]} y={0} w={COL_W[k]} h={48} variant="solid" label={s.step} />
            <Node
              x={COL_X[k]}
              y={48}
              w={COL_W[k]}
              h={80}
              variant={k === PAYMENT ? 'accent' : 'plain'}
              label={s.brickWide ?? s.brick}
              sub={s.detail}
            />
            {k > 0 && (
              <Edge
                name={`${STEPS[k - 1].step} → ${s.step}`}
                points={[[COL_X[k - 1] + COL_W[k - 1], 24], [COL_X[k], 24]]}
              />
            )}
          </g>
        ))}

        {/* Chemin de confirmation du paiement. */}
        <Edge name="Stripe → webhook" points={[[492, 128], [492, 176]]} />
        <Node x={432} y={176} w={120} h={56} variant="plain" label="Webhook" />
        <Edge name="webhook → base" points={[[552, 204], [576, 204]]} />
        <Node x={576} y={176} w={120} h={56} variant="plain" label="Base" sub="plan du compte" />
        <Edge name="base → e-mail" points={[[696, 204], [720, 204]]} />
        <Node x={720} y={176} w={144} h={56} variant="plain" label="E-mail" sub="Resend" />
      </DiagramFrame>

      <DiagramFrame layout="narrow" width={360} height={528} title={TITLE} accent={color}>
        {STEPS.map((s, k) => (
          <g key={s.step}>
            <Node x={0} y={rowY(k)} w={128} h={68} variant="solid" label={s.step} />
            <Node
              x={128}
              y={rowY(k)}
              w={120}
              h={68}
              variant={k === PAYMENT ? 'accent' : 'plain'}
              label={s.brick}
              sub={s.detail}
            />
            {k > 0 && (
              <Edge
                name={`${STEPS[k - 1].step} → ${s.step}`}
                points={[[64, rowY(k - 1) + 68], [64, rowY(k)]]}
              />
            )}
          </g>
        ))}

        <Edge name="Stripe → webhook" points={[[248, rowY(PAYMENT) + 34], [272, rowY(PAYMENT) + 34]]} />
        <Node x={272} y={rowY(3)} w={88} h={68} variant="plain" label="Webhook" />
        <Edge name="webhook → base" points={[[316, rowY(3) + 68], [316, rowY(4)]]} />
        <Node x={272} y={rowY(4)} w={88} h={68} variant="plain" label="Base" sub={['plan du', 'compte']} />
        <Edge name="base → e-mail" points={[[316, rowY(4) + 68], [316, rowY(5)]]} />
        <Node x={272} y={rowY(5)} w={88} h={68} variant="plain" label="E-mail" sub="Resend" />
      </DiagramFrame>
    </>
  );
}
