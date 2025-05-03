import React, { createContext } from 'react';

// Define the context type
interface DemoContextType {
  demoState: {
    application: any;
    suburbData: any;
    decisionResult: any;
    portfolioImpact: any;
    simulationResult: any;
  };
  updateDemoState: (newState: any) => void;
}

// Create the context with default values
const DemoContext = createContext<DemoContextType>({
  demoState: {
    application: null,
    suburbData: null,
    decisionResult: null,
    portfolioImpact: null,
    simulationResult: null
  },
  updateDemoState: () => {}
});

export default DemoContext;
