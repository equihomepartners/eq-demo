import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PredictionDetailsProps {
  predictions: {
    shortTerm: {
      growth: number;
      confidence: number;
      factors: string[];
    };
    mediumTerm: {
      growth: number;
      confidence: number;
      factors: string[];
    };
    longTerm: {
      growth: number;
      confidence: number;
      factors: string[];
    };
  };
}

const PredictionDetails: React.FC<PredictionDetailsProps> = ({ predictions }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Prediction Details</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Short Term */}
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Short Term (1-2 Years)</div>
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-500">Growth Projection</div>
            <div className="text-sm font-medium text-green-600">+{predictions.shortTerm.growth}%</div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">Confidence</div>
            <div className="text-sm font-medium text-gray-700">{predictions.shortTerm.confidence}%</div>
          </div>
          <div className="text-sm text-gray-600 mt-3">Key Factors:</div>
          <ul className="mt-1 space-y-1">
            {predictions.shortTerm.factors.map((factor, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-primary-500 mr-1">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Medium Term */}
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Medium Term (3-5 Years)</div>
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-500">Growth Projection</div>
            <div className="text-sm font-medium text-green-600">+{predictions.mediumTerm.growth}%</div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">Confidence</div>
            <div className="text-sm font-medium text-gray-700">{predictions.mediumTerm.confidence}%</div>
          </div>
          <div className="text-sm text-gray-600 mt-3">Key Factors:</div>
          <ul className="mt-1 space-y-1">
            {predictions.mediumTerm.factors.map((factor, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-primary-500 mr-1">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Long Term */}
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Long Term (5-10 Years)</div>
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-500">Growth Projection</div>
            <div className="text-sm font-medium text-green-600">+{predictions.longTerm.growth}%</div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">Confidence</div>
            <div className="text-sm font-medium text-gray-700">{predictions.longTerm.confidence}%</div>
          </div>
          <div className="text-sm text-gray-600 mt-3">Key Factors:</div>
          <ul className="mt-1 space-y-1">
            {predictions.longTerm.factors.map((factor, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-primary-500 mr-1">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetails;
