import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async'; // NEW
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import TechPage from './pages/TechPage';
import ArtistRoutes from './pages/Artist/ArtistRoutes';
import SEO from './components/SEO'; // NEW
import { AnalyticsProvider, useAnalytics } from './components/Analytics'; // NEW
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
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isArtistPage = location.pathname.startsWith('/artist');
  const isTechPage = location.pathname.startsWith('/tech');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Add SEO component to every page */}
      <SEO />
      
      {!isHomePage && !isArtistPage && !isTechPage && <Navigation />}
      
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/artist/*" element={<ArtistRoutes />} />
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
      <HelmetProvider> {/* NEW - Wrap everything in HelmetProvider */}
        <ThemeProvider>
          <AnalyticsProvider measurementId={process.env.REACT_APP_GA_MEASUREMENT_ID}> {/* NEW */}
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