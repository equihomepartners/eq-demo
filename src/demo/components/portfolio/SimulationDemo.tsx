import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, Calculator, BarChart2, TrendingUp, DollarSign, Percent, Shield, PieChart as PieChartIcon, RefreshCw, Layers, Briefcase, Zap, ArrowRight, LineChart as LineChartIcon, BarChart as BarChartIcon, Brain, MapPin } from 'lucide-react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import PortfolioChart from './PortfolioChart';
import DemoContext from '../../context/DemoContext';
import mockData, { mockSimulationResult } from '../../data/mockData';
import EfficientFrontier from './EfficientFrontier';
import { EnhancedSimulationDashboard } from '../enhanced';

const SimulationDemo: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);

  // Check if portfolio impact exists
  const portfolioImpactExists = demoState.portfolioImpact !== null;

  // Run simulation
  const runSimulation = () => {
    setIsSimulating(true);

    // Simulate API delay
    setTimeout(() => {
      updateDemoState({ simulationResult: mockSimulationResult });
      setIsSimulating(false);
      setIsSimulated(true);
    }, 3000);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulated(false);
    updateDemoState({ simulationResult: null });
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
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Simulation</h2>
          <p className="text-gray-500">Run a simulation to see the long-term performance of the portfolio</p>
        </div>
        {isSimulated && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Simulation Complete</span>
          </div>
        )}
      </div>

      {!portfolioImpactExists ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Missing Portfolio Impact</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please complete the Portfolio Impact Analysis before running the simulation.
              </p>
            </div>
          </div>
        </div>
      ) : !isSimulated ? (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Simulation</CardTitle>
            <CardDescription>
              Run a Monte Carlo simulation to project the long-term performance of the portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Simulation Parameters</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Simulation Period</p>
                    <p className="font-medium">10 years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monte Carlo Iterations</p>
                    <p className="font-medium">10,000+</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Confidence Level</p>
                    <p className="font-medium">95%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Market Scenarios</p>
                    <p className="font-medium">Multiple</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Simulation Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Layers className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">Modern Portfolio Theory</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Efficient frontier analysis for optimal portfolio allocation
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">Machine Learning Models</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Predictive analytics using Traffic Light System data
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">Stress Testing</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Macro-economic variable analysis and shock scenarios
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio After New Loan</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="font-medium">{formatCurrency(demoState.portfolioImpact.afterLoan.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Loans</p>
                    <p className="font-medium">{demoState.portfolioImpact.afterLoan.totalLoans}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average LTV</p>
                    <p className="font-medium">{formatPercentage(demoState.portfolioImpact.afterLoan.averageLTV)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IRR</p>
                    <p className="font-medium">{formatPercentage(demoState.portfolioImpact.afterLoan.irr)}</p>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <Calculator className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Portfolio Simulation Engine</h3>
                <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
                  The simulation engine will process hundreds of variables and parameters including market data, Traffic Light System metrics,
                  macro-economic variables, individual portfolio characteristics, and business model parameters.
                </p>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  Using Monte Carlo methods with 10,000+ iterations, Modern Portfolio Theory, and efficient frontier analysis,
                  the engine will generate comprehensive insights on how this loan affects the entire portfolio's performance,
                  risk profile, and optimal allocation strategy.
                </p>
                <Button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  size="lg"
                >
                  {isSimulating ? 'Running Complex Simulation...' : 'Run Advanced Simulation'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>
                {mockSimulationResult.name} - {new Date(mockSimulationResult.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="overview" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="process" className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Process
                  </TabsTrigger>
                  <TabsTrigger value="scenarios" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Scenarios
                  </TabsTrigger>
                  <TabsTrigger value="montecarlo" className="flex items-center">
                    <Calculator className="h-4 w-4 mr-2" />
                    Monte Carlo
                  </TabsTrigger>
                  <TabsTrigger value="sensitivity" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Sensitivity
                  </TabsTrigger>
                  <TabsTrigger value="decision" className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Decision Input
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Base Case Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">IRR</span>
                            <div className="text-2xl font-bold text-purple-600 mt-2">
                              {formatPercentage(mockSimulationResult.results.baseMetrics.irr)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">ROI</span>
                            <div className="text-2xl font-bold text-purple-600 mt-2">
                              {formatPercentage(mockSimulationResult.results.baseMetrics.roi)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Cash Yield</span>
                            <div className="text-2xl font-bold text-purple-600 mt-2">
                              {formatPercentage(mockSimulationResult.results.baseMetrics.cashYield)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Total Return</span>
                            <div className="text-2xl font-bold text-purple-600 mt-2">
                              {formatCurrency(mockSimulationResult.results.baseMetrics.totalReturn)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Final Portfolio Value</span>
                            <div className="text-2xl font-bold text-purple-600 mt-2">
                              {formatCurrency(mockSimulationResult.results.baseMetrics.finalPortfolioValue)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <EfficientFrontier />

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">Simulation Complete</h3>
                          <p className="text-sm text-green-700 mt-1">
                            The simulation projects a strong long-term performance for the portfolio with an IRR of {formatPercentage(mockSimulationResult.results.baseMetrics.irr)}
                            and a total return of {formatCurrency(mockSimulationResult.results.baseMetrics.totalReturn)} over the 10-year period.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="process">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Simulation Process</h4>
                      <p className="text-gray-600 mb-6">
                        The simulation engine uses a sophisticated multi-stage process to analyze hundreds of variables and parameters,
                        generating comprehensive insights on portfolio performance and risk.
                      </p>

                      <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2">1</span>
                            Data Integration
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-green-600 mr-2" />
                                <span className="text-sm font-medium">Traffic Light System</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Suburb metrics, growth forecasts, risk zones
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <BarChartIcon className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium">Macro Variables</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Interest rates, inflation, property market trends
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 text-amber-600 mr-2" />
                                <span className="text-sm font-medium">Portfolio Data</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Current loans, allocations, performance metrics
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2">2</span>
                            Parameter Processing
                          </h5>
                          <div className="ml-8 space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">250+ Variables Processed:</span> The engine analyzes over 250 variables including suburb-specific
                                growth rates, risk factors, loan characteristics, portfolio composition, and business model parameters.
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <Brain className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">ML Model Integration</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Machine learning models predict suburb performance based on historical data and current trends
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Correlation Analysis</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Identifies relationships between variables to model systemic risks and diversification benefits
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2">3</span>
                            Monte Carlo Simulation
                          </h5>
                          <div className="ml-8 space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">10,000+ Iterations:</span> The engine runs over 10,000 iterations, simulating different
                                possible futures based on probability distributions for each variable.
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <Calculator className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Randomization</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Bell curve distributions with adjustable volatility parameters
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <RefreshCw className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Reinvestment Logic</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Simulates reinvestment of returns based on portfolio strategy
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Stress Testing</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Includes extreme scenarios to test portfolio resilience
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2">4</span>
                            Advanced Analytics
                          </h5>
                          <div className="ml-8 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <Layers className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Modern Portfolio Theory</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Efficient frontier analysis identifies optimal risk-return balance
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                                  <span className="text-sm font-medium">Sensitivity Analysis</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Identifies key drivers of portfolio performance and risk
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2">5</span>
                            Decision Engine Integration
                          </h5>
                          <div className="ml-8">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Feedback Loop:</span> Simulation results are fed back into the Decision Engine,
                                providing critical inputs for the final underwriting decision on this loan.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <Brain className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-blue-800">Advanced Simulation Technology</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            The simulation engine represents the cutting edge of portfolio analysis technology, combining
                            machine learning, modern portfolio theory, and advanced statistical methods to provide
                            comprehensive insights for decision-making.
                          </p>
                          <p className="text-sm text-blue-700 mt-2">
                            This iterative process ensures that each loan decision is made with a full understanding of
                            its impact on the entire portfolio, optimizing for both return and risk.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scenarios">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Scenario Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mockSimulationResult.results.scenarios.map((scenario, index) => (
                          <div key={index} className={`bg-white p-4 rounded-lg shadow-sm ${
                            scenario.name === 'Optimistic'
                              ? 'border-l-4 border-green-500'
                              : scenario.name === 'Base'
                              ? 'border-l-4 border-blue-500'
                              : 'border-l-4 border-yellow-500'
                          }`}>
                            <div className="text-center">
                              <span className="text-sm text-gray-500">{scenario.name} Scenario</span>
                              <div className="text-lg font-bold mt-2 mb-1">
                                IRR: {formatPercentage(scenario.irr)}
                              </div>
                              <div className="text-sm text-gray-600">
                                ROI: {formatPercentage(scenario.roi)}
                              </div>
                              <div className="text-sm text-gray-600">
                                Total Return: {formatCurrency(scenario.totalReturn)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Probability: {scenario.probability}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Scenario Comparison</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-8">
                        <div className="flex items-center justify-center">
                          <PieChart
                            data={{
                              labels: ['Base Case', 'Optimistic', 'Pessimistic', 'Stress Test'],
                              values: [60, 20, 15, 5],
                              colors: ['#8b5cf6', '#4ade80', '#facc15', '#f87171']
                            }}
                            size={180}
                            title="Scenario Probability Distribution"
                          />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Scenario IRR Projections</h5>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Base Case</span>
                                <span className="text-sm font-medium">{formatPercentage(16.9)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Optimistic</span>
                                <span className="text-sm font-medium">{formatPercentage(20.8)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Pessimistic</span>
                                <span className="text-sm font-medium">{formatPercentage(12.8)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Stress Test</span>
                                <span className="text-sm font-medium">{formatPercentage(8.5)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blue guidance blurb temporarily removed */}
                  </div>
                </TabsContent>

                <TabsContent value="montecarlo">
                  <EnhancedSimulationDashboard
                    simulationData={mockData.enhancedUI.simulation}
                    onRunSimulation={() => console.log('Running simulation...')}
                  />
                </TabsContent>

                <TabsContent value="sensitivity">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Sensitivity Analysis</h4>
                      <div className="space-y-4">
                        {mockSimulationResult.results.sensitivityAnalysis.map((factor, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1/3 text-sm font-medium">{factor.factor}:</div>
                            <div className="w-1/3">
                              <Badge className={
                                factor.impact === 'high'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                  : factor.impact === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                  : 'bg-green-100 text-green-800 hover:bg-green-100'
                              }>
                                {factor.impact.toUpperCase()} IMPACT
                              </Badge>
                            </div>
                            <div className="w-1/3 text-sm">
                              Elasticity: {factor.elasticity.toFixed(1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Sensitivity Visualization</h4>
                      <div className="flex items-center justify-center h-48 mt-4 mb-8">
                        <PortfolioChart
                          data={{
                            labels: ['Property Growth Rate', 'Interest Rate', 'Default Rate', 'Early Exit Rate', 'Reinvestment Rate'],
                            values: [1.8, 0.9, 0.4, 0.7, 1.2],
                            colors: ['#8b5cf6', '#8b5cf6', '#8b5cf6', '#8b5cf6', '#8b5cf6']
                          }}
                          height={180}
                          title="Sensitivity Analysis (Elasticity)"
                        />
                      </div>
                    </div>

                    {/* Blue guidance blurb temporarily removed */}
                  </div>
                </TabsContent>

                <TabsContent value="decision">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Simulation Insights for Decision Engine</h4>
                      <p className="text-gray-600 mb-6">
                        The simulation results provide critical inputs to the Decision Engine, influencing the final underwriting decision.
                        Below are the key simulation-derived factors that will be considered in the decision-making process.
                      </p>

                      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Simulation Factors for Decision Engine</h5>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Long-term Performance: Strong</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                Monte Carlo simulations project strong long-term performance with this loan in the portfolio,
                                with a 95% confidence interval for IRR of {formatPercentage(mockSimulationResult.results.monteCarlo.confidenceInterval.lower)} to {formatPercentage(mockSimulationResult.results.monteCarlo.confidenceInterval.upper)}.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Risk-Adjusted Return: Excellent</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                The efficient frontier analysis shows that this loan improves the portfolio's risk-adjusted return,
                                moving the portfolio closer to the optimal position with an improvement potential of {mockSimulationResult.results.efficientFrontier.improvementPotential}.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Stress Test Performance: Resilient</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                The portfolio maintains strong performance even in stress test scenarios,
                                demonstrating resilience to market downturns and interest rate spikes.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">Sensitivity to Property Growth: High</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                Sensitivity analysis shows that the portfolio performance is highly dependent on property growth rates,
                                with an elasticity of 1.8. This highlights the importance of the Traffic Light System's growth forecasts.
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
                                Simulation analysis strongly supports loan approval
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">97/100</div>
                            <div className="text-xs text-gray-500">Simulation Score</div>
                          </div>
                        </div>
                      </div>

                      {/* Blue guidance blurb temporarily removed */}

                      <div className="mt-6 flex justify-center">
                        <div className="flex items-center space-x-2 text-blue-600">
                          <ArrowRight className="h-5 w-5" />
                          <span className="text-sm font-medium">Proceeding to Final Decision</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Simulation Date:</span> {new Date(mockSimulationResult.timestamp).toLocaleDateString()}
              </div>
              <Button variant="outline" onClick={resetSimulation}>
                Reset Simulation
              </Button>
            </CardFooter>
          </Card>

          {/* Blue guidance blurb temporarily removed */}
        </div>
      )}
    </div>
  );
};

export default SimulationDemo;
