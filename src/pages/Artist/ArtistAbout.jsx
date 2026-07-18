import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music,
  Gamepad2,
  Camera,
  Mic,
  Youtube,
  Instagram,
  Facebook,
  MessageSquare,
  Heart,
  Video
} from 'lucide-react';
import SEO from '../../components/SEO';
import ArtistPageShell from '../../components/Artist/ArtistPageShell';
import ArtistFooter from '../../components/Artist/ArtistFooter';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';
import { artistPagePad, artistPageWidth, artistHeadingAccent } from '../../utils/artistLayout';

// Custom X (Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ArtistAbout = () => {
  const analytics = useAnalytics();

  // Get data from content manager
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  // Creative journey
  const creativeJourney = [
    {
      year: "2005",
      title: "Musical Foundations",
      description: "Started learning music, picking up instruments and working on vocals.",
      icon: Music,
      color: "from-amber-600 to-orange-700"
    },
    {
      year: "2019",
      title: "Content Creation",
      description: "Began sharing performances and creative process clips online.",
      icon: Camera,
      color: "from-stone-600 to-stone-800"
    },
    {
      year: "2020",
      title: "Gaming Content",
      description: "Started posting gaming walkthroughs and streaming sessions.",
      icon: Gamepad2,
      color: "from-cyan-600 to-teal-700"
    },
    {
      year: "2021",
      title: "Community Building",
      description: "Connected with people across platforms through regular posts and streams.",
      icon: Heart,
      color: "from-rose-600 to-orange-700"
    }
  ];

  const socialPlatforms = [
    { icon: Youtube, name: "YouTube (Music)", handle: "@himankarora", color: "bg-red-500", url: socialLinks.youtube_music },
    { icon: Youtube, name: "YouTube (Gaming)", handle: "@himankaroragaming", color: "bg-red-600", url: socialLinks.youtube_gaming },
    { icon: Instagram, name: "Instagram", handle: "@himankarora1", color: "bg-gradient-to-r from-rose-500 to-orange-500", url: socialLinks.instagram },
    { icon: XIcon, name: "X (Twitter)", handle: "@himankaroraa", color: "bg-black", url: socialLinks.x_twitter },
    { icon: Facebook, name: "Facebook", handle: "himankaroraa", color: "bg-blue-600", url: socialLinks.facebook },
    { icon: MessageSquare, name: "Discord", handle: "Join Server", color: "bg-indigo-600", url: socialLinks.discord }
  ];

  const creativeSkills = [
    { name: "Singing", icon: Mic },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Live Streaming", icon: Video },
    { name: "Music Production", icon: Music },
    { name: "Community Management", icon: Heart },
    { name: "Video Editing", icon: Camera }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* SEO for Artist About */}
      <SEO 
        title={`About ${personalInfo.name} - Content Creator & Musician`}
        description="Dive deeper into my creative journey, skills, and the passion that drives my content creation across music, gaming, and digital storytelling."
        keywords="about, creative journey, content creator, musician, gaming, digital storytelling"
      />

      <ArtistPageShell
        atmosphereSrc={artistMedia.about.atmosphere}
        atmospherePosition="center 18%"
      >
        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`relative z-10 ${artistPagePad}`}
          style={{
            paddingTop: '8rem',
            paddingBottom: '2rem'
          }}
        >
          <div className={artistPageWidth}>
            
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                About <span className={artistHeadingAccent}>Me</span>
              </h1>
              <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
                Dive deeper into my creative journey, skills, and the passion that drives my content creation across music, gaming, and digital storytelling.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-20 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-white sm:mb-8 sm:text-3xl lg:text-4xl">
                  My <span className={artistHeadingAccent}>Story</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  My creative journey began with a deep love for music that blossomed into a lifelong passion. What started as learning instruments and developing vocal skills evolved into a serious pursuit of musical excellence and artistic expression through authentic content creation.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  As my musical foundation grew stronger, I discovered the power of digital platforms to connect with audiences. This led me to explore video content creation, where I could showcase not just my performances, but the entire creative process behind my art and the stories that inspire each piece.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Gaming has always been another passion of mine, and I found joy in sharing that enthusiasm through streaming and creating walkthroughs. Whether I'm producing music, creating videos, or streaming games, my goal remains the same: to inspire, entertain, and build genuine connections with communities who share these passions.
                </p>
              </div>

              {/* Profile Image */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex justify-center items-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-r from-amber-500/80 via-orange-400/60 to-stone-600/80 p-2 shadow-2xl ring-1 ring-white/20">
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img 
                        src={artistMedia.about.portrait} 
                        alt={personalInfo.name}
                        className="w-full h-full object-cover rounded-2xl"
                        style={{ objectPosition: 'center 15%' }}
                        onError={(e) => {
                          // Fallback to HA if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-2xl"
                        style={{ display: 'none' }}
                      >
                        <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text">
                          HA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                My Creative <span className={artistHeadingAccent}>Journey</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {creativeJourney.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="relative"
                  >
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all group">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-all`}>
                        <item.icon size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-amber-200 font-bold text-base sm:text-lg mb-2">{item.year}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                Creative <span className={artistHeadingAccent}>Skills</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {creativeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-stone-900/40 px-4 py-2 text-sm text-stone-200 sm:px-5 sm:py-2.5 sm:text-base"
                  >
                    <skill.icon size={16} className="text-amber-200/80 sm:w-[18px] sm:h-[18px]" />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
                Follow My <span className={artistHeadingAccent}>Creative Journey</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
                Connect with me across different platforms and be part of my creative community. Let's create, learn, and grow together!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick(platform.name, platform.url)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-gray-600/50 transition-all group"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-all`}>
                      <platform.icon size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{platform.name}</h3>
                    <p className="text-gray-400 text-sm">{platform.handle}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <ArtistFooter />
      </ArtistPageShell>
    </>
  );
};

export default ArtistAbout;
