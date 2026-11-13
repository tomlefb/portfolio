import { Link } from 'react-router-dom';
import { parcoursTeaser } from '../../data/parcours';

/**
 * Fin de l’accueil : « PARCOURS » en très grand, mordu par un aplat anis (la couleur du présent sur la page
 * Parcours) ; le texte est posé dans l’aplat, calé sur le pied du mot.
 */
export function ParcoursTeaser() {
  return (
    <Link to="/parcours" className="hm-pc">
      <span className="hm-pc__block" aria-hidden="true" />
      <h2 className="title-xl hm-pc__title">{parcoursTeaser.title}</h2>
      <span className="hm-pc__cap">
        <span className="hm-pc__text">{parcoursTeaser.text}</span>
        <span className="hm-pc__more">{parcoursTeaser.more}</span>
      </span>
    </Link>
  );
}
