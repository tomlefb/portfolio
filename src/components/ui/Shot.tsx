import type { ProjectImage } from '../../types';
import { MediaImage } from './MediaImage';

interface ShotProps {
  image: ProjectImage;
  className?: string;
  eager?: boolean;
  testId?: string;
}

/** Capture d’écran desktop, cernée d’un filet. */
export function Shot({ image, className = '', eager = false, testId }: ShotProps) {
  return (
    <span className={`shot ${className}`} data-testid={testId}>
      <MediaImage image={image} eager={eager} />
    </span>
  );
}
