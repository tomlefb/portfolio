import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Download, Send } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/contact';

export function Contact() {
  const [ref, isInView] = useInView<HTMLElement>();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: contactInfo.location,
      href: undefined,
    },
  ];

  return (
    <section ref={ref} id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          title="Contact"
          subtitle="Discutons ensemble"
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden mb-12"
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                Prêt à collaborer ?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Je recherche une alternance de 2 ans en tant que Chef de Projet IT
                à partir de septembre 2026. Parlons de comment je peux apporter
                ma double compétence à votre équipe.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  href={`mailto:${contactInfo.email}`}
                  icon={Send}
                  className="!bg-white !text-orange-600 hover:!bg-neutral-100"
                >
                  Envoyer un email
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="/CV_TOM.pdf"
                  download
                  icon={Download}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Télécharger mon CV
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {method.href ? (
                  <a
                    href={method.href}
                    className="flex flex-col items-center p-6 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow mb-4">
                      <method.icon
                        className="text-orange-500"
                        size={24}
                      />
                    </div>
                    <span className="text-sm text-neutral-500 mb-1">
                      {method.label}
                    </span>
                    <span className="font-medium text-neutral-900 group-hover:text-orange-600 transition-colors">
                      {method.value}
                    </span>
                  </a>
                ) : (
                  <div className="flex flex-col items-center p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
                      <method.icon className="text-orange-500" size={24} />
                    </div>
                    <span className="text-sm text-neutral-500 mb-1">
                      {method.label}
                    </span>
                    <span className="font-medium text-neutral-900">
                      {method.value}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-sm text-neutral-400">Retrouvez-moi sur</span>
            <div className="flex items-center gap-3">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-100 rounded-xl hover:bg-orange-100 text-neutral-600 hover:text-orange-600 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-100 rounded-xl hover:bg-orange-100 text-neutral-600 hover:text-orange-600 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
