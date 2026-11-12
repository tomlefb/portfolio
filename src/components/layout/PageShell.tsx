import type { ReactNode } from 'react';
import { ContactFooter } from './ContactFooter';
import { SiteNav } from './SiteNav';

interface PageShellProps {
  navLabel: string;
  children: ReactNode;
}

export function PageShell({ navLabel, children }: PageShellProps) {
  return (
    <div className="shell">
      <SiteNav label={navLabel} />
      <main>{children}</main>
      <ContactFooter />
    </div>
  );
}
