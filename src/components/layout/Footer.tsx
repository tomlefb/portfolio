import { Github, Linkedin, Mail } from 'lucide-react';
import { contactInfo } from '../../data/contact';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-display font-semibold">
              T
            </div>
            <div>
              <p className="font-display font-medium">Tom Lefevre-Bonzon</p>
              <p className="text-sm text-neutral-400">
                {currentYear} — Tous droits réservés
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-center text-sm text-neutral-500">
            Conçu et développé avec passion à Rennes
          </p>
        </div>
      </div>
    </footer>
  );
}
