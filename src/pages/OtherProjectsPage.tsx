import { PageShell } from '../components/layout/PageShell';
import { MinorProject } from '../components/project/MinorProject';
import { BigTitle } from '../components/ui/BigTitle';
import { minorProjects } from '../data/projects';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function OtherProjectsPage() {
  useDocumentTitle('Autres projets');

  return (
    <PageShell navLabel={site.name}>
      <header className="mn-head">
        <BigTitle as="h1">Autres projets</BigTitle>
        <p>Des projets plus courts : personnels, de stage ou de hackathon.</p>
      </header>
      <div className="mn-grid">
        {minorProjects.map((project) => (
          <MinorProject key={project.id} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
