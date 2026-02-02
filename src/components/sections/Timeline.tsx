import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, MapPin } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';
import { timelineItems } from '../../data/timeline';

const typeConfig = {
  education: {
    icon: GraduationCap,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  work: {
    icon: Briefcase,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-600',
  },
  objective: {
    icon: Target,
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
};

export function Timeline() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section ref={ref} id="timeline" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Parcours"
          subtitle="Du code vers le pilotage de projets"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-200 via-neutral-300 to-green-500 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timelineItems.map((item, i) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon node */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="text-white" size={20} />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                      isEven ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Year badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 ${config.lightColor} ${config.textColor} rounded-full text-xs font-semibold`}
                        >
                          {item.year}
                        </span>
                        {item.type === 'objective' && (
                          <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-medium">
                            Objectif
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-display font-semibold text-neutral-900 mb-1">
                        {item.title}
                      </h3>

                      <p className="text-sm font-medium text-orange-600 mb-2">
                        {item.organization}
                      </p>

                      {item.location && (
                        <div className="flex items-center gap-1 text-xs text-neutral-400 mb-3">
                          <MapPin size={12} />
                          {item.location}
                        </div>
                      )}

                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternate side */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
