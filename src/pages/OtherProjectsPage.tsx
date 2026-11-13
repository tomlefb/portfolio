import { PageShell } from '../components/layout/PageShell';
import { MinorShelf } from '../components/project/MinorShelf';
import { BigTitle } from '../components/ui/BigTitle';
import { minorProjects, othersPageIntro } from '../data/projects';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function OtherProjectsPage() {
  useDocumentTitle('Autres projets');

  return (
    <PageShell navLabel={site.name}>
      <header className="mn-head">
        <BigTitle as="h1">Autres projets</BigTitle>
        <p>{othersPageIntro}</p>
      </header>
      <MinorShelf projects={minorProjects} />
    </PageShell>
  );
}
