import React from 'react';
import { useGuidedDemo } from '../../context/GuidedDemoContext';
import { Info, ArrowRight } from 'lucide-react';

interface GuidedDemoNavigationProps {
  className?: string;
}

const GuidedDemoNavigation: React.FC<GuidedDemoNavigationProps> = ({ className = '' }) => {
  const {
    stepTitle,
    stepDescription,
    isLastStep
  } = useGuidedDemo();

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-5 ${className}`}>
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-blue-900">{stepTitle}</h3>
          <p className="text-sm text-blue-700 mt-1">{stepDescription}</p>

          {!isLastStep && (
            <div className="mt-3 text-sm text-blue-800 flex items-center">
              <span>Use the floating button</span>
              <ArrowRight className="h-4 w-4 mx-1" />
              <span>to continue to the next step</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedDemoNavigation;
