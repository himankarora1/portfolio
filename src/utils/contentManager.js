// utils/contentManager.js - Complete Content Management System
export const contentData = {
  personal: {
    name: "Himank Arora",
    title: "Full Stack Developer & Creative Artist",
    shortTitle: "Developer & Artist",
    bio: "Transforming complex data into actionable insights and building innovative web solutions that drive business growth and exceptional user experiences.",
    location: "Boston, MA",
    email: "himankarora1000@gmail.com", // Tech portfolio email
    artistEmail: "himankaroraofficial@gmail.com", // Artist portfolio email
    phone: "+1 (617) 858-4450",
    avatar: "/images/avatar.jpg",
    resume: "/resume.pdf"
  },
  
  social: {
    github: "https://github.com/himankarora1",
    linkedin: "https://linkedin.com/in/himankarora",
    twitter: "https://twitter.com/himankarora",
    youtube_music: "https://youtube.com/@himankarora",
    youtube_gaming: "https://youtube.com/@himankaroragaming",
    instagram: "https://instagram.com/himankarora1",
    facebook: "https://facebook.com/himankaroraa",
    discord: "https://discord.gg/uUMAt6Vz63",
    x_twitter: "https://x.com/himankaroraa"
  },

  featured_projects: [
    {
      id: "matchride",
      title: "MatchRide",
      description: "Full-stack carpooling platform matching riders and drivers in real time. Uses PostGIS spatial queries for sub-second route matching, a fairness algorithm to prevent new-driver bias, and real-time chat plus WebRTC voice signaling.",
      tech: ["Next.js 14", "TypeScript", "PostgreSQL", "PostGIS", "Supabase", "Clerk", "Google Gemini AI", "WebRTC", "Tailwind CSS"],
      category: "Full Stack Development",
      featured: true,
      image: "/images/projects/matchride.jpg",
      github: "REPLACE_WITH_ACTUAL_GITHUB_URL",
      demo: "REPLACE_WITH_ACTUAL_DEMO_URL",
      status: "completed",
      year: "2025",
      highlights: [
        "Sub-second matching via PostGIS spatial indexing",
        "Fairness algorithm preventing new-driver bias",
        "Real-time chat and WebRTC voice signaling"
      ]
    },
    {
      id: "matchwise",
      title: "MatchWise",
      description: "AI-powered job matching platform using semantic analysis rather than keyword search to match resumes to job descriptions. Includes recruiter and job-seeker dashboards with role-based access, LLM-based candidate scoring, and a full CI/CD pipeline.",
      tech: ["Python", "FastAPI", "React", "MongoDB", "LLM APIs", "GitHub Actions"],
      category: "Full Stack Development",
      featured: true,
      image: "/images/projects/matchwise.jpg",
      github: "REPLACE_WITH_YOUR_OWN_COPY_GITHUB_URL",
      demo: "https://matchwise.vercel.app",
      status: "completed",
      year: "2025",
      highlights: [
        "45% higher resume-to-JD relevance vs. keyword search",
        "Role-based 3-tier architecture (React, FastAPI, MongoDB)",
        "CI/CD with 40+ automated tests on every push"
      ]
    },
    {
      id: "medulloblastoma-ml",
      title: "Medulloblastoma Classification Using Machine Learning",
      description: "Developed a predictive machine learning model achieving 93% accuracy in classifying medulloblastoma tumor subtypes using high-dimensional gene expression data. Compared multiple feature-selection strategies and models across dozens of configurations.",
      tech: ["Python", "Scikit-Learn", "Jupyter", "LASSO", "PCA", "Random Forest", "XGBoost"],
      category: "Machine Learning",
      featured: true,
      image: "/images/projects/medulloblastoma.jpg",
      github: "https://github.com/himankarora1/ML-Medulloblastoma-Subtype-Classification",
      demo: null,
      status: "completed",
      year: "2025",
      highlights: [
        "93% accuracy classifying 4 tumor subtypes",
        "Feature space reduced 99.7% (54,675 → 150 features)",
        "Benchmarked SVM, XGBoost, Random Forest, Logistic Regression"
      ]
    },
    {
      id: "mental-health-webapp",
      title: "Mental Health Wellness Website",
      description: "Full-stack mental health wellness platform managing therapy bookings and mental health resources, with role-based dashboards for patients, doctors, and admins.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT Authentication"],
      category: "Full Stack Development",
      featured: true,
      image: "/images/projects/mental-health.jpg",
      github: "https://github.com/himankarora1/mentalhealthwellnessplatform",
      demo: "https://mentalhealthwellnessplatform.vercel.app",
      status: "completed",
      year: "2024",
      highlights: [
        "Full-stack MERN application with 3 role-based dashboards",
        "JWT authentication and RBAC middleware",
        "Deployed on Vercel (frontend) and Render (backend)"
      ]
    },
    {
      id: "train-reservation-system",
      title: "Train Reservation System",
      description: "Train ticket booking and reservation system modeling real-world reservation logic: seat allocation, waitlist promotion, role-based access control, and booking business rules — implemented as a full Oracle PL/SQL schema, package layer, and test suite.",
      tech: ["SQL", "PL/SQL", "Oracle", "Database Design"],
      category: "Database Systems",
      featured: false,
      image: "/images/projects/train-reservation.jpg",
      github: "REPLACE_WITH_ACTUAL_GITHUB_URL",
      demo: null,
      status: "completed",
      year: "2025",
      highlights: [
        "3NF schema with 4 packages and role-based grants",
        "Automatic waitlist promotion on cancellation",
        "1,100+ line PL/SQL test suite"
      ]
    },
    {
      id: "fithub-ai",
      title: "FitHub AI",
      description: "AI health companion delivering personalized fitness and nutrition recommendations, built around structured prompt engineering (zero-shot, few-shot, chain-of-thought) and a LangGraph-based agentic workflow.",
      tech: ["Python", "OpenAI API", "LangChain", "LangGraph", "Streamlit"],
      category: "AI / Machine Learning",
      featured: true,
      image: "/images/projects/fithub-ai.jpg",
      github: "REPLACE_WITH_ACTUAL_GITHUB_URL",
      demo: "REPLACE_WITH_STREAMLIT_URL_ONCE_DEPLOYED",
      status: "completed",
      year: "2025",
      highlights: [
        "Multi-node LangGraph agentic workflow",
        "Structured JSON output for consistent rendering",
        "Custom evaluation pipeline for prompt variations"
      ]
    },
    {
      id: "inventory-management-invatron",
      title: "Invatron — Inventory Management System",
      description: "Desktop inventory and stock management system covering the full lifecycle of stock control: purchasing, selling, supplier/customer management, and reporting, with role-based dashboards.",
      tech: ["Java", "JavaFX", "MySQL", "JDBC"],
      category: "Desktop Application",
      featured: false,
      image: "/images/projects/invatron.jpg",
      github: "https://github.com/himankarora1/Invatron_Inventory_Management_System",
      demo: null,
      status: "completed",
      year: "2025",
      highlights: [
        "JDBC connection pooling with prepared statements",
        "Role-based access control across 4 dashboards",
        "Automated invoice generation with tax calculations"
      ]
    },
    {
      id: "disentangled-gans",
      title: "Disentangled Representation Learning (InfoGAN & CGN)",
      description: "Explored disentangled, controllable generative modeling: four InfoGAN variants (baseline, orthogonal regularization, contrastive regularization, combined) compared head-to-head, plus a Counterfactual Generative Network separating shape, foreground, and background as independent causal factors on Colored MNIST.",
      tech: ["Python", "PyTorch", "GANs", "TensorBoard", "Jupyter"],
      category: "Machine Learning",
      featured: false,
      image: "/images/projects/gans.jpg",
      github: "https://github.com/himankarora1/Disentangled-Generative-Networks",
      demo: null,
      status: "completed",
      year: "2025",
      highlights: [
        "4 InfoGAN variants benchmarked with custom disentanglement metrics",
        "CGN disentangling shape/texture as independent causal factors",
        "Custom metrics: mutual information, traversal linearity, factor independence"
      ]
    },
    {
      id: "health-management-system",
      title: "Health Management System",
      description: "Healthcare supply chain and resource distribution system built as a Java desktop application, modeling hospitals, blood banks, clinics, and suppliers with role-based access control.",
      tech: ["Java", "Swing", "MySQL"],
      category: "Desktop Application",
      featured: false,
      image: "/images/projects/health-management.jpg",
      github: "https://github.com/himankarora1/healthcaremanagementsystem",
      demo: null,
      status: "completed",
      year: "2025",
      highlights: [
        "Healthcare resource optimization across multiple org types",
        "Role-based access control",
        "Normalized MySQL schema across 8 tables"
      ]
    },
    {
      id: "ecommerce-data-analysis",
      title: "E-commerce Sales Data Analysis",
      description: "Cleaned and analyzed over 10,000 sales records, identifying top-grossing months and highest-demand cities through comprehensive trend analysis, with pricing elasticity insights for inventory strategy.",
      tech: ["Python", "Jupyter", "Pandas", "Matplotlib", "NumPy"],
      category: "Data Analysis",
      featured: false,
      image: "/images/projects/ecommerce-analysis.jpg",
      github: "REPLACE_WITH_ACTUAL_GITHUB_URL",
      demo: null,
      status: "completed",
      year: "2023",
      highlights: [
        "Processed 10,000+ records, resolved 480+ missing values",
        "Top 3 months drove 47% of sales; 5 cities drove 58%",
        "Pricing elasticity analysis informing markdown strategy"
      ]
    },
    {
      id: "portfolio-website",
      title: "Developer Portfolio Website",
      description: "This site — a dual-identity portfolio (tech + artist) built with React and Tailwind, featuring smooth animations, dark theme, and a working contact form backed by a serverless email function.",
      tech: ["React", "Tailwind CSS", "Vercel Serverless Functions"],
      category: "Web Development",
      featured: true,
      image: "/images/projects/portfolio.jpg",
      github: "https://github.com/himankarora1/portfolio",
      demo: "https://himankarora.com",
      status: "completed",
      year: "2025",
      highlights: [
        "Dual-identity design (tech + artist personas)",
        "Serverless contact form via Vercel functions",
        "Responsive across all devices"
      ]
    },
    {
      id: "do-all-app",
      title: "Do All — Multi-Utility Web Application",
      description: "A multi-page productivity web app combining a to-do list, sticky notes, and reminders/calendar tools, built with vanilla JavaScript alongside AngularJS and Vue for different pages.",
      tech: ["HTML", "CSS", "JavaScript", "jQuery", "AngularJS", "Vue.js"],
      category: "Web Development",
      featured: false,
      image: "/images/projects/do-all.jpg",
      github: "https://github.com/himankarora1/doall",
      demo: "REPLACE_WITH_NETLIFY_URL",
      status: "completed",
      year: "2023",
      highlights: [
        "Multi-utility task management across 4 tools",
        "Vanilla JS, AngularJS, and Vue used across different pages",
        "Deployed on Netlify"
      ]
    },
    {
      id: "stopwatch-app",
      title: "Stopwatch App",
      description: "A precision browser-based stopwatch with start, stop, resume, lap, and reset functionality.",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
      category: "Web Development",
      featured: false,
      image: "/images/projects/stopwatch.jpg",
      github: "https://github.com/himankarora1/Stopwatch-App",
      demo: "REPLACE_WITH_NETLIFY_URL",
      status: "completed",
      year: "2023",
      highlights: [
        "Precision timing using JavaScript timing APIs",
        "Start/stop/lap/reset functionality",
        "Deployed on Netlify"
      ]
    }
  ],

  skills: {
    "Programming Languages": {
      items: ["Python", "Java", "R", "SQL", "C/C++", "C#", "JavaScript", "HTML/CSS"],
      proficiency: 85,
      category: "technical"
    },
    "Web Development": {
      items: ["React", "Redux", "Node.js", "Express", "Flask", "Spring", "Bootstrap", "Material-UI"],
      proficiency: 90,
      category: "technical"
    },
    "Data Analysis": {
      items: ["Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "Jupyter", "Tableau", "Power BI"],
      proficiency: 88,
      category: "technical"
    },
    "Databases": {
      items: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Oracle", "Redis"],
      proficiency: 82,
      category: "technical"
    },
    "Cloud & DevOps": {
      items: ["AWS", "Docker", "Kubernetes", "Jenkins", "Git/GitHub", "CI/CD Pipelines"],
      proficiency: 75,
      category: "technical"
    },
    "Tools & Platforms": {
      items: ["VS Code", "Postman", "Jira", "Figma", "WordPress", "ERP Systems"],
      proficiency: 80,
      category: "technical"
    }
  },

  experience: [
    {
      id: "northeastern-university",
      title: "Graduate Student",
      company: "Northeastern University",
      duration: "September 2024 - Present",
      location: "Boston, MA",
      type: "education",
      description: "Pursuing Master of Science in Information Systems with focus on Application Engineering, Web Design & UX, Data Science, and Program Structures & Algorithms.",
      achievements: [
        "Developing expertise in full-stack application development",
        "Learning advanced data science and machine learning techniques",
        "Building proficiency in modern web technologies and frameworks",
        "Gaining hands-on experience with cloud platforms and DevOps practices"
      ],
      logo: "/images/companies/northeastern.png",
      website: "https://northeastern.edu"
    },
    {
      id: "ferro-star",
      title: "Technical Analyst",
      company: "Ferro Star",
      duration: "April 2022 - April 2024",
      location: "New Delhi, India",
      type: "work",
      description: "Worked between business and technology, engineering backend systems and automations to support inventory management, pricing, and procurement operations.",
      achievements: [
        "Engineered FastAPI backend for inventory management, processing 1,000+ monthly transactions with audit logging",
        "Redesigned MySQL schema to 3NF with B-tree indexes and connection pooling, cutting query response time by 60%",
        "Constructed Python/Pandas ETL pipeline normalizing supplier catalogs, eliminating 12+ hours of weekly data entry",
        "Implemented JWT auth and RBAC across 3 departments, securing inventory and pricing data with stateless API design",
        "Delivered React dashboard adopted by 4 departments and leadership for pricing and procurement decisions"
      ],
      logo: "/images/companies/ferro-star.png",
      website: "https://ferrostar.com"
    },
    {
      id: "super-enterprises",
      title: "Technical Analyst",
      company: "Super Enterprises",
      duration: "April 2021 - March 2022",
      location: "New Delhi, India",
      type: "work",
      description: "Combined business analysis with hands-on development, building and maintaining the company's web presence and internal tooling.",
      achievements: [
        "Launched React/Node.js website reaching 8,000+ monthly sessions (Google Analytics), improving engagement by 35%",
        "Designed RESTful API with MySQL backend for product catalog and pricing, cutting latency by 50% across 300+ SKUs",
        "Automated pricing and inventory sync via Python scripts, cutting update time from 90 to under 10 minutes",
        "Integrated third-party email notification APIs, reducing customer response time from 24 hours to under 2",
        "Developed React components with dynamic filtering and validation, reducing incomplete submissions by 28%"
      ],
      logo: "/images/companies/super-enterprises.png",
      website: "#"
    }
  ],

  certifications: [
    {
      id: "cs50-harvard",
      title: "CS50: Introduction to Computer Science",
      issuer: "Harvard University",
      date: "2023",
      credentialId: "a6539e41-9d00-47ff-ad0c-f30534df876e",
      verifyUrl: "https://cs50.harvard.edu/certificates/a6539e41-9d00-47ff-ad0c-f30534df876e",
      skills: ["Computer Science", "Programming", "Algorithms", "Data Structures"],
      featured: true,
      image: "/images/certifications/cs50.png"
    },
    {
      id: "google-data-analysis-r",
      title: "Data Analysis with R Programming",
      issuer: "Google Career Certificates",
      date: "Dec 2023",
      credentialId: "CSR3DPVEMZ67",
      verifyUrl: "https://coursera.org/verify/CSR3DPVEMZ67",
      skills: ["R Programming", "Data Analysis", "Statistics"],
      featured: true,
      image: "/images/certifications/google-r.png"
    },
    {
      id: "python-data-structures",
      title: "Python Data Structures",
      issuer: "University of Michigan",
      date: "Sep 2023",
      credentialId: "9BZ4WD6GPE2Y",
      verifyUrl: "https://coursera.org/verify/9BZ4WD6GPE2Y",
      skills: ["Python", "Data Structures", "Programming"],
      featured: true,
      image: "/images/certifications/umich-python.png"
    },
    {
      id: "python-programming-everybody",
      title: "Programming for Everybody (Getting Started with Python)",
      issuer: "University of Michigan",
      date: "Sep 2023",
      credentialId: "DPJKTLNH6D7N",
      verifyUrl: "https://coursera.org/verify/DPJKTLNH6D7N",
      skills: ["Python", "Programming Fundamentals", "Problem Solving"],
      featured: true,
      image: "/images/certifications/umich-python-basics.png"
    },
    {
      id: "git-github-google",
      title: "Introduction to Git and GitHub",
      issuer: "Google (Coursera)",
      date: "Oct 2023",
      credentialId: "DZJPJGVR9FPN",
      verifyUrl: "https://coursera.org/verify/DZJPJGVR9FPN",
      skills: ["Git", "GitHub", "Version Control"],
      featured: false,
      image: "/images/certifications/google-git.png"
    },
    {
      id: "aws-intro",
      title: "Introduction to Information Technology and AWS Cloud",
      issuer: "Amazon Web Services",
      date: "Dec 2023",
      credentialId: "YRW9LDDDBLEQ",
      verifyUrl: "https://coursera.org/verify/YRW9LDDDBLEQ",
      skills: ["AWS", "Cloud Computing", "Information Technology"],
      featured: true,
      image: "/images/certifications/aws-intro.png"
    },
    {
      id: "microsoft-os-security",
      title: "Introduction to Computers and Operating Systems and Security",
      issuer: "Microsoft",
      date: "Dec 2023",
      credentialId: "WBQ9853FKEFQ",
      verifyUrl: "https://coursera.org/verify/WBQ9853FKEFQ",
      skills: ["Operating Systems", "Computer Security", "Microsoft Technologies"],
      featured: false,
      image: "/images/certifications/microsoft-os.png"
    },
    {
      id: "java-intro",
      title: "Introduction to Java",
      issuer: "LearnQuest (Coursera)",
      date: "Apr 2025",
      credentialId: "5M3T6OBOVRH2",
      verifyUrl: "https://coursera.org/verify/5M3T6OBOVRH2",
      skills: ["Java", "Object-Oriented Programming", "Software Development"],
      featured: true,
      image: "/images/certifications/java-intro.png"
    },
    {
      id: "data-science-what-is",
      title: "What is Data Science?",
      issuer: "IBM (Coursera)",
      date: "Feb 2025",
      credentialId: "HA5R1D4F1BFC",
      verifyUrl: "https://coursera.org/verify/HA5R1D4F1BFC",
      skills: ["Data Science", "Analytics", "Machine Learning Fundamentals"],
      featured: false,
      image: "/images/certifications/ibm-data-science.png"
    }
  ],

  // Artist content
  artist: {
    bio: "Welcome to my creative universe! I'm a passionate content creator who blends music, gaming, and digital storytelling to create engaging experiences that resonate with communities worldwide.",
    tagline: "Creating authentic content through music, gaming, and digital storytelling",
    creative_stats: [
      { label: "Original Tracks", value: "25+", icon: "Music", color: "from-pink-500 to-rose-500" },
      { label: "Video Content", value: "100+", icon: "Camera", color: "from-purple-500 to-indigo-500" },
      { label: "Gaming Hours", value: "500+", icon: "Gamepad2", color: "from-blue-500 to-cyan-500" },
      { label: "Community", value: "1K+", icon: "Heart", color: "from-orange-500 to-red-500" }
    ],
    platforms: [
      {
        name: "YouTube (Music)",
        handle: "@himankarora",
        followers: "1.2K",
        url: "https://youtube.com/@himankarora",
        color: "bg-red-500",
        description: "Original music compositions and covers"
      },
      {
        name: "YouTube (Gaming)",
        handle: "@himankaroragaming",
        followers: "850",
        url: "https://youtube.com/@himankaroragaming",
        color: "bg-red-600",
        description: "Gaming content and live streams"
      },
      {
        name: "Instagram",
        handle: "@himankarora1",
        followers: "2.1K",
        url: "https://instagram.com/himankarora1",
        color: "bg-gradient-to-r from-pink-500 to-orange-500",
        description: "Behind the scenes and creative process"
      },
      {
        name: "X (Twitter)",
        handle: "@himankaroraa",
        followers: "1.5K",
        url: "https://x.com/himankaroraa",
        color: "bg-black",
        description: "Thoughts and quick updates"
      },
      {
        name: "Facebook",
        handle: "himankaroraa",
        followers: "980",
        url: "https://facebook.com/himankaroraa",
        color: "bg-blue-600",
        description: "Community updates and events"
      },
      {
        name: "Discord",
        handle: "Join Server",
        followers: "250+",
        url: "https://discord.gg/uUMAt6Vz63",
        color: "bg-indigo-600",
        description: "Live community and chat"
      }
    ],
    journey: [
      {
        year: "2019",
        title: "Musical Beginnings",
        description: "Started creating original music compositions and learning various instruments",
        icon: "Music",
        color: "from-pink-500 to-rose-500"
      },
      {
        year: "2020",
        title: "Gaming Content",
        description: "Began streaming gaming sessions and building an online gaming community",
        icon: "Gamepad2",
        color: "from-blue-500 to-cyan-500"
      },
      {
        year: "2021",
        title: "Content Creation",
        description: "Expanded into video content creation and digital storytelling",
        icon: "Camera",
        color: "from-purple-500 to-indigo-500"
      },
      {
        year: "2022",
        title: "Community Building",
        description: "Focused on building authentic connections with audiences across platforms",
        icon: "Heart",
        color: "from-orange-500 to-red-500"
      }
    ],
    creative_skills: [
      { name: "Music Production", level: 90, icon: "Music", category: "audio" },
      { name: "Video Editing", level: 85, icon: "Camera", category: "video" },
      { name: "Live Streaming", level: 95, icon: "Mic", category: "streaming" },
      { name: "Community Management", level: 88, icon: "Heart", category: "social" },
      { name: "Gaming", level: 92, icon: "Gamepad2", category: "gaming" },
      { name: "Audio Engineering", level: 87, icon: "Headphones", category: "audio" }
    ]
  },

  // Meta information for SEO and site management
  meta: {
    site_url: "https://himankarora.dev",
    site_name: "Himank Arora Portfolio",
    og_image: "/images/og-image.jpg",
    twitter_image: "/images/twitter-image.jpg",
    favicon: "/favicon.ico",
    last_updated: new Date().toISOString(),
    version: "2.0.0",
    keywords: [
      "Himank Arora",
      "Full Stack Developer",
      "Content Creator",
      "React Developer",
      "Python Developer",
      "Machine Learning",
      "Data Analysis",
      "YouTube Creator",
      "Music Producer",
      "Boston Developer",
      "Northeastern University"
    ]
  }
};

