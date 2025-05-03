import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the steps in the demo flow
export enum DemoStep {
  // Underwriting steps
  UnderwritingIntro = 'underwriting-intro',
  UnderwritingApplication = 'underwriting-application',
  UnderwritingAnalysis = 'underwriting-analysis',
  UnderwritingDecision = 'underwriting-decision',

  // Traffic Light steps
  TrafficLightIntro = 'traffic-light-intro',
  TrafficLightMap = 'traffic-light-map',
  TrafficLightAnalysis = 'traffic-light-analysis',

  // Portfolio steps
  PortfolioIntro = 'portfolio-intro',
  PortfolioImpact = 'portfolio-impact',
  PortfolioMetrics = 'portfolio-metrics',

  // Simulation steps
  SimulationIntro = 'simulation-intro',
  SimulationMonteCarlo = 'simulation-monte-carlo',
  SimulationEfficientFrontier = 'simulation-efficient-frontier',

  // Final step
  Complete = 'complete'
}

// Define the tabs in the demo
export enum DemoTab {
  Underwriting = 'underwriting',
  TrafficLight = 'traffic-light',
  Portfolio = 'portfolio',
  Simulation = 'simulation'
}

// Define the context type
interface GuidedDemoContextType {
  currentStep: DemoStep;
  currentTab: DemoTab;
  setCurrentStep: (step: DemoStep) => void;
  setCurrentTab: (tab: DemoTab) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepDescription: string;
  stepTitle: string;
}

// Create the context
const GuidedDemoContext = createContext<GuidedDemoContextType | undefined>(undefined);

// Define the step flow
const stepFlow: DemoStep[] = [
  DemoStep.UnderwritingIntro,
  DemoStep.UnderwritingApplication,
  DemoStep.UnderwritingAnalysis,
  DemoStep.UnderwritingDecision,
  DemoStep.TrafficLightIntro,
  DemoStep.TrafficLightMap,
  DemoStep.TrafficLightAnalysis,
  DemoStep.PortfolioIntro,
  DemoStep.PortfolioImpact,
  DemoStep.PortfolioMetrics,
  DemoStep.SimulationIntro,
  DemoStep.SimulationMonteCarlo,
  DemoStep.SimulationEfficientFrontier,
  DemoStep.Complete
];

// Map steps to tabs
const stepToTab: Record<DemoStep, DemoTab> = {
  [DemoStep.UnderwritingIntro]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplication]: DemoTab.Underwriting,
  [DemoStep.UnderwritingAnalysis]: DemoTab.Underwriting,
  [DemoStep.UnderwritingDecision]: DemoTab.Underwriting,
  [DemoStep.TrafficLightIntro]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightMap]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightAnalysis]: DemoTab.TrafficLight,
  [DemoStep.PortfolioIntro]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpact]: DemoTab.Portfolio,
  [DemoStep.PortfolioMetrics]: DemoTab.Portfolio,
  [DemoStep.SimulationIntro]: DemoTab.Simulation,
  [DemoStep.SimulationMonteCarlo]: DemoTab.Simulation,
  [DemoStep.SimulationEfficientFrontier]: DemoTab.Simulation,
  [DemoStep.Complete]: DemoTab.Portfolio
};

