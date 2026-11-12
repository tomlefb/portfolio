import { Link, NavLink } from 'react-router-dom';

interface SiteNavProps {
  label: string;
}

const linkClass = 'py-1 border-b-[3px] border-transparent hover:border-ink';

export function SiteNav({ label }: SiteNavProps) {
  return (
    <nav
      aria-label="Navigation principale"
      className="gutter relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-[15px] font-semibold"
    >
      <Link to="/">{label}</Link>
      <div className="flex gap-x-5 sm:gap-x-7">
        <Link to="/#projets" className={linkClass}>
          Projets
        </Link>
        <NavLink
          to="/parcours"
          className={({ isActive }) => `${linkClass} ${isActive ? '!border-ink' : ''}`}
        >
          Parcours
        </NavLink>
        <a href="#contact" className={linkClass}>
          Contact
        </a>
        <a href="/CV_TOM.pdf" download className={linkClass}>
          CV
        </a>
      </div>
    </nav>
  );
}
