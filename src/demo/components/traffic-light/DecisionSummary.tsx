import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface DecisionSummaryProps {
  decisionResult: {
    approved: boolean;
    score: number;
    confidence: number;
    riskLevel: string;
    explanation: string;
  };
}

const DecisionSummary: React.FC<DecisionSummaryProps> = ({ decisionResult }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Decision Summary</h3>
          <p className="text-gray-500">ML-generated loan assessment</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Decision Score</div>
            <div className="text-2xl font-bold text-primary-600">{decisionResult.score}/100</div>
          </div>
          <div className="h-14 w-14 rounded-full border-4 border-primary-100 flex items-center justify-center">
            {decisionResult.approved ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm text-gray-500 mb-1">Decision</div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {decisionResult.approved ? 'Approved' : 'Declined'}
          </div>
          <Badge className={decisionResult.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {decisionResult.approved ? 'Loan Approved' : 'Loan Declined'}
          </Badge>
        </div>
        
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm text-gray-500 mb-1">Confidence</div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {decisionResult.confidence}%
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${decisionResult.confidence}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-md p-4">
          <div className="text-sm text-gray-500 mb-1">Risk Level</div>
          <div className="text-lg font-semibold text-gray-900 mb-2">
            {decisionResult.riskLevel.charAt(0).toUpperCase() + decisionResult.riskLevel.slice(1)}
          </div>
          <Badge className={
            decisionResult.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
            decisionResult.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            {decisionResult.riskLevel.charAt(0).toUpperCase() + decisionResult.riskLevel.slice(1)} Risk
          </Badge>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Decision Explanation</div>
        <p className="text-sm text-gray-600">{decisionResult.explanation}</p>
      </div>
    </div>
  );
};

export default DecisionSummary;
