import React, { useState, useEffect } from 'react';
import { useGuidedDemo, DemoStep, DemoTab } from '../../context/GuidedDemoContext';
import { useDemoState } from '../../context/DemoContext';
import { Info, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuidedDemoNavigationProps {
  className?: string;
}

// Define the detailed navigation flow including main tabs, sub-tabs, and CTAs
interface NavigationStep {
  type: 'main-tab' | 'sub-tab' | 'cta' | 'process';
  label: string;
  description: string;
  action?: () => void;
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

  const demoState = useDemoState();

  // State to track the current detailed navigation step
  const [currentDetailedStep, setCurrentDetailedStep] = useState<NavigationStep>({
    type: 'main-tab',
    label: 'Introduction',
    description: 'Overview of the Equihome platform'
  });

  // State to track if we're at the first or last detailed step
  const [isFirstDetailedStep, setIsFirstDetailedStep] = useState(true);
  const [isLastDetailedStep, setIsLastDetailedStep] = useState(false);

  // Function to determine the next detailed step based on current state
  const determineNextDetailedStep = () => {
    // This would contain the complex logic to determine the next step
    // based on the current main tab, sub-tab, and process state

    // For now, we'll use a simplified version that just returns a placeholder
    const nextStep: NavigationStep = {
      type: 'main-tab',
      label: 'Next Step',
      description: 'The next step in the demo flow'
    };

    return nextStep;
  };

  // Function to determine the previous detailed step based on current state
  const determinePrevDetailedStep = () => {
    // Similar to determineNextDetailedStep but for the previous step
    const prevStep: NavigationStep = {
      type: 'main-tab',
      label: 'Previous Step',
      description: 'The previous step in the demo flow'
    };

    return prevStep;
  };

  // Function to handle next button click
  const handleNext = () => {
    // If there's a specific action for this step, execute it
    if (currentDetailedStep.action) {
      currentDetailedStep.action();
    } else {
      // Otherwise, move to the next step in the guided demo
      nextStep();
    }
  };

  // Function to handle previous button click
  const handlePrev = () => {
    prevStep();
  };

  // Update the current detailed step whenever the main step or tab changes
  useEffect(() => {
    // This would contain logic to determine the current detailed step
    // based on the current main tab, sub-tab, and process state

    // For now, we'll use the main step information
    setCurrentDetailedStep({
      type: 'main-tab',
      label: stepTitle,
      description: stepDescription
    });

    // Also update the first/last step status
    setIsFirstDetailedStep(isFirstStep);
    setIsLastDetailedStep(isLastStep);
  }, [currentStep, currentTab, stepTitle, stepDescription, isFirstStep, isLastStep]);

  return (
    <div className="fixed bottom-8 right-8 flex items-center space-x-4 z-50">
      {/* Current step indicator */}
      <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 hidden md:block">
        {currentDetailedStep.label}
      </div>

      {/* Back button */}
      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-white shadow-md hover:bg-gray-100 ${
            isFirstDetailedStep ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={handlePrev}
          disabled={isFirstDetailedStep}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Tooltip */}
        {!isFirstDetailedStep && (
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Previous: {currentDetailedStep.prevStep?.label || 'Previous Step'}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="relative group">
        <Button
          variant="default"
          size="icon"
          className={`rounded-full bg-blue-600 shadow-md hover:bg-blue-700 ${
            isLastDetailedStep ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={handleNext}
          disabled={isLastDetailedStep}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Tooltip */}
        {!isLastDetailedStep && (
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Next: {currentDetailedStep.nextStep?.label || 'Next Step'}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedDemoNavigation;
