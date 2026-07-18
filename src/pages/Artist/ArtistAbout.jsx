import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music,
  Gamepad2,
  Camera,
  Mic,
  Heart,
  Video
} from 'lucide-react';
import {
  DiscordIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from '../../components/SocialIcons';
import SEO from '../../components/SEO';
import ArtistPageShell from '../../components/Artist/ArtistPageShell';
import ArtistFooter from '../../components/Artist/ArtistFooter';
import { useAnalytics } from '../../components/Analytics';
import { contentData } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';
import { artistPagePad, artistPageWidth, artistHeadingAccent, artistSurfaceCard } from '../../utils/artistLayout';

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
      color: "from-amber-500 to-orange-600"
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
    { icon: YouTubeIcon, name: "YouTube (Music)", handle: "@himankarora", color: "bg-red-500", url: socialLinks.youtube_music },
    { icon: YouTubeIcon, name: "YouTube (Gaming)", handle: "@himankaroragaming", color: "bg-red-600", url: socialLinks.youtube_gaming },
    { icon: InstagramIcon, name: "Instagram", handle: "@himankarora1", color: "bg-gradient-to-r from-rose-500 to-orange-500", url: socialLinks.instagram },
    { icon: XIcon, name: "X (Twitter)", handle: "@himankaroraa", color: "bg-black", url: socialLinks.x_twitter },
    { icon: FacebookIcon, name: "Facebook", handle: "himankaroraa", color: "bg-blue-600", url: socialLinks.facebook },
    { icon: DiscordIcon, name: "Discord", handle: "Join Server", color: "bg-[#5865F2]", url: socialLinks.discord }
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
        description="Music, gaming, vlogs, and the path that got me here."
        keywords="about, creative journey, content creator, musician, gaming, vlogs"
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
                Music, gaming, vlogs, and the path that got me here.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-20 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-white sm:mb-8 sm:text-3xl lg:text-4xl">
                  My <span className={artistHeadingAccent}>Story</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  It started with music: learning instruments, working on vocals, and figuring out how I wanted to sound. Over time that turned into sharing performances and process online, not just finished tracks.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Video came next. I began posting clips, covers, and behind-the-scenes work so people could see how the music comes together, not only the final cut.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Gaming and streaming grew alongside that. Today I make music, gaming, vlogs, and other fun content, and keep building a community around it.
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
                    <div className="w-full h-full rounded-2xl bg-[#12151a] flex items-center justify-center overflow-hidden">
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
                        className="w-full h-full bg-[#12151a] flex items-center justify-center rounded-2xl"
                        style={{ display: 'none' }}
                      >
                        <span className={`text-6xl sm:text-7xl lg:text-8xl font-bold ${artistHeadingAccent}`}>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
                {creativeJourney.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.4 }}
                    className="h-full"
                  >
                    <div className={`flex h-full flex-col ${artistSurfaceCard} !p-4 sm:!p-6`}>
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} sm:mb-4 sm:h-12 sm:w-12`}>
                        <item.icon size={20} className="text-white sm:h-6 sm:w-6" />
                      </div>
                      <div className="mb-2 text-base font-bold text-amber-200 sm:text-lg">{item.year}</div>
                      <h3 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl">{item.title}</h3>
                      <p className="min-h-[4.5rem] flex-1 text-sm leading-relaxed text-gray-300 sm:min-h-[5rem] sm:text-base">
                        {item.description}
                      </p>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick(platform.name, platform.url)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.35 }}
                    className={`flex h-full flex-col ${artistSurfaceCard} !p-4 sm:!p-6 transition-colors hover:border-white/20`}
                  >
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${platform.color} sm:mb-4 sm:h-12 sm:w-12`}>
                      <platform.icon size={20} className="text-white sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{platform.name}</h3>
                    <p className="mt-auto text-sm text-gray-400">{platform.handle}</p>
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
