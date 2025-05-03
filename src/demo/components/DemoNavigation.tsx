import React from 'react';
import { Check, Circle } from 'lucide-react';

interface DemoNavigationProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({ 
  currentStep, 
  totalSteps,
  stepNames 
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-primary text-white' 
                    : index === currentStep 
                    ? 'bg-primary-100 border-2 border-primary text-primary' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span 
                className={`text-xs mt-2 text-center ${
                  index <= currentStep ? 'text-primary font-medium' : 'text-gray-500'
                }`}
              >
                {stepNames[index]}
              </span>
            </div>
            
            {index < totalSteps - 1 && (
              <div 
                className={`flex-1 h-0.5 ${
                  index < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DemoNavigation;
