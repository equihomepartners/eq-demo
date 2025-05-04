import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the steps in the demo flow
export enum DemoStep {
  // Introduction
  Introduction = 'introduction',

  // Underwriting steps
  UnderwritingIntro = 'underwriting-intro',
  UnderwritingApplication = 'underwriting-application',
  UnderwritingApplicationBorrower = 'underwriting-application-borrower',
  UnderwritingApplicationProperty = 'underwriting-application-property',
  UnderwritingApplicationLoan = 'underwriting-application-loan',
  UnderwritingApplicationSubmit = 'underwriting-application-submit',
  UnderwritingApplicationProcessing = 'underwriting-application-processing',
  UnderwritingApplicationComplete = 'underwriting-application-complete',
  UnderwritingDecision = 'underwriting-decision',
  UnderwritingDecisionOverview = 'underwriting-decision-overview',
  UnderwritingDecisionFactors = 'underwriting-decision-factors',
  UnderwritingDecisionTerms = 'underwriting-decision-terms',

  // Traffic Light steps
  TrafficLightIntro = 'traffic-light-intro',
  TrafficLightMap = 'traffic-light-map',
  TrafficLightMapView = 'traffic-light-map-view',
  TrafficLightMapSuburb = 'traffic-light-map-suburb',
  TrafficLightAnalysis = 'traffic-light-analysis',
  TrafficLightComparison = 'traffic-light-comparison',

  // Portfolio steps
  PortfolioIntro = 'portfolio-intro',
  PortfolioImpact = 'portfolio-impact',
  PortfolioImpactOverview = 'portfolio-impact-overview',
  PortfolioImpactDiversification = 'portfolio-impact-diversification',
  PortfolioImpactRisk = 'portfolio-impact-risk',
  PortfolioImpactDecision = 'portfolio-impact-decision',
  PortfolioMetrics = 'portfolio-metrics',

  // Simulation steps
  SimulationIntro = 'simulation-intro',
  SimulationScenarios = 'simulation-scenarios',
  SimulationMonteCarlo = 'simulation-monte-carlo',
  SimulationSensitivity = 'simulation-sensitivity',
  SimulationDecision = 'simulation-decision',

  // Executive Summary
  ExecutiveSummary = 'executive-summary',
  ExecutiveSummaryDashboard = 'executive-summary-dashboard',
  ExecutiveSummaryPortfolio = 'executive-summary-portfolio',
  ExecutiveSummaryPipeline = 'executive-summary-pipeline',
  ExecutiveSummaryRecommendations = 'executive-summary-recommendations',

  // Final step
  Complete = 'complete'
}

// Define the tabs in the demo
export enum DemoTab {
  Introduction = 'introduction',
  Underwriting = 'underwriting',
  TrafficLight = 'traffic-light',
  Portfolio = 'portfolio',
  Simulation = 'simulation',
  ExecutiveSummary = 'executive-summary',
  Complete = 'complete'
}

// Define the sub-tabs in each main tab
export enum DemoSubTab {
  // Underwriting Application
  BorrowerInfo = 'borrower-info',
  PropertyInfo = 'property-info',
  LoanDetails = 'loan-details',
  ReviewSubmit = 'review-submit',

  // Underwriting Decision
  DecisionOverview = 'decision-overview',
  DecisionFactors = 'decision-factors',
  DecisionTerms = 'decision-terms',

  // Traffic Light
  MapView = 'map-view',
  SuburbDetails = 'suburb-details',
  Comparison = 'comparison',

  // Portfolio Impact
  ImpactOverview = 'impact-overview',
  Diversification = 'diversification',
  Risk = 'risk',
  Decision = 'decision',

  // Simulation
  Scenarios = 'scenarios',
  MonteCarlo = 'monte-carlo',
  Sensitivity = 'sensitivity',
  SimulationDecision = 'simulation-decision',

  // Executive Summary
  Dashboard = 'dashboard',
  Portfolio = 'portfolio',
  Pipeline = 'pipeline',
  Recommendations = 'recommendations'
}

// Define the CTAs in each sub-tab
export enum DemoCTA {
  SubmitApplication = 'submit-application',
  SelectSuburb = 'select-suburb',
  RunSimulation = 'run-simulation',
  ViewDecision = 'view-decision',
  GenerateReport = 'generate-report'
}

