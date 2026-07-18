import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import TechPage from './pages/TechPage';
import ArtistRoutes from './pages/Artist/ArtistRoutes';
import LegalPage from './pages/LegalPage';
import SEO from './components/SEO';
import { AnalyticsProvider, useAnalytics } from './components/Analytics';
import { ThemeProvider } from './context/ThemeContext';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const analytics = useAnalytics();
  
  React.useEffect(() => {
    if (analytics?.trackError) {
      analytics.trackError(error);
    }
  }, [error, analytics]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-400 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-[#05070b]">
      <SEO />
      
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/artist/*" element={<ArtistRoutes />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/sitemap" element={<LegalPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
      }}
    >
      <HelmetProvider>
        <ThemeProvider>
          <AnalyticsProvider measurementId={process.env.REACT_APP_GA_MEASUREMENT_ID}>
            <Router>
              <AppContent />
            </Router>
          </AnalyticsProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;