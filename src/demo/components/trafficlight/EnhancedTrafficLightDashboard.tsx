import React, { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  BarChart2,
  Shield,
  Building,
  Users,
  DollarSign,
  Droplets,
  Zap
} from 'lucide-react';
import { KpiDashboard } from '../ui';
import { EnhancedCard, AdvancedLineChart, AdvancedBarChart, AdvancedPieChart, DataTable } from '../ui';
import theme from '../../utils/theme';

interface EnhancedTrafficLightDashboardProps {
  trafficLightData: any;
  selectedSuburb?: string;
  onSuburbSelect?: (suburb: string) => void;
}

const EnhancedTrafficLightDashboard: React.FC<EnhancedTrafficLightDashboardProps> = ({
  trafficLightData,
  selectedSuburb,
  onSuburbSelect
}) => {
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Format score
  const formatScore = (value: number) => {
    return value.toFixed(1);
  };

  // Get suburb data
  const getSuburbData = () => {
    if (!selectedSuburb) return null;
    return trafficLightData.suburbs.find((suburb: any) => suburb.name === selectedSuburb);
  };

  const suburbData = getSuburbData();

  // KPI data
  const kpis = [
    {
      id: 'liquidity',
      title: 'Liquidity Score',
      value: formatScore(trafficLightData.metrics.liquidity),
      previousValue: formatScore(trafficLightData.metrics.previousLiquidity),
      change: trafficLightData.metrics.liquidityChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <Droplets className="h-4 w-4 text-primary-500" />,
      trend: trafficLightData.metrics.liquidityChange > 0 ? 'up' : 'down',
      trendColor: trafficLightData.metrics.liquidityChange > 0 ? 'green' : 'red',
    },
    {
      id: 'growth',
      title: 'Growth Potential',
      value: formatScore(trafficLightData.metrics.growth),
      previousValue: formatScore(trafficLightData.metrics.previousGrowth),
      change: trafficLightData.metrics.growthChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <TrendingUp className="h-4 w-4 text-primary-500" />,
      trend: trafficLightData.metrics.growthChange > 0 ? 'up' : 'down',
      trendColor: trafficLightData.metrics.growthChange > 0 ? 'green' : 'red',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Score',
      value: formatScore(trafficLightData.metrics.infrastructure),
      previousValue: formatScore(trafficLightData.metrics.previousInfrastructure),
      change: trafficLightData.metrics.infrastructureChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <Building className="h-4 w-4 text-primary-500" />,
      trend: trafficLightData.metrics.infrastructureChange > 0 ? 'up' : 'down',
      trendColor: trafficLightData.metrics.infrastructureChange > 0 ? 'green' : 'red',
    },
    {
      id: 'risk',
      title: 'Risk Score',
      value: formatScore(trafficLightData.metrics.risk),
      previousValue: formatScore(trafficLightData.metrics.previousRisk),
      change: -trafficLightData.metrics.riskChange, // Negative change is good for risk
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <Shield className="h-4 w-4 text-primary-500" />,
      trend: trafficLightData.metrics.riskChange < 0 ? 'up' : 'down',
      trendColor: trafficLightData.metrics.riskChange < 0 ? 'green' : 'red',
    },
  ];

  // Suburb KPIs (shown when a suburb is selected)
  const suburbKpis = suburbData ? [
    {
      id: 'suburb-liquidity',
      title: 'Liquidity Score',
      value: formatScore(suburbData.metrics.liquidity),
      previousValue: formatScore(suburbData.metrics.previousLiquidity),
      change: suburbData.metrics.liquidityChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <Droplets className="h-4 w-4 text-primary-500" />,
      trend: suburbData.metrics.liquidityChange > 0 ? 'up' : 'down',
      trendColor: suburbData.metrics.liquidityChange > 0 ? 'green' : 'red',
    },
    {
      id: 'suburb-growth',
      title: 'Growth Rate',
      value: formatPercentage(suburbData.metrics.growthRate),
      previousValue: formatPercentage(suburbData.metrics.previousGrowthRate),
      change: suburbData.metrics.growthRateChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <TrendingUp className="h-4 w-4 text-primary-500" />,
      trend: suburbData.metrics.growthRateChange > 0 ? 'up' : 'down',
      trendColor: suburbData.metrics.growthRateChange > 0 ? 'green' : 'red',
    },
    {
      id: 'suburb-median-price',
      title: 'Median Price',
      value: suburbData.metrics.medianPrice,
      previousValue: suburbData.metrics.previousMedianPrice,
      change: suburbData.metrics.medianPriceChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <DollarSign className="h-4 w-4 text-primary-500" />,
      trend: suburbData.metrics.medianPriceChange > 0 ? 'up' : 'down',
      trendColor: suburbData.metrics.medianPriceChange > 0 ? 'green' : 'red',
    },
    {
      id: 'suburb-demand',
      title: 'Demand Score',
      value: formatScore(suburbData.metrics.demand),
      previousValue: formatScore(suburbData.metrics.previousDemand),
      change: suburbData.metrics.demandChange,
      changeType: 'percentage',
      changeTimeframe: 'vs last quarter',
      icon: <Zap className="h-4 w-4 text-primary-500" />,
      trend: suburbData.metrics.demandChange > 0 ? 'up' : 'down',
      trendColor: suburbData.metrics.demandChange > 0 ? 'green' : 'red',
    },
  ] : [];

  // Table columns for suburbs
  const suburbColumns = [
    {
      accessorKey: 'name',
      header: 'Suburb',
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-primary-500" />
          <span className="font-medium">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'postcode',
      header: 'Postcode',
    },
    {
      accessorKey: 'zone',
      header: 'Zone',
      cell: ({ row }: any) => {
        const zone = row.getValue('zone');
        let zoneColor = '';

        switch (zone) {
          case 'Green':
            zoneColor = 'bg-green-100 text-green-800';
            break;
          case 'Yellow':
            zoneColor = 'bg-yellow-100 text-yellow-800';
            break;
          case 'Red':
            zoneColor = 'bg-red-100 text-red-800';
            break;
          default:
            zoneColor = 'bg-gray-100 text-gray-800';
        }

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${zoneColor}`}>
            {zone}
          </span>
        );
      },
    },
    {
      accessorKey: 'liquidity',
      header: 'Liquidity',
      cell: ({ row }: any) => formatScore(row.getValue('liquidity')),
    },
    {
      accessorKey: 'growth',
      header: 'Growth',
      cell: ({ row }: any) => formatScore(row.getValue('growth')),
    },
    {
      accessorKey: 'infrastructure',
      header: 'Infrastructure',
      cell: ({ row }: any) => formatScore(row.getValue('infrastructure')),
    },
    {
      accessorKey: 'risk',
      header: 'Risk',
      cell: ({ row }: any) => formatScore(row.getValue('risk')),
    },
    {
      accessorKey: 'score',
      header: 'Overall Score',
      cell: ({ row }: any) => (
        <span className="font-bold">{formatScore(row.getValue('score'))}</span>
      ),
    },
  ];

  // Line chart data for price trends
  const priceTrendData = trafficLightData.priceTrends.map((point: any) => ({
    month: point.month,
    sydney: point.sydney,
    greenZones: point.greenZones,
    yellowZones: point.yellowZones,
    redZones: point.redZones,
  }));

  // Bar chart data for suburb comparison
  const suburbComparisonData = trafficLightData.topSuburbs;

  // Pie chart data for zone distribution
  const zoneDistributionData = [
    {
      name: 'Green Zones',
      value: trafficLightData.zoneDistribution.green,
      color: theme.colors.success[500],
    },
    {
      name: 'Yellow Zones',
      value: trafficLightData.zoneDistribution.yellow,
      color: theme.colors.warning[500],
    },
    {
      name: 'Red Zones',
      value: trafficLightData.zoneDistribution.red,
      color: theme.colors.error[500],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall KPI Dashboard */}
      <KpiDashboard
        title="Traffic Light System Overview"
        subtitle="Key metrics across all monitored suburbs"
        kpis={kpis}
        columns={4}
      />

      {/* Selected Suburb KPIs (if a suburb is selected) */}
      {suburbData && (
        <KpiDashboard
          title={`${suburbData.name} Metrics`}
          subtitle={`Detailed metrics for ${suburbData.name} (${suburbData.postcode})`}
          kpis={suburbKpis}
          columns={4}
        />
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Trends Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedLineChart
              title="Price Trends"
              subtitle="Median price trends by zone type"
              data={priceTrendData}
              datasets={[
                {
                  id: 'sydney',
                  name: 'Sydney Average',
                  dataKey: 'sydney',
                  color: theme.colors.gray[500],
                },
                {
                  id: 'greenZones',
                  name: 'Green Zones',
                  dataKey: 'greenZones',
                  color: theme.colors.success[500],
                },
                {
                  id: 'yellowZones',
                  name: 'Yellow Zones',
                  dataKey: 'yellowZones',
                  color: theme.colors.warning[500],
                },
                {
                  id: 'redZones',
                  name: 'Red Zones',
                  dataKey: 'redZones',
                  color: theme.colors.error[500],
                },
              ]}
              xAxisDataKey="month"
              height={300}
              yAxisLabel="Price ($)"
              xAxisLabel="Month"
              showGrid={true}
              showBrush={false}
              formatYAxis={(value) => `$${(value / 1000).toFixed(0)}k`}
              formatTooltip={(value) => [`$${(value / 1000).toFixed(0)}k`, 'Median Price']}
            />
            <div className="mt-2 text-xs text-gray-500">
              <p>Note: Green zones show stable growth with low volatility, yellow zones follow Sydney average with moderate volatility,
              while red zones show higher volatility and underperformance.</p>
            </div>
          </div>
        </EnhancedCard>

        {/* Zone Distribution Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedPieChart
              title="System-wide Zone Distribution"
              subtitle="Distribution of all suburbs by traffic light classification"
              data={zoneDistributionData}
              height={300}
              innerRadius={60}
              outerRadius={100}
              formatValue={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </EnhancedCard>

        {/* Top Suburbs Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Top Performing Suburbs"
              subtitle="Highest scoring suburbs in the system"
              data={suburbComparisonData}
              datasets={[
                {
                  id: 'score',
                  name: 'Overall Score',
                  dataKey: 'score',
                  color: theme.colors.primary[500],
                },
                {
                  id: 'liquidity',
                  name: 'Liquidity',
                  dataKey: 'liquidity',
                  color: theme.colors.info[500],
                },
                {
                  id: 'growth',
                  name: 'Growth',
                  dataKey: 'growth',
                  color: theme.colors.success[500],
                },
              ]}
              xAxisDataKey="name"
              height={300}
              yAxisLabel="Score"
              xAxisLabel="Suburb"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toFixed(1), name]}
              barSize={20}
              barGap={4}
            />
          </div>
        </EnhancedCard>

        {/* Metric Comparison Chart */}
        <EnhancedCard variant="elevated">
          <div className="p-4">
            <AdvancedBarChart
              title="Metric Comparison by Zone"
              subtitle="Average metrics for each zone type"
              data={trafficLightData.metricsByZone}
              datasets={[
                {
                  id: 'liquidity',
                  name: 'Liquidity',
                  dataKey: 'liquidity',
                  color: theme.colors.info[500],
                },
                {
                  id: 'growth',
                  name: 'Growth',
                  dataKey: 'growth',
                  color: theme.colors.success[500],
                },
                {
                  id: 'infrastructure',
                  name: 'Infrastructure',
                  dataKey: 'infrastructure',
                  color: theme.colors.secondary[500],
                },
                {
                  id: 'risk',
                  name: 'Risk',
                  dataKey: 'risk',
                  color: theme.colors.error[500],
                },
              ]}
              xAxisDataKey="zone"
              height={300}
              yAxisLabel="Score"
              xAxisLabel="Zone"
              showGrid={true}
              formatYAxis={(value) => value.toString()}
              formatTooltip={(value, name) => [value.toFixed(1), name]}
            />
          </div>
        </EnhancedCard>
      </div>

      {/* Suburbs Table */}
      <EnhancedCard variant="elevated">
        <div className="p-4">
          <DataTable
            title="Suburb Analysis"
            subtitle="Comprehensive metrics for all monitored suburbs"
            columns={suburbColumns}
            data={trafficLightData.suburbs}
            searchPlaceholder="Search suburbs..."
            searchColumn="name"
            pageSize={10}
            onRowClick={(row) => onSuburbSelect && onSuburbSelect(row.name)}
            highlightedRowIds={selectedSuburb ? [selectedSuburb] : []}
            getRowId={(row) => row.name}
          />
        </div>
      </EnhancedCard>
    </div>
  );
};

export default EnhancedTrafficLightDashboard;
