import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

import SectionDivider from './components/SectionDivider';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      <ScrollProgress />
      
      {/* Global background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0a0a0f] dark:via-[#0f0f1a] dark:to-[#0a0a12] -z-20" />
      
      {/* Ambient gradient orbs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-primary-500/[0.03] dark:bg-primary-500/[0.04] rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/[0.02] dark:bg-purple-500/[0.03] rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-500/[0.01] dark:bg-primary-500/[0.02] rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-bg -z-10 pointer-events-none opacity-50 dark:opacity-100" />

      <Navbar />
      
      <main>
        <Hero />
        <SectionDivider variant="wave" />
        
        <About />
        <SectionDivider variant="slant" invert />
        
        <Skills />
        <SectionDivider variant="curve" />
        
        <Projects />
        <SectionDivider variant="wave" invert />
        
        <Education />
        <SectionDivider variant="slant" />
        
        <Certifications />
        <SectionDivider variant="curve" invert />
        
        <Contact />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;