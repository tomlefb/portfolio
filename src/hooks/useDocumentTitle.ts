import { useEffect } from 'react';

const BASE = 'Tom Lefevre-Bonzon';

/** Titre de l'onglet : « Page · Tom Lefevre-Bonzon » (point médian : un tiret se confondrait avec le trait d'union du nom). */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} · ${BASE}` : `${BASE} · Développeur full stack`;
  }, [page]);
}
