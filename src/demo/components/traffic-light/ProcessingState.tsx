import React from 'react';
import { Brain } from 'lucide-react';
import { Progress } from '../ui/progress';

interface ProcessingStateProps {
  processingStep: number;
  processingProgress: number;
  processingSteps: string[];
}

const ProcessingState: React.FC<ProcessingStateProps> = ({
  processingStep,
  processingProgress,
  processingSteps
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-primary-100 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-t-primary-500 border-r-primary-500 border-b-primary-200 border-l-primary-200 animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Processing Decision</h3>
        <p className="text-gray-600">{processingSteps[processingStep]}</p>
      </div>
      <div className="mb-2">
        <Progress value={processingProgress} className="h-2" />
      </div>
      <div className="text-xs text-gray-500 text-center">
        Step {processingStep + 1} of {processingSteps.length}
      </div>
    </div>
  );
};

export default ProcessingState;
