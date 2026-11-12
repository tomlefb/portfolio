import { site } from '../../data/site';
import { contactInfo } from '../../data/contact';
import { BigTitle } from '../ui/BigTitle';

export function ContactFooter() {
  const links = [
    { label: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { label: 'LinkedIn', href: contactInfo.linkedin },
    { label: 'GitHub', href: contactInfo.github },
    { label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
    { label: 'CV (PDF)', href: site.cv },
  ];

  return (
    <footer id="contact" className="site-footer">
      <BigTitle className="site-footer__title">Écrivez-moi</BigTitle>
      <ul className="site-footer__links">
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
