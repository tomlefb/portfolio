import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Remonte en haut à chaque changement de page, ou va à l'ancre demandée. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
