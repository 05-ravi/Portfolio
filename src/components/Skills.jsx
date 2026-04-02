import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiTerminal, FiLayout, FiServer, FiCpu, FiTool, FiBox } from 'react-icons/fi';
import { 
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiHtml5, SiCss3, 
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiPostgresql, SiFirebase, SiPrisma,
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiNumpy, SiPandas, 
  SiGit, SiDocker, SiLinux, SiVisualstudiocode, SiFigma, SiPostman, SiVite
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const skills = [
  // Languages
  { name: "Java", icon: <FaJava />, category: "languages", color: "#007396" },
  { name: "Python", icon: <SiPython />, category: "languages", color: "#3776AB" },
  // { name: "JavaScript", icon: <SiJavascript />, category: "languages", color: "#F7DF1E" },
  // { name: "TypeScript", icon: <SiTypescript />, category: "languages", color: "#3178C6" },
  // { name: "C++", icon: <SiCplusplus />, category: "languages", color: "#00599C" },
  
  
  
  // Frontend
  { name: "HTML5", icon: <SiHtml5 />, category: "frontend", color: "#E34F26" },
  { name: "CSS3", icon: <SiCss3 />, category: "frontend", color: "#1572B6" },
  { name: "JavaScript", icon: <SiJavascript />, category: "frontend", color: "#F7DF1E" },
  { name: "React", icon: <SiReact />, category: "frontend", color: "#61DAFB" },
  // { name: "Next.js", icon: <SiNextdotjs />, category: "frontend", color: "#000000" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend", color: "#06B6D4" },
  // { name: "Framer Motion", icon: <SiFramer />, category: "frontend", color: "#0055FF" },
  // { name: "Redux", icon: <SiRedux />, category: "frontend", color: "#764ABC" },
  // { name: "Vite", icon: <SiVite />, category: "frontend", color: "#646CFF" },

  // Backend
  { name: "Node.js", icon: <SiNodedotjs />, category: "backend", color: "#339933" },
  // { name: "Express", icon: <SiExpress />, category: "backend", color: "#000000" },
  { name: "FastAPI", icon: <SiFastapi />, category: "backend", color: "#009688" },
  { name: "MongoDB", icon: <SiMongodb />, category: "backend", color: "#47A248" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "backend", color: "#4169E1" },
  { name: "Firebase", icon: <SiFirebase />, category: "backend", color: "#FFCA28" },
  // { name: "Prisma", icon: <SiPrisma />, category: "backend", color: "#2D3748" },

  // AI / ML
  { name: "TensorFlow", icon: <SiTensorflow />, category: "ai / ml", color: "#FF6F00" },
  { name: "PyTorch", icon: <SiPytorch />, category: "ai / ml", color: "#EE4C2C" },
  { name: "Scikit-Learn", icon: <SiScikitlearn />, category: "ai / ml", color: "#F7931E" },
  { name: "OpenCV", icon: <SiOpencv />, category: "ai / ml", color: "#5C3EE8" },
  { name: "NumPy", icon: <SiNumpy />, category: "ai / ml", color: "#013243" },
  { name: "Pandas", icon: <SiPandas />, category: "ai / ml", color: "#150458" },
  // { name: "LangChain", icon: <FiCpu />, category: "ai / ml", color: "#00A651" },

  // Tools & Platforms
  { name: "Git", icon: <SiGit />, category: "tools & platforms", color: "#F05032" },
  // { name: "Docker", icon: <SiDocker />, category: "tools & platforms", color: "#2496ED" },
  // { name: "Linux", icon: <SiLinux />, category: "tools & platforms", color: "#FCC624" },
  // { name: "VS Code", icon: <SiVisualstudiocode />, category: "tools & platforms", color: "#007ACC" },
  // { name: "Figma", icon: <SiFigma />, category: "tools & platforms", color: "#F24E1E" },
  { name: "Postman", icon: <SiPostman />, category: "tools & platforms", color: "#FF6C37" },
];

const categories = [
  { id: 'all', label: 'All', icon: <FiBox /> },
  { id: 'languages', label: 'Languages', icon: <FiCode /> },
  { id: 'frontend', label: 'Frontend', icon: <FiLayout /> },
  { id: 'backend', label: 'Backend', icon: <FiServer /> },
  { id: 'ai / ml', label: 'AI / ML', icon: <FiCpu /> },
  { id: 'tools & platforms', label: 'Tools & Platforms', icon: <FiTool /> },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredSkills = useMemo(() => {
    return activeCategory === 'all' 
      ? skills 
      : skills.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -mr-64 -mb-64" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-md text-gray-900 dark:text-white relative inline-block">
            Skills
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-500 rounded-full" />
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center gap-3 p-2.5 glass-effect rounded-[1.5rem] border border-white/10 shadow-2xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                  ${activeCategory === cat.id 
                    ? 'bg-primary-500 text-white shadow-glow-sm transform scale-105 active:scale-95' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-primary-500/10 hover:text-primary-500'}
                `}
              >
                <span className={`text-lg transition-transform duration-300 ${activeCategory === cat.id ? 'text-white scale-110' : 'text-primary-500'}`}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
                className="group relative"
              >
                {/* Skill Card */}
                <motion.div 
                  whileHover={{ scale: 1.1, translateY: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="h-full glass-effect rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-5 overflow-hidden transition-all duration-500 border border-white/5 hover:border-primary-500/40 hover:shadow-glow-md active:scale-95 cursor-default relative z-10"
                >
                  {/* Neon Glow on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none blur-3xl z-[-1]"
                    style={{ backgroundColor: skill.color }}
                  />
                  
                  {/* Icon Container with Animated Glow */}
                  <div 
                    className="text-5xl md:text-6xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 relative"
                    style={{ color: skill.color }}
                  >
                    <div className="relative z-20">
                      {skill.icon}
                    </div>
                    {/* Pulsing sub-glow */}
                    <div className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-60 transition-opacity z-10" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-black tracking-[0.1em] text-center text-gray-800 dark:text-gray-200 group-hover:text-primary-500 transition-colors uppercase leading-none">
                      {skill.name}
                    </span>
                    {/* Level bar glow */}
                    <div className="w-8 h-1 rounded-full bg-primary-500/20 group-hover:bg-primary-500 group-hover:w-14 transition-all duration-500 shadow-glow-sm" />
                  </div>

                  {/* Category Dot */}
                  {activeCategory === 'all' && (
                    <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-primary-500/30 group-hover:bg-primary-500 group-hover:scale-150 transition-all" />
                  )}
                </motion.div>
                
                {/* Exterior Shadow Glow */}
                <div 
                  className="absolute inset-2 opacity-0 group-hover:opacity-40 blur-xl rounded-full transition-opacity duration-500 -z-0"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;