// Helper function to get the appropriate email based on context
export const getEmailForContext = (context = 'tech') => {
  if (context === 'artist') {
    return contentData.personal.artistEmail;
  }
  return contentData.personal.email;
};

// Helper functions for content management
export const getProjectsByCategory = (category) => {
  return contentData.featured_projects.filter(project => 
    project.category === category
  );
};

export const getFeaturedProjects = () => {
  return contentData.featured_projects.filter(project => project.featured);
};

export const getProjectById = (id) => {
  return contentData.featured_projects.find(project => project.id === id);
};

export const getSkillsByCategory = (category) => {
  return Object.entries(contentData.skills).filter(([_, skill]) => 
    skill.category === category
  );
};

export const getSkillsByProficiency = (minProficiency = 0) => {
  return Object.entries(contentData.skills).filter(([_, skill]) => 
    skill.proficiency >= minProficiency
  );
};

export const getWorkExperience = () => {
  return contentData.experience.filter(exp => exp.type === 'work');
};

export const getEducation = () => {
  return contentData.experience.filter(exp => exp.type === 'education');
};

export const getFeaturedCertifications = () => {
  return contentData.certifications.filter(cert => cert.featured);
};

export const getCertificationById = (id) => {
  return contentData.certifications.find(cert => cert.id === id);
};

