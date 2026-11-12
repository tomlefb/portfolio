import { parcoursIntro } from '../../data/parcours';
import { BigTitle } from '../ui/BigTitle';

/** Titre géant ; sur grand écran, le portrait détouré passe devant les dernières lettres. */
export function ParcoursHeader() {
  return (
    <header className="pc-head">
      <p className="pc-head__intro">{parcoursIntro}</p>
      <BigTitle as="h1" className="pc-head__title">
        Parcours
      </BigTitle>
      <img
        className="pc-head__portrait"
        src="/images/profile/tom-detoure.webp"
        alt="Portrait de Tom Lefevre-Bonzon"
        width={1000}
        height={1431}
      />
    </header>
  );
}
