import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiClock } from 'react-icons/fi';

const ProjectCard = ({ project, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        {project.inProgress && (
          <div className="absolute top-4 right-4 z-20 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <FiClock size={14} />
            In Progress
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(tech => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
          >
            <FiGithub size={18} />
            Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
            >
              <FiExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;