import type { MouseEvent, ReactNode } from 'react';
import { ContactFooter } from './ContactFooter';
import { SiteNav } from './SiteNav';

interface PageShellProps {
  navLabel: string;
  children: ReactNode;
}

const SKIP_LABEL = 'Aller au contenu';

/** Amène le focus clavier sur le contenu, sans passer par la navigation. */
function skipToContent(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const main = document.getElementById('contenu');
  main?.focus({ preventScroll: true });
  main?.scrollIntoView();
}

export function PageShell({ navLabel, children }: PageShellProps) {
  return (
    <div className="shell">
      <a href="#contenu" className="skip-link" onClick={skipToContent}>
        {SKIP_LABEL}
      </a>
      <SiteNav label={navLabel} />
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <ContactFooter />
    </div>
  );
}