// Define the detailed navigation step
export interface DetailedNavigationStep {
  mainTab: DemoTab;
  subTab?: DemoSubTab;
  cta?: DemoCTA;
  label: string;
  description: string;
  nextStep?: DetailedNavigationStep;
  prevStep?: DetailedNavigationStep;
}

// Define the context type
interface GuidedDemoContextType {
  // Main step tracking
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

  // Detailed navigation tracking
  currentSubTab?: DemoSubTab;
  currentCTA?: DemoCTA;
  setCurrentSubTab: (subTab: DemoSubTab | undefined) => void;
  setCurrentCTA: (cta: DemoCTA | undefined) => void;

  // Detailed navigation control
  currentDetailedStep: DetailedNavigationStep;
  nextDetailedStep: () => void;
  prevDetailedStep: () => void;
  isFirstDetailedStep: boolean;
  isLastDetailedStep: boolean;
}

// Create the context
const GuidedDemoContext = createContext<GuidedDemoContextType | undefined>(undefined);

// Define the step flow
const stepFlow: DemoStep[] = [
  DemoStep.Introduction,

  // Underwriting steps
  DemoStep.UnderwritingIntro,
  DemoStep.UnderwritingApplication,
  DemoStep.UnderwritingApplicationBorrower,
  DemoStep.UnderwritingApplicationProperty,
  DemoStep.UnderwritingApplicationLoan,
  DemoStep.UnderwritingApplicationSubmit,
  DemoStep.UnderwritingApplicationProcessing,
  DemoStep.UnderwritingApplicationComplete,

  // Traffic Light steps
  DemoStep.TrafficLightIntro,
  DemoStep.TrafficLightMap,
  DemoStep.TrafficLightMapView,
  DemoStep.TrafficLightMapSuburb,
  DemoStep.TrafficLightAnalysis,
  DemoStep.TrafficLightComparison,

  // Portfolio steps
  DemoStep.PortfolioIntro,
  DemoStep.PortfolioImpact,
  DemoStep.PortfolioImpactOverview,
  DemoStep.PortfolioImpactDiversification,
  DemoStep.PortfolioImpactRisk,
  DemoStep.PortfolioImpactDecision,

  // Simulation steps
  DemoStep.SimulationIntro,
  DemoStep.SimulationScenarios,
  DemoStep.SimulationMonteCarlo,
  DemoStep.SimulationSensitivity,
  DemoStep.SimulationDecision,

  // Underwriting Decision steps
  DemoStep.UnderwritingDecision,
  DemoStep.UnderwritingDecisionOverview,
  DemoStep.UnderwritingDecisionFactors,
  DemoStep.UnderwritingDecisionTerms,

  // Executive Summary steps
  DemoStep.ExecutiveSummary,
  DemoStep.ExecutiveSummaryDashboard,
  DemoStep.ExecutiveSummaryPortfolio,
  DemoStep.ExecutiveSummaryPipeline,
  DemoStep.ExecutiveSummaryRecommendations,

  // Complete
  DemoStep.Complete
];

// Map steps to tabs
const stepToTab: Record<DemoStep, DemoTab> = {
  // Introduction
  [DemoStep.Introduction]: DemoTab.Introduction,

  // Underwriting steps
  [DemoStep.UnderwritingIntro]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplication]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationBorrower]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationProperty]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationLoan]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationSubmit]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationProcessing]: DemoTab.Underwriting,
  [DemoStep.UnderwritingApplicationComplete]: DemoTab.Underwriting,
  [DemoStep.UnderwritingDecision]: DemoTab.Underwriting,
  [DemoStep.UnderwritingDecisionOverview]: DemoTab.Underwriting,
  [DemoStep.UnderwritingDecisionFactors]: DemoTab.Underwriting,
  [DemoStep.UnderwritingDecisionTerms]: DemoTab.Underwriting,

  // Traffic Light steps
  [DemoStep.TrafficLightIntro]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightMap]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightMapView]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightMapSuburb]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightAnalysis]: DemoTab.TrafficLight,
  [DemoStep.TrafficLightComparison]: DemoTab.TrafficLight,

  // Portfolio steps
  [DemoStep.PortfolioIntro]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpact]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpactOverview]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpactDiversification]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpactRisk]: DemoTab.Portfolio,
  [DemoStep.PortfolioImpactDecision]: DemoTab.Portfolio,
  [DemoStep.PortfolioMetrics]: DemoTab.Portfolio,

  // Simulation steps
  [DemoStep.SimulationIntro]: DemoTab.Simulation,
  [DemoStep.SimulationScenarios]: DemoTab.Simulation,
  [DemoStep.SimulationMonteCarlo]: DemoTab.Simulation,
  [DemoStep.SimulationSensitivity]: DemoTab.Simulation,
  [DemoStep.SimulationDecision]: DemoTab.Simulation,

  // Executive Summary steps
  [DemoStep.ExecutiveSummary]: DemoTab.ExecutiveSummary,
  [DemoStep.ExecutiveSummaryDashboard]: DemoTab.ExecutiveSummary,
  [DemoStep.ExecutiveSummaryPortfolio]: DemoTab.ExecutiveSummary,
  [DemoStep.ExecutiveSummaryPipeline]: DemoTab.ExecutiveSummary,
  [DemoStep.ExecutiveSummaryRecommendations]: DemoTab.ExecutiveSummary,

  // Complete
  [DemoStep.Complete]: DemoTab.Complete
};

