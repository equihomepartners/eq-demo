import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  RefreshCw,
  Home,
  FileText,
  MapPin,
  BarChart2,
  Settings,
  Users,
  Bell,
  Search,
  HelpCircle
} from 'lucide-react';

// Demo components
import DemoIntro from './components/DemoIntro';
import UnderwritingDemo from './components/underwriting/UnderwritingDemo';
import DataSciencePipeline from './components/pipeline/DataSciencePipeline';
import TrafficLightDemo from './components/traffic-light/TrafficLightDemo';
import PortfolioDemo from './components/portfolio/PortfolioDemo';
import ExecutiveSummary from './components/summary/ExecutiveSummary';
import DemoNavigation from './components/DemoNavigation';
import DemoContext from './context/DemoContext';
import { GuidedDemoProvider, useGuidedDemo, DemoTab } from './context/GuidedDemoContext';
import GuidedDemoNavigation from './components/ui/GuidedDemoNavigation';
import DemoNavigationWithGuidedButtons from './components/DemoNavigationWithGuidedButtons';
import FloatingNextButton from './components/ui/FloatingNextButton';

// Mock data
import { mockLoanApplication, mockSuburbData, mockDecisionResult } from './data/mockData';

// Demo steps
const DEMO_STEPS = [
  'intro',
  'underwriting-application',
  'data-science-pipeline',
  'traffic-light-analysis',
  'portfolio-analysis',
  'underwriting-decision',
  'executive-summary',
  'complete'
];

const PlatformDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('intro');
  const [showInfo, setShowInfo] = useState(false);
  const [activeSystem, setActiveSystem] = useState('dashboard');
  const [demoState, setDemoState] = useState({
    application: mockLoanApplication,
    suburbData: mockSuburbData,
    decisionResult: mockDecisionResult,
    portfolioImpact: null,
    simulationResult: null
  });

  // Update demo state
  const updateDemoState = (newState: any) => {
    setDemoState(prev => ({ ...prev, ...newState }));
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setActiveTab(DEMO_STEPS[nextStep]);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setActiveTab(DEMO_STEPS[prevStep]);
    }
  };

  // Reset demo
  const resetDemo = () => {
    setCurrentStep(0);
    setActiveTab('intro');
    setDemoState({
      application: mockLoanApplication,
      suburbData: mockSuburbData,
      decisionResult: mockDecisionResult,
      portfolioImpact: null,
      simulationResult: null
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newStepIndex = DEMO_STEPS.indexOf(value);
    if (newStepIndex !== -1) {
      setCurrentStep(newStepIndex);

      // Update the guided demo context as well
      try {
        const { setCurrentStep, DemoStep } = require('./context/GuidedDemoContext');
        // Map tab values to guided demo steps
        const tabToStepMap: Record<string, string> = {
          'intro': 'underwriting-intro',
          'underwriting-application': 'underwriting-application',
          'traffic-light-analysis': 'traffic-light-analysis',
          'portfolio-impact': 'portfolio-impact',
          'simulation': 'simulation-intro',
          'underwriting-decision': 'underwriting-decision',
          'executive-summary': 'portfolio-metrics',
          'complete': 'complete'
        };

        if (tabToStepMap[value]) {
          // This is a safe operation that won't throw if the context isn't ready
          window.setTimeout(() => {
            try {
              const guidedDemoContext = document.querySelector('[data-guided-demo-context]');
              if (guidedDemoContext && guidedDemoContext.__guidedDemoContext) {
                guidedDemoContext.__guidedDemoContext.setCurrentStep(tabToStepMap[value]);
              }
            } catch (e) {
              console.log('Could not update guided demo context, but that\'s ok');
            }
          }, 0);
        }
      } catch (e) {
        console.log('Could not import guided demo context, but that\'s ok');
      }
    }
  };

  // Listen for demo-advance events
  React.useEffect(() => {
    const handleDemoAdvance = (event: any) => {
      const { nextStep } = event.detail;
      if (nextStep && DEMO_STEPS.includes(nextStep)) {
        setActiveTab(nextStep);
        setCurrentStep(DEMO_STEPS.indexOf(nextStep));
      }
    };

    window.addEventListener('demo-advance', handleDemoAdvance);

    return () => {
      window.removeEventListener('demo-advance', handleDemoAdvance);
    };
  }, []);

  return (
    <DemoContext.Provider value={{ demoState, updateDemoState }}>
      <GuidedDemoProvider>
        <div className="flex flex-col min-h-screen">
          {/* Floating Next Button removed in favor of GuidedDemoNavigation */}
        {/* Platform Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="flex items-center space-x-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      {/* Roof */}
                      <path
                        d="M10 50L50 10L90 50"
                        stroke="#0047AB"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      {/* Green Squares */}
                      <rect x="35" y="55" width="12" height="12" rx="3" fill="#4ade80" />
                      <rect x="53" y="55" width="12" height="12" rx="3" fill="#4ade80" />
                      <rect x="35" y="73" width="12" height="12" rx="3" fill="#4ade80" />
                      <rect x="53" y="73" width="12" height="12" rx="3" fill="#4ade80" />
                    </svg>
                    <span className="text-xl font-semibold text-gray-900">
                      Equihome Partners
                    </span>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <div
                    className={`inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-gray-900 text-sm font-medium`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </div>
                  <div
                    className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 text-sm font-medium`}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Underwriting
                  </div>
                  <div
                    className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 text-sm font-medium`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Traffic Light
                  </div>
                  <div
                    className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 text-sm font-medium`}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Portfolio
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <Search className="h-5 w-5" />
                  </button>
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <HelpCircle className="h-5 w-5" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                      EP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Demo Controls */}
        <div className="bg-gray-50 border-b border-gray-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Equihome Platform Demo</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  About Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetDemo}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* System Content */}
            {activeSystem !== 'dashboard' && (
              <div className="mb-6">
                {activeSystem === 'underwriting' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Underwriting System</h2>
                        <p className="text-gray-500">Manage loan applications and underwriting decisions</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setActiveSystem('dashboard')}>
                          Back to Dashboard
                        </Button>
                      </div>
                    </div>

                    <Tabs defaultValue="dashboard" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                        <TabsTrigger value="application">New Application</TabsTrigger>
                      </TabsList>
                      <TabsContent value="dashboard">
                        <UnderwritingDemo.Dashboard />
                      </TabsContent>
                      <TabsContent value="pipeline">
                        <UnderwritingDemo.Pipeline />
                      </TabsContent>
                      <TabsContent value="application">
                        <UnderwritingDemo.Application />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {activeSystem === 'traffic-light' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Traffic Light System</h2>
                        <p className="text-gray-500">Analyze suburbs and investment opportunities</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setActiveSystem('dashboard')}>
                          Back to Dashboard
                        </Button>
                      </div>
                    </div>

                    <TrafficLightDemo.Analysis />
                  </div>
                )}

                {activeSystem === 'portfolio' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
                        <p className="text-gray-500">Manage loan portfolio and analyze performance</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setActiveSystem('dashboard')}>
                          Back to Dashboard
                        </Button>
                      </div>
                    </div>

                    <PortfolioDemo.Analysis />
                  </div>
                )}
              </div>
            )}

            {/* Demo Content */}
            {activeSystem === 'dashboard' && (
              <>
                {showInfo && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">About This Demo</h2>
                    <p className="text-blue-700 mb-2">
                      This interactive demo showcases the complete workflow of the Equihome platform, from loan application submission through the underwriting process, traffic light system integration, and portfolio management.
                    </p>
                    <p className="text-blue-700">
                      Follow the guided tour to see how each system works together to create a comprehensive property investment platform.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-blue-700"
                      onClick={() => setShowInfo(false)}
                    >
                      Close
                    </Button>
                  </div>
                )}

                {/* Old Demo Navigation removed in favor of GuidedDemoNavigation */}



                <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
                  <TabsList className="grid grid-cols-8 mb-6">
                    <TabsTrigger value="intro">Intro</TabsTrigger>
                    <TabsTrigger value="underwriting-application">Application</TabsTrigger>
                    <TabsTrigger value="data-science-pipeline">Data Science</TabsTrigger>
                    <TabsTrigger value="traffic-light-analysis">Traffic Light</TabsTrigger>
                    <TabsTrigger value="portfolio-analysis">Portfolio Analysis</TabsTrigger>
                    <TabsTrigger value="underwriting-decision">Decision</TabsTrigger>
                    <TabsTrigger value="executive-summary">Summary</TabsTrigger>
                    <TabsTrigger value="complete">Complete</TabsTrigger>
                  </TabsList>

          <TabsContent value="intro">
            <DemoIntro />
          </TabsContent>

          <TabsContent value="underwriting-application">
            <UnderwritingDemo.Application />
          </TabsContent>

          <TabsContent value="data-science-pipeline">
            <DataSciencePipeline />
          </TabsContent>

          <TabsContent value="traffic-light-analysis">
            <TrafficLightDemo.Analysis />
          </TabsContent>

          <TabsContent value="underwriting-decision">
            <UnderwritingDemo.Decision />
          </TabsContent>

          <TabsContent value="portfolio-analysis">
            <PortfolioDemo.Analysis />
          </TabsContent>

          <TabsContent value="executive-summary">
            <ExecutiveSummary />
          </TabsContent>

          <TabsContent value="complete">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Complete!</h2>
              <p className="text-gray-600 mb-8">
                You've completed the Equihome platform demo. You can now restart the demo or explore specific sections.
              </p>
              <Button onClick={resetDemo}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart Demo
              </Button>

              {/* Navigation guidance */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-12 max-w-3xl mx-auto text-left">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blue-900">Demo Summary</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Congratulations on completing the Equihome platform demo! You've experienced the full loan analysis workflow:
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 list-disc pl-5 space-y-1">
                      <li>Loan Application - Capturing borrower, property, and loan details</li>
                      <li>Data Science Pipeline - Exploring the sophisticated ML pipeline powering our investment thesis</li>
                      <li>Traffic Light Analysis - Evaluating suburbs using the Traffic Light System</li>
                      <li>Portfolio Analysis - Analyzing portfolio impact, running simulations, and making investment decisions</li>
                      <li>Underwriting Decision - Making the final loan decision</li>
                      <li>Executive Summary - Comprehensive overview of the entire analysis</li>
                    </ul>
                    <p className="text-sm text-blue-700 mt-2">
                      You can click the "Restart Demo" button above to start over, or use the tabs at the top to revisit specific sections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

                {/* Navigation removed as requested */}
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                &copy; 2025 Equihome Partners. All rights reserved.
              </div>
              <div className="text-sm text-gray-500">
                Demo Version 1.0
              </div>
            </div>
          </div>
        </footer>
      </div>
      </GuidedDemoProvider>
    </DemoContext.Provider>
  );
};

export default PlatformDemo;
