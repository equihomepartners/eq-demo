/**
 * Utility to detect whether the demo is running in standalone mode or within the platform
 */

export const isStandalone = (): boolean => {
  // When in the platform, we'll check for a specific global variable
  // In standalone mode, this would be undefined
  return typeof window !== 'undefined' && !(window as any).platformContext;
};

// Set a flag on window for standalone detection
if (typeof window !== 'undefined') {
  // This will be true when running in standalone mode
  (window as any).isEquihomeDemoStandalone = true;
}
