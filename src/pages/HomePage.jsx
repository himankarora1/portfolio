import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Mail,
  ArrowRight
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, XIcon } from '../components/SocialIcons';
import { contentData } from '../utils/contentManager';
import SEO from '../components/SEO';
import { useAnalytics } from '../components/Analytics';

const techTag =
  'px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border bg-cyan-500/15 border-cyan-500/25 text-cyan-300';
const artistTag =
  'px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border bg-amber-500/15 border-amber-500/25 text-amber-200';

const techCta =
  'inline-flex items-center space-x-2 rounded-full bg-cyan-500 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-cyan-400';
const artistCta =
  'inline-flex items-center space-x-2 rounded-full bg-amber-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition-colors hover:bg-amber-100';

const HomePage = () => {
  const analytics = useAnalytics();
  const personalInfo = contentData.personal;
  const socialLinks = contentData.social;

  const handleArtistClick = () => {
    sessionStorage.setItem('fromPortfolioHub', 'true');
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('home', 'artist');
    }
  };

  const handleTechClick = () => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.tabSwitch('home', 'tech');
    }
  };

  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.35,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <>
      <SEO />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pt-0 sm:pb-0 sm:h-screen">
          <div className="w-full h-full flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24 mx-auto rounded-full bg-transparent border-2 border-white/80 flex items-center justify-center transition-colors hover:border-white">
                    <span className="text-white font-bold text-base sm:text-xl lg:text-2xl tracking-tight">HA</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white px-2"
                >
                  {personalInfo.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-gray-400 px-4"
                >
                  <span className="text-cyan-300">Analyst</span>
                  {' by craft, '}
                  <span className="text-amber-200">Artist</span>
                  {' by passion'}
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto px-3 pt-2 sm:pt-3 items-stretch"
                >
                  {/* Tech path */}
                  <motion.div
                    variants={cardVariants}
                    className="flex h-full flex-col rounded-xl sm:rounded-2xl border border-cyan-400/20 bg-gray-800/30 p-4 sm:p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 hover:bg-gray-800/45"
                  >
                    <div className="flex flex-1 flex-col text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 sm:mb-4 sm:h-12 sm:w-12">
                        <Code size={20} className="text-white sm:h-6 sm:w-6" />
                      </div>

                      <h3 className="font-display mb-2 text-lg font-semibold text-white sm:mb-3 sm:text-xl">
                        Technical Analyst & Developer
                      </h3>

                      <p className="mb-3 min-h-[3.5rem] px-2 text-sm leading-relaxed text-gray-300 sm:mb-4 sm:min-h-[4rem]">
                        Analyzing business needs and building the products that solve them, from web apps to data tools.
                      </p>

                      <div className="mb-4 flex flex-wrap justify-center gap-1.5 sm:mb-6 sm:gap-2">
                        {['Analysis', 'React', 'Python', 'SQL'].map((skill) => (
                          <span key={skill} className={techTag}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-2">
                        <Link
                          to="/tech"
                          onClick={handleTechClick}
                          className={techCta}
                        >
                          <span>View Portfolio</span>
                          <ArrowRight size={14} className="sm:h-4 sm:w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* Artist path */}
                  <motion.div
                    variants={cardVariants}
                    className="flex h-full flex-col rounded-xl sm:rounded-2xl border border-amber-400/20 bg-gray-800/30 p-4 sm:p-6 backdrop-blur-xl transition-colors duration-300 hover:border-amber-400/40 hover:bg-gray-800/45"
                  >
                    <div className="flex flex-1 flex-col text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 sm:mb-4 sm:h-12 sm:w-12">
                        <Palette size={20} className="text-white sm:h-6 sm:w-6" />
                      </div>

                      <h3 className="font-display mb-2 text-lg font-semibold text-white sm:mb-3 sm:text-xl">
                        Artist & Content Creator
                      </h3>

                      <p className="mb-3 min-h-[3.5rem] px-2 text-sm leading-relaxed text-gray-300 sm:mb-4 sm:min-h-[4rem]">
                        Music, gaming, vlogs, and other fun content, built with the community along the way.
                      </p>

                      <div className="mb-4 flex flex-wrap justify-center gap-1.5 sm:mb-6 sm:gap-2">
                        {['Music', 'Gaming', 'Streaming', 'Content'].map((skill) => (
                          <span key={skill} className={artistTag}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-2">
                        <Link
                          to="/artist"
                          onClick={handleArtistClick}
                          className={artistCta}
                        >
                          <span>View Portfolio</span>
                          <ArrowRight size={14} className="sm:h-4 sm:w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex justify-center space-x-4 sm:space-x-6 px-4"
                >
                  {[
                    { icon: GitHubIcon, href: socialLinks.github, color: 'hover:text-gray-300', platform: 'GitHub' },
                    { icon: LinkedInIcon, href: socialLinks.linkedin, color: 'hover:text-blue-400', platform: 'LinkedIn' },
                    { icon: XIcon, href: socialLinks.x_twitter, color: 'hover:text-sky-400', platform: 'X Twitter' },
                    { icon: Mail, href: `mailto:${personalInfo.email}`, color: 'hover:text-red-400', platform: 'Email' },
                  ].map((social) => (
                    <a
                      key={social.platform}
                      href={social.href}
                      target={social.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      aria-label={social.platform}
                      onClick={() => handleSocialClick(social.platform, social.href)}
                      className={`p-1.5 text-gray-400 transition-colors ${social.color}`}
                    >
                      <social.icon size={18} className="sm:h-5 sm:w-5" />
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
