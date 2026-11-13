import type { ProjectImage } from '../../types';
import { MediaImage } from './MediaImage';

interface PhoneFrameProps {
  image: ProjectImage;
  className?: string;
  eager?: boolean;
  testId?: string;
}

/** Écran d’application dans un cadre de téléphone. */
export function PhoneFrame({ image, className = '', eager = false, testId }: PhoneFrameProps) {
  return (
    <span className={`phone ${className}`} data-testid={testId}>
      <MediaImage image={image} eager={eager} />
    </span>
  );
}
