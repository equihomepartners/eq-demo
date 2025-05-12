import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  AlertCircle,
  CheckCircle,
  Calculator,
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Shield,
  PieChart as PieChartIcon,
  RefreshCw,
  Layers,
  Briefcase,
  Zap,
  ArrowRight,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Brain,
  MapPin,
  Info,
  Target,
  Sliders
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
import EfficientFrontierChart from '../ui/EfficientFrontierChart';
import theme from '../../utils/theme';

interface SimulationResultsProps {
  simulationKpis: any[];
  monteCarloData: any[];
  scenarioComparisonData: any[];
  efficientFrontierData: any;
  sensitivityData: any[];
  resetSimulation: () => void;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({
  simulationKpis,
  monteCarloData,
  scenarioComparisonData,
  efficientFrontierData,
  sensitivityData,
  resetSimulation
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number | string) => {
    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseFloat(value.replace('%', '')) : value;
    return `${numValue.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Simulation Results</h3>
          <p className="text-gray-500">Comprehensive analysis of portfolio performance projections</p>
        </div>
        <Button variant="outline" onClick={resetSimulation}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Run New Simulation
        </Button>
      </div>

      {/* KPI Dashboard */}
      <KpiDashboard
        kpis={simulationKpis}
        cols={4}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="montecarlo" className="flex items-center">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Monte Carlo
          </TabsTrigger>
          <TabsTrigger value="efficient" className="flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Efficient Frontier
          </TabsTrigger>
          <TabsTrigger value="sensitivity" className="flex items-center">
            <Sliders className="h-4 w-4 mr-2" />
            Sensitivity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monte Carlo Simulation Chart */}
              <EnhancedCard variant="elevated">
                <div className="p-4">
                  <AdvancedLineChart
                    title="Portfolio Value Projection"
                    subtitle="Monte Carlo simulation with confidence intervals"
                    data={monteCarloData}
                    datasets={[
                      {
                        id: 'p50',
                        name: 'Median (P50)',
                        dataKey: 'p50',
                        color: theme.colors.primary[500],
                      },
                      {
                        id: 'p25',
                        name: 'Lower Quartile (P25)',
                        dataKey: 'p25',
                        color: theme.colors.primary[300],
                        strokeDasharray: '5 5',
                      },
                      {
                        id: 'p75',
                        name: 'Upper Quartile (P75)',
                        dataKey: 'p75',
                        color: theme.colors.primary[700],
                        strokeDasharray: '5 5',
                      },
                    ]}
                    xAxisDataKey="year"
                    height={300}
                    yAxisLabel="Portfolio Value"
                    xAxisLabel="Year"
                    showGrid={true}
                    formatYAxis={(value) => `$${(value / 1000000).toFixed(0)}M`}
                    formatTooltip={(value) => [formatCurrency(value), 'Portfolio Value']}
                  />
                </div>
              </EnhancedCard>

              {/* Scenario Comparison Chart */}
              <EnhancedCard variant="elevated">
                <div className="p-4">
                  <AdvancedBarChart
                    title="Scenario Comparison"
                    subtitle="IRR under different market scenarios"
                    data={scenarioComparisonData}
                    datasets={[
                      {
                        id: 'irr',
                        name: 'Expected IRR',
                        dataKey: 'irr',
                        color: theme.colors.primary[500],
                      },
                    ]}
                    xAxisDataKey="scenario"
                    height={300}
                    yAxisLabel="IRR (%)"
                    xAxisLabel="Scenario"
                    showGrid={true}
                    formatYAxis={(value) => `${value.toFixed(1)}%`}
                    formatTooltip={(value) => [`${value.toFixed(2)}%`, 'Expected IRR']}
                    barSize={30}
                  />
                </div>
              </EnhancedCard>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900">Simulation Complete</h3>
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    The simulation projects a strong long-term performance for the portfolio with an IRR of {formatPercentage(simulationKpis[0].value.replace('%', ''))}
                    and a projected value of {simulationKpis[1].value} over the 10-year period.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-1">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Growth Projection</span>
                      </div>
                      <p className="text-xs text-blue-700 ml-6">
                        Portfolio value is projected to grow at a compound annual rate of 6.3% over the next decade.
                      </p>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="flex items-center mb-1">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Risk Assessment</span>
                      </div>
                      <p className="text-xs text-green-700 ml-6">
                        The portfolio maintains a balanced risk profile with strong downside protection from green zone properties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="montecarlo">
          <div className="space-y-6">
            <EnhancedCard variant="elevated">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monte Carlo Simulation Results</h3>

                <div className="mb-6">
                  <AdvancedLineChart
                    title="Portfolio Value Projection"
                    subtitle="Full Monte Carlo simulation with confidence intervals"
                    data={monteCarloData}
                    datasets={[
                      {
                        id: 'p50',
                        name: 'Median (P50)',
                        dataKey: 'p50',
                        color: theme.colors.primary[500],
                      },
                      {
                        id: 'p25',
                        name: 'Lower Quartile (P25)',
                        dataKey: 'p25',
                        color: theme.colors.primary[300],
                        strokeDasharray: '5 5',
                      },
                      {
                        id: 'p75',
                        name: 'Upper Quartile (P75)',
                        dataKey: 'p75',
                        color: theme.colors.primary[700],
                        strokeDasharray: '5 5',
                      },
                      {
                        id: 'p10',
                        name: 'Lower Decile (P10)',
                        dataKey: 'p10',
                        color: theme.colors.warning[500],
                        strokeDasharray: '3 3',
                      },
                      {
                        id: 'p90',
                        name: 'Upper Decile (P90)',
                        dataKey: 'p90',
                        color: theme.colors.success[500],
                        strokeDasharray: '3 3',
                      },
                    ]}
                    xAxisDataKey="year"
                    height={400}
                    yAxisLabel="Portfolio Value"
                    xAxisLabel="Year"
                    showGrid={true}
                    formatYAxis={(value) => `$${(value / 1000000).toFixed(0)}M`}
                    formatTooltip={(value) => [formatCurrency(value), 'Portfolio Value']}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Target className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">Probability of Meeting Target</h4>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2 ml-12">85.2%</div>
                    <div className="ml-12 bg-blue-50 p-2 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-700">
                        Probability of achieving the target IRR of 15% over the 10-year period
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Shield className="h-5 w-5 text-amber-600" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">Value at Risk (95%)</h4>
                    </div>
                    <div className="text-3xl font-bold text-amber-600 mb-2 ml-12">{formatCurrency(38200000)}</div>
                    <div className="ml-12 bg-amber-50 p-2 rounded-lg border border-amber-100">
                      <p className="text-xs text-amber-700">
                        Minimum expected portfolio value at year 10 with 95% confidence
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">Upside Potential (95%)</h4>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2 ml-12">{formatCurrency(53800000)}</div>
                    <div className="ml-12 bg-green-50 p-2 rounded-lg border border-green-100">
                      <p className="text-xs text-green-700">
                        Maximum expected portfolio value at year 10 with 95% confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </TabsContent>

        <TabsContent value="efficient">
          <div className="space-y-6">
            <EnhancedCard variant="elevated">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Efficient Frontier Analysis</h3>

                <div className="mb-6">
                  <EfficientFrontierChart
                    title="Portfolio Efficient Frontier"
                    subtitle="Risk-return profile and optimal allocation"
                    data={efficientFrontierData.data}
                    frontierData={efficientFrontierData.frontierData}
                    currentPortfolio={efficientFrontierData.currentPortfolio}
                    optimalPortfolio={efficientFrontierData.optimalPortfolio}
                    height={400}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Target className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">Current Portfolio Position</h4>
                    </div>

                    <div className="ml-12 mb-4">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                          <div className="text-xs text-blue-600">Expected Return</div>
                          <div className="text-lg font-bold text-blue-800">{formatPercentage(efficientFrontierData.currentPortfolio.return)}</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                          <div className="text-xs text-blue-600">Risk Level</div>
                          <div className="text-lg font-bold text-blue-800">{formatPercentage(efficientFrontierData.currentPortfolio.risk)}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-700">
                          Your current portfolio is positioned with a moderate risk level and strong expected returns, with a good balance between growth potential and stability.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Zap className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">Optimization Opportunity</h4>
                    </div>

                    <div className="ml-12 mb-4">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                          <div className="text-xs text-green-600">Potential Return</div>
                          <div className="text-lg font-bold text-green-800">{formatPercentage(efficientFrontierData.optimalPortfolio.return)}</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                          <div className="text-xs text-green-600">Optimal Risk</div>
                          <div className="text-lg font-bold text-green-800">{formatPercentage(efficientFrontierData.optimalPortfolio.risk)}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-700">
                          By adjusting your portfolio allocation to include more green zone properties and optimizing loan sizes, you could potentially achieve a better risk-return profile.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-start">
                        <div className="bg-amber-100 p-1 rounded-full mr-2 mt-0.5">
                          <ArrowRight className="h-3 w-3 text-amber-600" />
                        </div>
                        <p className="text-xs text-gray-700">
                          Consider increasing allocation to green zone properties by 5-10% to move closer to the optimal portfolio position.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </TabsContent>

        <TabsContent value="sensitivity">
          <div className="space-y-6">
            <EnhancedCard variant="elevated">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sensitivity Analysis</h3>

                <div className="mb-6">
                  <AdvancedBarChart
                    title="Parameter Sensitivity"
                    subtitle="Impact on IRR by parameter (percentage points)"
                    data={sensitivityData}
                    datasets={[
                      {
                        id: 'impact',
                        name: 'Impact on IRR',
                        dataKey: 'value',
                        color: (data) => data.color || theme.colors.primary[500]
                      }
                    ]}
                    xAxisDataKey="name"
                    height={350}
                    yAxisLabel="Impact (pp)"
                    xAxisLabel="Parameter"
                    showGrid={true}
                    horizontal={true}
                    formatYAxis={(value) => value.toFixed(1)}
                    formatTooltip={(value, name, entry) => {
                      const originalImpact = entry?.originalImpact || 0;
                      const sign = originalImpact >= 0 ? '+' : '-';
                      return [`${sign}${value.toFixed(2)} pp`, 'Impact on IRR'];
                    }}
                    barSize={30}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Key Sensitivity Factors</h4>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-800">Property Growth Rate</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">+3.2 pp</Badge>
                        </div>
                        <p className="text-xs text-gray-600 ml-5">
                          A 1% increase in property growth rate increases IRR by 3.2 percentage points
                        </p>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-800">Interest Rate</span>
                          </div>
                          <Badge className="bg-red-100 text-red-800 border-red-200">-1.8 pp</Badge>
                        </div>
                        <p className="text-xs text-gray-600 ml-5">
                          A 1% increase in interest rates decreases IRR by 1.8 percentage points
                        </p>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-800">Default Rate</span>
                          </div>
                          <Badge className="bg-red-100 text-red-800 border-red-200">-1.5 pp</Badge>
                        </div>
                        <p className="text-xs text-gray-600 ml-5">
                          A 1% increase in default rate decreases IRR by 1.5 percentage points
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-500" />
                      Sensitivity Insights
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                          <TrendingUp className="h-3 w-3 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-700">
                          The portfolio shows the highest sensitivity to property growth rates, followed by appreciation fees and interest rates.
                        </p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                          <MapPin className="h-3 w-3 text-green-600" />
                        </div>
                        <p className="text-xs text-gray-700">
                          This sensitivity profile is typical for a portfolio with a high allocation to green zone properties, which tend to have more stable growth patterns.
                        </p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-purple-100 p-1 rounded-full mr-2 mt-0.5">
                          <Shield className="h-3 w-3 text-purple-600" />
                        </div>
                        <p className="text-xs text-gray-700">
                          The relatively low sensitivity to default rates indicates strong risk management in the loan selection process.
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <h5 className="text-xs font-medium text-gray-700 mb-2">Recommended Actions</h5>
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1 rounded-full mr-2 mt-0.5">
                            <Zap className="h-3 w-3 text-amber-600" />
                          </div>
                          <p className="text-xs text-gray-700">
                            Consider stress testing the portfolio with more extreme property growth scenarios to understand potential downside risks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationResults;
