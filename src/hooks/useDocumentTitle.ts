import { useEffect } from 'react';

const BASE = 'Tom Lefevre-Bonzon';

/** Titre de l'onglet : « Page — Tom Lefevre-Bonzon ». */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} — ${BASE}` : `${BASE} — Développeur`;
  }, [page]);
}
