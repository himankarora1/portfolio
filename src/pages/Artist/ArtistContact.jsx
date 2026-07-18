import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Music, 
  MapPin,
  Send,
  Clock,
  Calendar,
  Camera,
  Gamepad2,
  Mic,
  Edit,
  Users
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
import { artistPagePad, artistPageWidth, artistBtnPrimary, artistHeadingAccent, artistSurfaceCard, artistSurfaceInset } from '../../utils/artistLayout';
import { useAnalytics } from '../../components/Analytics';
import { contentData, getEmailForContext } from '../../utils/contentManager';
import { artistMedia } from '../../utils/artistMedia';

const ArtistContact = () => {
  const analytics = useAnalytics();
  
  // Get data from content manager
  const personalInfo = contentData.personal;
  const artistEmail = getEmailForContext('artist'); // Use artist email
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status and start submitting
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });

    try {
      // Send to your Vercel API endpoint with pageType for artist
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageType: 'artist' // This will route to himankaroraofficial@gmail.com
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (result.success) {
        // Track successful form submission
        if (analytics?.trackPortfolioEvents) {
          analytics.trackPortfolioEvents.contactForm('artist-contact-form-success');
        }
        
        // Show success message and clear form
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ''
        });
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSuccess: false,
            isError: false,
            errorMessage: ''
          });
        }, 5000);
        
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Track failed form submission
      if (analytics?.trackPortfolioEvents) {
        analytics.trackPortfolioEvents.contactForm('artist-contact-form-error');
      }
      
      // Show specific error message with artist email
      let errorMessage = 'Failed to send message. ';
      
      if (error.message.includes('HTTP error! status: 405')) {
        errorMessage += 'API endpoint not configured properly.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Network error. Please check your connection.';
      } else if (error.message.includes('non-JSON response')) {
        errorMessage += 'Server configuration error.';
      } else {
        errorMessage += `Please try again or email me directly at ${artistEmail}`;
      }
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: errorMessage
      });
    }
  };

  // Analytics event handlers
  const handleSocialClick = (platform, url) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.socialClick(platform, url);
    }
  };

  const handleContactMethodClick = (method) => {
    if (analytics?.trackPortfolioEvents) {
      analytics.trackPortfolioEvents.contactForm(method);
    }
  };

  // Updated contact methods with improved design and artist email
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: artistEmail, // Use artist email
      description: "For inquiries and collaborations",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      iconBg: "bg-amber-600",
      href: `mailto:${artistEmail}`
    },
    {
      icon: Music,
      title: "Music Collaborations",
      value: "Open for projects",
      description: "Covers, originals, and collabs",
      bgColor: "bg-stone-500/10",
      borderColor: "border-stone-500/30",
      iconBg: "bg-stone-700",
      href: contentData.social.youtube_music
    },
    {
      icon: Gamepad2,
      title: "Gaming Content",
      value: "Stream collaborations",
      description: "Walkthroughs and live streams",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500",
      href: contentData.social.youtube_gaming
    },
    {
      icon: Camera,
      title: "Content Creation",
      value: "Brand partnerships",
      description: "Brand and content partnerships",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      iconBg: "bg-orange-500",
      href: `mailto:${artistEmail}?subject=${encodeURIComponent('Brand / Content Collaboration')}`
    }
  ];

  // Updated services list
  const services = [
    { icon: Mic, label: "Live Gigs & Performances", color: "bg-amber-600" },
    { icon: Gamepad2, label: "Gaming Stream Collaborations", color: "bg-cyan-600" },
    { icon: Music, label: "Music Production", color: "bg-stone-700" },
    { icon: Edit, label: "Audio & Video Editing", color: "bg-green-600" },
    { icon: Users, label: "Brand Collaborations", color: "bg-red-600" }
  ];

  const socialPlatforms = [
    { 
      icon: YouTubeIcon, 
      name: "YouTube (Music)", 
      handle: "@himankarora", 
      followers: "1.2K", 
      color: "bg-red-500", 
      url: contentData.social.youtube_music
    },
    { 
      icon: YouTubeIcon, 
      name: "YouTube (Gaming)", 
      handle: "@himankaroragaming", 
      followers: "850", 
      color: "bg-red-600", 
      url: contentData.social.youtube_gaming
    },
    { 
      icon: InstagramIcon, 
      name: "Instagram", 
      handle: "@himankarora1", 
      followers: "2.1K", 
      color: "bg-gradient-to-r from-rose-500 to-orange-500", 
      url: contentData.social.instagram
    },
    { 
      icon: XIcon, 
      name: "X (Twitter)", 
      handle: "@himankaroraa", 
      followers: "1.5K", 
      color: "bg-black", 
      url: contentData.social.x_twitter
    },
    { 
      icon: FacebookIcon, 
      name: "Facebook", 
      handle: "himankaroraa", 
      followers: "980", 
      color: "bg-blue-600", 
      url: contentData.social.facebook
    },
    { 
      icon: DiscordIcon, 
      name: "Discord", 
      handle: "Join Server", 
      followers: "250+", 
      color: "bg-[#5865F2]", 
      url: contentData.social.discord
    }
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
      {/* SEO */}
      <SEO 
        title={`Contact ${personalInfo.name} - Let's Create Together`}
        description="Ready to collaborate, book a session, or just chat about creative projects? I'm always excited to connect with fellow creators and explore new opportunities."
        keywords="contact, collaboration, music production, content creation, partnerships, creative projects"
      />

      <ArtistPageShell
        atmosphereSrc={artistMedia.contact.atmosphere}
        atmospherePosition="center 55%"
      >
        {/* Main Content - FIXED SPACING */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`relative z-10 ${artistPagePad}`}
          style={{
            paddingTop: '8rem', // INCREASED from 5rem to 8rem (128px) for more spacing
            paddingBottom: '2rem'
          }}
        >
          <div className={artistPageWidth}>
            
            {/* Header - FIXED SPACING */}
            <motion.div variants={itemVariants} className="mb-12 text-center sm:mb-16">
              <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Let&apos;s <span className={artistHeadingAccent}>Create Together</span>
              </h1>
              <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
                Ready to collaborate, book a session, or just chat about creative projects? I&apos;m always excited to connect with fellow creators and explore new opportunities.
              </p>
            </motion.div>

            {/* Updated Contact Methods - Mobile Responsive */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 items-stretch">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={method.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                  onClick={() => handleContactMethodClick(method.title)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  className={`${artistSurfaceCard} flex h-full flex-col !p-4 sm:!p-6 transition-colors group cursor-pointer hover:border-white/25`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${method.iconBg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                    <method.icon size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{method.title}</h3>
                  <p className="mb-2 text-sm font-semibold text-amber-200 sm:text-base">{method.value}</p>
                  <p className="mt-auto text-gray-300 text-xs sm:text-sm">{method.description}</p>
                </motion.a>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              
              {/* Left column - one continuous card */}
              <motion.div variants={itemVariants} className={`${artistSurfaceCard} flex h-full flex-col`}>
                <h3 className="mb-4 font-display text-xl font-semibold tracking-tight text-white sm:mb-5 sm:text-2xl">
                  Quick <span className={artistHeadingAccent}>Info</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                    <Clock size={16} className="text-amber-200 sm:w-[18px] sm:h-[18px]" />
                    <span>Response time: 24-48 hours</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                    <MapPin size={16} className="text-amber-200 sm:w-[18px] sm:h-[18px]" />
                    <span>Based in {personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                    <Calendar size={16} className="text-amber-200 sm:w-[18px] sm:h-[18px]" />
                    <span>Open to projects worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                    <Mail size={16} className="text-amber-200 sm:w-[18px] sm:h-[18px]" />
                    <span>Collaborations welcome</span>
                  </div>
                </div>

                <div className="my-6 border-t border-white/10 sm:my-8" />

                <h3 className="mb-4 font-display text-xl font-semibold tracking-tight text-white sm:mb-5 sm:text-2xl">
                  What I <span className={artistHeadingAccent}>Offer</span>
                </h3>
                <div className="mb-5 grid grid-cols-1 gap-2.5">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 ${artistSurfaceInset}`}
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <service.icon size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base">{service.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className="mb-3 text-base font-semibold text-white sm:text-lg">Pricing & Packages</h4>
                <div className={`mb-5 space-y-0 overflow-hidden ${artistSurfaceInset}`}>
                  {[
                    ['Live Gigs & Performances', 'From $300'],
                    ['Gaming Stream Collaborations', 'From $100'],
                    ['Music Production', 'From $200'],
                    ['Audio & Video Editing', 'From $150'],
                    ['Brand Collaborations', 'Custom Quote'],
                  ].map(([label, price], i, arr) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-3 py-2.5 text-sm ${
                        i < arr.length - 1 ? 'border-b border-white/10' : ''
                      }`}
                    >
                      <span className="text-gray-300">{label}</span>
                      <span className="font-medium text-amber-200">{price}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-gray-400">
                  Packages include revisions and source files.
                </p>
              </motion.div>

              {/* Right column - form + social in one card */}
              <motion.div variants={itemVariants} className={`${artistSurfaceCard} flex h-full flex-col`}>
                <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-white sm:mb-6 sm:text-3xl">
                  Send Me a <span className={artistHeadingAccent}>Message</span>
                </h2>
                  
                  {formStatus.isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="mb-5 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-300 font-semibold text-sm sm:text-base">Message sent successfully!</p>
                          <p className="text-green-400 text-xs sm:text-sm">I'll get back to you soon.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStatus.isError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-red-300 font-semibold text-sm sm:text-base">Failed to send message</p>
                          <p className="text-red-400 text-xs sm:text-sm">{formStatus.errorMessage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-white">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={formStatus.isSubmitting}
                          className="w-full rounded-xl border border-white/10 bg-[#12151a] px-3 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/15 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3.5 sm:text-base"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-white">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={formStatus.isSubmitting}
                          className="w-full rounded-xl border border-white/10 bg-[#12151a] px-3 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/15 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3.5 sm:text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-white">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        className="w-full rounded-xl border border-white/10 bg-[#12151a] px-3 py-3 text-sm text-white transition-all focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/15 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3.5 sm:text-base"
                      >
                        <option value="" className="text-gray-400">Select a subject</option>
                        <option value="live-performance" className="text-gray-900">Live Gigs & Performances</option>
                        <option value="gaming-collaboration" className="text-gray-900">Gaming Stream Collaboration</option>
                        <option value="music-production" className="text-gray-900">Music Production</option>
                        <option value="audio-video-editing" className="text-gray-900">Audio & Video Editing</option>
                        <option value="brand-collaboration" className="text-gray-900">Brand Collaboration</option>
                        <option value="general" className="text-gray-900">General Inquiry</option>
                        <option value="other" className="text-gray-900">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-white">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-white/10 bg-[#12151a] px-3 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/15 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3.5 sm:text-base"
                        placeholder="Tell me about your project, collaboration idea, or just say hello..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`w-full ${artistBtnPrimary}`}
                      whileHover={!formStatus.isSubmitting ? { scale: 1.01 } : {}}
                      whileTap={!formStatus.isSubmitting ? { scale: 0.99 } : {}}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>

                <div className="my-6 border-t border-white/10 sm:my-7" />

                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-white sm:mb-4 sm:text-2xl">
                  Connect on <span className={artistHeadingAccent}>Social</span>
                </h3>
                <div className="space-y-2">
                  {socialPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick(platform.name, platform.url)}
                      className={`flex items-center justify-between p-3 ${artistSurfaceInset} transition-colors hover:border-white/20 group`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 ${platform.color} rounded-lg flex items-center justify-center`}>
                          <platform.icon size={14} className="text-white sm:w-4 sm:h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{platform.name}</div>
                          <div className="text-xs text-gray-400">{platform.handle}</div>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-amber-200">
                        {platform.followers}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <ArtistFooter />
      </ArtistPageShell>
    </>
  );
};

export default ArtistContact;