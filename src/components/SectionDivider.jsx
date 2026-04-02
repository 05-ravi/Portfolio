import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = ({ variant = 'wave', color = 'bg-gray-50 dark:bg-[#0a0a0f]', invert = false }) => {
  const variants = {
    wave: (
      <svg
        className={`w-full h-12 lg:h-24 ${invert ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 80C960 70 1056 50 1152 45C1248 40 1344 50 1392 55L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z"
          className="fill-current text-white/5 dark:text-white/[0.02]"
        />
        <path
          d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
          className="fill-current text-primary-500/10 dark:text-primary-500/5"
        />
      </svg>
    ),
    slant: (
      <svg
        className={`w-full h-8 lg:h-16 ${invert ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0L1440 100V0H0Z" className="fill-current text-white/5 dark:text-white/[0.02]" />
      </svg>
    ),
    curve: (
      <svg
        className={`w-full h-12 lg:h-24 ${invert ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C480 120 960 120 1440 0V0H0Z"
          className="fill-current text-white/5 dark:text-white/[0.02]"
        />
      </svg>
    ),
  };

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none z-0 ${invert ? '-mt-px' : '-mb-px'}`}>
      {variants[variant]}
    </div>
  );
};

export default SectionDivider;
