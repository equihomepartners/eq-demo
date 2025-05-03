import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useGuidedDemo } from '../../context/GuidedDemoContext';
import { cn } from '../../utils/cn';

interface FloatingNextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FloatingNextButton: React.FC<FloatingNextButtonProps> = ({
  onClick,
  disabled = false
}) => {
  const { stepTitle } = useGuidedDemo();
  
  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 transition-all duration-300",
      disabled ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      <div className="relative">
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200 w-64 transform transition-opacity duration-200">
          <p className="text-sm font-medium text-gray-900">Next: {stepTitle}</p>
          <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
        </div>
        
        {/* Button */}
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-full bg-primary-500 text-white p-4",
            "shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 hover:bg-primary-600",
            "transition-all duration-300 animate-pulse-subtle",
            "ring-4 ring-primary-200 focus:outline-none focus:ring-primary-300"
          )}
        >
          <ArrowRight className="h-6 w-6" />
          
          {/* Pulsing effect */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-1000 animate-ping-slow"></span>
        </button>
      </div>
    </div>
  );
};

export default FloatingNextButton;