// SEO helpers
export const generateSEOData = (page) => {
  const baseData = {
    title: `${contentData.personal.name} - ${contentData.personal.title}`,
    description: contentData.personal.bio,
    url: contentData.meta.site_url,
    image: contentData.meta.og_image,
    keywords: contentData.meta.keywords.join(', ')
  };

  switch (page) {
    case 'tech':
      return {
        ...baseData,
        title: `${contentData.personal.name} - Full Stack Developer Portfolio`,
        description: "Experienced full stack developer specializing in React, Python, and machine learning. View my professional portfolio, projects, and technical expertise.",
        keywords: [
          ...contentData.meta.keywords,
          "portfolio",
          "projects",
          "web development",
          "software engineer",
          "Boston tech"
        ].join(', ')
      };
    case 'artist':
      return {
        ...baseData,
        title: `${contentData.personal.name} - Content Creator & Musician`,
        description: contentData.artist.bio,
        keywords: [
          ...contentData.meta.keywords,
          "musician",
          "gamer",
          "content creator",
          "YouTube",
          "streaming",
          "music production"
        ].join(', ')
      };
    case 'home':
    default:
      return baseData;
  }
};

// Social media helpers
export const getSocialPlatform = (platform) => {
  return contentData.social[platform];
};

export const getAllSocialLinks = () => {
  return Object.entries(contentData.social).map(([platform, url]) => ({
    platform: platform.replace('_', ' ').toUpperCase(),
    url,
    name: platform
  }));
};