// Step descriptions
const stepDescriptions: Record<DemoStep, { title: string, description: string }> = {
  // Introduction
  [DemoStep.Introduction]: {
    title: "Welcome to Equihome",
    description: "Explore the Equihome platform and its integrated systems for Bank of Mum and Dad lending."
  },

  // Underwriting steps
  [DemoStep.UnderwritingIntro]: {
    title: "Welcome to the Underwriting System",
    description: "This is where loan applications are received and processed. Let's start by reviewing a new application."
  },
  [DemoStep.UnderwritingApplication]: {
    title: "Loan Application",
    description: "Submit a new loan application with borrower and property details."
  },
  [DemoStep.UnderwritingApplicationBorrower]: {
    title: "Borrower Information",
    description: "Enter details about the borrower, including personal and financial information."
  },
  [DemoStep.UnderwritingApplicationProperty]: {
    title: "Property Information",
    description: "Enter details about the property, including location, type, and valuation."
  },
  [DemoStep.UnderwritingApplicationLoan]: {
    title: "Loan Details",
    description: "Enter loan parameters, including amount, term, and purpose."
  },
  [DemoStep.UnderwritingApplicationSubmit]: {
    title: "Review & Submit",
    description: "Review all application details before submission."
  },
  [DemoStep.UnderwritingApplicationProcessing]: {
    title: "Application Processing",
    description: "The application is being processed by the system."
  },
  [DemoStep.UnderwritingApplicationComplete]: {
    title: "Application Submitted",
    description: "The application has been successfully submitted and is ready for analysis."
  },
  [DemoStep.UnderwritingDecision]: {
    title: "Underwriting Decision",
    description: "The decision engine provides a recommendation based on the analysis."
  },
  [DemoStep.UnderwritingDecisionOverview]: {
    title: "Decision Overview",
    description: "High-level summary of the underwriting decision."
  },
  [DemoStep.UnderwritingDecisionFactors]: {
    title: "Decision Factors",
    description: "Detailed factors that influenced the underwriting decision."
  },
  [DemoStep.UnderwritingDecisionTerms]: {
    title: "Loan Terms",
    description: "Approved loan terms and conditions."
  },

  // Traffic Light steps
  [DemoStep.TrafficLightIntro]: {
    title: "Traffic Light System",
    description: "The Traffic Light System helps identify optimal investment areas based on various metrics and data points."
  },
  [DemoStep.TrafficLightMap]: {
    title: "Traffic Light Map",
    description: "Interactive map showing suburb ratings across Sydney."
  },
  [DemoStep.TrafficLightMapView]: {
    title: "Map View",
    description: "This map shows Sydney suburbs color-coded by investment potential, with green indicating high potential areas."
  },
  [DemoStep.TrafficLightMapSuburb]: {
    title: "Suburb Selection",
    description: "Select a suburb on the map to view detailed metrics."
  },
  [DemoStep.TrafficLightAnalysis]: {
    title: "Suburb Analysis",
    description: "Detailed metrics for the selected suburb, including liquidity, growth potential, infrastructure, and risk factors."
  },
  [DemoStep.TrafficLightComparison]: {
    title: "Suburb Comparison",
    description: "Compare metrics across multiple suburbs to identify the best investment opportunities."
  },

  // Portfolio steps
  [DemoStep.PortfolioIntro]: {
    title: "Portfolio Management",
    description: "The Portfolio Management System tracks all loans and provides insights into portfolio performance."
  },
  [DemoStep.PortfolioImpact]: {
    title: "Portfolio Impact",
    description: "See how the new loan will impact the overall portfolio metrics."
  },
  [DemoStep.PortfolioImpactOverview]: {
    title: "Impact Overview",
    description: "High-level impact of the new loan on the portfolio."
  },
  [DemoStep.PortfolioImpactDiversification]: {
    title: "Diversification Impact",
    description: "Impact on portfolio diversification across suburbs and loan types."
  },
  [DemoStep.PortfolioImpactRisk]: {
    title: "Risk Impact",
    description: "Impact on portfolio risk metrics, including volatility and Sharpe ratio."
  },
  [DemoStep.PortfolioImpactDecision]: {
    title: "Portfolio Decision",
    description: "Portfolio-based recommendation for the loan application."
  },
  [DemoStep.PortfolioMetrics]: {
    title: "Portfolio Metrics",
    description: "Comprehensive metrics showing portfolio performance, allocation, and projected returns."
  },

  // Simulation steps
  [DemoStep.SimulationIntro]: {
    title: "Simulation Engine",
    description: "The Simulation Engine allows us to model different scenarios and optimize portfolio allocation."
  },
  [DemoStep.SimulationScenarios]: {
    title: "Simulation Scenarios",
    description: "View different performance scenarios for the portfolio with this new loan."
  },
  [DemoStep.SimulationMonteCarlo]: {
    title: "Monte Carlo Simulation",
    description: "This simulation runs thousands of scenarios to project portfolio performance with statistical confidence intervals."
  },
  [DemoStep.SimulationSensitivity]: {
    title: "Sensitivity Analysis",
    description: "Analyze how sensitive the portfolio is to changes in different factors."
  },
  [DemoStep.SimulationDecision]: {
    title: "Simulation Decision",
    description: "Simulation-based recommendation for the loan application."
  },

  // Executive Summary steps
  [DemoStep.ExecutiveSummary]: {
    title: "Executive Summary",
    description: "Comprehensive overview of the platform's performance and insights."
  },
  [DemoStep.ExecutiveSummaryDashboard]: {
    title: "Executive Dashboard",
    description: "Key metrics and KPIs for executive decision-making."
  },
  [DemoStep.ExecutiveSummaryPortfolio]: {
    title: "Portfolio Status",
    description: "Current status and performance of the loan portfolio."
  },
  [DemoStep.ExecutiveSummaryPipeline]: {
    title: "Loan Pipeline",
    description: "Overview of pending loan applications and their status."
  },
  [DemoStep.ExecutiveSummaryRecommendations]: {
    title: "Strategic Recommendations",
    description: "AI-driven recommendations for portfolio optimization and growth."
  },

  // Complete
  [DemoStep.Complete]: {
    title: "Demo Complete",
    description: "You've seen the complete workflow of the Equihome Platform, from loan application to portfolio optimization."
  }
};

