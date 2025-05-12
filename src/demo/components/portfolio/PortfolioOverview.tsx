import React from 'react';
import { 
  EnhancedCard, 
  AdvancedLineChart, 
  AdvancedPieChart, 
  AdvancedBarChart, 
  DataTable, 
  KpiDashboard,
  EnhancedButton
} from '../ui';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  PieChart, 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Shield, 
  RefreshCw, 
  Layers, 
  Briefcase, 
  Scale, 
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import theme from '../../utils/theme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface PortfolioOverviewProps {
  portfolioKpis: any[];
  portfolioCompositionData: any[];
  irrProjectionData: any[];
  performanceMetricsData: any[];
  loansData: any[];
  loanColumns: any[];
  portfolioImpact: any;
  showBeforeAfter: boolean;
  setShowBeforeAfter: (value: boolean) => void;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolioKpis,
  portfolioCompositionData,
  irrProjectionData,
  performanceMetricsData,
  loansData,
  loanColumns,
  portfolioImpact,
  showBeforeAfter,
  setShowBeforeAfter
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

  // Prepare data for traffic light allocation chart
  const trafficLightAllocationData = [
    { 
      name: 'Green Zone', 
      value: portfolioImpact.afterLoan.zoneAllocation?.green || 75, 
      color: theme.colors.success[500] 
    },
    { 
      name: 'Yellow Zone', 
      value: portfolioImpact.afterLoan.zoneAllocation?.yellow || 20, 
      color: theme.colors.warning[500] 
    },
    { 
      name: 'Red Zone', 
      value: portfolioImpact.afterLoan.zoneAllocation?.red || 5, 
      color: theme.colors.error[500] 
    }
  ];

  // Prepare data for before/after comparison
  const beforeAfterData = [
    { 
      metric: 'Total Value', 
      before: portfolioImpact.beforeLoan.totalValue, 
      after: portfolioImpact.afterLoan.totalValue,
      format: 'currency'
    },
    { 
      metric: 'IRR', 
      before: portfolioImpact.beforeLoan.irr, 
      after: portfolioImpact.afterLoan.irr,
      format: 'percentage'
    },
    { 
      metric: 'Risk Score', 
      before: portfolioImpact.beforeLoan.riskScore, 
      after: portfolioImpact.afterLoan.riskScore,
      format: 'number'
    },
    { 
      metric: 'Diversification', 
      before: portfolioImpact.beforeLoan.diversificationScore, 
      after: portfolioImpact.afterLoan.diversificationScore,
      format: 'number'
    },
    { 
      metric: 'Average LTV', 
      before: portfolioImpact.beforeLoan.averageLTV, 
      after: portfolioImpact.afterLoan.averageLTV,
      format: 'percentage'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <KpiDashboard 
        kpis={portfolioKpis} 
        cols={4}
      />

      {/* Portfolio Composition and Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Traffic Light Allocation */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="Traffic Light Allocation"
              subtitle="Distribution by traffic light zones"
              data={trafficLightAllocationData}
              height={300}
              innerRadius={60}
              outerRadius={100}
              formatValue={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </EnhancedCard>

        {/* Portfolio Impact */}
        <EnhancedCard variant="elevated" className="md:col-span-2">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">New Loan Impact</h3>
                <p className="text-sm text-gray-500">How this loan affects the portfolio</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              >
                {showBeforeAfter ? 'Show Impact' : 'Show Before/After'}
              </Button>
            </div>

            {showBeforeAfter ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div className="text-sm font-medium text-gray-500">Metric</div>
                  <div className="text-sm font-medium text-gray-500">Before</div>
                  <div className="text-sm font-medium text-gray-500">After</div>
                </div>
                {beforeAfterData.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium">{item.metric}</div>
                    <div className="text-sm">
                      {item.format === 'currency' 
                        ? formatCurrency(item.before) 
                        : item.format === 'percentage' 
                          ? formatPercentage(item.before)
                          : item.before}
                    </div>
                    <div className="text-sm font-medium">
                      {item.format === 'currency' 
                        ? formatCurrency(item.after) 
                        : item.format === 'percentage' 
                          ? formatPercentage(item.after)
                          : item.after}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(portfolioImpact.impact).slice(0, 6).map(([key, value]: [string, any]) => {
                  // Format the key for display
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace(/([A-Z])\w+/g, (str) => str.toUpperCase());
                  
                  // Determine if the impact is positive, negative, or neutral
                  let impactType = 'neutral';
                  let impactColor = 'text-gray-500';
                  let impactIcon = <ArrowRight className="h-4 w-4" />;
                  
                  if (typeof value === 'string') {
                    if (value.startsWith('+')) {
                      impactType = 'positive';
                      impactColor = 'text-green-500';
                      impactIcon = <ArrowUpRight className="h-4 w-4 text-green-500" />;
                    } else if (value.startsWith('-')) {
                      impactType = 'negative';
                      impactColor = 'text-red-500';
                      impactIcon = <ArrowDownRight className="h-4 w-4 text-red-500" />;
                    }
                  }
                  
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="text-sm font-medium">{formattedKey}</div>
                      <div className={`flex items-center ${impactColor}`}>
                        {impactIcon}
                        <span className="ml-1">{value}</span>
                      </div>
                    </div>
                  );
                })}
                
                <div className="bg-blue-50 p-3 rounded-lg mt-4">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                    <p className="text-xs text-blue-700">
                      {portfolioImpact.analysis.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </EnhancedCard>
      </div>

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
            />
          </div>
        </EnhancedCard>
        
        {/* Performance Metrics Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Performance by Zone"
              subtitle="Key metrics by traffic light zone"
              data={performanceMetricsData}
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
              xAxisLabel="Zone"
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
            data={loansData}
            searchPlaceholder="Search loans..."
            searchColumn="borrower"
            pageSize={5}
          />
        </div>
      </EnhancedCard>
    </div>
  );
};

export default PortfolioOverview;
