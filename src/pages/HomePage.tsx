import { Hero } from '../components/home/Hero';
import { OthersTeaser } from '../components/home/OthersTeaser';
import { SpreadCyna } from '../components/home/SpreadCyna';
import { SpreadTti } from '../components/home/SpreadTti';
import { SpreadVizly } from '../components/home/SpreadVizly';
import { PageShell } from '../components/layout/PageShell';
import { getProject, minorProjects } from '../data/projects';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
  useDocumentTitle();
  const vizly = getProject('vizly');
  const tti = getProject('tti');
  const cyna = getProject('cyna');

  return (
    <PageShell navLabel={`${site.role}, ${site.city}`}>
      <Hero />
      <section id="projets" aria-label="Projets">
        <p className="hm-rubric">Projets</p>
        {vizly && <SpreadVizly project={vizly} />}
        {tti && <SpreadTti project={tti} />}
        {cyna && <SpreadCyna project={cyna} />}
        <OthersTeaser projects={minorProjects} />
      </section>
    </PageShell>
  );
}
