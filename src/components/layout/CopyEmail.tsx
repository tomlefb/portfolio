import { useEffect, useRef, useState } from 'react';

interface CopyEmailProps {
  email: string;
  copyHint: string;
  copiedHint: string;
  copyLabel: string;
}

/** L'adresse e-mail ouvre la messagerie ; le bouton à côté la copie. */
export function CopyEmail({ email, copyHint, copiedHint, copyLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sans presse-papiers disponible, le lien mailto reste là.
    }
  }

  return (
    <div className="ft-mail">
      <a className="ft-mail__address" href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className="ft-mail__copy" onClick={copy} aria-label={copyLabel}>
        <span aria-live="polite">{copied ? copiedHint : copyHint}</span>
      </button>
    </div>
  );
}
