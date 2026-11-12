import { DiagramFrame } from './kit/DiagramFrame';
import { Edge } from './kit/Edge';
import { Node } from './kit/Node';
import { Note } from './kit/Note';

interface TtiBoucleProps {
  color: string;
}

const TITLE =
  'Boucle de recherche de TTI : cadrage, sprint au labo, trois lectures puis cinq portes successives ; un échec renvoie à une modification et au sprint suivant, ou range la famille au garage ou au cimetière, un bug mène à une rétractation. Aucune stratégie n’a franchi toutes les portes à ce jour.';

const GATES = ['Cohérence', 'Causalité', 'Significativité', 'Viabilité', 'Processus'] as const;

/* Entonnoir large : chaque porte rétrécit de 16 unités de chaque côté. */
const wGate = (k: number) => ({ x: 616 + 16 * k, y: 128 + 40 * k, w: 256 - 32 * k, h: 40 });
/* Entonnoir étroit : 12 unités de chaque côté. */
const nGate = (k: number) => ({ x: 40 + 12 * k, y: 288 + 32 * k, w: 184 - 24 * k, h: 32 });

export function TtiBoucle({ color }: TtiBoucleProps) {
  return (
    <>
      <DiagramFrame layout="wide" width={872} height={432} title={TITLE} accent={color}>
        {/* Rangée principale. */}
        <Node x={0} y={80} w={184} h={80} label="Cadrage" sub={['hypothèse et critère', 'de jugement fixés avant']} />
        <Node x={216} y={80} w={152} h={80} label="Sprint" sub="backtest au labo" />
        <Node x={400} y={80} w={168} h={80} label="Trois lectures" sub={['statistiques, images', 'des trades, code']} />
        <Edge name="cadrage → sprint" points={[[184, 120], [216, 120]]} />
        <Edge name="sprint → lectures" points={[[368, 120], [400, 120]]} />
        <Note x={300} y={186} lead="1 738" lines={['sprints']} anchor="middle" />

        {/* Bug : rétractation, puis nouveau test. */}
        <Node x={400} y={0} w={168} h={40} label="Rétractation" />
        <Edge name="lectures → rétractation" points={[[484, 80], [484, 40]]} />
        <Note x={476} y={66} lines={['bug trouvé']} anchor="end" />
        <Edge name="rétractation → sprint" points={[[400, 20], [292, 20], [292, 80]]} />
        <Note x={284} y={66} lines={['nouveau test']} anchor="end" />
        <Note x={584} y={25} lead="147" lines={['rétractations']} />

        {/* Les cinq portes. */}
        <Edge name="lectures → portes" points={[[568, 100], [744, 100], [744, 128]]} />
        {GATES.map((g, k) => (
          <Node key={g} {...wGate(k)} label={g} />
        ))}
        {GATES.map((g, k) => {
          const gate = wGate(k);
          return (
            <Edge
              key={`rejet-${g}`}
              name={`rejet ${g}`}
              arrow={false}
              points={[[gate.x, gate.y + gate.h / 2], [592, gate.y + gate.h / 2]]}
            />
          );
        })}

        {/* Échec : on modifie et on relance, ou la famille sort de la boucle. */}
        <Edge name="échec → sprint suivant" points={[[592, 148], [592, 300], [236, 300], [236, 160]]} />
        <Note x={580} y={290} lines={['modification concrète']} anchor="end" />
        <Edge name="échec → famille garée" points={[[592, 300], [592, 332], [292, 332], [292, 360]]} />
        <Edge name="échec → cimetière" points={[[592, 332], [484, 332], [484, 360]]} />
        <Node x={216} y={360} w={152} h={40} label="Famille garée" />
        <Node x={400} y={360} w={168} h={40} label="Cimetière" />
        <Note x={484} y={426} lead="6" lines={['au cimetière']} anchor="middle" />

        {/* Toutes les portes franchies. */}
        <Edge name="portes → retenue" points={[[744, 328], [744, 360]]} />
        <Node x={664} y={360} w={160} h={40} variant="accent" label="Retenue" />
        <Note x={744} y={426} lead="0" lines={['stratégie retenue à ce jour']} anchor="middle" />
      </DiagramFrame>

      <DiagramFrame layout="narrow" width={360} height={664} title={TITLE} accent={color}>
        <Node x={40} y={0} w={184} h={64} label="Cadrage" sub={['hypothèse et critère', 'de jugement fixés avant']} />
        <Edge name="cadrage → sprint" points={[[168, 64], [168, 112]]} />
        <Node x={112} y={112} w={112} h={48} label="Sprint" sub="backtest au labo" />
        <Note x={232} y={128} lead="1 738" lines={['sprints']} />
        <Edge name="sprint → lectures" points={[[168, 160], [168, 192]]} />
        <Node x={40} y={192} w={184} h={64} label="Trois lectures" sub={['statistiques, images', 'des trades, code']} />

        {/* Bug : rétractation, puis nouveau test. */}
        <Edge name="lectures → rétractation" points={[[224, 224], [304, 224], [304, 288]]} />
        <Note x={296} y={250} lines={['bug trouvé']} anchor="end" />
        <Node x={248} y={288} w={112} h={36} label="Rétractation" />
        <Note x={248} y={344} lead="147" lines={['rétractations']} />
        <Edge name="rétractation → sprint" points={[[344, 288], [344, 148], [224, 148]]} />
        <Note x={232} y={170} lines={['nouveau test']} />

        {/* Les cinq portes. */}
        <Edge name="lectures → portes" points={[[132, 256], [132, 288]]} />
        {GATES.map((g, k) => (
          <Node key={g} {...nGate(k)} label={g} />
        ))}
        {GATES.map((g, k) => {
          const gate = nGate(k);
          return (
            <Edge
              key={`rejet-${g}`}
              name={`rejet ${g}`}
              arrow={false}
              points={[[gate.x, gate.y + gate.h / 2], [16, gate.y + gate.h / 2]]}
            />
          );
        })}

        {/* Échec. */}
        <Edge name="échec → sprint suivant" points={[[16, 304], [16, 148], [112, 148]]} />
        <Note x={24} y={122} lines={['modification', 'concrète']} />
        <Edge name="échec → famille garée" points={[[16, 304], [16, 586], [40, 586]]} />
        <Edge name="échec → cimetière" points={[[16, 586], [16, 642], [40, 642]]} />
        <Node x={40} y={568} w={144} h={36} label="Famille garée" />
        <Node x={40} y={624} w={144} h={36} label="Cimetière" />
        <Note x={200} y={647} lead="6" lines={['au cimetière']} />

        <Edge name="portes → retenue" points={[[132, 448], [132, 480]]} />
        <Node x={72} y={480} w={120} h={36} variant="accent" label="Retenue" />
        <Note x={132} y={538} lead="0" lines={['stratégie retenue à ce jour']} anchor="middle" />
      </DiagramFrame>
    </>
  );
}
