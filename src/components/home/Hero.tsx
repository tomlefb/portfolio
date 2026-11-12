import { getProject } from '../../data/projects';
import { site } from '../../data/site';
import { PhoneFrame } from '../ui/PhoneFrame';

/** Haut de page : le nom en très grand, la présentation dans le vide à droite, un écran de Vizly qui déborde. */
export function Hero() {
  const [first, ...rest] = site.name.split(' ');
  const phone = getProject('vizly')?.images.find((image) => image.kind === 'phone');

  return (
    <section className="hm-hero" data-testid="hero">
      <h1 className="title-xl">
        <span className="hm-hero__first">{first}</span> <span className="hm-hero__last">{rest.join(' ')}</span>
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
      {phone && <PhoneFrame image={phone} className="hm-hero__phone" eager />}
    </section>
  );
}
