import { PageShell } from '../components/layout/PageShell';
import { ParcoursHeader } from '../components/parcours/ParcoursHeader';
import { ParcoursHighlights } from '../components/parcours/ParcoursHighlights';
import { ParcoursTable } from '../components/parcours/ParcoursTable';
import { TechnoLines } from '../components/parcours/TechnoLines';
import { Timeline } from '../components/parcours/Timeline';
import { parcours, parcoursHighlights, technos, technosLabel, timeline, timelineLabels } from '../data/parcours';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ParcoursPage() {
  useDocumentTitle('Parcours');

  return (
    <PageShell navLabel={site.name}>
      <ParcoursHeader />
      <Timeline
        data={timeline}
        caption={timelineLabels.caption}
        todayLabel={timelineLabels.today}
        ongoingLabel={timelineLabels.ongoing}
      />
      <ParcoursTable items={parcours} />
      <ParcoursHighlights items={parcoursHighlights} />
      <TechnoLines label={technosLabel} groups={technos} />
    </PageShell>
  );
}
