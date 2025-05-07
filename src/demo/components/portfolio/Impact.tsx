import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, PieChart as PieChartIcon, BarChart2, TrendingUp, DollarSign, Percent, Shield, RefreshCw, BarChart as BarChartIcon, LineChart as LineChartIcon, Layers, Briefcase, Scale, Zap, ArrowRight, Info } from 'lucide-react';
import DemoContext from '../../context/DemoContext';
import mockData, { mockPortfolioMetrics, mockPortfolioImpact } from '../../data/mockData';
import PortfolioChart from './PortfolioChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import LTVDistributionChart from './LTVDistributionChart';
import { EnhancedPortfolioDashboard } from '../enhanced';

const Impact: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Check if decision result exists
  const decisionExists = demoState.decisionResult !== null;

  // Analyze portfolio impact
  const analyzePortfolioImpact = () => {
    setIsAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      updateDemoState({ portfolioImpact: mockPortfolioImpact });
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2000);
  };

  // Reset analysis
  const resetAnalysis = () => {
    setIsAnalyzed(false);
    updateDemoState({ portfolioImpact: null });
  };

  // Format currency
  const formatCurrency = (amount: number | string) => {
    if (typeof amount === 'string' && amount.startsWith('+')) {
      return `+${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(parseFloat(amount.substring(1)))}`;
    } else if (typeof amount === 'string' && amount.startsWith('-')) {
      return `-${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(parseFloat(amount.substring(1)))}`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    }
  };

  // Format percentage
  const formatPercentage = (value: number | string | undefined) => {
    if (value === undefined || value === null) {
      return '0.0%';
    }

    if (typeof value === 'string') {
      if (value.startsWith('+')) {
        return `+${parseFloat(value.substring(1)).toFixed(1)}%`;
      } else if (value.startsWith('-')) {
        return `-${parseFloat(value.substring(1)).toFixed(1)}%`;
      } else {
        return `${parseFloat(value).toFixed(1)}%`;
      }
    } else {
      return `${value.toFixed(1)}%`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Impact</h2>
          <p className="text-gray-500">Analyze the impact of the new loan on the portfolio</p>
        </div>
        {isAnalyzed && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Analysis Complete</span>
          </div>
        )}
      </div>

      {!decisionExists ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Missing Decision</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please complete the Underwriting Decision before analyzing the portfolio impact.
              </p>
            </div>
          </div>
        </div>
      ) : !isAnalyzed ? (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Impact Analysis</CardTitle>
            <CardDescription>
              Analyze the impact of adding the {demoState.application.property.suburb} loan to the portfolio (January 2020)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Portfolio Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="font-medium">{formatCurrency(mockPortfolioMetrics.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Loans</p>
                    <p className="font-medium">{mockPortfolioMetrics.totalLoans}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average LTV</p>
                    <p className="font-medium">{formatPercentage(mockPortfolioMetrics.averageLTV)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IRR</p>
                    <p className="font-medium">{formatPercentage(mockPortfolioMetrics.performance.irr)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">New Loan Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-medium">{formatCurrency(demoState.decisionResult?.loanAmount || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-medium">{formatPercentage(demoState.decisionResult?.interestRate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">LTV</p>
                    <p className="font-medium">{formatPercentage(demoState.decisionResult?.ltv)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IRR</p>
                    <p className="font-medium">{formatPercentage(demoState.decisionResult?.returns?.irr)}</p>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <PieChart className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio Impact Analysis</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  The Portfolio Management System will analyze the impact of adding this loan to the portfolio,
                  including changes to key metrics, diversification, and overall performance. This analysis
                  demonstrates how the platform evaluates loans in real-time to optimize portfolio allocation.
                </p>
                <Button
                  onClick={analyzePortfolioImpact}
                  disabled={isAnalyzing}
                  size="lg"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Portfolio Impact'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Impact Analysis Results</CardTitle>
              <CardDescription>
                Impact of adding the {demoState.application.property.suburb} loan to the portfolio (January 2020)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="overview" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Key Metrics
                  </TabsTrigger>
                  <TabsTrigger value="allocation" className="flex items-center">
                    <PieChartIcon className="h-4 w-4 mr-2" />
                    Allocation
                  </TabsTrigger>
                  <TabsTrigger value="rebalancing" className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Rebalancing
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Risk Analysis
                  </TabsTrigger>
                  <TabsTrigger value="decision" className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Decision Input
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Impact Summary</h4>
                      <p className="text-gray-600 mb-6">
                        {mockPortfolioImpact.analysis.summary}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">Total Value</span>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-semibold">{formatCurrency(mockPortfolioImpact.afterLoan.totalValue)}</span>
                              <span className="text-xs text-green-600">{formatCurrency(mockPortfolioImpact.impact.totalValue)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">IRR</span>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-semibold">{formatPercentage(mockPortfolioImpact.afterLoan.irr)}</span>
                              <span className="text-xs text-green-600">{formatPercentage(mockPortfolioImpact.impact.irr)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">Risk Score</span>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-semibold">{mockPortfolioImpact.afterLoan.riskScore}</span>
                              <span className="text-xs text-green-600">{mockPortfolioImpact.impact.riskScore}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Concerns</h4>
                        <p className="text-gray-600">
                          {mockPortfolioImpact.analysis.concerns}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h4>
                        <p className="text-gray-600">
                          {mockPortfolioImpact.analysis.recommendations}
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">Positive Portfolio Impact</h3>
                          <p className="text-sm text-green-700 mt-1">
                            The addition of this loan has a positive impact on the portfolio, increasing the total value and IRR
                            while slightly reducing the average LTV and risk score.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <EnhancedPortfolioDashboard portfolioData={mockData.enhancedUI.portfolio} />
                </TabsContent>

                <TabsContent value="allocation">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Suburb Allocation</h4>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">{demoState.application.property.suburb} Allocation</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{formatPercentage(mockPortfolioImpact.afterLoan.mosmanAllocation)}</span>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            {formatPercentage(mockPortfolioImpact.impact.mosmanAllocation)}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${mockPortfolioImpact.beforeLoan.mosmanAllocation}%` }}
                        ></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${mockPortfolioImpact.afterLoan.mosmanAllocation}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Before</span>
                        <span>After</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Allocation by Zone</h4>
                        <div className="flex items-center justify-center h-48">
                          <div className="text-center text-gray-500">
                            <PieChart
                              data={{
                                labels: ['Green Zone', 'Yellow Zone', 'Red Zone'],
                                values: [75, 20, 5],
                                colors: ['#4ade80', '#facc15', '#f87171']
                              }}
                              size={150}
                              title="Zone Allocation"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">LTV Distribution</h4>
                        <div className="flex items-center justify-center h-48">
                          <div className="text-center text-gray-500 w-full">
                            <LTVDistributionChart
                              data={{
                                ranges: ['0-10%', '10-15%', '15-20%', '20-25%', '25-30%'],
                                counts: [3, 8, 15, 12, 4],
                                percentages: [7, 19, 36, 29, 9],
                                colors: ['#4ade80', '#a3e635', '#facc15', '#fb923c', '#f87171']
                              }}
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-yellow-800">Allocation Insights</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            The {demoState.application.property.suburb} allocation has increased to {mockPortfolioImpact.afterLoan.mosmanAllocation}% of the portfolio.
                            This loan's low LTV ratio (11.90%) improves the portfolio's risk profile by increasing the proportion of loans in the 10-15% LTV range.
                            Consider maintaining a balanced distribution of LTV ratios while diversifying across different suburbs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rebalancing">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Rebalancing Analysis</h4>
                      <p className="text-gray-600 mb-6">
                        Adding this loan requires portfolio rebalancing to maintain optimal diversification and risk-adjusted returns.
                        The system has analyzed the current portfolio composition and recommends the following adjustments.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Current Allocation</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Green Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(75)}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Yellow Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(20)}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Red Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(5)}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Recommended Allocation</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Green Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(77)}</span>
                                <Badge className="ml-2 bg-green-100 text-green-800">+2%</Badge>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '77%' }}></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Yellow Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(19)}</span>
                                <Badge className="ml-2 bg-yellow-100 text-yellow-800">-1%</Badge>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '19%' }}></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Red Zone</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{formatPercentage(4)}</span>
                                <Badge className="ml-2 bg-red-100 text-red-800">-1%</Badge>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Suburb Rebalancing Recommendations</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left">Suburb</th>
                                <th className="px-4 py-2 text-right">Current</th>
                                <th className="px-4 py-2 text-right">Target</th>
                                <th className="px-4 py-2 text-right">Change</th>
                                <th className="px-4 py-2 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-green-50">
                                <td className="px-4 py-2">{demoState.application.property.suburb}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(18)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(21)}</td>
                                <td className="px-4 py-2 text-right text-green-600">+3%</td>
                                <td className="px-4 py-2">Add current loan</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Double Bay</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(15)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(15)}</td>
                                <td className="px-4 py-2 text-right">0%</td>
                                <td className="px-4 py-2">Maintain</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Bondi</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(12)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(13)}</td>
                                <td className="px-4 py-2 text-right text-green-600">+1%</td>
                                <td className="px-4 py-2">Increase allocation</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Randwick</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(7)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(6)}</td>
                                <td className="px-4 py-2 text-right text-red-600">-1%</td>
                                <td className="px-4 py-2">Decrease allocation</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Parramatta</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(3)}</td>
                                <td className="px-4 py-2 text-right">{formatPercentage(2)}</td>
                                <td className="px-4 py-2 text-right text-red-600">-1%</td>
                                <td className="px-4 py-2">Decrease allocation</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Blue guidance blurb temporarily removed */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="risk">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Risk Analysis</h4>
                      <p className="text-gray-600 mb-6">
                        The risk analysis evaluates how the addition of this loan affects the overall portfolio risk profile,
                        considering multiple risk factors and their correlations.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Portfolio Risk Score</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              27/100
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              -1 point (lower risk)
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Volatility</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              8.3%
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              -0.2% (improved)
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Sharpe Ratio</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              1.9
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              +0.1 (improved)
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Risk Factor Analysis</h5>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Market Risk</span>
                                <span className="text-sm font-medium">Low</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Credit Risk</span>
                                <span className="text-sm font-medium">Very Low</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Liquidity Risk</span>
                                <span className="text-sm font-medium">Medium</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Concentration Risk</span>
                                <span className="text-sm font-medium">Medium</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Stress Test Results</h5>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Market Downturn (-20%)</span>
                              <span className="text-sm font-medium text-amber-600">-5.2% Impact</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Interest Rate Spike (+2%)</span>
                              <span className="text-sm font-medium text-green-600">-0.8% Impact</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Liquidity Crisis</span>
                              <span className="text-sm font-medium text-amber-600">-7.5% Impact</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Combined Scenario</span>
                              <span className="text-sm font-medium text-amber-600">-12.3% Impact</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Risk Contribution of New Loan</h5>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            This loan contributes positively to the portfolio's risk profile due to its:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Shield className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-sm font-medium">Low LTV (11.90%)</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Significantly below portfolio average of 22.3%
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Shield className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-sm font-medium">Green Zone Location</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                High liquidity and strong market fundamentals
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Shield className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-sm font-medium">Strong Borrower</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Excellent credit profile with no existing debt
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Blue guidance blurb temporarily removed */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="decision">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Decision Engine Input</h4>
                      <p className="text-gray-600 mb-6">
                        The Portfolio Management System provides critical inputs to the Decision Engine,
                        influencing the final underwriting decision. Below are the key portfolio-related factors
                        that will be considered in the decision-making process.
                      </p>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Portfolio Factors for Decision Engine</h5>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Portfolio Fit Score: 92/100</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                This loan has excellent alignment with the portfolio strategy, enhancing returns while maintaining a balanced risk profile.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Diversification Impact: Positive</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                While increasing concentration in {demoState.application.property.suburb}, the loan's characteristics
                                (low LTV, strong borrower) provide diversification benefits to the overall portfolio.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Return Enhancement: +0.1% IRR</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                The addition of this loan is projected to increase the portfolio's overall IRR by 0.1%,
                                contributing positively to performance.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Concentration Analysis</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                The loan increases {demoState.application.property.suburb} concentration to 21%, which is within
                                the acceptable range. The low LTV ratio (11.90%) improves our portfolio's risk profile by increasing
                                the proportion of lower-risk loans, aligning with our conservative lending strategy for single-family homes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Decision Engine Recommendation</h5>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-base font-medium text-gray-800">Approve Loan</h5>
                              <p className="text-sm text-gray-600">
                                Portfolio analysis strongly supports loan approval
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">95/100</div>
                            <div className="text-xs text-gray-500">Portfolio Score</div>
                          </div>
                        </div>
                      </div>

                      {/* Blue guidance blurb temporarily removed */}

                      <div className="mt-6 flex justify-center">
                        <div className="flex items-center space-x-2 text-blue-600">
                          <ArrowRight className="h-5 w-5" />
                          <span className="text-sm font-medium">Proceeding to Simulation Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Analysis Date:</span> January 15, 2020
              </div>
              <Button variant="outline" onClick={resetAnalysis}>
                Reset Analysis
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
                  You've completed the Portfolio Impact analysis. The next step is to run simulations to see the long-term performance of the portfolio with this new loan.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Click the "Simulation" tab above to proceed to the Simulation Engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Impact;
