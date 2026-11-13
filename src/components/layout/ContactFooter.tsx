import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_CALL_EVENT } from '../../lib/contactCall';
import { contactInfo, footerContent as text } from '../../data/contact';
import { site } from '../../data/site';
import { CopyEmail } from './CopyEmail';

/** Pied de page en colophon : contact, liens, pages du site, et une ligne sur sa fabrication. */
export function ContactFooter() {
  const elsewhere = [
    { label: 'LinkedIn', href: contactInfo.linkedin, external: true },
    { label: 'GitHub', href: contactInfo.github, external: true },
    { label: 'CV (PDF)', href: site.cv, external: true },
    { label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, external: false },
  ];

  const footerRef = useRef<HTMLElement>(null);
  const [called, setCalled] = useState(false);

  // Au clic sur « Contact » : la page descend jusqu’ici, puis l’adresse s’allume un instant et prend le focus.
  useEffect(() => {
    let timer = 0;
    let fallback = 0;
    const signal = () => {
      window.removeEventListener('scrollend', signal);
      window.clearTimeout(fallback);
      setCalled(false);
      requestAnimationFrame(() => setCalled(true));
      footerRef.current?.querySelector<HTMLAnchorElement>('.ft-mail__address')?.focus({ preventScroll: true });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setCalled(false), 1600);
    };
    const onCall = () => {
      const footer = footerRef.current;
      if (!footer) return;
      if (footer.getBoundingClientRect().bottom <= window.innerHeight + 1) {
        signal();
        return;
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      footer.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'end' });
      if (reduced) {
        signal();
        return;
      }
      window.addEventListener('scrollend', signal, { once: true });
      fallback = window.setTimeout(signal, 900);
    };
    window.addEventListener(CONTACT_CALL_EVENT, onCall);
    return () => {
      window.removeEventListener(CONTACT_CALL_EVENT, onCall);
      window.removeEventListener('scrollend', signal);
      window.clearTimeout(timer);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <footer id="contact" ref={footerRef} className={`ft${called ? ' ft--called' : ''}`}>
      <section className="ft__cell ft__cell--contact">
        <h2 className="ft__label">{text.contactLabel}</h2>
        <CopyEmail
          email={contactInfo.email}
          copyHint={text.copyHint}
          copiedHint={text.copiedHint}
          copyLabel={text.copyLabel}
        />
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
      <nav className="ft__cell" aria-label={text.pagesNavLabel}>
        <h2 className="ft__label">{text.pagesLabel}</h2>
        <ul className="ft__links">
          {text.pages.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
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
