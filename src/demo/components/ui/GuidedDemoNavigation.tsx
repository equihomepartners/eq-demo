import React, { useState, useEffect } from 'react';
import { useGuidedDemo } from '../../context/GuidedDemoContext';
import { Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './button';

interface GuidedDemoNavigationProps {
  className?: string;
}

// Define a comprehensive navigation step
interface NavigationStep {
  id: string;
  type: 'main-tab' | 'sub-tab' | 'cta';
  mainTab: string;
  subTab?: string;
  cta?: string;
  label: string;
  description: string;
  nextId?: string;
  prevId?: string;
}

const GuidedDemoNavigation: React.FC<GuidedDemoNavigationProps> = ({ className = '' }) => {
  const {
    currentStep,
    currentTab,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    stepTitle,
    stepDescription
  } = useGuidedDemo();

  // Define the complete demo flow with all steps, sub-tabs, and CTAs
  const demoFlow: NavigationStep[] = [
    // Introduction
    {
      id: 'intro',
      type: 'main-tab',
      mainTab: 'intro',
      label: 'Introduction',
      description: 'Overview of the Equihome platform'
    },

    // Loan Application - Borrower Information
    {
      id: 'application-borrower',
      type: 'sub-tab',
      mainTab: 'underwriting-application',
      subTab: 'borrower',
      label: 'Borrower Information',
      description: 'Enter borrower details'
    },

    // Loan Application - Property Information
    {
      id: 'application-property',
      type: 'sub-tab',
      mainTab: 'underwriting-application',
      subTab: 'property',
      label: 'Property Information',
      description: 'Enter property details'
    },

    // Loan Application - Loan Information
    {
      id: 'application-loan',
      type: 'sub-tab',
      mainTab: 'underwriting-application',
      subTab: 'loan',
      label: 'Loan Information',
      description: 'Enter loan details'
    },

    // Loan Application - Submit
    {
      id: 'application-submit',
      type: 'cta',
      mainTab: 'underwriting-application',
      subTab: 'loan',
      cta: 'submit',
      label: 'Submit Application',
      description: 'Submit the loan application'
    },

    // Traffic Light - Run Analysis
    {
      id: 'traffic-light-run',
      type: 'cta',
      mainTab: 'traffic-light-analysis',
      cta: 'run-analysis',
      label: 'Run Traffic Light Analysis',
      description: 'Analyze the suburb using the Traffic Light System'
    },

    // Traffic Light - Overview Tab
    {
      id: 'traffic-light-overview',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'overview',
      label: 'Traffic Light Overview',
      description: 'View the Traffic Light analysis results'
    },

    // Traffic Light - Metrics Tab
    {
      id: 'traffic-light-metrics',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'metrics',
      label: 'Traffic Light Metrics',
      description: 'View detailed metrics for the suburb'
    },

    // Traffic Light - Forecast Tab
    {
      id: 'traffic-light-forecast',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'forecast',
      label: 'Traffic Light Forecast',
      description: 'View growth forecasts for the suburb'
    },

    // Traffic Light - ML Decision Tab
    {
      id: 'traffic-light-ml-decision',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'ml-decision',
      label: 'ML Decision',
      description: 'View the machine learning decision'
    },

    // Traffic Light - Decision Engine Tab
    {
      id: 'traffic-light-decision-engine',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'decision-engine',
      label: 'Decision Engine',
      description: 'View the decision engine analysis'
    },

    // Traffic Light - Pipeline Tab
    {
      id: 'traffic-light-pipeline',
      type: 'sub-tab',
      mainTab: 'traffic-light-analysis',
      subTab: 'pipeline',
      label: 'Pipeline',
      description: 'View the loan pipeline'
    },

    // Portfolio Impact - Overview Tab
    {
      id: 'portfolio-impact-overview',
      type: 'sub-tab',
      mainTab: 'portfolio-impact',
      subTab: 'overview',
      label: 'Portfolio Impact Overview',
      description: 'View the impact on the portfolio'
    },

    // Portfolio Impact - Diversification Tab
    {
      id: 'portfolio-impact-diversification',
      type: 'sub-tab',
      mainTab: 'portfolio-impact',
      subTab: 'diversification',
      label: 'Portfolio Diversification',
      description: 'View the impact on portfolio diversification'
    },

    // Portfolio Impact - Risk Tab
    {
      id: 'portfolio-impact-risk',
      type: 'sub-tab',
      mainTab: 'portfolio-impact',
      subTab: 'risk',
      label: 'Portfolio Risk',
      description: 'View the impact on portfolio risk'
    },

    // Portfolio Impact - Decision Tab
    {
      id: 'portfolio-impact-decision',
      type: 'sub-tab',
      mainTab: 'portfolio-impact',
      subTab: 'decision',
      label: 'Portfolio Decision',
      description: 'View the portfolio decision'
    },

    // Simulation - Scenarios Tab
    {
      id: 'simulation-scenarios',
      type: 'sub-tab',
      mainTab: 'simulation',
      subTab: 'scenarios',
      label: 'Simulation Scenarios',
      description: 'View different simulation scenarios'
    },

    // Simulation - Run Simulation CTA
    {
      id: 'simulation-run',
      type: 'cta',
      mainTab: 'simulation',
      subTab: 'scenarios',
      cta: 'run-simulation',
      label: 'Run Simulation',
      description: 'Run the simulation'
    },

    // Simulation - Monte Carlo Tab
    {
      id: 'simulation-monte-carlo',
      type: 'sub-tab',
      mainTab: 'simulation',
      subTab: 'monte-carlo',
      label: 'Monte Carlo Simulation',
      description: 'View Monte Carlo simulation results'
    },

    // Simulation - Sensitivity Tab
    {
      id: 'simulation-sensitivity',
      type: 'sub-tab',
      mainTab: 'simulation',
      subTab: 'sensitivity',
      label: 'Sensitivity Analysis',
      description: 'View sensitivity analysis'
    },

    // Simulation - Decision Tab
    {
      id: 'simulation-decision',
      type: 'sub-tab',
      mainTab: 'simulation',
      subTab: 'decision',
      label: 'Simulation Decision',
      description: 'View the simulation decision'
    },

    // Underwriting Decision - Overview Tab
    {
      id: 'underwriting-decision-overview',
      type: 'sub-tab',
      mainTab: 'underwriting-decision',
      subTab: 'overview',
      label: 'Decision Overview',
      description: 'View the underwriting decision overview'
    },

    // Underwriting Decision - Factors Tab
    {
      id: 'underwriting-decision-factors',
      type: 'sub-tab',
      mainTab: 'underwriting-decision',
      subTab: 'factors',
      label: 'Decision Factors',
      description: 'View the factors that influenced the decision'
    },

    // Underwriting Decision - Terms Tab
    {
      id: 'underwriting-decision-terms',
      type: 'sub-tab',
      mainTab: 'underwriting-decision',
      subTab: 'terms',
      label: 'Loan Terms',
      description: 'View the approved loan terms'
    },

    // Executive Summary - Dashboard Tab
    {
      id: 'executive-summary-dashboard',
      type: 'sub-tab',
      mainTab: 'executive-summary',
      subTab: 'dashboard',
      label: 'Executive Dashboard',
      description: 'View the executive dashboard'
    },

    // Executive Summary - Portfolio Tab
    {
      id: 'executive-summary-portfolio',
      type: 'sub-tab',
      mainTab: 'executive-summary',
      subTab: 'portfolio',
      label: 'Portfolio Status',
      description: 'View the portfolio status'
    },

    // Executive Summary - Pipeline Tab
    {
      id: 'executive-summary-pipeline',
      type: 'sub-tab',
      mainTab: 'executive-summary',
      subTab: 'pipeline',
      label: 'Loan Pipeline',
      description: 'View the loan pipeline'
    },

    // Executive Summary - Recommendations Tab
    {
      id: 'executive-summary-recommendations',
      type: 'sub-tab',
      mainTab: 'executive-summary',
      subTab: 'recommendations',
      label: 'Strategic Recommendations',
      description: 'View strategic recommendations'
    },

    // Complete
    {
      id: 'complete',
      type: 'main-tab',
      mainTab: 'complete',
      label: 'Demo Complete',
      description: 'Demo completion with options to restart or explore'
    }
  ];

  // Link the steps together to form a flow
  for (let i = 0; i < demoFlow.length; i++) {
    if (i > 0) {
      demoFlow[i].prevId = demoFlow[i - 1].id;
    }
    if (i < demoFlow.length - 1) {
      demoFlow[i].nextId = demoFlow[i + 1].id;
    }
  }

  // Current step in the demo flow
  const [currentStepId, setCurrentStepId] = useState('intro');

  // Get the current step from the flow
  const currentFlowStep = demoFlow.find(step => step.id === currentStepId) || demoFlow[0];

  // Get the next and previous steps
  const nextFlowStep = currentFlowStep.nextId ? demoFlow.find(step => step.id === currentFlowStep.nextId) : undefined;
  const prevFlowStep = currentFlowStep.prevId ? demoFlow.find(step => step.id === currentFlowStep.prevId) : undefined;

  // Function to handle navigation to a specific step
  const navigateToStep = (step: NavigationStep) => {
    // First, navigate to the main tab
    const demoAdvanceEvent = new CustomEvent('demo-advance', {
      detail: { nextStep: step.mainTab }
    });
    window.dispatchEvent(demoAdvanceEvent);

    // Then, if there's a sub-tab, select it
    if (step.subTab) {
      setTimeout(() => {
        const tabElements = document.querySelectorAll(`[role="tab"][value="${step.subTab}"]`);
        if (tabElements.length > 0) {
          (tabElements[0] as HTMLElement).click();
        }
      }, 100);
    }

    // Finally, if there's a CTA, click it
    if (step.cta) {
      setTimeout(() => {
        let ctaButton: HTMLElement | null = null;

        // Handle different CTAs
        if (step.cta === 'submit') {
          // Find the Submit Application button
          const submitButtons = Array.from(document.querySelectorAll('button')).filter(
            button => button.textContent?.includes('Submit Application')
          );
          if (submitButtons.length > 0) {
            ctaButton = submitButtons[0] as HTMLElement;
          }
        } else if (step.cta === 'run-analysis') {
          // Find the Run Analysis button
          const runButtons = Array.from(document.querySelectorAll('button')).filter(
            button => button.textContent?.includes('Run Analysis')
          );
          if (runButtons.length > 0) {
            ctaButton = runButtons[0] as HTMLElement;
          }
        } else if (step.cta === 'run-simulation') {
          // Find the Run Simulation button
          const simButtons = Array.from(document.querySelectorAll('button')).filter(
            button => button.textContent?.includes('Run Simulation')
          );
          if (simButtons.length > 0) {
            ctaButton = simButtons[0] as HTMLElement;
          }
        }

        // Click the CTA button if found
        if (ctaButton) {
          ctaButton.click();
        }
      }, 200);
    }

    // Update the current step ID
    setCurrentStepId(step.id);

    console.log(`Navigating to: ${step.label} (${step.id})`);
  };

  // Function to handle next button click
  const handleNext = () => {
    if (nextFlowStep) {
      navigateToStep(nextFlowStep);
    }
  };

  // Function to handle previous button click
  const handlePrev = () => {
    if (prevFlowStep) {
      navigateToStep(prevFlowStep);
    }
  };

  // Detect the current state of the UI and update the current step ID
  useEffect(() => {
    // Get the current main tab
    const mainTabValue = currentTab.toString();

    // Get the current sub-tab
    let currentSubTab: string | undefined;
    const activeTabElements = document.querySelectorAll('[role="tab"][aria-selected="true"]');
    if (activeTabElements.length > 0) {
      const activeTab = activeTabElements[0] as HTMLElement;
      currentSubTab = activeTab.getAttribute('value') || undefined;
    }

    // Find the matching step in the flow
    const matchingStep = demoFlow.find(step => {
      // Match main tab
      if (step.mainTab !== mainTabValue) return false;

      // If the step has a sub-tab, it must match the current sub-tab
      if (step.subTab && step.subTab !== currentSubTab) return false;

      // If the step has a CTA, we can't detect it automatically, so we'll rely on the navigation functions

      return true;
    });

    // Update the current step ID if a matching step was found
    if (matchingStep) {
      setCurrentStepId(matchingStep.id);
    }
  }, [currentTab, currentStep]);

  return (
    <div className="fixed bottom-8 right-8 flex items-center space-x-4 z-50">
      {/* Current step indicator with progress */}
      <div className="bg-white shadow-md rounded-lg px-4 py-2 hidden md:block">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">{currentFlowStep.label}</div>
            <div className="text-xs text-gray-500">{currentFlowStep.description}</div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-white shadow-md hover:bg-gray-100 ${
            !prevFlowStep ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={handlePrev}
          disabled={!prevFlowStep}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Tooltip */}
        {prevFlowStep && (
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Previous: {prevFlowStep.label}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="relative group">
        <Button
          variant="default"
          size="icon"
          className={`rounded-full bg-blue-600 shadow-md hover:bg-blue-700 ${
            !nextFlowStep ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={handleNext}
          disabled={!nextFlowStep}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Tooltip */}
        {nextFlowStep && (
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Next: {nextFlowStep.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedDemoNavigation;
