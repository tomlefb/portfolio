import { useEffect, useRef, useState } from 'react';

interface CopyEmailProps {
  email: string;
  copyHint: string;
  copiedHint: string;
}

/** L'adresse e-mail : un clic la copie. Sans presse-papiers disponible, la messagerie s'ouvre. */
export function CopyEmail({ email, copyHint, copiedHint }: CopyEmailProps) {
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
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" className="ft-mail" onClick={copy}>
      <span className="ft-mail__address">{email}</span>
      <span className="ft-mail__hint" aria-live="polite">
        {copied ? copiedHint : copyHint}
      </span>
    </button>
  );
}
