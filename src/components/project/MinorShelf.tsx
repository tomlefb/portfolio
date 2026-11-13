import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Project } from '../../types';
import { MinorSlice } from './MinorSlice';

interface MinorShelfProps {
  projects: Project[];
}

/** Les projets mineurs rangés côte à côte comme des dos de livres : un seul ouvert à la fois. */
export function MinorShelf({ projects }: MinorShelfProps) {
  const { hash } = useLocation();
  const fromHash = projects.findIndex((project) => `#${project.id}` === hash);
  const [open, setOpen] = useState(Math.max(0, fromHash));
  const shelfRef = useRef<HTMLDivElement>(null);

  // En accordéon (mobile), la tranche du dessus se replie pendant que la nouvelle s’ouvre : si la nouvelle
  // remonte hors de l’écran, on la ramène en douceur une fois l’animation finie.
  function openSlice(index: number) {
    setOpen(index);
    window.setTimeout(() => {
      const slice = shelfRef.current?.children[index];
      if (!slice || slice.getBoundingClientRect().top >= 0) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      slice.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    }, 520);
  }

  // Un lien vers /autres-projets#id (depuis l’index de l’accueil) ouvre la tranche correspondante.
  useEffect(() => {
    if (fromHash >= 0) setOpen(fromHash);
  }, [fromHash]);

  return (
    <div className="mn-shelf" ref={shelfRef}>
      {projects.map((project, index) => (
        <MinorSlice key={project.id} project={project} open={index === open} onOpen={() => openSlice(index)} />
      ))}
    </div>
  );
}
