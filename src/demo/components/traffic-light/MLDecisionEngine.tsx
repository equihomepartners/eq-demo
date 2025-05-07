import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { Button } from '../ui/button';
import ProcessingState from './ProcessingState';
import DecisionSummary from './DecisionSummary';
import MetricsChart from './MetricsChart';
import GrowthChart from './GrowthChart';
import DecisionFactors from './DecisionFactors';
import AIInsights from './AIInsights';
import PredictionDetails from './PredictionDetails';

interface MLDecisionEngineProps {
  suburbData: any;
  propertyData: any;
  borrowerData: any;
}

const MLDecisionEngine: React.FC<MLDecisionEngineProps> = ({
  suburbData,
  propertyData,
  borrowerData
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [decisionResult, setDecisionResult] = useState<any>(null);

  // Processing steps
  const processingSteps = [
    'Analyzing suburb data...',
    'Evaluating property metrics...',
    'Assessing borrower profile...',
    'Running ML prediction models...',
    'Generating decision...'
  ];

  // Process the decision
  const processDecision = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingProgress(0);

    // Simulate processing steps
    const totalSteps = processingSteps.length;
    const stepTime = 1000; // 1 second per step

    const interval = setInterval(() => {
      setProcessingStep(prev => {
        const nextStep = prev + 1;
        setProcessingProgress(Math.floor((nextStep / totalSteps) * 100));

        if (nextStep >= totalSteps) {
          clearInterval(interval);

          // Generate decision result
          const result = {
            approved: true,
            score: 92,
            confidence: 95,
            riskLevel: 'low',
            explanation: 'The property is located in a green zone suburb with strong fundamentals and excellent growth prospects. The borrower profile is strong, and the loan parameters are within acceptable ranges.',
            factors: [
              { name: 'Suburb Zone', value: 'Green', score: 95, impact: 'positive' },
              { name: 'Growth Potential', value: '5.9%', score: 88, impact: 'positive' },
              { name: 'Liquidity', value: 'High', score: 92, impact: 'positive' },
              { name: 'Infrastructure', value: 'Excellent', score: 88, impact: 'positive' },
              { name: 'Property Value', value: '$4,200,000', score: 90, impact: 'positive' },
              { name: 'LTV Ratio', value: '20.24%', score: 95, impact: 'positive' },
              { name: 'Borrower Profile', value: 'Strong', score: 90, impact: 'positive' }
            ],
            metrics: {
              growth: 88,
              risk: 18,
              infrastructure: 88,
              liquidity: 92,
              safety: 95
            },
            predictions: {
              shortTerm: {
                growth: 5.9,
                confidence: 88,
                factors: [
                  'Strong market demand',
                  'Limited supply',
                  'Premium location'
                ]
              },
              mediumTerm: {
                growth: 5.6,
                confidence: 82,
                factors: [
                  'Continued infrastructure development',
                  'Demographic trends',
                  'Economic outlook'
                ]
              },
              longTerm: {
                growth: 5.25,
                confidence: 75,
                factors: [
                  'Long-term population growth',
                  'Strategic location',
                  'Established suburb'
                ]
              }
            },
            aiInsights: [
              'This property is in a premium location with excellent long-term growth prospects of 5.9% p.a.',
              'The suburb has consistently outperformed the Sydney average over the past decade.',
              'The property\'s high-end features and condition make it an attractive investment.',
              'The borrower\'s strong financial position minimizes default risk.'
            ]
          };

          setDecisionResult(result);
          setIsProcessed(true);
          setIsProcessing(false);
        }

        return nextStep;
      });
    }, stepTime);
  };

  // Reset the decision
  const resetDecision = () => {
    setIsProcessed(false);
    setDecisionResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">ML Decision Engine</h2>
          <p className="text-gray-500">AI-powered loan application analysis</p>
        </div>
        {!isProcessing && !isProcessed && (
          <Button onClick={processDecision}>
            <Brain className="h-4 w-4 mr-2" />
            Run Decision Engine
          </Button>
        )}
        {isProcessed && (
          <Button variant="outline" onClick={resetDecision}>
            Reset Analysis
          </Button>
        )}
      </div>

      {/* Processing State */}
      {isProcessing && (
        <ProcessingState
          processingStep={processingStep}
          processingProgress={processingProgress}
          processingSteps={processingSteps}
        />
      )}

      {/* Decision Result */}
      {isProcessed && decisionResult && (
        <div className="space-y-6">
          {/* Decision Summary */}
          <DecisionSummary decisionResult={decisionResult} />

          {/* Metrics Analysis */}
          <div className="grid grid-cols-2 gap-6">
            <MetricsChart metrics={decisionResult.metrics} />
            <GrowthChart predictions={decisionResult.predictions} />
          </div>

          {/* Decision Factors */}
          <DecisionFactors factors={decisionResult.factors} />

          {/* AI Insights */}
          <AIInsights insights={decisionResult.aiInsights} />

          {/* Prediction Details */}
          <PredictionDetails predictions={decisionResult.predictions} />
        </div>
      )}

      {/* Initial State */}
      {!isProcessing && !isProcessed && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-20 w-20 rounded-full bg-primary-50 flex items-center justify-center mb-6">
              <Brain className="h-10 w-10 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ML Decision Engine Ready</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Click "Run Decision Engine" to analyze the loan application using our AI-powered decision engine. The system will evaluate suburb data, property metrics, and borrower profile to generate a comprehensive assessment.
            </p>
            <Button onClick={processDecision}>
              <Brain className="h-4 w-4 mr-2" />
              Run Decision Engine
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLDecisionEngine;