// Define the detailed navigation flow
const detailedNavigationFlow: DetailedNavigationStep[] = [
  // Introduction
  {
    mainTab: DemoTab.Introduction,
    label: "Introduction",
    description: "Overview of the Equihome platform"
  },

  // Loan Application
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.BorrowerInfo,
    label: "Borrower Information",
    description: "Enter borrower details"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.PropertyInfo,
    label: "Property Information",
    description: "Enter property details"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.LoanDetails,
    label: "Loan Details",
    description: "Enter loan parameters"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.ReviewSubmit,
    label: "Review & Submit",
    description: "Review and submit application"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.ReviewSubmit,
    cta: DemoCTA.SubmitApplication,
    label: "Submit Application",
    description: "Submit the loan application"
  },

  // Traffic Light Analysis
  {
    mainTab: DemoTab.TrafficLight,
    subTab: DemoSubTab.MapView,
    label: "Traffic Light Map",
    description: "View suburb ratings on the map"
  },
  {
    mainTab: DemoTab.TrafficLight,
    subTab: DemoSubTab.MapView,
    cta: DemoCTA.SelectSuburb,
    label: "Select Suburb",
    description: "Select a suburb on the map"
  },
  {
    mainTab: DemoTab.TrafficLight,
    subTab: DemoSubTab.SuburbDetails,
    label: "Suburb Details",
    description: "View detailed metrics for the selected suburb"
  },
  {
    mainTab: DemoTab.TrafficLight,
    subTab: DemoSubTab.Comparison,
    label: "Suburb Comparison",
    description: "Compare with other suburbs"
  },

  // Portfolio Impact
  {
    mainTab: DemoTab.Portfolio,
    subTab: DemoSubTab.ImpactOverview,
    label: "Portfolio Overview",
    description: "View high-level impact on portfolio"
  },
  {
    mainTab: DemoTab.Portfolio,
    subTab: DemoSubTab.Diversification,
    label: "Diversification Impact",
    description: "Analyze impact on portfolio diversification"
  },
  {
    mainTab: DemoTab.Portfolio,
    subTab: DemoSubTab.Risk,
    label: "Risk Assessment",
    description: "Review impact on portfolio risk metrics"
  },
  {
    mainTab: DemoTab.Portfolio,
    subTab: DemoSubTab.Decision,
    label: "Portfolio Decision",
    description: "View portfolio recommendation"
  },

  // Simulation
  {
    mainTab: DemoTab.Simulation,
    subTab: DemoSubTab.Scenarios,
    label: "Simulation Scenarios",
    description: "View different performance scenarios"
  },
  {
    mainTab: DemoTab.Simulation,
    subTab: DemoSubTab.Scenarios,
    cta: DemoCTA.RunSimulation,
    label: "Run Simulation",
    description: "Run the simulation"
  },
  {
    mainTab: DemoTab.Simulation,
    subTab: DemoSubTab.MonteCarlo,
    label: "Monte Carlo Analysis",
    description: "View Monte Carlo simulation results"
  },
  {
    mainTab: DemoTab.Simulation,
    subTab: DemoSubTab.Sensitivity,
    label: "Sensitivity Analysis",
    description: "Review sensitivity to different factors"
  },
  {
    mainTab: DemoTab.Simulation,
    subTab: DemoSubTab.SimulationDecision,
    label: "Simulation Decision",
    description: "View simulation recommendation"
  },

  // Underwriting Decision
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.DecisionOverview,
    label: "Decision Overview",
    description: "View high-level decision summary"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.DecisionFactors,
    label: "Decision Factors",
    description: "Review detailed decision factors"
  },
  {
    mainTab: DemoTab.Underwriting,
    subTab: DemoSubTab.DecisionTerms,
    label: "Loan Terms",
    description: "View approved loan terms"
  },

  // Executive Summary
  {
    mainTab: DemoTab.ExecutiveSummary,
    subTab: DemoSubTab.Dashboard,
    label: "Executive Dashboard",
    description: "View key metrics dashboard"
  },
  {
    mainTab: DemoTab.ExecutiveSummary,
    subTab: DemoSubTab.Portfolio,
    label: "Portfolio Status",
    description: "Review portfolio status"
  },
  {
    mainTab: DemoTab.ExecutiveSummary,
    subTab: DemoSubTab.Pipeline,
    label: "Loan Pipeline",
    description: "Check loan pipeline"
  },
  {
    mainTab: DemoTab.ExecutiveSummary,
    subTab: DemoSubTab.Recommendations,
    label: "Strategic Recommendations",
    description: "View strategic recommendations"
  },

  // Complete
  {
    mainTab: DemoTab.Complete,
    label: "Demo Complete",
    description: "Demo completion with options to restart or explore"
  }
];

