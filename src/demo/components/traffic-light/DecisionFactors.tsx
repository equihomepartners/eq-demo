import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Factor {
  name: string;
  value: string;
  score: number;
  impact: string;
}

interface DecisionFactorsProps {
  factors: Factor[];
}

const DecisionFactors: React.FC<DecisionFactorsProps> = ({ factors }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Shield className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Decision Factors</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {factors.map((factor, index) => (
          <div key={index} className="bg-gray-50 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-700">{factor.name}</div>
              <Badge className={
                factor.impact === 'positive' ? 'bg-green-100 text-green-800' :
                factor.impact === 'neutral' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
              }>
                {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-gray-600">{factor.value}</div>
              <div className="text-sm font-medium text-gray-700">{factor.score}/100</div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-full rounded-full ${
                  factor.score > 80 ? 'bg-green-500' :
                  factor.score > 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${factor.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionFactors;
