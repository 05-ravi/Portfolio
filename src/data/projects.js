export const projects = [
  {
    id: 1,
    title: "LearnDesk",
    description:
      "A comprehensive note-sharing platform for university students with real-time collaboration features, document management, and peer-to-peer sharing system.",
    longDescription:
      "Built a full-stack application allowing students to share, collaborate, and access study materials. Features include real-time updates, file versioning, search functionality, and user authentication.",
    image: "/projects/campusnotes.jpg",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "TailwindCSS"],
    github: "https://github.com/05-ravi/campusnotes",
    live: "https://campusnotes-demo.vercel.app",
    featured: true,
    category: "fullstack",
  },
  {
    id: 2,
    title: "FacePay",
    description:
      "Facial recognition-based payment system using deep learning for secure and contactless transactions.",
    longDescription:
      "Implemented a secure payment system using facial recognition technology. Uses deep learning models for face detection and verification, ensuring high accuracy and security for transactions.",
    image: "/projects/facepay.jpg",
    tech: ["Python", "TensorFlow", "OpenCV", "React", "FastAPI"],
    github: "https://github.com/05-ravi/facepay",
    live: "https://facepay-demo.vercel.app",
    featured: true,
    category: "ai",
  },
  {
    id: 3,
    title: "Lost and Found Portal",
    description:
      "A centralized platform for reporting and recovering lost items on campus with AI-powered image matching.",
    longDescription:
      "Developing a comprehensive portal for lost and found items with features like image upload, AI-based item matching, notifications, and claim verification system.",
    image: "/projects/lostfound.jpg",
    tech: ["React", "Node.js", "PostgreSQL", "OpenCV", "TensorFlow"],
    github: "https://github.com/05-ravi/lost-found-portal",
    live: null,
    featured: true,
    category: "fullstack",
    inProgress: true,
  },
  {
    id: 4,
    title: "IPL Analytics Dashboard",
    description:
      "An interactive sports analytics platform visualizing 17 seasons of IPL data (2008–2024) with dynamic filters, player career tracking, and venue insights.",
    longDescription:
      "A comprehensive Data Analytics platform built with React and Recharts to visualize large datasets from 17 seasons of the Indian Premier League. Features include player performance trajectory, team rivalry analysis, and venue-based statistics with interactive visualizations.",
    image: "/projects/ipl_analytics.png",
    tech: ["React", "Recharts", "Node.js", "D3.js", "TailwindCSS"],
    github: "https://github.com/05-ravi/ipl-analytics",
    live: null,
    featured: true,
    category: "fullstack",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