// Link the steps together to form a flow
for (let i = 0; i < detailedNavigationFlow.length; i++) {
  if (i > 0) {
    detailedNavigationFlow[i].prevStep = detailedNavigationFlow[i - 1];
  }
  if (i < detailedNavigationFlow.length - 1) {
    detailedNavigationFlow[i].nextStep = detailedNavigationFlow[i + 1];
  }
}

// Provider component
export const GuidedDemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Main step tracking
  const [currentStep, setCurrentStep] = useState<DemoStep>(DemoStep.Introduction);
  const [currentTab, setCurrentTab] = useState<DemoTab>(DemoTab.Introduction);

  // Detailed navigation tracking
  const [currentSubTab, setCurrentSubTab] = useState<DemoSubTab | undefined>(undefined);
  const [currentCTA, setCurrentCTA] = useState<DemoCTA | undefined>(undefined);
  const [currentDetailedStepIndex, setCurrentDetailedStepIndex] = useState(0);

  // Get the current detailed step
  const currentDetailedStep = detailedNavigationFlow[currentDetailedStepIndex];

  // Check if this is the first or last detailed step
  const isFirstDetailedStep = currentDetailedStepIndex === 0;
  const isLastDetailedStep = currentDetailedStepIndex === detailedNavigationFlow.length - 1;

  // Get the current step index in the main flow
  const currentStepIndex = stepFlow.indexOf(currentStep);

  // Check if this is the first or last step in the main flow
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepFlow.length - 1;

  // Get step description for the main flow
  const stepTitle = stepDescriptions[currentStep]?.title || "Demo Step";
  const stepDescription = stepDescriptions[currentStep]?.description || "Navigate through the demo";

  // Move to the next step in the main flow
  const nextStep = () => {
    if (!isLastStep) {
      const nextStep = stepFlow[currentStepIndex + 1];
      setCurrentStep(nextStep);
      setCurrentTab(stepToTab[nextStep]);
    }
  };

  // Move to the previous step in the main flow
  const prevStep = () => {
    if (!isFirstStep) {
      const prevStep = stepFlow[currentStepIndex - 1];
      setCurrentStep(prevStep);
      setCurrentTab(stepToTab[prevStep]);
    }
  };

  // Move to the next detailed step
  const nextDetailedStep = () => {
    if (!isLastDetailedStep) {
      const nextIndex = currentDetailedStepIndex + 1;
      setCurrentDetailedStepIndex(nextIndex);

      const nextStep = detailedNavigationFlow[nextIndex];
      setCurrentTab(nextStep.mainTab);
      setCurrentSubTab(nextStep.subTab);
      setCurrentCTA(nextStep.cta);

      // Also update the main step if needed
      if (nextStep.mainTab !== currentTab) {
        // Find the corresponding main step for this tab
        const mainStep = Object.entries(stepToTab).find(([step, tab]) => tab === nextStep.mainTab);
        if (mainStep) {
          setCurrentStep(mainStep[0] as DemoStep);
        }
      }
    }
  };

  // Move to the previous detailed step
  const prevDetailedStep = () => {
    if (!isFirstDetailedStep) {
      const prevIndex = currentDetailedStepIndex - 1;
      setCurrentDetailedStepIndex(prevIndex);

      const prevStep = detailedNavigationFlow[prevIndex];
      setCurrentTab(prevStep.mainTab);
      setCurrentSubTab(prevStep.subTab);
      setCurrentCTA(prevStep.cta);

      // Also update the main step if needed
      if (prevStep.mainTab !== currentTab) {
        // Find the corresponding main step for this tab
        const mainStep = Object.entries(stepToTab).find(([step, tab]) => tab === prevStep.mainTab);
        if (mainStep) {
          setCurrentStep(mainStep[0] as DemoStep);
        }
      }
    }
  };

  // Create a ref to the context value for external access
  const contextRef = React.useRef<GuidedDemoContextType>({
    // Main step tracking
    currentStep,
    currentTab,
    setCurrentStep,
    setCurrentTab,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    stepDescription,
    stepTitle,

    // Detailed navigation tracking
    currentSubTab,
    currentCTA,
    setCurrentSubTab,
    setCurrentCTA,

    // Detailed navigation control
    currentDetailedStep,
    nextDetailedStep,
    prevDetailedStep,
    isFirstDetailedStep,
    isLastDetailedStep
  });

  // Update the ref when values change
  React.useEffect(() => {
    contextRef.current = {
      // Main step tracking
      currentStep,
      currentTab,
      setCurrentStep,
      setCurrentTab,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      stepDescription,
      stepTitle,

      // Detailed navigation tracking
      currentSubTab,
      currentCTA,
      setCurrentSubTab,
      setCurrentCTA,

      // Detailed navigation control
      currentDetailedStep,
      nextDetailedStep,
      prevDetailedStep,
      isFirstDetailedStep,
      isLastDetailedStep
    };
  }, [
    currentStep, currentTab, isFirstStep, isLastStep, stepDescription, stepTitle,
    currentSubTab, currentCTA, currentDetailedStep, isFirstDetailedStep, isLastDetailedStep
  ]);

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
        // Main step tracking
        currentStep,
        currentTab,
        setCurrentStep,
        setCurrentTab,
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        stepDescription,
        stepTitle,

        // Detailed navigation tracking
        currentSubTab,
        currentCTA,
        setCurrentSubTab,
        setCurrentCTA,

        // Detailed navigation control
        currentDetailedStep,
        nextDetailedStep,
        prevDetailedStep,
        isFirstDetailedStep,
        isLastDetailedStep
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
