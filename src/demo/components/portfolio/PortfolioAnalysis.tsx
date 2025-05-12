import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  AlertCircle,
  CheckCircle,
  PieChart as PieChartIcon,
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Shield,
  RefreshCw,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  Layers,
  Briefcase,
  Scale,
  Zap,
  ArrowRight,
  Info,
  Calculator,
  Target,
  Brain,
  MapPin,
  Network,
  Sliders
} from 'lucide-react';
import DemoContext from '../../context/DemoContext';
import mockData, { mockPortfolioMetrics, mockPortfolioImpact, mockSimulationResult } from '../../data/mockData';
import portfolioMockData from '../../data/portfolioMockData';
import simulationMockData from '../../data/simulationMockData';
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

// Import sub-components
import PortfolioOverview from './PortfolioOverview';
import SimulationLauncher from './SimulationLauncher';
import SimulationResults from './SimulationResults';
import InvestmentDecision from './InvestmentDecision';

const PortfolioAnalysis: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Always use portfolio impact data (either from state or mock data)
  const portfolioImpactExists = true;

  // Initialize portfolio impact and simulation result if not already set
  useEffect(() => {
    const updates: any = {};

    if (!demoState.portfolioImpact) {
      updates.portfolioImpact = mockPortfolioImpact;
    }

    if (!demoState.simulationResult) {
      updates.simulationResult = mockSimulationResult;
      setIsSimulated(true);
    }

    if (Object.keys(updates).length > 0) {
      updateDemoState(updates);
    }
  }, [demoState.portfolioImpact, demoState.simulationResult, updateDemoState]);

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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Prepare data for portfolio composition chart
  const portfolioCompositionData = portfolioMockData.composition.map(item => ({
    name: item.category,
    value: item.percentage,
    color: item.color
  }));

  // Prepare data for IRR projection chart
  const irrProjectionData = portfolioMockData.irrProjection;

  // Prepare data for Monte Carlo simulation chart
  const monteCarloData = simulationMockData.monteCarloResults;

  // Prepare data for scenario comparison chart
  const scenarioComparisonData = simulationMockData.scenarioComparison;

  // Prepare data for efficient frontier chart
  const efficientFrontierData = {
    data: simulationMockData.efficientFrontier.portfolios,
    frontierData: simulationMockData.efficientFrontier.frontier,
    currentPortfolio: simulationMockData.efficientFrontier.currentPortfolio,
    optimalPortfolio: simulationMockData.efficientFrontier.optimalPortfolio
  };

  // Prepare KPIs for portfolio overview
  const portfolioKpis = [
    {
      id: 'total-value',
      title: 'Total Portfolio Value',
      value: formatCurrency(portfolioMockData.totalValue),
      previousValue: formatCurrency(portfolioMockData.previousTotalValue),
      change: portfolioMockData.valueChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. last quarter',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      trend: 'up' as const,
      trendColor: 'green' as const
    },
    {
      id: 'irr',
      title: 'Portfolio IRR',
      value: formatPercentage(portfolioMockData.irr),
      previousValue: formatPercentage(portfolioMockData.previousIrr),
      change: portfolioMockData.irrChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. last quarter',
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      trend: 'up' as const,
      trendColor: 'green' as const
    },
    {
      id: 'loan-count',
      title: 'Active Loans',
      value: portfolioMockData.loanCount.toString(),
      previousValue: portfolioMockData.previousLoanCount.toString(),
      change: portfolioMockData.loanCountChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. last quarter',
      icon: <Briefcase className="h-5 w-5 text-purple-600" />,
      trend: 'up' as const,
      trendColor: 'green' as const
    },
    {
      id: 'risk-score',
      title: 'Risk Score',
      value: simulationMockData.results.riskScore.toString(),
      previousValue: simulationMockData.results.previousRiskScore.toString(),
      change: simulationMockData.results.riskChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. last quarter',
      icon: <Shield className="h-5 w-5 text-amber-600" />,
      trend: 'down' as const,
      trendColor: 'green' as const
    }
  ];

  // Prepare KPIs for simulation results with enhanced styling
  const simulationKpis = [
    {
      id: 'expected-irr',
      title: 'Expected IRR',
      value: formatPercentage(simulationMockData.results.expectedIrr),
      previousValue: formatPercentage(simulationMockData.results.previousExpectedIrr),
      change: simulationMockData.results.irrChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. previous simulation',
      icon: <div className="bg-blue-100 p-2 rounded-full"><TrendingUp className="h-5 w-5 text-blue-600" /></div>,
      trend: 'up' as const,
      trendColor: 'green' as const,
      description: 'Projected internal rate of return over 10 years'
    },
    {
      id: 'projected-value',
      title: 'Projected Value (10Y)',
      value: formatCurrency(simulationMockData.results.projectedValue),
      previousValue: formatCurrency(simulationMockData.results.previousProjectedValue),
      change: simulationMockData.results.valueChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. previous simulation',
      icon: <div className="bg-green-100 p-2 rounded-full"><DollarSign className="h-5 w-5 text-green-600" /></div>,
      trend: 'up' as const,
      trendColor: 'green' as const,
      description: 'Expected portfolio value after 10 years (P50)'
    },
    {
      id: 'confidence-level',
      title: 'Confidence Level',
      value: formatPercentage(simulationMockData.results.confidenceLevel),
      previousValue: formatPercentage(simulationMockData.results.previousConfidenceLevel),
      change: simulationMockData.results.confidenceChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. previous simulation',
      icon: <div className="bg-purple-100 p-2 rounded-full"><CheckCircle className="h-5 w-5 text-purple-600" /></div>,
      trend: 'up' as const,
      trendColor: 'green' as const,
      description: 'Probability of meeting target IRR of 15%'
    },
    {
      id: 'risk-score-sim',
      title: 'Risk Score',
      value: simulationMockData.results.riskScore.toString(),
      previousValue: simulationMockData.results.previousRiskScore.toString(),
      change: simulationMockData.results.riskChange,
      changeType: 'percentage' as const,
      changeTimeframe: 'vs. previous simulation',
      icon: <div className="bg-amber-100 p-2 rounded-full"><Shield className="h-5 w-5 text-amber-600" /></div>,
      trend: 'down' as const,
      trendColor: 'green' as const,
      description: 'Portfolio risk rating (lower is better)'
    }
  ];

  // Prepare loan data for table
  const loanColumns = [
    { id: 'id', header: 'ID', accessorKey: 'id' },
    { id: 'borrower', header: 'Borrower', accessorKey: 'borrower' },
    { id: 'suburb', header: 'Suburb', accessorKey: 'suburb' },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info: any) => formatCurrency(info.getValue())
    },
    {
      id: 'ltv',
      header: 'LTV',
      accessorKey: 'ltv',
      cell: (info: any) => `${info.getValue()}%`
    },
    { id: 'originationDate', header: 'Origination Date', accessorKey: 'originationDate' },
    { id: 'status', header: 'Status', accessorKey: 'status' }
  ];

  // Prepare sensitivity analysis data with colors
  const sensitivityData = simulationMockData.sensitivityAnalysis.map(item => ({
    name: item.parameter,
    value: Math.abs(item.impact),
    color: item.impact > 0 ? theme.colors.success[500] : theme.colors.error[500],
    originalImpact: item.impact // Keep the original impact value for reference
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Analysis</h2>
          <p className="text-gray-500">Comprehensive analysis of portfolio performance and simulation</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Portfolio Overview
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Simulation Engine
          </TabsTrigger>
          <TabsTrigger value="decision" className="flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Investment Decision
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PortfolioOverview
            portfolioKpis={portfolioKpis}
            portfolioCompositionData={portfolioCompositionData}
            irrProjectionData={irrProjectionData}
            performanceMetricsData={portfolioMockData.performanceMetrics}
            loansData={portfolioMockData.loans}
            loanColumns={loanColumns}
            portfolioImpact={demoState.portfolioImpact || mockPortfolioImpact}
            showBeforeAfter={showBeforeAfter}
            setShowBeforeAfter={setShowBeforeAfter}
          />
        </TabsContent>

        <TabsContent value="simulation">
          {!isSimulated ? (
            <SimulationLauncher
              runSimulation={runSimulation}
              isSimulating={isSimulating}
            />
          ) : (
            <SimulationResults
              simulationKpis={simulationKpis}
              monteCarloData={monteCarloData}
              scenarioComparisonData={scenarioComparisonData}
              efficientFrontierData={efficientFrontierData}
              sensitivityData={sensitivityData}
              resetSimulation={resetSimulation}
            />
          )}
        </TabsContent>

        <TabsContent value="decision">
          <InvestmentDecision
            portfolioImpact={demoState.portfolioImpact || mockPortfolioImpact}
            simulationResult={demoState.simulationResult || mockSimulationResult}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioAnalysis;
