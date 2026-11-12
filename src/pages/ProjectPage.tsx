import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { FactCells } from '../components/project/FactCells';
import { FigureStrip } from '../components/project/FigureStrip';
import { ImageBand } from '../components/project/ImageBand';
import { NextProject } from '../components/project/NextProject';
import { ProjectHeader } from '../components/project/ProjectHeader';
import { SectionBlock } from '../components/project/SectionBlock';
import { getNextMajor, getProject } from '../data/projects';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { id = '' } = useParams();
  const project = getProject(id);
  const isMajor = project?.tier === 'majeur';
  useDocumentTitle(isMajor ? project.title : 'Projet introuvable');

  if (!project || !isMajor) {
    return <NotFoundPage title="Projet introuvable" />;
  }

  return (
    <PageShell navLabel={site.name}>
      <article>
        <ProjectHeader project={project} />
        {project.facts && <FactCells facts={project.facts} />}
        <ImageBand project={project} />
        {project.figures && (
          <FigureStrip
            figures={project.figures}
            {...(project.images.length === 0 ? { color: project.color, onColor: project.onColor } : {})}
          />
        )}
        {project.sections?.map((section) => (
          <SectionBlock key={section.title} section={section} color={project.color} />
        ))}
      </article>
      <NextProject project={getNextMajor(project.id)} />
    </PageShell>
  );
}
