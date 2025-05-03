import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ListFilter, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  BarChart2, 
  Lightbulb, 
  Shuffle
} from 'lucide-react';
import { mockPipelineData, mockDecisionResult } from '../../data/mockData';

interface PipelineProps {
  onComplete?: () => void;
}

const Pipeline: React.FC<PipelineProps> = ({ onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  
  // Process the pipeline
  const processPipeline = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingProgress(0);
    
    // Simulate processing steps
    const totalSteps = 5;
    const stepTime = 1000; // 1 second per step
    
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        const nextStep = prev + 1;
        setProcessingProgress(Math.floor((nextStep / totalSteps) * 100));
        
        if (nextStep >= totalSteps) {
          clearInterval(interval);
          setIsProcessed(true);
          setIsProcessing(false);
          setShowBefore(false);
        }
        
        return nextStep;
      });
    }, stepTime);
  };
  
  // Reset the pipeline
  const resetPipeline = () => {
    setIsProcessed(false);
    setShowBefore(true);
  };
  
  // Processing steps
  const processingSteps = [
    'Analyzing decision engine results...',
    'Evaluating current pipeline...',
    'Calculating deal ranking...',
    'Reshuffling pipeline...',
    'Finalizing pipeline order...'
  ];
  
  // Get zone badge color
  const getZoneBadgeColor = (zone: string) => {
    switch (zone.toLowerCase()) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pipeline Management</h2>
          <p className="text-gray-500">Loan application pipeline ranking and analysis</p>
        </div>
        {!isProcessing && !isProcessed && (
          <Button onClick={processPipeline}>
            <Shuffle className="h-4 w-4 mr-2" />
            Process Pipeline
          </Button>
        )}
        {isProcessed && (
          <Button variant="outline" onClick={resetPipeline}>
            Reset Pipeline
          </Button>
        )}
      </div>
      
      {/* Processing State */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-primary-100 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-4 border-t-primary-500 border-r-primary-500 border-b-primary-200 border-l-primary-200 animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shuffle className="h-8 w-8 text-primary-500" />
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Processing Pipeline</h3>
              <p className="text-gray-600">{processingSteps[processingStep]}</p>
            </div>
            <div className="mb-2">
              <Progress value={processingProgress} className="h-2" />
            </div>
            <div className="text-xs text-gray-500 text-center">
              Step {processingStep + 1} of {processingSteps.length}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Pipeline View */}
      {!isProcessing && (
        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="pipeline" className="flex items-center">
              <ListFilter className="h-4 w-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          {/* Pipeline Tab */}
          <TabsContent value="pipeline">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {showBefore ? 'Current Pipeline' : 'Updated Pipeline'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left font-medium text-gray-500 py-3 pl-4">Rank</th>
                        <th className="text-left font-medium text-gray-500 py-3">Loan ID</th>
                        <th className="text-left font-medium text-gray-500 py-3">Borrower</th>
                        <th className="text-left font-medium text-gray-500 py-3">Property</th>
                        <th className="text-left font-medium text-gray-500 py-3">Loan Amount</th>
                        <th className="text-left font-medium text-gray-500 py-3">LTV</th>
                        <th className="text-left font-medium text-gray-500 py-3">Score</th>
                        <th className="text-left font-medium text-gray-500 py-3">Zone</th>
                        <th className="text-left font-medium text-gray-500 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showBefore ? mockPipelineData.before : mockPipelineData.after).map((deal, index) => (
                        <tr 
                          key={deal.id} 
                          className={`border-b border-gray-100 hover:bg-gray-50 ${deal.isCurrent ? 'bg-blue-50' : ''}`}
                        >
                          <td className="py-3 pl-4">
                            <div className="flex items-center">
                              <span className="font-medium">{deal.rank}</span>
                              {!showBefore && deal.isCurrent && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800">New</Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3">{deal.id}</td>
                          <td className="py-3">{deal.borrower}</td>
                          <td className="py-3">
                            <div>
                              <div className="font-medium">{deal.property.address}</div>
                              <div className="text-xs text-gray-500">{deal.property.suburb}</div>
                            </div>
                          </td>
                          <td className="py-3">{formatCurrency(deal.loanAmount)}</td>
                          <td className="py-3">{deal.ltv.toFixed(2)}%</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <span className="font-medium">{deal.score}</span>
                              {!showBefore && deal.isCurrent && (
                                <span className="ml-2 text-green-600 flex items-center">
                                  <ArrowUp className="h-3 w-3" />
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <Badge className={getZoneBadgeColor(deal.zone)}>
                              {deal.zone.charAt(0).toUpperCase() + deal.zone.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Badge className={getStatusBadgeColor(deal.status)}>
                              {deal.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {!showBefore && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Pipeline Updated</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          The new loan application has been added to the pipeline and ranked based on its decision score and other factors. The application is now ranked #2 in the pipeline.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pipeline Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Total Deals</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {showBefore ? mockPipelineData.before.length : mockPipelineData.after.length}
                    </div>
                    {!showBefore && (
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +1 from previous
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Green Zone Deals</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {mockPipelineData.metrics.greenZoneDeals}
                    </div>
                    {!showBefore && (
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +1 from previous
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Average Score</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {mockPipelineData.metrics.averageScore}
                    </div>
                    {!showBefore && (
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +1.2 from previous
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Average LTV</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {mockPipelineData.metrics.averageLTV}%
                    </div>
                    {!showBefore && (
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        -0.3% from previous
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-3">Pipeline Health</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className="text-sm font-medium text-green-600">
                        {mockPipelineData.metrics.pipelineHealth}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    
                    <div className="text-sm font-medium text-gray-700 mb-3">Pipeline Capacity</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Utilization</span>
                      <span className="text-sm font-medium text-blue-600">
                        {mockPipelineData.metrics.pipelineCapacity}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${mockPipelineData.metrics.pipelineCapacity}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-3">Pipeline Performance</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Loan Amount</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(mockPipelineData.metrics.totalLoanAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Projected IRR</span>
                        <span className="text-sm font-medium text-green-600">
                          {mockPipelineData.metrics.projectedIRR}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Projected ROI</span>
                        <span className="text-sm font-medium text-green-600">
                          {mockPipelineData.metrics.projectedROI}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Insights Tab */}
          <TabsContent value="insights">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPipelineData.insights.map((insight, index) => (
                    <div key={index} className="bg-primary-50 rounded-md p-4 border border-primary-100">
                      <div className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-primary-500 mt-0.5 mr-2" />
                        <p className="text-sm text-primary-700">{insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Decision Engine Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Decision Score</div>
                        <div className="text-xl font-bold text-primary-600">{mockDecisionResult.score}/100</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {mockDecisionResult.approved ? 'Approved' : 'Declined'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Risk Level</span>
                        <Badge className="bg-green-100 text-green-800">
                          {mockDecisionResult.riskLevel.charAt(0).toUpperCase() + mockDecisionResult.riskLevel.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Traffic Light Zone</span>
                        <Badge className="bg-green-100 text-green-800">
                          {mockDecisionResult.trafficLight}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Loan Amount</span>
                        <span className="text-sm font-medium">{formatCurrency(mockDecisionResult.loanAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">LTV Ratio</span>
                        <span className="text-sm font-medium">{mockDecisionResult.ltv}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Pipeline;
