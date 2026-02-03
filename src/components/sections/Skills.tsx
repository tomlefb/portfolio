import { motion } from 'framer-motion';
import { Briefcase, Code, Wrench } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';
import { managementSkills, technicalSkills, tools } from '../../data/skills';

export function Skills() {
  const [ref, isInView] = useInView<HTMLElement>();

  const groupedTechnical = technicalSkills.reduce((acc, skill) => {
    const key = skill.subcategory || 'Autre';
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {} as Record<string, typeof technicalSkills>);

  return (
    <section ref={ref} id="skills" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          title="Compétences"
          subtitle="Une double appétence technique et pilotage"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Management Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full"
          >
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-orange-500/30 rounded-tl-xl" />

            <div className="bg-gradient-to-br from-orange-50 to-orange-50/50 rounded-2xl p-6 md:p-8 border border-orange-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900">
                    Gestion de projet
                  </h3>
                  <p className="text-sm text-neutral-500">Méthodologie & Leadership</p>
                </div>
              </div>

              <div className="space-y-4">
                {managementSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full md:group-hover:scale-125 transition-transform" />
                    <span className="text-neutral-700 md:group-hover:text-neutral-900 transition-colors">
                      {skill.name}
                    </span>
                    {skill.subcategory && (
                      <span className="text-xs text-neutral-400 ml-auto">
                        {skill.subcategory}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-full"
          >
            {/* Decorative corner */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-r-2 border-t-2 border-neutral-200 rounded-tr-xl" />

            <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-neutral-900 rounded-xl">
                  <Code className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900">
                    Technique
                  </h3>
                  <p className="text-sm text-neutral-500">Langages & Frameworks</p>
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedTechnical).map(([category, skills], ci) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + ci * 0.1 }}
                  >
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 md:hover:border-orange-200 md:hover:text-orange-600 transition-colors cursor-default"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Wrench className="text-neutral-600" size={20} />
            </div>
            <h3 className="text-lg font-display font-semibold text-neutral-900">
              Outils quotidiens
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600 md:hover:bg-orange-100 md:hover:text-orange-700 transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
