import React from 'react';
import { Lightbulb, Brain } from 'lucide-react';

interface AIInsightsProps {
  insights: string[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-primary-50 rounded-md p-4 border border-primary-100">
            <div className="flex items-start">
              <Brain className="h-4 w-4 text-primary-500 mt-0.5 mr-2" />
              <p className="text-sm text-primary-700">{insight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