// Step descriptions
const stepDescriptions: Record<DemoStep, { title: string, description: string }> = {
  [DemoStep.UnderwritingIntro]: {
    title: "Welcome to the Underwriting System",
    description: "This is where loan applications are received and processed. Let's start by reviewing a new application."
  },
  [DemoStep.UnderwritingApplication]: {
    title: "Loan Application Review",
    description: "Here we can see the details of the loan application, including borrower information, property details, and loan terms."
  },
  [DemoStep.UnderwritingAnalysis]: {
    title: "Application Analysis",
    description: "Our system analyzes the application against various criteria, including credit score, property location, and loan-to-value ratio."
  },
  [DemoStep.UnderwritingDecision]: {
    title: "Decision Engine",
    description: "The decision engine provides a recommendation based on the analysis, showing key factors that influenced the decision."
  },
  [DemoStep.TrafficLightIntro]: {
    title: "Traffic Light System",
    description: "The Traffic Light System helps identify optimal investment areas based on various metrics and data points."
  },
  [DemoStep.TrafficLightMap]: {
    title: "Geographic Analysis",
    description: "This map shows Sydney suburbs color-coded by investment potential, with green indicating high potential areas."
  },
  [DemoStep.TrafficLightAnalysis]: {
    title: "Suburb Metrics",
    description: "Detailed metrics for each suburb, including liquidity, growth potential, infrastructure, and risk factors."
  },
  [DemoStep.PortfolioIntro]: {
    title: "Portfolio Management",
    description: "The Portfolio Management System tracks all loans and provides insights into portfolio performance."
  },
  [DemoStep.PortfolioImpact]: {
    title: "Portfolio Impact",
    description: "See how the new loan will impact the overall portfolio metrics, including IRR, risk profile, and diversification."
  },
  [DemoStep.PortfolioMetrics]: {
    title: "Portfolio Metrics",
    description: "Comprehensive metrics showing portfolio performance, allocation, and projected returns."
  },
  [DemoStep.SimulationIntro]: {
    title: "Simulation Engine",
    description: "The Simulation Engine allows us to model different scenarios and optimize portfolio allocation."
  },
  [DemoStep.SimulationMonteCarlo]: {
    title: "Monte Carlo Simulation",
    description: "This simulation runs thousands of scenarios to project portfolio performance with statistical confidence intervals."
  },
  [DemoStep.SimulationEfficientFrontier]: {
    title: "Efficient Frontier Analysis",
    description: "Modern Portfolio Theory analysis to find the optimal risk-return balance for the portfolio."
  },
  [DemoStep.Complete]: {
    title: "Demo Complete",
    description: "You've seen the complete workflow of the Equihome Platform, from loan application to portfolio optimization."
  }
};

// Provider component
export const GuidedDemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>(DemoStep.UnderwritingIntro);
  const [currentTab, setCurrentTab] = useState<DemoTab>(DemoTab.Underwriting);

  // Get the current step index
  const currentStepIndex = stepFlow.indexOf(currentStep);

  // Check if this is the first or last step
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepFlow.length - 1;

  // Get step description
  const stepTitle = stepDescriptions[currentStep].title;
  const stepDescription = stepDescriptions[currentStep].description;

  // Move to the next step
  const nextStep = () => {
    if (!isLastStep) {
      const nextStep = stepFlow[currentStepIndex + 1];
      setCurrentStep(nextStep);
      setCurrentTab(stepToTab[nextStep]);
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (!isFirstStep) {
      const prevStep = stepFlow[currentStepIndex - 1];
      setCurrentStep(prevStep);
      setCurrentTab(stepToTab[prevStep]);
    }
  };

  // Create a ref to the context value for external access
  const contextRef = React.useRef<GuidedDemoContextType>({
    currentStep,
    currentTab,
    setCurrentStep,
    setCurrentTab,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    stepDescription,
    stepTitle
  });

  // Update the ref when values change
  React.useEffect(() => {
    contextRef.current = {
      currentStep,
      currentTab,
      setCurrentStep,
      setCurrentTab,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      stepDescription,
      stepTitle
    };
  }, [currentStep, currentTab, isFirstStep, isLastStep, stepDescription, stepTitle]);

  // Expose the context to the window for external access
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const contextElement = document.createElement('div');
      contextElement.setAttribute('data-guided-demo-context', 'true');
      contextElement.style.display = 'none';
      document.body.appendChild(contextElement);

      // @ts-ignore - Add a non-standard property for external access
      contextElement.__guidedDemoContext = contextRef.current;

      return () => {
        document.body.removeChild(contextElement);
      };
    }
  }, []);

  return (
    <GuidedDemoContext.Provider
      value={{
        currentStep,
        currentTab,
        setCurrentStep,
        setCurrentTab,
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        stepDescription,
        stepTitle
      }}
    >
      {children}
    </GuidedDemoContext.Provider>
  );
};

// Hook to use the context
export const useGuidedDemo = () => {
  const context = useContext(GuidedDemoContext);
  if (context === undefined) {
    throw new Error('useGuidedDemo must be used within a GuidedDemoProvider');
  }
  return context;
};

export default GuidedDemoContext;
