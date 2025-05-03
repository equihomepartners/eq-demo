import React from 'react';
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
  ThumbsDown
} from 'lucide-react';
import { KpiDashboard } from '../ui';
import { EnhancedCard, AdvancedLineChart, AdvancedBarChart, AdvancedPieChart, DataTable, EnhancedButton } from '../ui';
import theme from '../../utils/theme';

interface EnhancedDecisionDashboardProps {
  decisionData: any;
  onApprove?: () => void;
  onDecline?: () => void;
}

const EnhancedDecisionDashboard: React.FC<EnhancedDecisionDashboardProps> = ({ 
  decisionData,
  onApprove,
  onDecline
}) => {
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

  // Get decision status
  const getDecisionStatus = () => {
    if (decisionData.score >= decisionData.thresholds.approval) {
      return 'Recommended for Approval';
    } else if (decisionData.score >= decisionData.thresholds.review) {
      return 'Recommended for Review';
    } else {
      return 'Recommended for Decline';
    }
  };

  // Get decision status color
  const getDecisionStatusColor = () => {
    if (decisionData.score >= decisionData.thresholds.approval) {
      return 'success';
    } else if (decisionData.score >= decisionData.thresholds.review) {
      return 'warning';
    } else {
      return 'error';
    }
  };

  // Get decision status icon
  const getDecisionStatusIcon = () => {
    if (decisionData.score >= decisionData.thresholds.approval) {
      return <CheckCircle className="h-4 w-4 text-success-500" />;
    } else if (decisionData.score >= decisionData.thresholds.review) {
      return <AlertTriangle className="h-4 w-4 text-warning-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-error-500" />;
    }
  };

  // KPI data
  const kpis = [
    {
      id: 'decision-score',
      title: 'Decision Score',
      value: `${decisionData.score}/100`,
      icon: <Zap className="h-4 w-4 text-primary-500" />,
      status: getDecisionStatusColor(),
    },
    {
      id: 'ltv',
      title: 'Loan-to-Value Ratio',
      value: formatPercentage(decisionData.ltv),
      icon: <Percent className="h-4 w-4 text-primary-500" />,
      status: decisionData.ltv <= decisionData.thresholds.maxLtv ? 'success' : 'warning',
    },
    {
      id: 'irr',
      title: 'Expected IRR',
      value: formatPercentage(decisionData.expectedIrr),
      icon: <TrendingUp className="h-4 w-4 text-primary-500" />,
      status: decisionData.expectedIrr >= decisionData.thresholds.minIrr ? 'success' : 'warning',
    },
    {
      id: 'risk-score',
      title: 'Risk Score',
      value: `${decisionData.riskScore}/100`,
      icon: <Shield className="h-4 w-4 text-primary-500" />,
      status: decisionData.riskScore <= decisionData.thresholds.maxRisk ? 'success' : 'warning',
    },
  ];

  // Table columns for decision factors
  const factorColumns = [
    {
      accessorKey: 'factor',
      header: 'Decision Factor',
      cell: ({ row }: any) => <span className="font-medium">{row.getValue('factor')}</span>,
    },
    {
      accessorKey: 'score',
      header: 'Score',
      cell: ({ row }: any) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ 
              width: `${row.getValue('score')}%`,
              backgroundColor: getScoreColor(row.getValue('score'))
            }}
          ></div>
        </div>
      ),
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
      cell: ({ row }: any) => `${row.getValue('weight')}%`,
    },
    {
      accessorKey: 'impact',
      header: 'Impact',
      cell: ({ row }: any) => {
        const impact = row.getValue('impact');
        let impactColor = '';
        let impactIcon = null;
        
        if (impact > 0) {
          impactColor = 'text-success-500';
          impactIcon = <TrendingUp className="h-4 w-4 mr-1" />;
        } else if (impact < 0) {
          impactColor = 'text-error-500';
          impactIcon = <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />;
        } else {
          impactColor = 'text-gray-500';
          impactIcon = <ArrowRight className="h-4 w-4 mr-1" />;
        }
        
        return (
          <div className={`flex items-center ${impactColor}`}>
            {impactIcon}
            {impact > 0 ? '+' : ''}{impact.toFixed(1)}
          </div>
        );
      },
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
    },
  ];

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) {
      return theme.colors.success[500];
    } else if (score >= 60) {
      return theme.colors.success[300];
    } else if (score >= 40) {
      return theme.colors.warning[500];
    } else if (score >= 20) {
      return theme.colors.warning[300];
    } else {
      return theme.colors.error[500];
    }
  };

  // Bar chart data for decision factors
  const decisionFactorsData = decisionData.factors.map((factor: any) => ({
    factor: factor.factor,
    score: factor.score,
    weight: factor.weight,
  }));

  // Line chart data for IRR projection
  const irrProjectionData = decisionData.irrProjection.map((point: any) => ({
    year: point.year,
    irr: point.irr,
    benchmark: point.benchmark,
  }));

  // Pie chart data for risk breakdown
  const riskBreakdownData = [
    {
      name: 'Market Risk',
      value: decisionData.riskBreakdown.market,
      color: theme.colors.primary[500],
    },
    {
      name: 'Credit Risk',
      value: decisionData.riskBreakdown.credit,
      color: theme.colors.error[500],
    },
    {
      name: 'Property Risk',
      value: decisionData.riskBreakdown.property,
      color: theme.colors.warning[500],
    },
    {
      name: 'Operational Risk',
      value: decisionData.riskBreakdown.operational,
      color: theme.colors.info[500],
    },
  ];

  // Bar chart data for portfolio impact
  const portfolioImpactData = [
    {
      metric: 'IRR',
      before: decisionData.portfolioImpact.irrBefore,
      after: decisionData.portfolioImpact.irrAfter,
      change: decisionData.portfolioImpact.irrChange,
    },
    {
      metric: 'Risk',
      before: decisionData.portfolioImpact.riskBefore,
      after: decisionData.portfolioImpact.riskAfter,
      change: decisionData.portfolioImpact.riskChange,
    },
    {
      metric: 'Diversification',
      before: decisionData.portfolioImpact.diversificationBefore,
      after: decisionData.portfolioImpact.diversificationAfter,
      change: decisionData.portfolioImpact.diversificationChange,
    },
    {
      metric: 'Liquidity',
      before: decisionData.portfolioImpact.liquidityBefore,
      after: decisionData.portfolioImpact.liquidityAfter,
      change: decisionData.portfolioImpact.liquidityChange,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Decision Status */}
      <EnhancedCard variant={`bordered`} status={getDecisionStatusColor()}>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Decision Recommendation</h2>
              <div className="flex items-center">
                {getDecisionStatusIcon()}
                <span className="ml-2 text-lg font-medium">{getDecisionStatus()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Based on comprehensive analysis across all systems
              </p>
            </div>
            <div className="flex space-x-4">
              <EnhancedButton
                variant="success"
                leftIcon={<ThumbsUp className="h-4 w-4" />}
                onClick={onApprove}
              >
                Approve
              </EnhancedButton>
              <EnhancedButton
                variant="danger"
                leftIcon={<ThumbsDown className="h-4 w-4" />}
                onClick={onDecline}
              >
                Decline
              </EnhancedButton>
            </div>
          </div>
        </div>
      </EnhancedCard>
      
      {/* KPI Dashboard */}
      <KpiDashboard
        title="Decision Metrics"
        subtitle="Key metrics used in the decision process"
        kpis={kpis}
        columns={4}
      />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Decision Factors Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Decision Factors"
              subtitle="Contribution of each factor to the decision score"
              data={decisionFactorsData}
              datasets={[
                {
                  id: 'score',
                  name: 'Factor Score',
                  dataKey: 'score',
                  color: theme.colors.primary[500],
                },
              ]}
              xAxisDataKey="factor"
              height={300}
              yAxisLabel="Score"
              xAxisLabel="Factor"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toString(), name]}
              barSize={30}
              horizontal={true}
            />
          </div>
        </EnhancedCard>
        
        {/* IRR Projection Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedLineChart
              title="IRR Projection"
              subtitle="Expected IRR over the loan term"
              data={irrProjectionData}
              datasets={[
                {
                  id: 'irr',
                  name: 'Expected IRR',
                  dataKey: 'irr',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'benchmark',
                  name: 'Benchmark',
                  dataKey: 'benchmark',
                  color: theme.colors.gray[400],
                  strokeDasharray: '5 5',
                },
              ]}
              xAxisDataKey="year"
              height={300}
              yAxisLabel="IRR (%)"
              xAxisLabel="Year"
              showGrid={true}
              formatYAxis={(value) => `${value.toFixed(1)}%`}
              formatTooltip={(value) => [`${value.toFixed(2)}%`, 'IRR']}
              referenceLines={[
                {
                  y: decisionData.thresholds.minIrr,
                  label: 'Min IRR',
                  color: theme.colors.warning[500],
                },
              ]}
            />
          </div>
        </EnhancedCard>
        
        {/* Risk Breakdown Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="Risk Breakdown"
              subtitle="Distribution of risk factors"
              data={riskBreakdownData}
              height={300}
              innerRadius={60}
              outerRadius={100}
              formatValue={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </EnhancedCard>
        
        {/* Portfolio Impact Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Portfolio Impact"
              subtitle="Impact of this loan on the portfolio"
              data={portfolioImpactData}
              datasets={[
                {
                  id: 'before',
                  name: 'Before',
                  dataKey: 'before',
                  color: theme.colors.gray[400],
                },
                {
                  id: 'after',
                  name: 'After',
                  dataKey: 'after',
                  color: theme.colors.primary[500],
                },
              ]}
              xAxisDataKey="metric"
              height={300}
              yAxisLabel="Value"
              xAxisLabel="Metric"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toString(), name]}
            />
          </div>
        </EnhancedCard>
      </div>
      
      {/* Decision Factors Table */}
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <DataTable
            title="Decision Factors Analysis"
            subtitle="Detailed breakdown of all factors contributing to the decision"
            columns={factorColumns}
            data={decisionData.factors}
            searchPlaceholder="Search factors..."
            searchColumn="factor"
            pageSize={10}
          />
        </div>
      </EnhancedCard>
    </div>
  );
};

export default EnhancedDecisionDashboard;
