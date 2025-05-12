import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Shield, 
  MapPin, 
  FileText, 
  User, 
  Home, 
  Calendar, 
  Clock, 
  ArrowRight,
  Zap,
  Briefcase,
  PieChart,
  ThumbsUp,
  ThumbsDown,
  Target,
  Info
} from 'lucide-react';
import { 
  EnhancedCard, 
  AdvancedLineChart, 
  AdvancedPieChart, 
  AdvancedBarChart, 
  DataTable, 
  KpiDashboard,
  EnhancedButton
} from '../ui';
import theme from '../../utils/theme';

interface InvestmentDecisionProps {
  portfolioImpact: any;
  simulationResult: any;
}

const InvestmentDecision: React.FC<InvestmentDecisionProps> = ({
  portfolioImpact,
  simulationResult
}) => {
  // Format currency
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numValue);
  };

  // Format percentage
  const formatPercentage = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${numValue.toFixed(1)}%`;
  };

  // Decision factors
  const decisionFactors = [
    { 
      name: 'Portfolio IRR Impact', 
      value: '+0.1%', 
      status: 'positive',
      description: 'The loan increases the overall portfolio IRR'
    },
    { 
      name: 'Risk Profile Impact', 
      value: '-1', 
      status: 'positive',
      description: 'The loan slightly reduces the portfolio risk score'
    },
    { 
      name: 'Diversification Impact', 
      value: '-1', 
      status: 'neutral',
      description: 'Minor reduction in diversification due to increased Mosman allocation'
    },
    { 
      name: 'Traffic Light Alignment', 
      value: 'Green Zone', 
      status: 'positive',
      description: 'The property is in a green zone with strong growth prospects'
    },
    { 
      name: 'Simulation Confidence', 
      value: '85.2%', 
      status: 'positive',
      description: 'High confidence in meeting target returns with this loan'
    }
  ];

  // Optimization recommendations
  const optimizationRecommendations = [
    {
      title: 'Geographic Diversification',
      description: 'Consider targeting different suburbs for future loans to maintain diversification',
      impact: 'Medium',
      timeframe: 'Next 3-6 months'
    },
    {
      title: 'Risk Balancing',
      description: 'The portfolio could benefit from more yellow zone properties to optimize the efficient frontier position',
      impact: 'High',
      timeframe: 'Next 6-12 months'
    },
    {
      title: 'Loan Size Distribution',
      description: 'Consider smaller loan sizes to improve diversification across more properties',
      impact: 'Low',
      timeframe: 'Ongoing'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EnhancedCard variant="elevated" className="md:col-span-2">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Decision Analysis</h3>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Recommended Investment</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Based on comprehensive portfolio analysis and simulation, this loan is recommended for investment.
                    It has a positive impact on the portfolio's IRR and risk profile, and aligns with the investment strategy.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Decision Factors</h4>
              
              {decisionFactors.map((factor, index) => (
                <div key={index} className="flex items-start py-3 border-b border-gray-100">
                  <div className={`p-1 rounded-full mr-3 ${
                    factor.status === 'positive' ? 'bg-green-100' : 
                    factor.status === 'negative' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {factor.status === 'positive' ? (
                      <ThumbsUp className={`h-4 w-4 text-green-600`} />
                    ) : factor.status === 'negative' ? (
                      <ThumbsDown className={`h-4 w-4 text-red-600`} />
                    ) : (
                      <AlertTriangle className={`h-4 w-4 text-yellow-600`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{factor.name}</span>
                      <Badge variant="outline" className={`${
                        factor.status === 'positive' ? 'bg-green-50 text-green-700 border-green-200' : 
                        factor.status === 'negative' ? 'bg-red-50 text-red-700 border-red-200' : 
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {factor.value}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </EnhancedCard>
        
        <EnhancedCard variant="elevated" className="md:col-span-1">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Decision Summary</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(500000)}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Expected IRR</div>
                <div className="text-xl font-bold text-blue-600">{formatPercentage(16.9)}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Risk Score</div>
                <div className="text-xl font-bold text-amber-600">27</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Traffic Light Zone</div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-xl font-bold text-gray-900">Green</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Confidence Level</div>
                <div className="text-xl font-bold text-green-600">85.2%</div>
              </div>
            </div>
          </div>
        </EnhancedCard>
      </div>
      
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Optimization Recommendations</h3>
          
          <div className="space-y-4">
            {optimizationRecommendations.map((recommendation, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-blue-800">{recommendation.title}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {recommendation.impact} Impact
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {recommendation.timeframe}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EnhancedCard>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-gray-800">Investment Process</h3>
            <p className="text-sm text-gray-600 mt-1">
              This analysis combines the Traffic Light System, Portfolio Impact Analysis, and Advanced Simulation
              to provide a comprehensive view of how this loan fits into your investment strategy. The decision
              is based on a holistic assessment of risk, return, and portfolio optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDecision;
