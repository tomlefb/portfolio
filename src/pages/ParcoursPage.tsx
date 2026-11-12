import { PageShell } from '../components/layout/PageShell';
import { ParcoursHeader } from '../components/parcours/ParcoursHeader';
import { ParcoursTable } from '../components/parcours/ParcoursTable';
import { TechnoLines } from '../components/parcours/TechnoLines';
import { parcours, parcoursGroups, technos, technosLabel } from '../data/parcours';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ParcoursPage() {
  useDocumentTitle('Parcours');

  return (
    <PageShell navLabel={site.name}>
      <ParcoursHeader />
      <ParcoursTable groups={parcoursGroups} items={parcours} />
      <TechnoLines label={technosLabel} groups={technos} />
    </PageShell>
  );
}
