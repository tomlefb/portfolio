import { parcoursIntro } from '../../data/parcours';
import { site } from '../../data/site';
import { BigTitle } from '../ui/BigTitle';

/** Titre géant ; le portrait détouré est calé contre le bord droit de la page et passe devant la fin du titre. */
export function ParcoursHeader() {
  return (
    <header className="pc-head">
      <p className="pc-head__intro">{parcoursIntro}</p>
      <BigTitle as="h1" className="pc-head__title">
        Parcours
      </BigTitle>
      <img className="pc-head__portrait" src={site.portrait.src} alt={site.portrait.alt} width={1195} height={1465} />
    </header>
  );
}
