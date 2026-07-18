import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Mail,
  Brush,
  Clock,
  MapPin,
  Globe,
} from 'lucide-react';
import {
  DiscordIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from '../SocialIcons';
import { contentData, getEmailForContext } from '../../utils/contentManager';
import { useAnalytics } from '../Analytics';
import { artistPagePad, artistPageWidth, artistHeadingAccent } from '../../utils/artistLayout';

const quickLinks = [
  { id: 'home', label: 'Home', icon: Home, path: '/artist' },
  { id: 'about', label: 'About Me', icon: User, path: '/artist/about' },
  { id: 'work', label: 'My Work', icon: Brush, path: '/artist/work' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/artist/contact' },
];

const ArtistFooter = () => {
  const analytics = useAnalytics();
  const personalInfo = contentData.personal;
  const social = contentData.social;
  const artistEmail = getEmailForContext('artist');

  const socials = [
    { name: 'YouTube Music', url: social.youtube_music, icon: YouTubeIcon, color: 'bg-red-500' },
    { name: 'YouTube Gaming', url: social.youtube_gaming, icon: YouTubeIcon, color: 'bg-red-600' },
    { name: 'Instagram', url: social.instagram, icon: InstagramIcon, color: 'bg-gradient-to-r from-rose-500 to-orange-500' },
    { name: 'X', url: social.x_twitter, icon: XIcon, color: 'bg-black border border-white/20' },
    { name: 'Facebook', url: social.facebook, icon: FacebookIcon, color: 'bg-blue-600' },
    { name: 'Discord', url: social.discord, icon: DiscordIcon, color: 'bg-[#5865F2]' },
  ];

  const trackNav = (section) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.sectionView(section);
    }
  };

  const trackSocial = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className={`${artistPageWidth} ${artistPagePad} py-10 sm:py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 md:items-stretch">
          {/* About */}
          <div className="flex flex-col h-full">
            <h4 className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-4">About</h4>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm tracking-tight">HA</span>
              </div>
              <div>
                <h3 className={`text-base sm:text-lg font-semibold leading-tight ${artistHeadingAccent}`}>
                  {personalInfo.name}
                </h3>
                <p className="text-gray-500 text-xs">Artist & Content Creator</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Music, gaming, vlogs, and other fun content, built with the community along the way.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-6">
              {socials.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocial(platform.name, platform.url)}
                  className={`inline-flex h-11 w-11 items-center justify-center ${platform.color} rounded-lg text-white hover:opacity-90 transition-opacity`}
                  whileHover={{ scale: 1.06 }}
                  aria-label={platform.name}
                >
                  <platform.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col h-full">
            <h4 className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 content-start">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => trackNav(item.id)}
                    className="text-gray-300 hover:text-amber-200 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    <item.icon size={14} />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/"
                  onClick={() => trackNav('portfolio-hub')}
                  className="text-gray-300 hover:text-amber-200 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Globe size={14} />
                  Portfolio Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact — info only */}
          <div className="flex flex-col h-full">
            <h4 className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-300 flex-1">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <span>{personalInfo.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${artistEmail}`}
                  onClick={() => trackSocial('Email', artistEmail)}
                  className="hover:text-amber-200 transition-colors break-all"
                >
                  {artistEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                  <DiscordIcon size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <a
                  href={social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocial('Discord', social.discord)}
                  className="hover:text-amber-200 transition-colors"
                >
                  Discord community
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <span>Available remotely</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="text-amber-300 mt-0.5 shrink-0" />
                <span>24-48h response</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-amber-200 transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-amber-200 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ArtistFooter;
