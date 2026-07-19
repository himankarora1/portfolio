import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Gamepad2, Camera, ArrowRight } from 'lucide-react';

// Welcome sequence words (module-level so the array reference is stable across renders)
const welcomeWords = ['WELCOME', 'PAUSE', 'FEEL', 'EXPLORE', 'THIS IS ME', 'THROUGH MY ART'];

const softEase = [0.25, 0.46, 0.45, 0.94];

const ArtistWelcome = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [showLogo, setShowLogo] = useState(false);
  const [logoShouldMoveUp, setLogoShouldMoveUp] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [textSequenceComplete, setTextSequenceComplete] = useState(false);
  const [compactLayout, setCompactLayout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-height: 720px), (max-width: 640px)');
    const update = () => setCompactLayout(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleSkipIntro = () => {
    onComplete();
  };

  // Original choreography: words → logo center → logo rises → title → icons → final
  useEffect(() => {
    const timeouts = [];

    timeouts.push(setTimeout(() => {
      setCurrentWordIndex(0);
    }, 200));

    welcomeWords.forEach((_, index) => {
      if (index > 0) {
        timeouts.push(setTimeout(() => {
          setCurrentWordIndex(index);
        }, 200 + index * 1000));
      }
    });

    timeouts.push(setTimeout(() => {
      setTextSequenceComplete(true);
      setCurrentWordIndex(-1);

      setTimeout(() => {
        setShowLogo(true);

        // Logo rotates at center, then rises
        setTimeout(() => {
          setLogoShouldMoveUp(true);
        }, 1000);

        // Title after logo has risen
        setTimeout(() => {
          setShowTitle(true);

          setTimeout(() => {
            setShowIcons(true);

            setTimeout(() => {
              setShowFinalText(true);

              setTimeout(() => {
                onComplete();
              }, 1200);
            }, 1200);
          }, 1200);
        }, 1600);
      }, 600);
    }, 200 + welcomeWords.length * 1000));

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [onComplete]);

  // Spread further apart so logo / name / icons / text breathe
  // Extra gap between HA and HIMANK ARORA (both large)
  const logoY = logoShouldMoveUp ? (compactLayout ? -150 : -225) : 0;
  const titleY = compactLayout ? -8 : -12;
  const iconsY = compactLayout ? 95 : 140;
  const finalY = compactLayout ? 195 : 265;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 1.0, ease: 'easeIn' },
    },
  };

  const welcomeTextVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: softEase },
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.97,
      transition: { duration: 0.4, ease: [0.55, 0.06, 0.55, 0.94] },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -90, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        opacity: { duration: 1.2, ease: softEase, delay: index * 0.4 },
        scale: { duration: 1.5, ease: softEase, delay: index * 0.4 },
        rotate: { duration: 1.3, ease: softEase, delay: index * 0.4 },
      },
    }),
  };

  const iconLabelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.8 + index * 0.15,
      },
    }),
  };

  const creativityIcons = [
    { Icon: Music, color: 'from-amber-600 to-orange-700', label: 'Music' },
    { Icon: Gamepad2, color: 'from-amber-500 to-orange-600', label: 'Gaming' },
    { Icon: Camera, color: 'from-stone-600 to-stone-800', label: 'Content' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex h-[100dvh] min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
      >
        {/* Soft atmosphere — lightly visible under dark wash */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/artist/artist-silhouette-welcome.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.22] sm:scale-105 sm:opacity-[0.18]"
            style={{ objectPosition: 'center 45%' }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />
        </div>

        <motion.button
          onClick={handleSkipIntro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="fixed z-[9999] cursor-pointer bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-8 sm:right-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2 text-gray-300 transition-colors duration-300 hover:text-white">
            <span className="text-xs font-medium tracking-wide sm:text-sm">Skip Intro</span>
            <ArrowRight size={14} className="sm:h-4 sm:w-4" />
          </div>
        </motion.button>

        {/* Soft ambient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl sm:h-64 sm:w-64 lg:h-96 lg:w-96"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.15, 0.1],
              scale: [0.5, 1.2, 1],
            }}
            transition={{ duration: 3.0, ease: softEase }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/8 blur-3xl sm:h-48 sm:w-48 lg:h-64 lg:w-64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.12, 0.08],
              scale: [0.5, 1.3, 1],
            }}
            transition={{ duration: 3.5, ease: softEase, delay: 1 }}
          />
        </div>

        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
          {/* Word sequence */}
          <AnimatePresence mode="wait">
            {currentWordIndex >= 0 && !textSequenceComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: softEase }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`word-${currentWordIndex}`}
                    variants={welcomeTextVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="px-4 text-center text-3xl font-bold text-amber-200 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    {welcomeWords[currentWordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo — appears center, then smoothly rises */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: logoY }}
                transition={{
                  opacity: { duration: 0.8, ease: softEase },
                  scale: { duration: 0.8, ease: softEase },
                  y: { duration: 1.05, ease: softEase },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="h-24 w-24 rounded-full bg-gradient-to-r from-amber-500/80 via-orange-400/60 to-stone-600/80 p-1 shadow-2xl sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                    <span className="text-2xl font-bold text-amber-200 sm:text-3xl lg:text-4xl">HA</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                initial={{ opacity: 0, y: titleY - 12, scale: 0.9 }}
                animate={{ opacity: 1, y: titleY, scale: 1 }}
                transition={{
                  opacity: { duration: 1.0, ease: softEase },
                  y: { duration: 1.0, ease: softEase },
                  scale: { duration: 1.0, ease: softEase },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h1 className="px-4 text-center text-3xl font-bold text-amber-200 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  HIMANK ARORA
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icons */}
          <AnimatePresence>
            {showIcons && (
              <motion.div
                initial={{ opacity: 0, y: iconsY + 20 }}
                animate={{ opacity: 1, y: iconsY }}
                transition={{
                  opacity: { duration: 0.9, ease: softEase },
                  y: { duration: 0.9, ease: softEase },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-12">
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
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-xl sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.3,
                          },
                        }}
                      >
                        <Icon size={20} className="text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                      </motion.div>
                      <motion.span
                        className="text-xs font-medium text-white sm:text-sm"
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

          {/* Final text */}
          <AnimatePresence>
            {showFinalText && (
              <motion.div
                initial={{ opacity: 0, y: finalY + 20 }}
                animate={{ opacity: 1, y: finalY }}
                transition={{
                  opacity: { duration: 1.0, ease: softEase },
                  y: { duration: 1.0, ease: softEase },
                }}
                className="absolute inset-0 flex items-center justify-center px-4"
              >
                <p className="px-4 text-center text-lg text-gray-300 sm:text-xl lg:text-2xl">
                  Welcome to my world...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtistWelcome;
