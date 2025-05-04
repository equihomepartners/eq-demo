import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, FileText, Shield, BarChart2, Calculator, TrendingUp, Home, DollarSign, Calendar, Percent, PieChart, BarChart, Info } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DemoContext from '../../context/DemoContext';
import mockData, { mockDecisionResult } from '../../data/mockData';
import { EnhancedDecisionDashboard } from '../enhanced';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Decision: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  // Check if application and suburb data exist
  const dataExists = demoState.application !== null && demoState.suburbData !== null;

  // Run decision engine
  const runDecisionEngine = () => {
    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      updateDemoState({ decisionResult: mockDecisionResult });
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2500);
  };

  // Reset decision
  const resetDecision = () => {
    setIsProcessed(false);
    updateDemoState({ decisionResult: null });
  };

  // Get risk level color
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number | undefined) => {
    if (value === undefined || value === null) {
      return '0.0%';
    }
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Underwriting Decision</h2>
          <p className="text-gray-500">Evaluate the loan application using the Decision Engine</p>
        </div>
        {isProcessed && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Decision Complete</span>
          </div>
        )}
      </div>

      {!dataExists ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Missing Data</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please complete the loan application and Traffic Light Analysis before proceeding with the Underwriting Decision.
              </p>
            </div>
          </div>
        </div>
      ) : !isProcessed ? (
        <Card>
          <CardHeader>
            <CardTitle>Decision Engine</CardTitle>
            <CardDescription>
              Evaluate loan application for {demoState.application.property.address}, {demoState.application.property.suburb}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Application Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Borrower:</span>
                      <span>{demoState.application.borrower.name}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Property:</span>
                      <span>{demoState.application.property.address}, {demoState.application.property.suburb}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Loan Amount:</span>
                      <span>{formatCurrency(demoState.application.loan.amount)}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Property Value:</span>
                      <span>{formatCurrency(demoState.application.property.currentValue)}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">LTV Ratio:</span>
                      <span>{demoState.application.loan.ltv.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Traffic Light Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Suburb:</span>
                      <span>{demoState.suburbData.suburb}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Zone:</span>
                      <span>
                        <Badge className={
                          demoState.suburbData.zone.toLowerCase() === 'green'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : demoState.suburbData.zone.toLowerCase() === 'yellow' || demoState.suburbData.zone.toLowerCase() === 'orange'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }>
                          {demoState.suburbData.zone.toUpperCase()}
                        </Badge>
                      </span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Confidence:</span>
                      <span>{demoState.suburbData.confidence}%</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Risk Score:</span>
                      <span>{demoState.suburbData.riskScore}/100</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">ML Recommendation:</span>
                      <span>{demoState.suburbData.mlDecision.recommendation}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <Calculator className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Decision Engine</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  The Decision Engine will evaluate the loan application using the Traffic Light System data,
                  borrower information, and property details to generate a comprehensive loan decision.
                </p>
                <Button
                  onClick={runDecisionEngine}
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 'Run Decision Engine'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Loan Decision</CardTitle>
                  <CardDescription>
                    Decision for {demoState.application.property.address}, {demoState.application.property.suburb}
                  </CardDescription>
                </div>
                <Badge className={mockDecisionResult.approved ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}>
                  {mockDecisionResult.approved ? 'APPROVED' : 'DECLINED'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="overview" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Risk Analysis
                  </TabsTrigger>
                  <TabsTrigger value="returns" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Returns
                  </TabsTrigger>
                  <TabsTrigger value="terms" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Loan Terms
                  </TabsTrigger>
                  <TabsTrigger value="property" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Property
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Decision Summary</h4>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {mockDecisionResult.approved ? 'APPROVED' : 'DECLINED'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {mockDecisionResult.explanation}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">Loan Amount</span>
                            <span className="text-lg font-semibold">{formatCurrency(mockDecisionResult.loanAmount)}</span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">Interest Rate</span>
                            <span className="text-lg font-semibold">{formatPercentage(mockDecisionResult.interestRate)}</span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">LTV Ratio</span>
                            <span className="text-lg font-semibold">{formatPercentage(mockDecisionResult.ltv)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Borrower Profile</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Name(s)</span>
                            <span className="text-sm font-medium">{demoState.application.borrower.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Age(s)</span>
                            <span className="text-sm font-medium">{demoState.application.borrower.age}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Family Status</span>
                            <span className="text-sm font-medium">{demoState.application.borrower.familyStatus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Gross Income</span>
                            <span className="text-sm font-medium">{formatCurrency(demoState.application.borrower.annualIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Existing Debt</span>
                            <span className="text-sm font-medium">{formatCurrency(demoState.application.borrower.existingDebt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Use of Funds</span>
                            <span className="text-sm font-medium">{demoState.application.borrower.useOfFunds}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Property Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Address</span>
                            <span className="text-sm font-medium">{demoState.application.property.address}, {demoState.application.property.suburb}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Property Value</span>
                            <span className="text-sm font-medium">{formatCurrency(demoState.application.property.currentValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Traffic Light Zone</span>
                            <Badge className="bg-green-100 text-green-800">
                              {mockDecisionResult.trafficLight}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Specifications</span>
                            <span className="text-sm font-medium">{demoState.application.property.bedrooms} bed, {demoState.application.property.bathrooms} bath, {demoState.application.property.landSize} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Historical Growth</span>
                            <span className="text-sm font-medium">
                              {mockDecisionResult.returns.suburbHistoricalGrowth !== undefined
                                ? `${formatPercentage(mockDecisionResult.returns.suburbHistoricalGrowth)} annually`
                                : 'Data not available'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Decision Factors</h4>
                      <div className="space-y-3">
                        {mockDecisionResult.factors.map((factor, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1/3 text-sm font-medium">{factor.factor}:</div>
                            <div className="w-1/3">
                              <Badge className={getRiskLevelColor(factor.risk)}>
                                {factor.risk.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="w-1/3 text-sm">
                              <span className={
                                factor.impact === 'positive'
                                  ? 'text-green-600'
                                  : factor.impact === 'negative'
                                  ? 'text-red-600'
                                  : 'text-gray-600'
                              }>
                                {factor.impact.toUpperCase()} IMPACT
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Return Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Total Return</span>
                            <div className="text-xl font-bold text-green-600 mt-2">
                              {formatCurrency(mockDecisionResult.returns.totalReturn)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Over {mockDecisionResult.loanTerms.term.toFixed(2)} years
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">IRR</span>
                            <div className="text-xl font-bold text-green-600 mt-2">
                              {formatPercentage(mockDecisionResult.returns.irr)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Annualized return
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">ROI</span>
                            <div className="text-xl font-bold text-green-600 mt-2">
                              {formatPercentage((mockDecisionResult.returns.totalReturn / mockDecisionResult.loanAmount) * 100)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Total return percentage
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Return Components</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                              <span className="text-sm text-gray-500">Origination Fee (3%)</span>
                              <span className="text-lg font-semibold text-blue-600">{formatCurrency(mockDecisionResult.loanTerms.originationFee)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-sm text-gray-500">Simple Interest (5%)</span>
                              <span className="text-lg font-semibold text-blue-600">{formatCurrency(mockDecisionResult.returns.totalInterest)}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-sm text-gray-500">Appreciation Share ({formatPercentage(mockDecisionResult.loanTerms.appreciationShare)})</span>
                              <span className="text-lg font-semibold text-blue-600">{formatCurrency(mockDecisionResult.returns.appreciationShareAmount)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">Loan Approved</h3>
                          <p className="text-sm text-green-700 mt-1">
                            The loan application has been approved with a score of {mockDecisionResult.score}/100.
                            The property is located in a {mockDecisionResult.trafficLight} zone with strong fundamentals
                            and the borrower has an excellent profile. This Bank of Mum and Dad loan aligns perfectly with Equihome's investment criteria.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Blue guidance blurb temporarily removed */}
                  </div>
                </TabsContent>

                <TabsContent value="risk">
                  <EnhancedDecisionDashboard
                    decisionData={mockData.enhancedUI.decision}
                    onApprove={() => console.log('Loan approved')}
                    onDecline={() => console.log('Loan declined')}
                  />
                </TabsContent>

                <TabsContent value="returns">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Return Summary</h4>

                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-blue-800">Early Exit Example</h3>
                            <p className="text-sm text-blue-700 mt-1">
                              This loan has a standard term of {mockDecisionResult.loanTerms.term} years, but the borrower exited early after {mockDecisionResult.loanTerms.actualExitTerm.toFixed(2)} years ({new Date(mockDecisionResult.loanTerms.actualExitDate).toLocaleDateString()}).
                              Early exit is preferred for optimal IRR, as shown in the forecasted returns chart below.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Actual Returns (Early Exit at {mockDecisionResult.loanTerms.actualExitTerm.toFixed(2)} years)</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <span className="text-sm text-gray-500">Total Return</span>
                              <div className="text-2xl font-bold text-green-600 mt-2">
                                {formatCurrency(mockDecisionResult.returns.actualTotalReturn)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-sm text-gray-500">IRR</span>
                              <div className="text-2xl font-bold text-green-600 mt-2">
                                {formatPercentage(mockDecisionResult.returns.actualIRR)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Origination Fee</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.loanTerms.originationFee)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Interest</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.returns.actualTotalInterest)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Appreciation</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.returns.actualAppreciationShare)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Forecasted Returns (Full {mockDecisionResult.loanTerms.term}-year Term)</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <span className="text-sm text-gray-500">Total Return</span>
                              <div className="text-2xl font-bold text-blue-600 mt-2">
                                {formatCurrency(mockDecisionResult.returns.forecastTotalReturn)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-sm text-gray-500">IRR</span>
                              <div className="text-2xl font-bold text-blue-600 mt-2">
                                {formatPercentage(mockDecisionResult.returns.forecastIRR)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Origination Fee</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.loanTerms.originationFee)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Interest</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.returns.forecastTotalInterest)}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-gray-500">Appreciation</span>
                              <div className="text-sm font-semibold text-blue-600 mt-1">
                                {formatCurrency(mockDecisionResult.returns.forecastAppreciationShare)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-green-800">Early Exit Advantage</h3>
                            <p className="text-sm text-green-700 mt-1">
                              Early exit after {mockDecisionResult.loanTerms.actualExitTerm.toFixed(2)} years resulted in an IRR of {formatPercentage(mockDecisionResult.returns.actualIRR)},
                              compared to a forecasted IRR of {formatPercentage(mockDecisionResult.returns.forecastIRR)} for the full {mockDecisionResult.loanTerms.term}-year term.
                              This demonstrates how early exit can significantly enhance returns, even with a lower total return amount.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Property Value Growth</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Initial Property Value</span>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              {formatCurrency(mockDecisionResult.returns.initialPropertyValue)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Risk-adjusted value at loan start</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Final Property Value</span>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              {formatCurrency(mockDecisionResult.returns.finalPropertyValue)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Actual sale price at exit</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Total Appreciation</span>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              {formatCurrency(mockDecisionResult.returns.propertyAppreciation)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatPercentage((mockDecisionResult.returns.propertyAppreciation / mockDecisionResult.returns.initialPropertyValue) * 100)} total growth
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Suburb Historical Growth</span>
                            <div className="text-xl font-bold text-green-600 mt-2">
                              {formatPercentage(mockDecisionResult.returns.suburbHistoricalGrowth)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Annual historical average</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Suburb Forecast Growth</span>
                            <div className="text-xl font-bold text-blue-600 mt-2">
                              {formatPercentage(mockDecisionResult.returns.suburbForecastGrowth)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Annual forecast average</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Actual Growth Rate</span>
                            <div className="text-xl font-bold text-green-600 mt-2">
                              {formatPercentage(mockDecisionResult.returns.actualGrowth)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Annualized over loan term</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Forecasted Returns by Exit Year</h4>
                      <div className="mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Return Projections by Exit Year</h5>
                          <div className="h-80">
                            <Bar
                              data={{
                                labels: mockDecisionResult.returns.yearlyBreakdown.map(year => `Year ${year.year}`),
                                datasets: [
                                  {
                                    label: 'Origination Fee',
                                    data: mockDecisionResult.returns.yearlyBreakdown.map(year => year.originationFee),
                                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                                    stack: 'Stack 0',
                                  },
                                  {
                                    label: 'Interest',
                                    data: mockDecisionResult.returns.yearlyBreakdown.map(year => year.accruedInterest),
                                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                                    stack: 'Stack 0',
                                  },
                                  {
                                    label: 'Appreciation Share',
                                    data: mockDecisionResult.returns.yearlyBreakdown.map(year => year.appreciationShare),
                                    backgroundColor: 'rgba(245, 158, 11, 0.6)',
                                    stack: 'Stack 0',
                                  }
                                ]
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                  x: {
                                    stacked: true,
                                    title: {
                                      display: true,
                                      text: 'Exit Year'
                                    }
                                  },
                                  y: {
                                    stacked: true,
                                    title: {
                                      display: true,
                                      text: 'Return Amount ($)'
                                    }
                                  }
                                },
                                plugins: {
                                  tooltip: {
                                    callbacks: {
                                      label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                          label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                          label += new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'AUD',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                          }).format(context.parsed.y);
                                        }
                                        return label;
                                      }
                                    }
                                  },
                                  legend: {
                                    position: 'top',
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">IRR by Exit Year</h5>
                          <div className="h-60">
                            <Line
                              data={{
                                labels: mockDecisionResult.returns.yearlyBreakdown.map(year => `Year ${year.year}`),
                                datasets: [
                                  {
                                    label: 'IRR (%)',
                                    data: mockDecisionResult.returns.yearlyBreakdown.map(year => year.irr),
                                    borderColor: 'rgb(16, 185, 129)',
                                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                                    tension: 0.2,
                                    pointBackgroundColor: mockDecisionResult.returns.yearlyBreakdown.map(year =>
                                      year.isActual ? 'rgb(220, 38, 38)' : 'rgb(16, 185, 129)'
                                    ),
                                    pointRadius: mockDecisionResult.returns.yearlyBreakdown.map(year =>
                                      year.isActual ? 6 : 4
                                    ),
                                    pointHoverRadius: mockDecisionResult.returns.yearlyBreakdown.map(year =>
                                      year.isActual ? 8 : 6
                                    ),
                                  }
                                ]
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                  y: {
                                    title: {
                                      display: true,
                                      text: 'IRR (%)'
                                    }
                                  },
                                  x: {
                                    title: {
                                      display: true,
                                      text: 'Exit Year'
                                    }
                                  }
                                },
                                plugins: {
                                  tooltip: {
                                    callbacks: {
                                      label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                          label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                          label += context.parsed.y.toFixed(2) + '%';
                                        }
                                        return label;
                                      },
                                      afterLabel: function(context) {
                                        const index = context.dataIndex;
                                        const year = mockDecisionResult.returns.yearlyBreakdown[index];
                                        if (year.isActual) {
                                          return 'Actual Exit';
                                        }
                                        return null;
                                      }
                                    }
                                  },
                                  legend: {
                                    position: 'top',
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                            <span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-1"></span>
                            <span className="mr-4">Actual Exit</span>
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                            <span>Forecasted Exit</span>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Detailed Return Breakdown by Exit Year</h5>
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left">Exit Year</th>
                              <th className="px-4 py-2 text-left">Date</th>
                              <th className="px-4 py-2 text-right">Property Value</th>
                              <th className="px-4 py-2 text-right">Accrued Interest</th>
                              <th className="px-4 py-2 text-right">Appreciation Share</th>
                              <th className="px-4 py-2 text-right">Total Return</th>
                              <th className="px-4 py-2 text-right">IRR</th>
                              <th className="px-4 py-2 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockDecisionResult.returns.yearlyBreakdown.map((year, index) => (
                              <tr key={index} className={
                                year.isActual ? 'bg-green-50 font-medium' :
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }>
                                <td className="px-4 py-2">{year.year}</td>
                                <td className="px-4 py-2">{new Date(year.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(year.propertyValue)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(year.accruedInterest)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(year.appreciationShare)}</td>
                                <td className="px-4 py-2 text-right">{formatCurrency(year.totalReturn)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(year.irr)}</td>
                                <td className="px-4 py-2 text-center">
                                  {year.isActual ? (
                                    <Badge className="bg-green-100 text-green-800">Actual Exit</Badge>
                                  ) : year.isForecast ? (
                                    <Badge className="bg-blue-100 text-blue-800">Forecast</Badge>
                                  ) : (
                                    <Badge className="bg-gray-100 text-gray-800">Estimate</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 text-xs text-gray-500">
                        <p>Note: The highlighted row shows the actual exit at {mockDecisionResult.loanTerms.actualExitTerm.toFixed(2)} years, with the property sold for {formatCurrency(mockDecisionResult.returns.finalPropertyValue)}. The standard loan term is {mockDecisionResult.loanTerms.term} years, but early exit is preferred for optimal IRR.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="terms">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Loan Terms</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Loan Amount</span>
                              <span className="text-lg font-semibold">{formatCurrency(mockDecisionResult.loanAmount)}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Interest Rate</span>
                              <span className="text-lg font-semibold">{formatPercentage(mockDecisionResult.interestRate)}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">LTV Ratio</span>
                              <span className="text-lg font-semibold">{formatPercentage(mockDecisionResult.ltv)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Origination Fee</span>
                              <span className="text-lg font-semibold">{formatCurrency(mockDecisionResult.loanTerms.originationFee)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">3% of loan amount</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Monthly Payment</span>
                              <span className="text-lg font-semibold">{formatCurrency(mockDecisionResult.loanTerms.monthlyPayment)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">No monthly payments required</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Appreciation Share</span>
                              <span className="text-lg font-semibold">{formatPercentage(mockDecisionResult.loanTerms.appreciationShare)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Equal to LTV ratio</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Loan Term</span>
                              <span className="text-lg font-semibold">{mockDecisionResult.loanTerms.term} years</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">With flexibility to exit anytime</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Start Date</span>
                              <span className="text-lg font-semibold">{new Date(mockDecisionResult.loanTerms.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Exit Flexibility</span>
                              <span className="text-lg font-semibold">Available</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Can exit anytime during the 10-year term</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-blue-900 mb-4">Equihome Loan Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-blue-800">No Monthly Payments</h5>
                            <p className="text-xs text-blue-700 mt-1">
                              No monthly payments required for the entire loan term, improving cash flow for borrowers.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <Percent className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-blue-800">Fixed 5% Simple Interest</h5>
                            <p className="text-xs text-blue-700 mt-1">
                              5% simple interest (not compounding) capitalized at term end, providing predictable costs.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-blue-800">Appreciation Share</h5>
                            <p className="text-xs text-blue-700 mt-1">
                              Equihome shares in the property's appreciation at exit, with the share percentage equal to the initial LTV ratio ({formatPercentage(mockDecisionResult.ltv)}).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-blue-800">Exit Flexibility</h5>
                            <p className="text-xs text-blue-700 mt-1">
                              Standard 10-year term with flexibility to exit earlier. Early exit is preferred for optimal IRR.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-green-900 mb-4">Equihome Return Components</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-green-800">3% Origination Fee</h5>
                            <p className="text-xs text-green-700 mt-1">
                              A 3% origination fee ({formatCurrency(mockDecisionResult.loanTerms.originationFee)}) is collected at loan origination and goes to the GP.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                            <Percent className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-green-800">5% Simple Interest</h5>
                            <p className="text-xs text-green-700 mt-1">
                              5% simple interest accrues annually and is paid at exit. For this {mockDecisionResult.loanTerms.term.toFixed(2)}-year loan, the total interest is {formatCurrency(mockDecisionResult.returns.totalInterest)}.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-green-800">Appreciation Share</h5>
                            <p className="text-xs text-green-700 mt-1">
                              At exit, Equihome receives {formatPercentage(mockDecisionResult.loanTerms.appreciationShare)} of the property's appreciation.
                              With the property value increasing from {formatCurrency(mockDecisionResult.returns.initialPropertyValue)} to {formatCurrency(mockDecisionResult.returns.finalPropertyValue)},
                              the appreciation share amounts to {formatCurrency(mockDecisionResult.returns.appreciationShareAmount)}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="property">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Property Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Location</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Address</span>
                                <span className="text-sm font-medium">{demoState.application.property.address}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Suburb</span>
                                <span className="text-sm font-medium">{demoState.application.property.suburb}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Postcode</span>
                                <span className="text-sm font-medium">{demoState.application.property.postcode}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">State</span>
                                <span className="text-sm font-medium">{demoState.application.property.state}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Council (LGA)</span>
                                <span className="text-sm font-medium">{demoState.application.property.council}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Property Specifications</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Bedrooms</span>
                                <span className="text-sm font-medium">{demoState.application.property.bedrooms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Bathrooms</span>
                                <span className="text-sm font-medium">{demoState.application.property.bathrooms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Garage</span>
                                <span className="text-sm font-medium">{demoState.application.property.garage}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Land Size</span>
                                <span className="text-sm font-medium">{demoState.application.property.landSize} m²</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Building Size</span>
                                <span className="text-sm font-medium">{demoState.application.property.buildingSize} m²</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Valuation</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">PropTrack AVM Value</span>
                                <span className="text-sm font-medium">{formatCurrency(demoState.application.property.originalValue)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Risk Adjustment</span>
                                <span className="text-sm font-medium">{formatPercentage(mockDecisionResult.dealMetrics.discountFromAVM)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Risk-Adjusted Value</span>
                                <span className="text-sm font-medium">{formatCurrency(demoState.application.property.currentValue)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">First Mortgage Debt</span>
                                <span className="text-sm font-medium">{formatCurrency(mockDecisionResult.dealMetrics.firstMortgageDebt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Equity Released</span>
                                <span className="text-sm font-medium">{formatCurrency(mockDecisionResult.dealMetrics.equityReleased)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Suburb Profile</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Traffic Light Zone</span>
                                <Badge className="bg-green-100 text-green-800">
                                  {mockDecisionResult.trafficLight}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Owner Outright</span>
                                <span className="text-sm font-medium">{demoState.application.property.ownershipProfile.ownerOutright}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Owner with Mortgage</span>
                                <span className="text-sm font-medium">{demoState.application.property.ownershipProfile.ownerMortgage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Total Owner-Occupied</span>
                                <span className="text-sm font-medium">{demoState.application.property.ownershipProfile.ownerTotal}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Total Renter-Occupied</span>
                                <span className="text-sm font-medium">{demoState.application.property.ownershipProfile.renterTotal}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Historical Transactions</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left">Date</th>
                              <th className="px-4 py-2 text-right">Price</th>
                              <th className="px-4 py-2 text-right">Growth Since Previous</th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoState.application.property.previousTransactions.map((transaction, index, array) => {
                              const prevPrice = index < array.length - 1 ? array[index + 1].price : null;
                              const growthPercent = prevPrice ? ((transaction.price - prevPrice) / prevPrice) * 100 : null;

                              return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-4 py-2">{transaction.date}</td>
                                  <td className="px-4 py-2 text-right">{formatCurrency(transaction.price)}</td>
                                  <td className="px-4 py-2 text-right">
                                    {growthPercent !== null ? formatPercentage(growthPercent) : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Growth Profile</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="text-sm font-medium text-gray-700">Suburb Historical Growth Rate</h5>
                            <span className="text-lg font-semibold text-green-600">{formatPercentage(mockDecisionResult.dealMetrics.growthProfile.suburbHistorical)}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Historical median growth rate for {demoState.application.property.suburb} based on past performance.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="text-sm font-medium text-gray-700">Suburb Forecast Growth Rate</h5>
                            <span className="text-lg font-semibold text-blue-600">{formatPercentage(mockDecisionResult.dealMetrics.growthProfile.suburbForecast)}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Forecasted growth rate for {demoState.application.property.suburb} based on Equihome's predictive models.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                          <Home className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-blue-800">Property Assessment</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            This property in {demoState.application.property.suburb} is located in a green zone with strong historical performance and excellent growth prospects.
                            The property's characteristics (4 bedrooms, 3 bathrooms) and land size (676 m²) make it an attractive investment.
                            The suburb's high owner-occupier rate ({demoState.application.property.ownershipProfile.ownerTotal}%) indicates stability and long-term growth potential.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Decision Date:</span> {new Date().toLocaleDateString()}
              </div>
              <Button variant="outline" onClick={resetDecision}>
                Reset Decision
              </Button>
            </CardFooter>
          </Card>

          {/* Navigation guidance */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-900">Navigation Guide</h3>
                <p className="text-sm text-blue-700 mt-1">
                  You've completed the Underwriting Decision process. The loan has been approved by the Underwriting System.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Click the "Executive" tab above to proceed to the Executive Summary, which provides a comprehensive overview of the entire loan analysis process.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decision;
