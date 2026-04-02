import React from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-r-full"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      <div 
        className="absolute right-0 top-0 w-2 h-2 bg-primary-500 rounded-full shadow-glow-sm -translate-y-[2px]"
        style={{ left: `calc(${scrollProgress}% - 4px)`, opacity: scrollProgress > 1 ? 1 : 0 }}
      />
    </div>
  );
};

export default ScrollProgress;
