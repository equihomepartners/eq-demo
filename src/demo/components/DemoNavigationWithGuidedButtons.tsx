import React from 'react';
import { useGuidedDemo, DemoTab } from '../context/GuidedDemoContext';
import GuidedDemoButton from './ui/GuidedDemoButton';

interface DemoNavigationWithGuidedButtonsProps {
  prevStep: () => void;
  nextStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const DemoNavigationWithGuidedButtons: React.FC<DemoNavigationWithGuidedButtonsProps> = ({
  prevStep,
  nextStep,
  currentStep,
  totalSteps
}) => {
  const {
    nextStep: guidedNextStep,
    prevStep: guidedPrevStep,
    isFirstStep,
    isLastStep,
    currentTab,
    setCurrentTab
  } = useGuidedDemo();

  // Map step indices to tab values for direct tab navigation
  const stepToTabMap: Record<number, string> = {
    0: 'intro',
    1: 'underwriting-application',
    2: 'traffic-light-analysis',
    3: 'portfolio-impact',
    4: 'simulation',
    5: 'underwriting-decision',
    6: 'executive-summary',
    7: 'complete'
  };

  // Combined navigation function that updates both navigation systems
  const handleNext = () => {
    try {
      // First update the regular navigation
      nextStep();

      // Then update the guided navigation
      guidedNextStep();

      // Update the tab if needed
      const nextStepIndex = currentStep + 1;
      if (nextStepIndex < totalSteps && stepToTabMap[nextStepIndex]) {
        // Find the tab element and click it programmatically
        const tabId = stepToTabMap[nextStepIndex];
        const tabElement = document.querySelector(`[data-state="inactive"][value="${tabId}"]`);
        if (tabElement) {
          (tabElement as HTMLElement).click();
        }
      }
    } catch (error) {
      console.error("Error in next step navigation:", error);
      // Fallback to just the regular navigation
      nextStep();
    }
  };

  const handlePrev = () => {
    try {
      // First update the regular navigation
      prevStep();

      // Then update the guided navigation
      guidedPrevStep();

      // Update the tab if needed
      const prevStepIndex = currentStep - 1;
      if (prevStepIndex >= 0 && stepToTabMap[prevStepIndex]) {
        // Find the tab element and click it programmatically
        const tabId = stepToTabMap[prevStepIndex];
        const tabElement = document.querySelector(`[data-state="inactive"][value="${tabId}"]`);
        if (tabElement) {
          (tabElement as HTMLElement).click();
        }
      }
    } catch (error) {
      console.error("Error in previous step navigation:", error);
      // Fallback to just the regular navigation
      prevStep();
    }
  };

  return (
    <div className="flex justify-between w-full">
      <GuidedDemoButton
        onClick={handlePrev}
        direction="prev"
        disabled={currentStep === 0 || isFirstStep}
      />

      <GuidedDemoButton
        onClick={handleNext}
        direction="next"
        disabled={currentStep === totalSteps - 1 || isLastStep}
      />
    </div>
  );
};

export default DemoNavigationWithGuidedButtons;
