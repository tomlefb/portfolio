import { site } from '../../data/site';

/** Page de garde : occupe tout le premier écran ; le nom en très grand, la présentation dans le vide à droite de « TOM ». */
export function Hero() {
  const [first, ...rest] = site.name.split(' ');
  // Le nom de famille est découpé après le trait d’union : sur mobile, chaque morceau prend toute la largeur.
  const lastParts = rest.join(' ').split(/(?<=-)/);

  return (
    <section className="hm-hero" data-testid="hero">
      <div className="hm-hero__inner">
        <h1 className="title-xl">
        <span className="hm-hero__first">{first}</span> <span className="hm-hero__last">
            {lastParts.map((part) => (
              <span key={part} className="hm-hero__part">
                {part}
              </span>
            ))}
          </span>
      </h1>
      <div className="hm-hero__text">
        <p>{site.intro}</p>
        <dl>
          {site.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      </div>
    </section>
  );
}
