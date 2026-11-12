import { contactInfo } from '../../data/contact';
import { BigTitle } from '../ui/BigTitle';

export function ContactFooter() {
  const links = [
    { label: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { label: 'LinkedIn', href: contactInfo.linkedin },
    { label: 'GitHub', href: contactInfo.github },
    { label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
    { label: 'CV (PDF)', href: '/CV_TOM.pdf' },
  ];

  return (
    <footer id="contact" className="gutter bg-ink pb-7 pt-10 text-paper">
      <BigTitle className="text-[17cqw] min-[860px]:text-[11.5cqw]">Écrivez-moi</BigTitle>
      <ul className="mt-7 flex flex-wrap justify-between gap-x-8 gap-y-3 text-[16px] font-semibold">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="border-b-[3px] border-transparent hover:border-paper focus-visible:outline-paper"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
