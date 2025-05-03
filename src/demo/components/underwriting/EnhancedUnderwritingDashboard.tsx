import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Percent, 
  Users,
  BarChart2,
  Calendar,
  Home,
  AlertTriangle
} from 'lucide-react';
import { KpiDashboard } from '../ui';
import { EnhancedCard, AdvancedLineChart, AdvancedPieChart, AdvancedBarChart, DataTable, EnhancedButton } from '../ui';
import theme from '../../utils/theme';

interface EnhancedUnderwritingDashboardProps {
  underwritingData: any;
  selectedApplication?: string;
  onApplicationSelect?: (applicationId: string) => void;
  onReviewApplication?: (applicationId: string) => void;
}

const EnhancedUnderwritingDashboard: React.FC<EnhancedUnderwritingDashboardProps> = ({ 
  underwritingData,
  selectedApplication,
  onApplicationSelect,
  onReviewApplication
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

  // KPI data
  const kpis = [
    {
      id: 'applications',
      title: 'Total Applications',
      value: underwritingData.metrics.totalApplications,
      previousValue: underwritingData.metrics.previousTotalApplications,
      change: underwritingData.metrics.applicationsChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <FileText className="h-4 w-4 text-primary-500" />,
      trend: underwritingData.metrics.applicationsChange > 0 ? 'up' : 'down',
      trendColor: underwritingData.metrics.applicationsChange > 0 ? 'green' : 'red',
    },
    {
      id: 'approval-rate',
      title: 'Approval Rate',
      value: formatPercentage(underwritingData.metrics.approvalRate),
      previousValue: formatPercentage(underwritingData.metrics.previousApprovalRate),
      change: underwritingData.metrics.approvalRateChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <CheckCircle className="h-4 w-4 text-primary-500" />,
      trend: underwritingData.metrics.approvalRateChange > 0 ? 'up' : 'down',
      trendColor: underwritingData.metrics.approvalRateChange > 0 ? 'green' : 'red',
    },
    {
      id: 'avg-loan',
      title: 'Avg. Loan Amount',
      value: formatCurrency(underwritingData.metrics.avgLoanAmount),
      previousValue: formatCurrency(underwritingData.metrics.previousAvgLoanAmount),
      change: underwritingData.metrics.avgLoanAmountChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <DollarSign className="h-4 w-4 text-primary-500" />,
      trend: underwritingData.metrics.avgLoanAmountChange > 0 ? 'up' : 'down',
      trendColor: 'blue',
    },
    {
      id: 'processing-time',
      title: 'Avg. Processing Time',
      value: `${underwritingData.metrics.avgProcessingTime} days`,
      previousValue: `${underwritingData.metrics.previousAvgProcessingTime} days`,
      change: -underwritingData.metrics.avgProcessingTimeChange, // Negative change is good
      changeType: 'percentage',
      changeTimeframe: 'vs last month',
      icon: <Clock className="h-4 w-4 text-primary-500" />,
      trend: underwritingData.metrics.avgProcessingTimeChange < 0 ? 'up' : 'down',
      trendColor: underwritingData.metrics.avgProcessingTimeChange < 0 ? 'green' : 'red',
    },
  ];

  // Table columns for applications
  const applicationColumns = [
    {
      accessorKey: 'id',
      header: 'Application ID',
      cell: ({ row }: any) => <span className="font-medium">#{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'borrower',
      header: 'Borrower',
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-gray-500" />
          <span>{row.getValue('borrower')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'property',
      header: 'Property',
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Home className="h-4 w-4 mr-2 text-gray-500" />
          <span>{row.getValue('property')}</span>
        </div>
      ),
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
      accessorKey: 'submittedAt',
      header: 'Submitted',
      cell: ({ row }: any) => {
        const date = new Date(row.getValue('submittedAt'));
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        let statusColor = '';
        let statusIcon = null;
        
        switch (status) {
          case 'Approved':
            statusColor = 'bg-green-100 text-green-800';
            statusIcon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'Declined':
            statusColor = 'bg-red-100 text-red-800';
            statusIcon = <XCircle className="h-3 w-3 mr-1" />;
            break;
          case 'Pending':
            statusColor = 'bg-yellow-100 text-yellow-800';
            statusIcon = <Clock className="h-3 w-3 mr-1" />;
            break;
          case 'Review':
            statusColor = 'bg-blue-100 text-blue-800';
            statusIcon = <AlertTriangle className="h-3 w-3 mr-1" />;
            break;
          default:
            statusColor = 'bg-gray-100 text-gray-800';
        }
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusColor}`}>
            {statusIcon}
            {status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <EnhancedButton
          variant="primary"
          size="sm"
          onClick={() => onReviewApplication && onReviewApplication(row.getValue('id'))}
        >
          Review
        </EnhancedButton>
      ),
    },
  ];

  // Line chart data for application trends
  const applicationTrendData = underwritingData.applicationTrends.map((point: any) => ({
    month: point.month,
    applications: point.applications,
    approvals: point.approvals,
    declines: point.declines,
  }));

  // Pie chart data for application status
  const applicationStatusData = [
    {
      name: 'Approved',
      value: underwritingData.statusDistribution.approved,
      color: theme.colors.success[500],
    },
    {
      name: 'Declined',
      value: underwritingData.statusDistribution.declined,
      color: theme.colors.error[500],
    },
    {
      name: 'Pending',
      value: underwritingData.statusDistribution.pending,
      color: theme.colors.warning[500],
    },
    {
      name: 'Review',
      value: underwritingData.statusDistribution.review,
      color: theme.colors.info[500],
    },
  ];

  // Bar chart data for suburb distribution
  const suburbDistributionData = underwritingData.suburbDistribution;

  // Bar chart data for LTV distribution
  const ltvDistributionData = underwritingData.ltvDistribution;

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <KpiDashboard
        title="Underwriting Overview"
        subtitle="Key metrics for the underwriting pipeline"
        kpis={kpis}
        columns={4}
      />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Trend Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedLineChart
              title="Application Trends"
              subtitle="Monthly application volume and outcomes"
              data={applicationTrendData}
              datasets={[
                {
                  id: 'applications',
                  name: 'Total Applications',
                  dataKey: 'applications',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'approvals',
                  name: 'Approvals',
                  dataKey: 'approvals',
                  color: theme.colors.success[500],
                },
                {
                  id: 'declines',
                  name: 'Declines',
                  dataKey: 'declines',
                  color: theme.colors.error[500],
                },
              ]}
              xAxisDataKey="month"
              height={300}
              yAxisLabel="Count"
              xAxisLabel="Month"
              showGrid={true}
              showBrush={false}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toString(), name]}
            />
          </div>
        </EnhancedCard>
        
        {/* Application Status Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="Application Status"
              subtitle="Distribution of applications by status"
              data={applicationStatusData}
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
              title="Applications by Suburb"
              subtitle="Distribution of applications by suburb"
              data={suburbDistributionData}
              datasets={[
                {
                  id: 'count',
                  name: 'Application Count',
                  dataKey: 'count',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'approved',
                  name: 'Approved',
                  dataKey: 'approved',
                  color: theme.colors.success[500],
                },
              ]}
              xAxisDataKey="suburb"
              height={300}
              yAxisLabel="Count"
              xAxisLabel="Suburb"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toString(), name]}
              barSize={20}
              barGap={4}
            />
          </div>
        </EnhancedCard>
        
        {/* LTV Distribution Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="LTV Distribution"
              subtitle="Distribution of applications by LTV range"
              data={ltvDistributionData}
              datasets={[
                {
                  id: 'count',
                  name: 'Application Count',
                  dataKey: 'count',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'approved',
                  name: 'Approval Rate',
                  dataKey: 'approvalRate',
                  color: theme.colors.success[500],
                },
              ]}
              xAxisDataKey="range"
              height={300}
              yAxisLabel="Count"
              xAxisLabel="LTV Range"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [
                name === 'Approval Rate' ? `${value.toFixed(1)}%` : value.toString(), 
                name
              ]}
            />
          </div>
        </EnhancedCard>
      </div>
      
      {/* Applications Table */}
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <DataTable
            title="Application Pipeline"
            subtitle="Complete list of all loan applications"
            columns={applicationColumns}
            data={underwritingData.applications}
            searchPlaceholder="Search applications..."
            searchColumn="borrower"
            pageSize={10}
            onRowClick={(row) => onApplicationSelect && onApplicationSelect(row.id)}
            highlightedRowIds={selectedApplication ? [selectedApplication] : []}
            getRowId={(row) => row.id}
          />
        </div>
      </EnhancedCard>
    </div>
  );
};

export default EnhancedUnderwritingDashboard;
