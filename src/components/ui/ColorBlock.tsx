interface ColorBlockProps {
  color: string;
  className?: string;
}

/** Aplat de la couleur d’un projet, placé derrière ses images. */
export function ColorBlock({ color, className = '' }: ColorBlockProps) {
  return <span aria-hidden="true" className={`block ${className}`} style={{ background: color }} />;
}
