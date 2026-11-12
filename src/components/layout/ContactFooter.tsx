import { contactInfo, footerContent as text } from '../../data/contact';
import { site } from '../../data/site';
import { CopyEmail } from './CopyEmail';

/** Pied de page en colophon : contact, liens, et une ligne sur la fabrication du site. */
export function ContactFooter() {
  const elsewhere = [
    { label: 'LinkedIn', href: contactInfo.linkedin, external: true },
    { label: 'GitHub', href: contactInfo.github, external: true },
    { label: 'CV (PDF)', href: site.cv, external: false },
    { label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, external: false },
  ];

  return (
    <footer id="contact" className="ft">
      <section className="ft__cell ft__cell--contact">
        <h2 className="ft__label">{text.contactLabel}</h2>
        <CopyEmail email={contactInfo.email} copyHint={text.copyHint} copiedHint={text.copiedHint} />
        <p className="ft__text">{text.contactText}</p>
      </section>
      <section className="ft__cell">
        <h2 className="ft__label">{text.elsewhereLabel}</h2>
        <ul className="ft__links">
          {elsewhere.map((link) => (
            <li key={link.label}>
              <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="ft__cell">
        <h2 className="ft__label">{text.siteLabel}</h2>
        <p className="ft__text">{text.siteText}</p>
        <a className="ft__source" href={text.sourceUrl} target="_blank" rel="noopener noreferrer">
          {text.sourceLabel}
        </a>
      </section>
    </footer>
  );
}
