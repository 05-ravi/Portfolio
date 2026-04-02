import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiSend, FiCheckCircle, FiGithub, FiLinkedin, FiMessageCircle, FiArrowUpRight, FiLoader } from 'react-icons/fi';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      
      // Web3Forms Integration: 
      // 1. Get your free access key from https://web3forms.com/ using your email
      // 2. Replace "YOUR_ACCESS_KEY_HERE" below with your actual key
      const submitData = {
        ...formData,
        access_key: "2484557a-a0aa-48d0-a0af-4b510f8c1415", 
        subject: `New Contact Message from ${formData.name}`,
        from_name: formData.name
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const contactLinks = [
    {
      icon: <FiMail className="text-xl" />,
      label: "Email",
      value: "pennepalliravidevraj2005@gmail.com",
      href: "mailto:pennepalliravidevraj2005@gmail.com",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <FiGithub className="text-xl" />,
      label: "GitHub",
      value: "github.com/05-ravi",
      href: "https://github.com/05-ravi",
      color: "bg-gray-500/10 text-gray-500",
    },
    {
      icon: <FiLinkedin className="text-xl" />,
      label: "LinkedIn",
      value: "Ravidevraj Pennepalli",
      href: "https://linkedin.com/in/pennepalli-ravidevraj-416119288",
      color: "bg-blue-600/10 text-blue-600",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const inputClasses = (field) => `
    w-full px-4 py-3.5 rounded-xl text-sm font-medium
    bg-gray-50 dark:bg-white/[0.03]
    border ${focused === field ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-glow-sm' : 'border-gray-200 dark:border-white/[0.06]'}
    focus:outline-none
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-600
    transition-all duration-300
  `;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

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
              <FiMessageCircle className="mr-1" /> Contact
            </span>
            <h2 className="heading-md mt-4 mb-4">
              Let's Build Something <span className="gradient-text">Impactful</span> Together
            </h2>
            <p className="body-md max-w-2xl mx-auto">
              Have a project in mind, a collaboration idea, or just want to say hi? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left - Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="glass-effect rounded-2xl p-6 lg:p-8 card-hover">
                <h3 className="text-lg font-bold mb-6">Get in Touch</h3>
                <div className="space-y-3">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-primary-500/[0.04] transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 dark:text-gray-500 font-medium">{link.label}</div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors truncate">
                          {link.value}
                        </div>
                      </div>
                      <FiArrowUpRight className="ml-auto text-gray-400 group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" size={14} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6 lg:p-8 card-hover">
                <h3 className="text-lg font-bold mb-4">Available For</h3>
                <div className="flex flex-wrap gap-2">
                  {['Full Stack Dev', 'AI/ML Projects', 'Freelancing', 'Internships', 'Open Source'].map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 bg-primary-500/[0.06] dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-bold border border-primary-500/10 hover:bg-primary-500/[0.12] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="glass-effect rounded-2xl p-6 lg:p-8 card-hover relative overflow-hidden">
                <h3 className="text-lg font-bold mb-6">Send a Message</h3>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 shadow-glow-sm"
                      >
                        <FiCheckCircle className="text-green-500" size={40} />
                      </motion.div>
                      <h4 className="text-2xl font-bold mb-3">Message Sent!</h4>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Thanks for reaching out! I've received your message and will get back to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-8 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            required
                            className={inputClasses('name')}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            required
                            className={inputClasses('email')}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          required
                          rows="5"
                          className={`${inputClasses('message')} resize-none`}
                          placeholder="Tell me about your project or idea..."
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                          Oops! Something went wrong. Please try again later or email me directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-sm font-bold shadow-glow-md disabled:opacity-70 disabled:cursor-not-allowed group transition-all duration-300"
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                              <FiLoader size={20} />
                            </motion.div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
