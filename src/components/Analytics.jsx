// components/Analytics.jsx - Analytics and Performance Monitoring
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Implementation
export const initializeGA = (measurementId) => {
  if (typeof window === 'undefined' || !measurementId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });

  // Make gtag available globally
  window.gtag = gtag;

  console.log('✅ Google Analytics initialized:', measurementId);
};

// Page view tracking
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: `${window.location.origin}${path}`,
      page_path: path
    });
    console.log('📊 Page view tracked:', path);
  }
};

// Custom event tracking
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      custom_parameter_1: window.location.pathname
    });
    console.log('🎯 Event tracked:', { action, category, label, value });
  }
};

// Portfolio-specific event tracking
export const trackPortfolioEvents = {
  // Project interactions
  projectView: (projectId, projectTitle) => {
    trackEvent('project_view', 'portfolio', projectId);
    trackEvent('project_title_view', 'portfolio', projectTitle);
  },
  
  projectDemo: (projectId, demoUrl) => {
    trackEvent('demo_click', 'portfolio', projectId);
    trackEvent('external_link', 'navigation', demoUrl);
  },
  
  projectGithub: (projectId, repoUrl) => {
    trackEvent('github_click', 'portfolio', projectId);
    trackEvent('external_link', 'navigation', repoUrl);
  },

  // Resume and contact
  resumeDownload: () => {
    trackEvent('resume_download', 'engagement', 'pdf_download');
  },
  
  contactForm: (method) => {
    trackEvent('contact_attempt', 'engagement', method);
  },
  
  socialClick: (platform, url) => {
    trackEvent('social_click', 'social_media', platform);
    trackEvent('external_link', 'navigation', url);
  },

  // Video interactions (Artist section)
  videoPlay: (videoId, videoTitle, source = 'portfolio') => {
    trackEvent('video_play', 'video', videoId);
    trackEvent('video_title_play', 'video', videoTitle);
    trackEvent('video_source', 'video', source);
  },
  
  videoSwap: (fromVideoId, toVideoId) => {
    trackEvent('video_swap', 'video', `${fromVideoId}_to_${toVideoId}`);
  },
  
  channelVisit: (channelType, channelUrl) => {
    trackEvent('channel_visit', 'video', channelType);
    trackEvent('external_link', 'navigation', channelUrl);
  },

  // Navigation and engagement
  tabSwitch: (fromTab, toTab) => {
    trackEvent('tab_switch', 'navigation', `${fromTab}_to_${toTab}`);
  },
  
  sectionView: (sectionName) => {
    trackEvent('section_view', 'engagement', sectionName);
  },
  
  timeOnPage: (timeInSeconds, pagePath) => {
    trackEvent('time_on_page', 'engagement', pagePath, timeInSeconds);
  },

  // Performance tracking
  pageLoadTime: (loadTime, pagePath) => {
    trackEvent('page_load_time', 'performance', pagePath, loadTime);
  },
  
  cacheHit: (cacheType, hit = true) => {
    trackEvent(hit ? 'cache_hit' : 'cache_miss', 'performance', cacheType);
  }
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  // Page load metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      const firstPaint = window.performance.getEntriesByType('paint')[0];
      
      // Track core web vitals
      trackPortfolioEvents.pageLoadTime(Math.round(loadTime), window.location.pathname);
      
      // Track detailed performance
      if (window.gtag) {
        window.gtag('event', 'page_load_performance', {
          event_category: 'performance',
          custom_load_time: loadTime,
          custom_dom_ready: domReady,
          custom_first_paint: firstPaint ? firstPaint.startTime : 0,
          page_path: window.location.pathname
        });
      }
      
      console.log('⚡ Performance tracked:', {
        loadTime: `${loadTime}ms`,
        domReady: `${domReady}ms`,
        firstPaint: firstPaint ? `${Math.round(firstPaint.startTime)}ms` : 'N/A'
      });
    }, 100);
  });

  // Core Web Vitals (LCP, FID, CLS)
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        trackEvent('core_web_vital_cls', 'performance', 'cumulative_layout_shift', Math.round(metric.value * 1000));
      });
      
      getFID((metric) => {
        trackEvent('core_web_vital_fid', 'performance', 'first_input_delay', Math.round(metric.value));
      });
      
      getLCP((metric) => {
        trackEvent('core_web_vital_lcp', 'performance', 'largest_contentful_paint', Math.round(metric.value));
      });
      
      getFCP((metric) => {
        trackEvent('core_web_vital_fcp', 'performance', 'first_contentful_paint', Math.round(metric.value));
      });
      
      getTTFB((metric) => {
        trackEvent('core_web_vital_ttfb', 'performance', 'time_to_first_byte', Math.round(metric.value));
      });
    });
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message || error.toString(),
      fatal: false,
      custom_error_boundary: errorInfo.componentStack ? true : false,
      page_path: window.location.pathname
    });
    
    console.error('🚨 Error tracked:', error, errorInfo);
  }
};

// Analytics Hook
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname, document.title);
    
    // Track section view based on path
    const sectionName = location.pathname === '/' ? 'home' : 
                       location.pathname.startsWith('/tech') ? 'tech_portfolio' :
                       location.pathname.startsWith('/artist') ? 'artist_portfolio' : 'unknown';
    
    trackPortfolioEvents.sectionView(sectionName);
    
    // Track time on page
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackPortfolioEvents.timeOnPage(timeSpent, location.pathname);
      }
    };
  }, [location]);

  return {
    trackEvent,
    trackPortfolioEvents,
    trackError,
    trackPageView
  };
};

// Analytics Provider Component
export const AnalyticsProvider = ({ children, measurementId }) => {
  useEffect(() => {
    if (measurementId) {
      initializeGA(measurementId);
      trackPerformance();
    }
  }, [measurementId]);

  return children;
};

// HOC for automatic event tracking
export const withAnalytics = (WrappedComponent, eventConfig = {}) => {
  return function AnalyticsWrappedComponent(props) {
    const analytics = useAnalytics();
    
    const enhancedProps = {
      ...props,
      analytics,
      // Auto-track common events
      onClick: (e) => {
        if (eventConfig.trackClicks) {
          const target = e.currentTarget;
          const trackingData = target.getAttribute('data-track') || 
                              target.textContent || 
                              target.getAttribute('aria-label') || 
                              'unknown_click';
          analytics.trackEvent('click', eventConfig.category || 'ui', trackingData);
        }
        if (props.onClick) props.onClick(e);
      }
    };
    
    return <WrappedComponent {...enhancedProps} />;
  };
};

// Utility functions for common tracking scenarios
export const trackLinkClick = (url, label) => {
  const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
  trackEvent(isExternal ? 'external_link' : 'internal_link', 'navigation', label || url);
};

export const trackDownload = (filename, filetype = 'unknown') => {
  trackEvent('download', 'engagement', filename, 0);
  trackEvent('file_download', 'engagement', filetype);
};

export const trackSearch = (query, resultsCount = 0) => {
  trackEvent('search', 'engagement', query, resultsCount);
};

export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', 'engagement', formName);
  trackEvent(success ? 'form_success' : 'form_error', 'engagement', formName);
};

// Debug mode for development
export const enableAnalyticsDebug = () => {
  if (typeof window !== 'undefined') {
    window.gtag_debug = true;
    console.log('🔍 Analytics debug mode enabled');
  }
};

export default useAnalytics;