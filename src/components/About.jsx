import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCpu, FiLayers, FiZap } from 'react-icons/fi';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
  const targetNumber = parseInt(value) || 0;
  const suffix = value.toString().replace(/[0-9]/g, '');

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * targetNumber));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, targetNumber]);

  return (
    <span ref={ref} className="flex items-baseline">
      {count}
      <span className="text-primary-500 ml-1 text-3xl md:text-4xl">{suffix}</span>
    </span>
  );
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const highlights = [
    {
      icon: <FiCpu size={28} />,
      title: "AI & Deep Learning"
    },
    {
      icon: <FiLayers size={28} />,
      title: "Full Stack Development"
    },
    {
      icon: <FiZap size={28} />,
      title: "Problem Solving"
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column: Identity Typography */}
          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="font-mono text-sm tracking-widest text-gray-400 dark:text-gray-500 mb-6">
              &lt;section id="about"&gt;
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              Hi, I'm <br/>
              <span className="gradient-text pb-2 inline-block">
                Ravidevraj<br/>Pennepalli
              </span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light border-l-2 border-primary-500/30 pl-6 mb-8">
              I engineer intelligent systems and craft premium digital experiences.
            </motion.h2>

            <motion.div variants={itemVariants} className="font-mono text-sm text-gray-400 dark:text-gray-500 hidden md:block opacity-50 space-y-1 mt-4">
              <p>// Location: Earth</p>
              <p>// Status: Building the future</p>
              <p>&lt;/section&gt;</p>
            </motion.div>
          </div>

          {/* Right Column: Details & Stats */}
          <div className="flex flex-col">
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
              Currently pursuing a B.Tech in <span className="font-semibold text-gray-900 dark:text-white">Artificial Intelligence</span>. Specializes in bridging 
              complex ML models and seamless web applications. Builds real-time facial recognition 
              payment systems and scales modern SaaS platforms.
            </motion.p>

            {/* Expertise Grid - Floating Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-2xl p-6 backdrop-blur-md hover:-translate-y-2 transition-all duration-300 hover:border-primary-500/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_15px_35px_rgba(0,123,255,0.05)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {item.icon}
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm xl:text-base leading-tight">
                    {item.title}
                  </h3>
                </div>
              ))}
            </motion.div>

            {/* Stats Row with Animated Count-Up */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-white/10"
            >
              {[
                { value: "3+", label: "Years Coding" },
                { value: "100+", label: "Problems Solved" },
                { value: "5+", label: "Projects Built" },
                { value: "50+", label: "Commits" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col text-left">
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;