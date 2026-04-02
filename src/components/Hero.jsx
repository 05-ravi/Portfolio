import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const TypewriterText = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentFullText.slice(0, prev.length + 1)
        );
      }, isDeleting ? 30 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-primary-500">|</span>
    </span>
  );
};

const Hero = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };

    const init = () => {
      particles = [];
      const count = Math.min(50, Math.floor(canvas.width / 25));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.35 + 0.08,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 144, 255, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(30, 144, 255, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); });
    return () => { cancelAnimationFrame(animId); };
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/05-ravi", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/in/pennepalli-ravidevraj-416119288", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:pennepalliravidevraj2005@gmail.com", label: "Email" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="absolute top-10 right-10 w-80 h-80 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="section-label">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="heading-xl mb-4">
              Hi, I'm{' '}
              <span className="gradient-text">Ravidevraj</span>{' '}
              <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                <TypewriterText
                  texts={["Full Stack + AI Engineer", "Problem Solver", "Open Source Enthusiast", "AI/ML Developer"]}
                  className=""
                />
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="body-lg mb-10 max-w-xl mx-auto lg:mx-0">
              I love building things that live on the internet — whether it's an AI that recognizes faces 
              or a platform that helps students share notes. Always learning, always shipping.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2 group"
              >
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/certifications/resume.docx" download className="btn-outline flex items-center gap-2">
                <FiDownload size={18} />
                Download Resume
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 justify-center lg:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative flex justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-primary-500/20 animate-spin-slow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[460px] h-[460px] sm:w-[520px] sm:h-[520px] rounded-full border border-dashed border-primary-500/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            </div>

            <div className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/20 to-primary-700/10 rounded-full blur-[80px] animate-pulse-glow pointer-events-none" />

            <div className="relative w-80 h-80 sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] animate-float">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full p-[3px] animate-gradient bg-[length:200%_200%]">
                <div className="w-full h-full rounded-full bg-gray-50 dark:bg-[#0a0a0f]" />
              </div>
              {/* Light mode image */}
              <img
                src="/profile.jpeg"
                alt="Ravidevraj - Full Stack + AI Engineer"
                className="absolute inset-[3px] rounded-full object-cover shadow-2xl dark:hidden"
                onError={(e) => { e.target.src = '/profile.png'; }}
              />
              {/* Dark mode image */}
              <img
                src="/profile-dark.png"
                alt="Ravidevraj - Full Stack + AI Engineer"
                className="absolute inset-[3px] rounded-full object-cover shadow-2xl hidden dark:block"
                onError={(e) => { e.target.src = '/profile.png'; }}
              />
            </div>

            {/* Floating stat cards */}
            {[
              { value: "5+", label: "Projects", pos: "-top-4 -left-4 sm:-left-12" },
              { value: "50+", label: "Commits", pos: "top-1/2 -right-4 sm:-right-12" },
              { value: "15+", label: "Technologies", pos: "-bottom-4 left-4 sm:-left-4" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 200 }}
                className={`absolute ${stat.pos} glass-effect-light rounded-xl px-4 py-3 text-center min-w-[90px] shadow-lg`}
              >
                <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 dark:text-gray-500 font-medium tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FiChevronDown className="text-primary-500" size={20} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;