// Artist helpers
export const getArtistStats = () => {
  return contentData.artist.creative_stats;
};

export const getArtistPlatforms = () => {
  return contentData.artist.platforms;
};

export const getCreativeJourney = () => {
  return contentData.artist.journey;
};

export const getCreativeSkills = () => {
  return contentData.artist.creative_skills;
};

// Content validation
export const validateContent = () => {
  const issues = [];
  
  // Check required fields
  if (!contentData.personal.name) issues.push("Missing personal name");
  if (!contentData.personal.email) issues.push("Missing contact email");
  if (contentData.featured_projects.length === 0) issues.push("No featured projects");
  
  // Check social links
  Object.entries(contentData.social).forEach(([platform, url]) => {
    if (!url || !url.startsWith('http')) {
      issues.push(`Invalid ${platform} URL`);
    }
  });
  
  // Check project data integrity
  contentData.featured_projects.forEach(project => {
    if (!project.title) issues.push(`Project ${project.id} missing title`);
    if (!project.description) issues.push(`Project ${project.id} missing description`);
    if (!project.tech || project.tech.length === 0) issues.push(`Project ${project.id} missing technologies`);
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    summary: `${issues.length} issues found`,
    timestamp: new Date().toISOString()
  };
};

// Search functionality
export const searchContent = (query) => {
  const lowercaseQuery = query.toLowerCase();
  const results = {
    projects: [],
    skills: [],
    experience: [],
    certifications: []
  };
  
  // Search projects
  results.projects = contentData.featured_projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tech.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
  
  // Search skills
  Object.entries(contentData.skills).forEach(([category, skill]) => {
    if (category.toLowerCase().includes(lowercaseQuery) ||
        skill.items.some(item => item.toLowerCase().includes(lowercaseQuery))) {
      results.skills.push({ category, ...skill });
    }
  });
  
  // Search experience
  results.experience = contentData.experience.filter(exp =>
    exp.title.toLowerCase().includes(lowercaseQuery) ||
    exp.company.toLowerCase().includes(lowercaseQuery) ||
    exp.description.toLowerCase().includes(lowercaseQuery)
  );
  
  // Search certifications
  results.certifications = contentData.certifications.filter(cert =>
    cert.title.toLowerCase().includes(lowercaseQuery) ||
    cert.issuer.toLowerCase().includes(lowercaseQuery) ||
    cert.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
  );
  
  return results;
};

// Export default for easy importing
export default contentData;