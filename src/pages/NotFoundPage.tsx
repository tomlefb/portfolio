import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { BigTitle } from '../components/ui/BigTitle';
import { site } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface NotFoundPageProps {
  title?: string;
}

export function NotFoundPage({ title = 'Page introuvable' }: NotFoundPageProps) {
  useDocumentTitle(title);
  return (
    <PageShell navLabel={site.name}>
      <section className="gutter rule-3 pb-16 pt-10">
        <BigTitle as="h1" className="text-[15cqw] min-[860px]:text-[9cqw]">
          {title}
        </BigTitle>
        <p className="mt-8 text-[18px]">
          <Link to="/" className="border-b-[3px] border-ink font-bold">
            Retour à l’accueil
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
