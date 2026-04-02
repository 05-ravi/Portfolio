import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBookOpen, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

const educationData = [
  {
    institution: "Vidya Jyothi Institute of Technology",
    degree: "B.Tech – Artificial Intelligence",
    period: "2023 – Present",
    gpa: "9.25",
    status: "pursuing",
    icon: "🎓",
    color: "from-primary-400 to-primary-600",
    bgColor: "from-primary-500/10 to-primary-500/5",
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate",
    period: "2021 – 2023",
    gpa: "9.4",
    status: "completed",
    icon: "📚",
    color: "from-primary-400 to-primary-600",
    bgColor: "from-primary-500/10 to-primary-500/5",
  },
  {
    institution: "Ushodaya High School",
    degree: "SSC",
    period: "2020 – 2021",
    gpa: "10",
    status: "completed",
    icon: "🏫",
    color: "from-primary-400 to-primary-600",
    bgColor: "from-primary-500/10 to-primary-500/5",
  },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">
              <FiBookOpen className="mr-1" /> Education
            </span>
            <h2 className="heading-md mt-4 mb-4">
              Where I <span className="gradient-text">Studied</span>
            </h2>
            <p className="body-md max-w-3xl mx-auto">
              My academic journey has been a strong foundation for everything I build today. 
              Here's a quick look at the places that shaped my thinking.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-transparent" />

            {educationData.map((edu, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={edu.institution}
                  variants={itemVariants}
                  className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-xl shadow-lg`}>
                      {edu.icon}
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-12 flex-shrink-0 md:hidden" />

                  {/* Content Card */}
                  <div className={`flex-1 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass-effect rounded-2xl p-6 lg:p-8 card-hover group relative overflow-hidden">
                      {/* Top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${edu.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Status badge */}
                      {edu.status === 'pursuing' && (
                        <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          Currently Pursuing
                        </div>
                      )}

                      <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors duration-300">
                        {edu.institution}
                      </h3>
                      
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">
                        {edu.degree}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={14} />
                          {edu.period}
                        </span>
                      </div>

                      {/* GPA Badge */}
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${edu.bgColor} border border-gray-200/50 dark:border-white/[0.06]`}>
                          <FiAward className="text-primary-500" size={16} />
                          <span className="text-sm font-bold">
                            GPA: <span className="gradient-text">{edu.gpa}</span>
                          </span>
                          {edu.gpa === "10" && (
                            <span className="text-xs">✨</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for the other side (desktop) */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
