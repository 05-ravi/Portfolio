import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const certs = [
  {
    title: "AI & Machine Learning",
    issuer: "Industry Standard Certification",
    date: "Dec 2025",
    link: "/certifications/AIML .pdf",
    image: "/certifications/AIML.png",
    color: "from-blue-500/20 to-primary-500/20",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "Nov 2025",
    link: "/certifications/Deep Learning Certification .pdf",
    image: "/certifications/DeepLearning.png",
    color: "from-primary-500/20 to-blue-600/20",
  },
  {
    title: "Data Analytics Virtual Experience",
    issuer: "Deloitte",
    date: "Feb 2026",
    link: "/certifications/Deloitte_DataAnalytics.pdf",
    image: "/certifications/DataAnalytics.png",
    color: "from-cyan-500/20 to-primary-500/20",
  },
  {
    title: "AWS Cloud Operations",
    issuer: "AWS",
    date: "Mar 2026",
    link: "/certifications/Cloud Operations.pdf",
    image: "/certifications/Cloud Operations.png",
    color: "from-primary-600/20 to-indigo-500/20",
  },
  
];

const CertificationCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="flex-shrink-0 w-[300px] sm:w-[380px] snap-center perspective-1000 py-4"
    >
      <div className="h-full glass-effect rounded-[2rem] overflow-hidden group/card hover:border-primary-500/40 transition-all duration-500 flex flex-col shadow-lg hover:shadow-primary-500/20 border border-white/10">
        {/* Banner Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={cert.image} 
            alt={cert.title} 
            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} backdrop-blur-[1px] opacity-40`} />
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-xl">
            <FiCheckCircle size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1 relative">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-primary-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500/80">Certified</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white leading-tight group-hover/card:text-primary-500 transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              {cert.issuer}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-500 flex flex-col">
              <span className="uppercase tracking-widest text-[9px] mb-0.5 opacity-60">Issue Date</span>
              <span className="font-bold text-gray-700 dark:text-gray-300">{cert.date}</span>
            </div>
            
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 transform group-hover/card:scale-110 shadow-glow-sm"
            >
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="certifications" className="section-padding relative overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] -ml-64" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <span className="section-label mb-4 inline-flex">
              <FiAward className="mr-1" /> Credentials
            </span>
            <h2 className="heading-md mt-4 mb-4">
              Validated <span className="gradient-text">Excellence</span>
            </h2>
            <p className="body-md">
              A curated collection of my professional achievements and industry-recognized certifications in AI, Data Science, and Software Engineering.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-2xl glass-effect flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-xl"
              aria-label="Previous Certification"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-2xl glass-effect flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-xl"
              aria-label="Next Certification"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Carousel Wrapper */}
        <div className="relative group">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto pb-16 scrollbar-hide snap-x snap-mandatory px-4 cursor-grab active:cursor-grabbing"
          >
            {certs.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-primary-500/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scrollProgress / 100 }}
              className="h-full bg-primary-500 origin-left"
            />
          </div>

          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0a0a0f] to-transparent pointer-events-none z-10 opacity-60" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#0a0a0f] to-transparent pointer-events-none z-10 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Certifications;
