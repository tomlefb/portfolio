import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/contact';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0) 70%)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating geometric elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/3 w-8 h-8 border-2 border-orange-500/20 rounded-lg"
        />

        {/* Orange accent line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent origin-top hidden lg:block"
        />
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-orange-700">
              Recherche alternance Chef de Projet IT — Sept. 2026
            </span>
          </motion.div>

          {/* Name with split styling */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-semibold leading-[0.95] mb-6"
          >
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-900 block">Tom</span>
            <span className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-gradient-orange block">Lefevre-Bonzon</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto md:mx-0 mb-8 font-light leading-relaxed"
          >
            Du code à la coordination — développeur en alternance chez{' '}
            <span className="text-neutral-900 font-medium">Capgemini</span>,
            j'évolue vers le{' '}
            <span className="text-orange-600 font-medium">
              pilotage de projets IT
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3 sm:gap-4 mb-12"
          >
            <Button
              variant="primary"
              size="md"
              href="#projects"
              icon={ArrowDown}
              className="sm:!px-8 sm:!py-4 sm:!text-lg"
            >
              Voir mes projets
            </Button>
            <Button
              variant="ghost"
              size="md"
              href="/CV_TOM.pdf"
              download
              icon={Download}
              className="sm:!px-8 sm:!py-4 sm:!text-lg"
            >
              Télécharger mon CV
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6"
          >
            <span className="text-sm text-neutral-400 font-medium">
              Retrouvez-moi sur
            </span>
            <div className="flex items-center gap-3">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-100 md:hover:bg-orange-100 active:bg-orange-100 text-neutral-600 md:hover:text-orange-600 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-100 md:hover:bg-orange-100 active:bg-orange-100 text-neutral-600 md:hover:text-orange-600 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="p-2.5 rounded-lg bg-neutral-100 md:hover:bg-orange-100 active:bg-orange-100 text-neutral-600 md:hover:text-orange-600 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
