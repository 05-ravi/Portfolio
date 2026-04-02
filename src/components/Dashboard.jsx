import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { FiActivity, FiBarChart2, FiTrendingUp, FiAward, FiGitCommit, FiBox } from 'react-icons/fi';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
);

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const increment = num / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Dashboard = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

  const stats = [
    { icon: <FiBox />, value: "5", suffix: "+", label: "Projects Built" },
    { icon: <FiGitCommit />, value: "50", suffix: "+", label: "GitHub Commits" },
    { icon: <FiTrendingUp />, value: "15", suffix: "+", label: "Technologies" },
    { icon: <FiAward />, value: "100", suffix: "+", label: "Problems Solved" },
  ];

  const barData = {
    labels: ['LearnDesk', 'FacePay', 'Lost & Found', 'Ride App'],
    datasets: [{
      label: 'Completion %',
      data: [100, 100, 65, 45],
      backgroundColor: 'rgba(30, 144, 255, 0.5)',
      borderColor: 'rgba(30, 144, 255, 0.7)',
      borderWidth: 1,
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Python',
        data: [65, 70, 75, 82, 85, 88, 90, 92],
        borderColor: 'rgb(30, 144, 255)',
        backgroundColor: 'rgba(30, 144, 255, 0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(30, 144, 255)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'React',
        data: [50, 58, 66, 74, 80, 84, 87, 90],
        borderColor: 'rgba(30, 144, 255, 0.6)',
        backgroundColor: 'rgba(30, 144, 255, 0.04)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(30, 144, 255, 0.6)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'TensorFlow',
        data: [40, 48, 58, 65, 72, 78, 83, 87],
        borderColor: 'rgba(30, 144, 255, 0.35)',
        backgroundColor: 'rgba(30, 144, 255, 0.02)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(30, 144, 255, 0.35)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
          font: { family: 'Inter', size: 11, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 15, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#fff' : '#111',
        bodyColor: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
        beginAtZero: true,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="dashboard" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/[0.01] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">
              <FiActivity className="mr-1" /> Live Analytics
            </span>
            <h2 className="heading-md mt-4 mb-4">
              My Coding <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="body-md max-w-3xl mx-auto">
              A quick snapshot of where I stand — from project milestones to skill growth over time. 
              Numbers don't tell the whole story, but they're fun to track.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="dashboard-card text-center group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-3 text-primary-500 text-lg group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div variants={itemVariants} className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Project Progress</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">How far along each project is</p>
                </div>
                <div className="p-2 rounded-lg bg-primary-500/10 text-primary-500">
                  <FiBarChart2 size={18} />
                </div>
              </div>
              <div className="h-72">
                <Bar data={barData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Skill Growth</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">How my skills have evolved over 2024</p>
                </div>
                <div className="p-2 rounded-lg bg-primary-500/10 text-primary-500">
                  <FiTrendingUp size={18} />
                </div>
              </div>
              <div className="h-72">
                <Line data={lineData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;