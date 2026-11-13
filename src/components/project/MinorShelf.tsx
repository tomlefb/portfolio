import { useEffect, useState } from 'react';
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

  // Un lien vers /autres-projets#id (depuis l’index de l’accueil) ouvre la tranche correspondante.
  useEffect(() => {
    if (fromHash >= 0) setOpen(fromHash);
  }, [fromHash]);

  return (
    <div className="mn-shelf">
      {projects.map((project, index) => (
        <MinorSlice key={project.id} project={project} open={index === open} onOpen={() => setOpen(index)} />
      ))}
    </div>
  );
}
