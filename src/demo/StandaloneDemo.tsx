import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PlatformDemo from './PlatformDemo';
import { ApiProvider } from './standalone/contexts/ApiContext';

// Import standalone styles
import './standalone/styles.css';

/**
 * StandaloneDemo is the entry point for the demo when running as a standalone application.
 * It sets up all necessary providers and routing.
 */
const StandaloneDemo: React.FC = () => {
  // Set the standalone flag
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).isEquihomeDemoStandalone = true;
    }
  }, []);

  return (
    <ApiProvider>
      <Router>
        <div className="demo-standalone-container">
          <Routes>
            <Route path="/*" element={<PlatformDemo />} />
          </Routes>
        </div>
      </Router>
    </ApiProvider>
  );
};

export default StandaloneDemo;
