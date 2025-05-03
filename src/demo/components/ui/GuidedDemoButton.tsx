import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../utils/cn';

interface GuidedDemoButtonProps {
  onClick: () => void;
  direction?: 'next' | 'prev';
  label?: string;
  className?: string;
  disabled?: boolean;
}

const GuidedDemoButton: React.FC<GuidedDemoButtonProps> = ({
  onClick,
  direction = 'next',
  label = direction === 'next' ? 'Next Step' : 'Previous Step',
  className = '',
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative px-6 py-3 font-medium text-white transition-all duration-300',
        direction === 'next'
          ? 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40'
          : 'bg-gray-500 hover:bg-gray-600 shadow-lg shadow-gray-500/30 hover:shadow-gray-600/40',
        'rounded-md',
        'animate-pulse-subtle',
        direction === 'next' ? 'ring-4 ring-primary-200' : '',
        className
      )}
    >
      {direction === 'prev' && <ArrowLeft className="h-4 w-4 mr-2" />}
      {label}
      {direction === 'next' && <ArrowRight className="h-4 w-4 ml-2" />}

      {/* Pulsing effect - only for next button */}
      {direction === 'next' && (
        <span className="absolute inset-0 rounded-md bg-white opacity-0 transition-opacity duration-1000 animate-ping-slow"></span>
      )}
    </Button>
  );
};

export default GuidedDemoButton;
