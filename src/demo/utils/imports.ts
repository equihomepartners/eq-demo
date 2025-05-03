/**
 * Utility for conditional imports based on environment (standalone vs platform)
 * This allows the demo to use platform components when running within the platform,
 * and use its own standalone components when running as a standalone application.
 */

import { isStandalone } from './environment';

// Dynamic import helper
export const dynamicImport = (standaloneModule: any, platformPath: string): any => {
  if (isStandalone()) {
    return standaloneModule;
  }
  
  try {
    // In the platform environment, dynamically import from the platform path
    // This is wrapped in a try-catch to handle cases where the module might not exist
    const platformModule = require(platformPath);
    return platformModule;
  } catch (error) {
    console.warn(`Failed to import ${platformPath}, falling back to standalone module`, error);
    return standaloneModule;
  }
};

// Example usage:
// const { Button } = dynamicImport(require('../standalone/components/ui/button'), '../ui/button');
