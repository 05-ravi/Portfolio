import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiClock, FiFolder, FiArrowUpRight, FiCode } from 'react-icons/fi';
import { projects } from '../data/projects';

const ProjectTimelineItem = ({ project, index, inView }) => {
  const isLeft = index % 2 === 0;
  
  const variants = {
    hidden: { 
      opacity: 0, 
      x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : (isLeft ? -50 : 50),
      y: 30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      } 
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative flex flex-col md:flex-row items-center justify-between mb-20 last:mb-0 w-full ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline Dot - Better mobile alignment */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-0 md:top-1/2 md:-translate-y-1/2">
        <div className="relative">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-md animate-pulse" />
          <div className="relative w-10 md:w-12 h-10 md:h-12 rounded-full bg-white dark:bg-[#0a0a0f] border-2 border-primary-500 flex items-center justify-center text-primary-500 shadow-[0_0_20px_rgba(30,144,255,0.3)] group-hover:scale-110 transition-transform duration-300 z-10">
            {project.inProgress ? <FiClock size={18} /> : <FiFolder size={18} />}
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isLeft ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
        <div className="glass-effect rounded-3xl overflow-hidden card-hover group transition-all duration-500 border border-gray-200/50 dark:border-white/[0.06] hover:border-primary-500/30 hover:shadow-[0_20px_60px_-15px_rgba(30,144,255,0.15)]">
          {/* Project Image */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"; // High-quality fallback
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-[#0a0a0f]/20 to-transparent" />
            
            {/* Meta info on image */}
            <div className={`absolute top-4 ${isLeft ? 'md:left-4 right-4' : 'left-4'} flex flex-wrap gap-2`}>
              {project.tech.slice(0, 2).map(t => (
                <span key={t} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {/* In Progress Tag */}
            {project.inProgress && (
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Development Phase
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="p-8">
            <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 px-1">
                {project.category === 'ai' ? 'Artificial Intelligence' : project.category === 'fullstack' ? 'Full Stack Engineering' : 'Mobile Experience'}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg ml-auto mr-0 md:mr-auto">
              {project.description}
            </p>

            {/* Links Section */}
            <div className={`flex flex-wrap items-center gap-4 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
              >
                <FiGithub size={18} />
                <span>Source</span>
              </a>
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <FiExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for Desktop */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(30,144,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-custom relative z-10 pt-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="text-center mb-32 max-w-2xl">
            <span className="section-label mb-6 inline-flex mx-auto">
              <FiFolder className="mr-2" /> Selected Works
            </span>
            <h2 className="heading-md mb-6">
              Engineering <span className="gradient-text">Excellence</span>
            </h2>
            <p className="body-md text-balance">
              Expertly crafted digital solutions blending cutting-edge Artificial Intelligence with robust Full Stack engineering practices.
            </p>
          </motion.div>

          {/* Timeline Wrapper */}
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Professional Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500/60 via-primary-500/20 to-transparent z-0 hidden sm:block" />

            {/* Project Timeline Items */}
            <div className="relative z-10">
              {projects.map((project, index) => (
                <ProjectTimelineItem 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  inView={inView}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={headerVariants}
            className="mt-28"
          >
            <a 
              href="https://github.com/05-ravi"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 group-hover:scale-105" />
              <div className="relative flex items-center gap-3 text-white font-bold">
                <FiGithub size={20} />
                <span>Explore the full archive</span>
                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;