// utils/contentManager.js - Complete Content Management System
export const contentData = {
  personal: {
    name: "Himank Arora",
    title: "Full Stack Developer & Creative Artist",
    shortTitle: "Developer & Artist",
    bio: "Transforming complex data into actionable insights and building innovative web solutions that drive business growth and exceptional user experiences.",
    location: "Boston, MA",
    email: "himankarora1000@gmail.com",
    phone: "+1 (XXX) XXX-XXXX", // Add your phone if needed
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
      id: "medulloblastoma-ml",
      title: "Medulloblastoma Classification Using Machine Learning",
      description: "Developed a predictive machine learning model achieving 93% accuracy in classifying medulloblastoma tumor subtypes using gene expression data. Utilized advanced feature-selection methods and trained multiple algorithms across 22 distinct configurations.",
      tech: ["Python", "Scikit-Learn", "Jupyter", "LASSO", "PCA", "Random Forest", "XGBoost"],
      category: "Machine Learning",
      featured: true,
      image: "/images/projects/medulloblastoma.jpg",
      github: "https://github.com/himankarora/medulloblastoma-classification",
      demo: "#",
      status: "completed",
      year: "2024",
      highlights: [
        "93% accuracy in tumor classification",
        "22 distinct algorithm configurations tested",
        "Advanced feature selection with LASSO and PCA"
      ]
    },
    {
      id: "mental-health-webapp",
      title: "Mental Health Wellness Website",
      description: "Developed a full-stack mental health wellness platform to manage therapy bookings and mental health resources. Created a Patient Dashboard with secure role-based authentication and integrated chatbot feature for enhanced user experience.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Authentication", "Chatbot"],
      category: "Full Stack Development",
      featured: true,
      image: "/images/projects/mental-health.jpg",
      github: "https://github.com/himankarora/mental-health-wellness",
      demo: "https://mental-health-wellness.himankarora.dev",
      status: "completed",
      year: "2024",
      highlights: [
        "Full-stack MERN application",
        "Secure role-based authentication",
        "Integrated AI chatbot for support"
      ]
    },
    {
      id: "health-management-system",
      title: "Health Management System",
      description: "Developed a Healthcare Management System to streamline healthcare resource distribution and supply chain. Implemented role-based access control and built an interactive UI with real-time validation for secure data entry.",
      tech: ["Java", "Swing", "MySQL", "Authentication", "Real-time Validation"],
      category: "Desktop Application",
      featured: true,
      image: "/images/projects/health-management.jpg",
      github: "https://github.com/himankarora/health-management-system",
      demo: "#",
      status: "completed",
      year: "2024",
      highlights: [
        "Healthcare resource optimization",
        "Role-based access control",
        "Real-time data validation"
      ]
    },
    {
      id: "ecommerce-data-analysis",
      title: "E-commerce Sales Data Analysis",
      description: "Cleaned and preprocessed over 10,000 data entries, identified top-grossing months and highest-demand cities through comprehensive sales trend analysis. Analyzed product performance and provided recommendations for inventory optimization.",
      tech: ["Python", "Jupyter", "Pandas", "Matplotlib", "NumPy", "Data Visualization"],
      category: "Data Analysis",
      featured: false,
      image: "/images/projects/ecommerce-analysis.jpg",
      github: "https://github.com/himankarora/ecommerce-data-analysis",
      demo: "#",
      status: "completed",
      year: "2023",
      highlights: [
        "Processed 10,000+ data entries",
        "Comprehensive sales trend analysis",
        "Inventory optimization recommendations"
      ]
    },
    {
      id: "portfolio-website",
      title: "Developer Portfolio Website",
      description: "Built a modern, responsive portfolio website showcasing professional experience, projects, and skills. Features smooth animations, dark theme, floating navigation, and professional contact form with glassmorphism design elements.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design", "Modern UI/UX"],
      category: "Web Development",
      featured: true,
      image: "/images/projects/portfolio.jpg",
      github: "https://github.com/himankarora/portfolio-website",
      demo: "https://himankarora.dev",
      status: "completed",
      year: "2024",
      highlights: [
        "Modern glassmorphism design",
        "Smooth Framer Motion animations",
        "Responsive across all devices"
      ]
    },
    {
      id: "do-all-app",
      title: "Do All - Multi-Utility Web Application",
      description: "Built a comprehensive web application combining To-Do List, Notes, and Calendar Reminders for task management. Enhanced with AngularJS and jQuery, featuring secure user authentication and SQLite backend storage.",
      tech: ["Python", "Flask", "SQL", "HTML", "CSS", "JavaScript", "AngularJS", "Bootstrap"],
      category: "Web Development",
      featured: false,
      image: "/images/projects/do-all.jpg",
      github: "https://github.com/himankarora/do-all-app",
      demo: "#",
      status: "completed",
      year: "2023",
      highlights: [
        "Multi-utility task management",
        "AngularJS frontend with Flask backend",
        "Secure user authentication"
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
      title: "Business Analyst",
      company: "Ferro Star",
      duration: "April 2022 - April 2024",
      location: "New Delhi, India",
      type: "work",
      description: "Evaluated operational workflows and proposed efficiency improvements, conducted market research, and utilized ERP systems to optimize supply chain and inventory processes.",
      achievements: [
        "Cut processing time by 22% through operational workflow improvements",
        "Increased sales by 8% by assisting company expansion into new markets",
        "Optimized stock levels using SQL data analysis, minimizing overstocking",
        "Enhanced overall efficiency through ERP system optimization"
      ],
      logo: "/images/companies/ferro-star.png",
      website: "https://ferrostar.com"
    },
    {
      id: "super-enterprises",
      title: "Analyst",
      company: "Super Enterprises",
      duration: "April 2021 - March 2022",
      location: "New Delhi, India",
      type: "work",
      description: "Analyzed market and sales trends to improve pricing strategies, collaborated with senior management on business strategies, and streamlined sales and inventory tracking systems.",
      achievements: [
        "Improved pricing strategies through market and sales trend analysis",
        "Contributed to better decision-making by developing business strategies",
        "Increased inventory turnover by 15% through ERP system integration",
        "Enhanced management efficiency with insightful reports and presentations"
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