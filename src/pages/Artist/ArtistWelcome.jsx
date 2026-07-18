import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Music, Gamepad2, Camera, ArrowRight } from 'lucide-react';

// Welcome sequence words (module-level so the array reference is stable across renders)
const welcomeWords = ['WELCOME', 'PAUSE', 'FEEL', 'EXPLORE', 'THIS IS ME', 'THROUGH MY ART'];

const softEase = [0.22, 1, 0.36, 1];
const layoutTransition = { duration: 0.65, ease: softEase };

const ArtistWelcome = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [textSequenceComplete, setTextSequenceComplete] = useState(false);

  const handleSkipIntro = () => {
    onComplete();
  };

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

        setTimeout(() => {
          setShowTitle(true);

          setTimeout(() => {
            setShowIcons(true);

            setTimeout(() => {
              setShowFinalText(true);

              setTimeout(() => {
                onComplete();
              }, 1400);
            }, 1100);
          }, 1100);
        }, 900);
      }, 500);
    }, 200 + welcomeWords.length * 1000));

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.7, ease: 'easeIn' },
    },
  };

  const welcomeTextVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: softEase },
    },
    exit: {
      opacity: 0,
      y: -14,
      transition: { duration: 0.35, ease: softEase },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.92 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: softEase,
        delay: index * 0.12,
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
        {/* Atmosphere — soft silhouette under a dark veil */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/artist/artist-silhouette-welcome.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-[1px] sm:scale-105 sm:opacity-20"
            style={{ objectPosition: 'center 45%' }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
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

        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6">
          {/* Word sequence */}
          <AnimatePresence mode="wait">
            {currentWordIndex >= 0 && !textSequenceComplete && (
              <motion.div
                key="word-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`word-${currentWordIndex}`}
                    variants={welcomeTextVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="px-4 text-center text-3xl font-bold text-amber-200 sm:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    {welcomeWords[currentWordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Identity stack — layout animates so items slide instead of jumping */}
          {(showLogo || showTitle || showIcons || showFinalText) && (
            <LayoutGroup id="welcome-identity">
              <motion.div
                layout
                transition={{ layout: layoutTransition }}
                className="flex max-h-full w-full flex-col items-center justify-center gap-7 py-10 sm:gap-9 lg:gap-11"
              >
                <AnimatePresence initial={false}>
                  {showLogo && (
                    <motion.div
                      key="welcome-logo"
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        layout: layoutTransition,
                        opacity: { duration: 0.55, ease: softEase },
                        y: { duration: 0.65, ease: softEase },
                        scale: { duration: 0.65, ease: softEase },
                      }}
                    >
                      <motion.div
                        className="h-20 w-20 rounded-full bg-gradient-to-r from-amber-500/80 via-orange-400/60 to-stone-600/80 p-1 shadow-2xl sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                        }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                          <span className="text-xl font-bold text-amber-200 sm:text-3xl lg:text-4xl">HA</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {showTitle && (
                    <motion.h1
                      key="welcome-title"
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        layout: layoutTransition,
                        opacity: { duration: 0.55, ease: softEase },
                        y: { duration: 0.65, ease: softEase },
                      }}
                      className="text-center text-3xl font-bold tracking-tight text-amber-200 sm:text-5xl lg:text-6xl xl:text-7xl"
                    >
                      HIMANK ARORA
                    </motion.h1>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {showIcons && (
                    <motion.div
                      key="welcome-icons"
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        layout: layoutTransition,
                        opacity: { duration: 0.55, ease: softEase },
                        y: { duration: 0.65, ease: softEase },
                      }}
                      className="flex items-center justify-center gap-7 sm:gap-10 lg:gap-14"
                    >
                      {creativityIcons.map(({ Icon, color, label }, index) => (
                        <motion.div
                          key={label}
                          variants={iconVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          className="flex flex-col items-center gap-2.5 sm:gap-3"
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-xl sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
                          >
                            <Icon size={20} className="text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                          </div>
                          <span className="text-xs font-medium text-white sm:text-sm">{label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {showFinalText && (
                    <motion.p
                      key="welcome-final"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        layout: layoutTransition,
                        opacity: { duration: 0.55, ease: softEase },
                        y: { duration: 0.65, ease: softEase },
                      }}
                      className="px-4 text-center text-base text-gray-300 sm:text-xl lg:text-2xl"
                    >
                      Welcome to my world...
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtistWelcome;
