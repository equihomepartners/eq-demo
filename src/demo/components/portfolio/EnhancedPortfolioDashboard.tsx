import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Calendar, 
  Home, 
  Users, 
  Clock,
  PieChart,
  Activity
} from 'lucide-react';
import { KpiDashboard } from '../ui';
import { EnhancedCard, AdvancedLineChart, AdvancedPieChart, AdvancedBarChart, DataTable } from '../ui';
import theme from '../../utils/theme';

interface EnhancedPortfolioDashboardProps {
  portfolioData: any;
}

const EnhancedPortfolioDashboard: React.FC<EnhancedPortfolioDashboardProps> = ({ portfolioData }) => {
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
      id: 'total-value',
      title: 'Total Portfolio Value',
      value: formatCurrency(portfolioData.totalValue),
      previousValue: formatCurrency(portfolioData.previousTotalValue),
      change: portfolioData.valueChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <DollarSign className="h-4 w-4 text-primary-500" />,
      trend: portfolioData.valueChange > 0 ? 'up' : 'down',
      trendColor: portfolioData.valueChange > 0 ? 'green' : 'red',
    },
    {
      id: 'irr',
      title: 'Portfolio IRR',
      value: formatPercentage(portfolioData.irr),
      previousValue: formatPercentage(portfolioData.previousIrr),
      change: portfolioData.irrChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <TrendingUp className="h-4 w-4 text-primary-500" />,
      trend: portfolioData.irrChange > 0 ? 'up' : 'down',
      trendColor: portfolioData.irrChange > 0 ? 'green' : 'red',
    },
    {
      id: 'loan-count',
      title: 'Active Loans',
      value: portfolioData.loanCount,
      previousValue: portfolioData.previousLoanCount,
      change: portfolioData.loanCountChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <Home className="h-4 w-4 text-primary-500" />,
      trend: portfolioData.loanCountChange > 0 ? 'up' : 'down',
      trendColor: 'blue',
    },
    {
      id: 'avg-term',
      title: 'Avg. Exit Timeframe',
      value: `${portfolioData.avgTerm} years`,
      icon: <Clock className="h-4 w-4 text-primary-500" />,
    },
  ];

  // Line chart data for IRR projection
  const irrProjectionData = portfolioData.irrProjection.map((point: any) => ({
    month: point.month,
    actual: point.actual,
    projected: point.projected,
    baseline: point.baseline,
  }));

  // Pie chart data for portfolio composition
  const portfolioCompositionData = portfolioData.composition.map((item: any) => ({
    name: item.category,
    value: item.percentage,
    color: item.color,
  }));

  // Bar chart data for suburb distribution
  const suburbDistributionData = portfolioData.suburbDistribution;

  // Table columns for loans
  const loanColumns = [
    {
      accessorKey: 'id',
      header: 'Loan ID',
      cell: ({ row }: any) => <span className="font-medium">#{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'borrower',
      header: 'Borrower',
    },
    {
      accessorKey: 'suburb',
      header: 'Suburb',
    },
    {
      accessorKey: 'amount',
      header: 'Loan Amount',
      cell: ({ row }: any) => formatCurrency(row.getValue('amount')),
    },
    {
      accessorKey: 'ltv',
      header: 'LTV',
      cell: ({ row }: any) => formatPercentage(row.getValue('ltv')),
    },
    {
      accessorKey: 'originationDate',
      header: 'Origination Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        let statusColor = '';
        
        switch (status) {
          case 'Active':
            statusColor = 'bg-green-100 text-green-800';
            break;
          case 'Pending':
            statusColor = 'bg-yellow-100 text-yellow-800';
            break;
          case 'Closed':
            statusColor = 'bg-gray-100 text-gray-800';
            break;
          default:
            statusColor = 'bg-gray-100 text-gray-800';
        }
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <KpiDashboard
        title="Portfolio Overview"
        subtitle="Key performance indicators for the current portfolio"
        kpis={kpis}
        columns={4}
      />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IRR Projection Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedLineChart
              title="IRR Projection"
              subtitle="Historical and projected IRR over time"
              data={irrProjectionData}
              datasets={[
                {
                  id: 'actual',
                  name: 'Actual IRR',
                  dataKey: 'actual',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'projected',
                  name: 'Projected IRR',
                  dataKey: 'projected',
                  color: theme.colors.secondary[500],
                  strokeDasharray: '5 5',
                },
                {
                  id: 'baseline',
                  name: 'Baseline',
                  dataKey: 'baseline',
                  color: theme.colors.gray[400],
                  strokeDasharray: '3 3',
                },
              ]}
              xAxisDataKey="month"
              height={300}
              yAxisLabel="IRR (%)"
              xAxisLabel="Month"
              showGrid={true}
              showBrush={false}
              formatYAxis={(value) => `${value}%`}
              formatTooltip={(value) => [`${value}%`, 'IRR']}
              referenceLines={[
                {
                  y: portfolioData.targetIrr,
                  label: 'Target IRR',
                  color: theme.colors.success[500],
                },
              ]}
            />
          </div>
        </EnhancedCard>
        
        {/* Portfolio Composition Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="Portfolio Composition"
              subtitle="Distribution of loans by category"
              data={portfolioCompositionData}
              height={300}
              innerRadius={60}
              outerRadius={100}
              formatValue={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </EnhancedCard>
        
        {/* Suburb Distribution Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Suburb Distribution"
              subtitle="Loan distribution by suburb"
              data={suburbDistributionData}
              datasets={[
                {
                  id: 'value',
                  name: 'Portfolio Value',
                  dataKey: 'value',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'count',
                  name: 'Loan Count',
                  dataKey: 'count',
                  color: theme.colors.secondary[500],
                },
              ]}
              xAxisDataKey="suburb"
              height={300}
              yAxisLabel="Value"
              xAxisLabel="Suburb"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toString(), name]}
              barSize={20}
              barGap={4}
            />
          </div>
        </EnhancedCard>
        
        {/* Performance Metrics Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Performance Metrics"
              subtitle="Key metrics by loan category"
              data={portfolioData.performanceMetrics}
              datasets={[
                {
                  id: 'irr',
                  name: 'IRR',
                  dataKey: 'irr',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'growth',
                  name: 'Growth Rate',
                  dataKey: 'growth',
                  color: theme.colors.success[500],
                },
                {
                  id: 'risk',
                  name: 'Risk Score',
                  dataKey: 'risk',
                  color: theme.colors.warning[500],
                },
              ]}
              xAxisDataKey="category"
              height={300}
              yAxisLabel="Value"
              xAxisLabel="Category"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [
                name === 'Risk Score' ? value.toString() : `${value}%`, 
                name
              ]}
            />
          </div>
        </EnhancedCard>
      </div>
      
      {/* Loans Table */}
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <DataTable
            title="Active Loans"
            subtitle="Complete list of all loans in the portfolio"
            columns={loanColumns}
            data={portfolioData.loans}
            searchPlaceholder="Search loans..."
            searchColumn="borrower"
            pageSize={5}
          />
        </div>
      </EnhancedCard>
    </div>
  );
};

export default EnhancedPortfolioDashboard;
