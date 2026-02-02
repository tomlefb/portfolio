import { motion } from 'framer-motion';
import { MapPin, Globe, Award } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  const [ref, isInView] = useInView<HTMLElement>();

  const highlights = [
    { icon: MapPin, label: 'Rennes, France' },
    { icon: Globe, label: 'Anglais C1 (TOEIC 885)' },
    { icon: Award, label: 'Permis B' },
  ];

  return (
    <section ref={ref} id="about" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          title="À propos"
          subtitle="Un profil hybride, entre code et coordination"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo with decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl" />
            <div className="absolute -right-2 -bottom-2 w-full h-full border-2 border-orange-500/20 rounded-2xl" />

            <div className="relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[4/5]">
              <img
                src="/images/profile/Portrait professionnel avec fond flou.png"
                alt="Tom Lefevre-Bonzon"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6, type: 'spring' }}
              className="absolute -right-4 -bottom-4 bg-white rounded-xl shadow-xl p-4 border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-orange-600">2+</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-neutral-900">ans</p>
                  <p className="text-xs text-neutral-500">d'alternance</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                Actuellement en <span className="text-neutral-900 font-medium">Bachelor 3 Développement Informatique</span> à Sup de Vinci
                et en alternance chez <span className="text-orange-600 font-medium">Capgemini</span>,
                je construis un profil qui allie expertise technique et vision projet.
              </p>

              <p>
                Mon parcours, du <span className="text-neutral-900 font-medium">BTS SIO</span> aux projets complexes en entreprise,
                m'a permis de développer une double compétence rare : je comprends le code que je pilote,
                et je sais communiquer avec les équipes techniques comme avec les métiers.
              </p>

              <p>
                Mon objectif pour septembre 2026 : intégrer un <span className="text-orange-600 font-medium">Mastère Chef de Projet IT</span> en alternance
                pour approfondir les méthodologies de pilotage, la gestion d'équipes et la stratégie digitale.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 flex flex-wrap gap-4">
              {highlights.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-100"
                >
                  <Icon size={16} className="text-orange-500" />
                  <span className="text-sm font-medium text-neutral-700">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-100">
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                Langues
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Français</span>
                  <span className="text-sm font-medium text-orange-600">Natif</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Anglais</span>
                  <span className="text-sm font-medium text-orange-600">C1 (TOEIC 885)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">Espagnol</span>
                  <span className="text-sm font-medium text-neutral-400">A2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
