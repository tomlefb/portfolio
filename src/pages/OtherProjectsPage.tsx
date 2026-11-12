import { PageShell } from '../components/layout/PageShell';
import { BigTitle } from '../components/ui/BigTitle';
import { site } from '../data/site';

export function OtherProjectsPage() {
  return (
    <PageShell navLabel={site.name}>
      <BigTitle as="h1" className="gutter text-[12cqw]">
        Autres projets
      </BigTitle>
    </PageShell>
  );
}
