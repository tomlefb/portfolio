import { useState } from 'react';
import type { ProjectImage } from '../../types';

interface MediaImageProps {
  image: ProjectImage;
  eager?: boolean;
}

/** Image d’une composition. Si elle ne charge pas, son texte de remplacement s’affiche à sa place. */
export function MediaImage({ image, eager = false }: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="media-fallback">{image.alt}</span>;
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
