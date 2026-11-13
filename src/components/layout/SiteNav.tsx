import { site } from '../../data/site';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { callContact } from '../../lib/contactCall';

interface SiteNavProps {
  label: string;
}

const linkClass = 'py-1 border-b-[3px] border-transparent hover:border-ink';

export function SiteNav({ label }: SiteNavProps) {
  const { pathname } = useLocation();
  const onProjects = pathname.startsWith('/projets/') || pathname === '/autres-projets';

  return (
    <nav
      aria-label="Navigation principale"
      className="site-nav gutter relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-[15px] font-semibold"
    >
      <Link to="/">{label}</Link>
      <div className="site-nav__links flex gap-x-5 sm:gap-x-7">
        <Link
          to="/#projets"
          className={`${linkClass} ${onProjects ? '!border-ink' : ''}`}
          aria-current={onProjects ? 'page' : undefined}
        >
          Projets
        </Link>
        <NavLink
          to="/parcours"
          className={({ isActive }) => `${linkClass} ${isActive ? '!border-ink' : ''}`}
        >
          Parcours
        </NavLink>
        <a
          href="#contact"
          className={linkClass}
          onClick={(event) => {
            event.preventDefault();
            callContact();
          }}
        >
          Contact
        </a>
        <a href={site.cv} download className={linkClass}>
          CV
        </a>
      </div>
    </nav>
  );
}
