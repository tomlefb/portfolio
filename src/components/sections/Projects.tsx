import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { projects, getFeaturedProject } from '../../data/projects';
import { Project } from '../../types';
import { AlgoTradingVisual } from '../projects/AlgoTradingVisual';

export function Projects() {
  const [ref, isInView] = useInView<HTMLElement>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredProject = getFeaturedProject();
  const otherProjects = projects.filter((p) => !p.featured);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section ref={ref} id="projects" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Projets"
          subtitle="Des réalisations qui allient technique et pilotage"
        />

        {/* Featured Project - CYNA */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              {/* Featured badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium">
                <Star size={14} fill="currentColor" />
                Projet vedette
              </div>

              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-[420px] bg-neutral-100 overflow-hidden">
                  <img
                    src={featuredProject.images[0]}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover object-top absolute inset-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent lg:bg-gradient-to-r" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-display font-semibold text-neutral-900">
                      {featuredProject.title}
                    </h3>
                    <Badge variant="orange">{featuredProject.category}</Badge>
                  </div>

                  <p className="text-lg text-neutral-600 mb-4">
                    {featuredProject.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
                    <Users size={16} />
                    <span>{featuredProject.role}</span>
                  </div>

                  {/* Stack preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.stack.slice(0, 8).map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                    {featuredProject.stack.length > 8 && (
                      <Badge variant="outline">
                        +{featuredProject.stack.length - 8}
                      </Badge>
                    )}
                  </div>

                  {/* Highlights preview */}
                  <ul className="space-y-2 mb-8">
                    {featuredProject.highlights.slice(0, 3).map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="primary"
                    onClick={() => openModal(featuredProject)}
                    icon={ExternalLink}
                  >
                    Voir le détail
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onClick={() => openModal(project)}
              className="group bg-white rounded-xl border border-neutral-200 overflow-hidden cursor-pointer hover:border-orange-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Image or Visual */}
              <div className="relative h-48 bg-neutral-100 overflow-hidden">
                {project.id === 'algo-trading' ? (
                  <AlgoTradingVisual />
                ) : project.id === 'nutriai' ? (
                  /* NutriAI - Mobile screenshots displayed side by side */
                  <div className="w-full h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center gap-2 p-4">
                    {project.images.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${project.title} screen ${idx + 1}`}
                        className="h-full w-auto object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
                        style={{ maxWidth: '30%' }}
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-neutral-100">
                    <span className="text-4xl font-display font-bold text-orange-200">
                      {project.title[0]}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  <Badge variant="outline" size="sm">
                    {project.category === 'personal'
                      ? 'Perso'
                      : project.category === 'professional'
                      ? 'Pro'
                      : 'Académique'}
                  </Badge>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="default" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 4 && (
                    <Badge variant="outline" size="sm">
                      +{project.stack.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              {/* Image gallery */}
              {selectedProject.images.length > 0 ? (
                <div className="relative h-64 md:h-80 bg-neutral-100">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-neutral-50"
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label="Image précédente"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label="Image suivante"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              idx === currentImageIndex
                                ? 'bg-orange-500'
                                : 'bg-white/60'
                            }`}
                            aria-label={`Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : selectedProject.id === 'algo-trading' ? (
                <div className="h-64 md:h-80">
                  <AlgoTradingVisual showDetails />
                </div>
              ) : null}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-orange-600 font-medium">
                      {selectedProject.role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                        aria-label="Voir sur GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                        aria-label="Voir le site"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-neutral-500 mb-6">
                  {selectedProject.context}
                </p>

                <div className="prose prose-neutral max-w-none mb-8">
                  <p className="text-neutral-600">{selectedProject.fullDescription}</p>
                </div>

                {/* Team */}
                {selectedProject.team && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                      Équipe
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedProject.team.map((member) => (
                        <div
                          key={member.name}
                          className={`p-3 rounded-lg border ${
                            member.isMe
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-neutral-50 border-neutral-100'
                          }`}
                        >
                          <p className={`font-medium ${member.isMe ? 'text-orange-700' : 'text-neutral-900'}`}>
                            {member.name}
                          </p>
                          <p className="text-sm text-neutral-500">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stack */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Stack technique
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Points forts
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Methodology */}
                {selectedProject.methodology && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                      Méthodologie
                    </h3>
                    <p className="text-neutral-600 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                      {selectedProject.methodology}
                    </p>
                  </div>
                )}

                {/* Risk management mention */}
                {selectedProject.hasRiskManagement && (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                    <p className="text-neutral-600">
                      <span className="font-medium text-neutral-900">Gestion des risques :</span>{' '}
                      Identification, évaluation et mitigation des risques projet (complexité technique, performance, sécurité)
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
