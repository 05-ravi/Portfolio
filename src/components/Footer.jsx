import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub size={18} />, href: "https://github.com/05-ravi", label: "GitHub" },
    { icon: <FiLinkedin size={18} />, href: "https://linkedin.com/in/pennepalli-ravidevraj-416119288", label: "LinkedIn" },
    { icon: <FiMail size={18} />, href: "mailto:pennepalliravidevraj2005@gmail.com", label: "Email" },
  ];

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <footer className="relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent" />

      <div className="bg-gray-50/50 dark:bg-[#080810]/50 pt-16 pb-8">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Ravi</span>
                <span className="gradient-text">devraj</span>
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-gray-500 dark:text-gray-500 hover:text-primary-500 transition-colors duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-3 mb-10">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-500 hover:text-primary-500 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent mb-8" />

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
              <p className="flex items-center gap-1.5">
                Designed & Built with
                <FiHeart className="text-red-500 animate-pulse" size={12} />
                by <span className="font-semibold text-gray-500 dark:text-gray-500">Ravidevraj Pennepalli</span>
              </p>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-700">•</span>
              <p>© {currentYear} All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;