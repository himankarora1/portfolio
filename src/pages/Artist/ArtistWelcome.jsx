import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Gamepad2, Camera, Heart, Star, Sparkles, ArrowRight } from 'lucide-react';

const ArtistWelcome = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1); // Start with -1 to show initial delay
  const [showLogo, setShowLogo] = useState(false);
  const [logoShouldMoveUp, setLogoShouldMoveUp] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [textSequenceComplete, setTextSequenceComplete] = useState(false);

  // Welcome sequence words
  const welcomeWords = ['WELCOME', 'PAUSE', 'FEEL', 'EXPLORE', 'THIS IS ME', 'THROUGH MY ART'];

  // Skip intro function
  const handleSkipIntro = () => {
    onComplete();
  };

  // Single animation flow
  useEffect(() => {
    let timeouts = [];

    // Start after 200ms delay
    timeouts.push(setTimeout(() => {
      setCurrentWordIndex(0); // Show WELCOME
    }, 200));

    // Show subsequent words
    welcomeWords.forEach((_, index) => {
      if (index > 0) {
        timeouts.push(setTimeout(() => {
          setCurrentWordIndex(index);
        }, 200 + (index * 1000))); // 200ms initial delay + 1000ms per word
      }
    });

    // Complete text sequence and start logo
    timeouts.push(setTimeout(() => {
      setTextSequenceComplete(true);
      setCurrentWordIndex(-1); // Hide text
      
      // Show logo after text fades
      setTimeout(() => {
        setShowLogo(true);
        
        // Logo rotates for a bit, then moves up independently
        setTimeout(() => {
          setLogoShouldMoveUp(true);
        }, 1000); // Logo rotates for 1 second before moving up
        
        // Show title only after logo has completely moved up
        setTimeout(() => {
          setShowTitle(true);
          
          // Show icons after title
          setTimeout(() => {
            setShowIcons(true);
            
            // Show final text after icons
            setTimeout(() => {
              setShowFinalText(true);
              
              // Complete animation
              setTimeout(() => {
                onComplete();
              }, 1200);
            }, 1200);
          }, 1200);
        }, 1400); // 1400ms after logo appears
      }, 600);
    }, 200 + (welcomeWords.length * 1000)));

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [onComplete, welcomeWords.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 1.0,
        ease: "easeIn"
      }
    }
  };

  const welcomeTextVariants = {
    hidden: { 
      opacity: 0, 
      y: 15, 
      scale: 0.97 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      scale: 0.97,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.55, 0.94]
      }
    }
  };

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        opacity: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] },
        rotate: { duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 60,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] },
        y: { duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -90,
      opacity: 0
    },
    visible: (index) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.4 },
        scale: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.4 },
        rotate: { duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.4 }
      }
    })
  };

  const iconLabelVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: (index) => ({
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8 + index * 0.15
      }
    })
  };

  const completionVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.6
      }
    }
  };

  const finalTextVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const creativityIcons = [
    { 
      Icon: Music, 
      color: "from-pink-500 to-rose-500",
      label: "Music",
      delay: 0
    },
    { 
      Icon: Gamepad2, 
      color: "from-blue-500 to-cyan-500",
      label: "Gaming",
      delay: 0.2
    },
    { 
      Icon: Camera, 
      color: "from-purple-500 to-indigo-500",
      label: "Content",
      delay: 0.4
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slate-900 overflow-hidden"
      >
        {/* Skip Intro Button - Mobile Responsive */}
        <motion.button
          onClick={handleSkipIntro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] group cursor-pointer pointer-events-auto"
          style={{ pointerEvents: 'auto' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
            <motion.span 
              className="text-xs sm:text-sm font-medium tracking-wide"
              animate={{ 
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Skip Intro
            </motion.span>
            <motion.div
              animate={{ 
                x: [0, 4, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                x: {
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="group-hover:text-pink-400 transition-colors duration-300"
            >
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </motion.div>
          </div>
          
          {/* Subtle underline on hover */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-1"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Dynamic Background Elements - Mobile Optimized */}
        <div className="absolute inset-0">
          {/* Animated Gradient Orbs - Responsive sizes */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.15, 0.1],
              scale: [0.5, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{
              opacity: { duration: 3.0, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 4.0, ease: [0.25, 0.46, 0.45, 0.94] },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.12, 0.08],
              scale: [0.5, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 25, 0]
            }}
            transition={{
              opacity: { duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 },
              scale: { duration: 4.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }
            }}
          />

          {/* Floating Particles - Mobile Optimized */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 1.5, 0.5],
                y: [-15, -80],
                x: [Math.random() * 60 - 30, Math.random() * 60 - 30]
              }}
              transition={{
                opacity: { duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94], delay: Math.random() * 3 },
                scale: { duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94], delay: Math.random() * 3 },
                y: { duration: 6 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 4 + 3 },
                x: { duration: 6 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 4 + 3 }
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Main Content - Mobile Responsive with ORIGINAL SPACING */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6">
          
          {/* Welcome Text Sequence - Mobile Responsive */}
          <AnimatePresence mode="wait">
            {currentWordIndex >= 0 && !textSequenceComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={`word-${currentWordIndex}`}
                    variants={welcomeTextVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-center px-4"
                    style={{
                      backgroundSize: "200% 100%"
                    }}
                  >
                    {welcomeWords[currentWordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo Animation - Mobile Responsive with ORIGINAL SPACING */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  y: 0 // Start at center
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  y: logoShouldMoveUp ? -160 : 0 // KEEP ORIGINAL SPACING for desktop
                }}
                transition={{
                  opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  // Responsive Y offset using CSS transforms for mobile - CLOSER spacing
                  transform: logoShouldMoveUp ? 'translateY(max(-80px, -160px))' : 'translateY(0)'
                }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 shadow-2xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                        HA
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title Animation - Mobile Responsive with ORIGINAL SPACING */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                initial={{ 
                  opacity: 0,
                  y: -20, // KEEP ORIGINAL positioning
                  scale: 0.9
                }}
                animate={{ 
                  opacity: 1,
                  y: -20, // KEEP ORIGINAL positioning
                  scale: 1
                }}
                transition={{
                  opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  scale: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  // Responsive positioning using CSS - CLOSER spacing
                  transform: 'translateY(max(-5px, -20px))'
                }}
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-center px-4"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                >
                  HIMANK ARORA
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icons Animation - Mobile Responsive with ORIGINAL SPACING */}
          <AnimatePresence>
            {showIcons && (
              <motion.div
                initial={{ 
                  opacity: 0,
                  y: 110 // KEEP ORIGINAL spacing for desktop
                }}
                animate={{ 
                  opacity: 1,
                  y: 110 // KEEP ORIGINAL spacing for desktop
                }}
                transition={{
                  opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  // Responsive positioning using CSS - CLOSER spacing
                  transform: 'translateY(max(60px, 110px))'
                }}
              >
                <div className="flex justify-center items-center space-x-6 sm:space-x-8 lg:space-x-12">
                  {creativityIcons.map(({ Icon, color, label }, index) => (
                    <motion.div
                      key={label}
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      className="flex flex-col items-center space-y-2 sm:space-y-3"
                    >
                      <motion.div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-xl`}
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 10,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        animate={{
                          y: [0, -10, 0]
                        }}
                        transition={{
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                          }
                        }}
                      >
                        <Icon size={20} className="text-white sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                      </motion.div>
                      
                      <motion.span 
                        className="text-white font-medium text-xs sm:text-sm"
                        variants={iconLabelVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        {label}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Text - Mobile Responsive with ORIGINAL SPACING */}
          <AnimatePresence>
            {showFinalText && (
              <motion.div
                initial={{ 
                  opacity: 0,
                  y: 220 // KEEP ORIGINAL spacing for desktop
                }}
                animate={{ 
                  opacity: 1,
                  y: 220 // KEEP ORIGINAL spacing for desktop
                }}
                transition={{
                  opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  // Responsive positioning using CSS - CLOSER spacing
                  transform: 'translateY(max(120px, 220px))'
                }}
              >
                <motion.p className="text-lg sm:text-xl lg:text-2xl text-gray-300 text-center px-4">
                  Welcome to my world...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtistWelcome;