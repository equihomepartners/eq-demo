import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Calculator,
  Sliders,
  RefreshCw,
  Zap,
  DollarSign,
  Percent,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';
import { KpiDashboard } from '../ui';
import { EnhancedCard, AdvancedLineChart, AdvancedBarChart, AdvancedPieChart, DataTable, EnhancedButton } from '../ui';
import EfficientFrontierChart from '../ui/EfficientFrontierChart';
import theme from '../../utils/theme';

interface EnhancedSimulationDashboardProps {
  simulationData: any;
  onRunSimulation?: () => void;
}

const EnhancedSimulationDashboard: React.FC<EnhancedSimulationDashboardProps> = ({
  simulationData,
  onRunSimulation
}) => {
  const [showParameters, setShowParameters] = useState(false);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // KPI data
  const kpis = [
    {
      id: 'expected-irr',
      title: 'Expected IRR',
      value: formatPercentage(simulationData.results.expectedIrr),
      previousValue: formatPercentage(simulationData.results.previousExpectedIrr),
      change: simulationData.results.irrChange,
      changeType: 'percentage',
      changeTimeframe: 'vs previous simulation',
      icon: <TrendingUp className="h-4 w-4 text-primary-500" />,
      trend: simulationData.results.irrChange > 0 ? 'up' : 'down',
      trendColor: simulationData.results.irrChange > 0 ? 'green' : 'red',
    },
    {
      id: 'portfolio-value',
      title: 'Projected Value',
      value: formatCurrency(simulationData.results.projectedValue),
      previousValue: formatCurrency(simulationData.results.previousProjectedValue),
      change: simulationData.results.valueChange,
      changeType: 'percentage',
      changeTimeframe: 'vs previous simulation',
      icon: <DollarSign className="h-4 w-4 text-primary-500" />,
      trend: simulationData.results.valueChange > 0 ? 'up' : 'down',
      trendColor: simulationData.results.valueChange > 0 ? 'green' : 'red',
    },
    {
      id: 'confidence',
      title: 'Confidence Level',
      value: formatPercentage(simulationData.results.confidenceLevel),
      previousValue: formatPercentage(simulationData.results.previousConfidenceLevel),
      change: simulationData.results.confidenceChange,
      changeType: 'percentage',
      changeTimeframe: 'vs previous simulation',
      icon: <Zap className="h-4 w-4 text-primary-500" />,
      trend: simulationData.results.confidenceChange > 0 ? 'up' : 'down',
      trendColor: simulationData.results.confidenceChange > 0 ? 'green' : 'red',
    },
    {
      id: 'risk-score',
      title: 'Risk Score',
      value: simulationData.results.riskScore.toFixed(1),
      previousValue: simulationData.results.previousRiskScore.toFixed(1),
      change: -simulationData.results.riskChange, // Negative change is good for risk
      changeType: 'percentage',
      changeTimeframe: 'vs previous simulation',
      icon: <AlertTriangle className="h-4 w-4 text-primary-500" />,
      trend: simulationData.results.riskChange < 0 ? 'up' : 'down',
      trendColor: simulationData.results.riskChange < 0 ? 'green' : 'red',
    },
  ];

  // Table columns for parameters
  const parameterColumns = [
    {
      accessorKey: 'name',
      header: 'Parameter',
      cell: ({ row }: any) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: ({ row }: any) => {
        const value = row.getValue('value');
        const type = row.original.type;

        if (type === 'percentage') {
          return formatPercentage(value);
        } else if (type === 'currency') {
          return formatCurrency(value);
        } else if (type === 'years') {
          return `${value} years`;
        } else {
          return value.toString();
        }
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }: any) => {
        const category = row.getValue('category');
        let categoryColor = '';

        switch (category) {
          case 'Market':
            categoryColor = 'bg-blue-100 text-blue-800';
            break;
          case 'Portfolio':
            categoryColor = 'bg-purple-100 text-purple-800';
            break;
          case 'Loan':
            categoryColor = 'bg-green-100 text-green-800';
            break;
          case 'Fund':
            categoryColor = 'bg-amber-100 text-amber-800';
            break;
          default:
            categoryColor = 'bg-gray-100 text-gray-800';
        }

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {category}
          </span>
        );
      },
    },
  ];

  // Line chart data for Monte Carlo simulations
  const monteCarloData = simulationData.monteCarloResults.map((point: any) => ({
    year: point.year,
    p10: point.p10,
    p25: point.p25,
    p50: point.p50,
    p75: point.p75,
    p90: point.p90,
  }));

  // Bar chart data for sensitivity analysis
  const sensitivityData = simulationData.sensitivityAnalysis;

  // Pie chart data for allocation
  const allocationData = [
    {
      name: 'Green Zone Loans',
      value: simulationData.allocation.greenZone,
      color: theme.colors.success[500],
    },
    {
      name: 'Yellow Zone Loans',
      value: simulationData.allocation.yellowZone,
      color: theme.colors.warning[500],
    },
    {
      name: 'Red Zone Loans',
      value: simulationData.allocation.redZone,
      color: theme.colors.error[500],
    },
  ];

  // Bar chart data for scenario comparison
  const scenarioComparisonData = simulationData.scenarioComparison;

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <KpiDashboard
        title="Simulation Results"
        subtitle="Key metrics from the latest simulation run"
        kpis={kpis}
        columns={4}
      />

      {/* Run Simulation Button */}
      <div className="flex justify-end">
        <EnhancedButton
          variant="primary"
          leftIcon={<Play className="h-4 w-4" />}
          onClick={onRunSimulation}
        >
          Run Simulation
        </EnhancedButton>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monte Carlo Simulation Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedLineChart
              title="Monte Carlo Simulation"
              subtitle="Portfolio value projections with confidence intervals"
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
              height={300}
              yAxisLabel="Portfolio Value ($)"
              xAxisLabel="Year"
              showGrid={true}
              showBrush={false}
              formatYAxis={(value) => `$${(value / 1000000).toFixed(1)}M`}
              formatTooltip={(value) => [`$${(value / 1000000).toFixed(1)}M`, 'Portfolio Value']}
              referenceAreas={[
                {
                  y1: monteCarloData[0].p25,
                  y2: monteCarloData[0].p75,
                  fillOpacity: 0.1,
                  color: theme.colors.primary[200],
                },
              ]}
            />
          </div>
        </EnhancedCard>

        {/* Efficient Frontier Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <EfficientFrontierChart
              title="Efficient Frontier Analysis"
              subtitle="Risk-return optimization based on Modern Portfolio Theory"
              data={simulationData.efficientFrontier.portfolios}
              frontierData={simulationData.efficientFrontier.frontier}
              currentPortfolio={simulationData.efficientFrontier.currentPortfolio}
              optimalPortfolio={simulationData.efficientFrontier.optimalPortfolio}
              height={300}
            />
          </div>
        </EnhancedCard>

        {/* Portfolio Allocation Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="Optimal Portfolio Allocation"
              subtitle="Recommended allocation by zone type"
              data={allocationData}
              height={300}
              innerRadius={60}
              outerRadius={100}
              formatValue={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </EnhancedCard>

        {/* Sensitivity Analysis Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Sensitivity Analysis"
              subtitle="Impact of parameter changes on IRR"
              data={sensitivityData}
              datasets={[
                {
                  id: 'impact',
                  name: 'Impact on IRR',
                  dataKey: 'impact',
                  color: theme.colors.primary[500],
                },
              ]}
              xAxisDataKey="parameter"
              height={300}
              yAxisLabel="Impact (%)"
              xAxisLabel="Parameter"
              showGrid={true}
              formatYAxis={(value) => `${value.toFixed(1)}%`}
              formatTooltip={(value) => [`${value.toFixed(2)}%`, 'Impact on IRR']}
              barSize={30}
              referenceLines={[
                {
                  y: 0,
                  color: theme.colors.gray[400],
                },
              ]}
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
              referenceLines={[
                {
                  y: simulationData.results.expectedIrr,
                  label: 'Base Case',
                  color: theme.colors.info[500],
                  strokeDasharray: '3 3',
                },
              ]}
            />
          </div>
        </EnhancedCard>
      </div>

      {/* Parameters Section */}
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Simulation Parameters</h3>
              <p className="text-sm text-gray-500">Current parameters used in the simulation model</p>
            </div>
            <EnhancedButton
              variant="outline"
              leftIcon={showParameters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              onClick={() => setShowParameters(!showParameters)}
            >
              {showParameters ? 'Hide Parameters' : 'Show Parameters'}
            </EnhancedButton>
          </div>

          {showParameters && (
            <DataTable
              columns={parameterColumns}
              data={simulationData.parameters}
              searchPlaceholder="Search parameters..."
              searchColumn="name"
              pageSize={10}
            />
          )}
        </div>
      </EnhancedCard>
    </div>
  );
};

export default EnhancedSimulationDashboard;
