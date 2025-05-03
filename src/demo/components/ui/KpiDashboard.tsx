import React from 'react';
import { Grid, Flex } from '@radix-ui/themes';
import MetricCard from './MetricCard';
import EnhancedCard from './EnhancedCard';
import theme from '../../utils/theme';

interface KpiItem {
  id: string;
  title: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  changeType?: 'percentage' | 'value';
  changeTimeframe?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendColor?: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onClick?: () => void;
}

interface KpiDashboardProps {
  title?: string;
  subtitle?: string;
  kpis: KpiItem[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  showCard?: boolean;
}

/**
 * KPI Dashboard component for displaying multiple metrics
 * 
 * @param title - Dashboard title
 * @param subtitle - Dashboard subtitle
 * @param kpis - Array of KPI items
 * @param columns - Number of columns in the grid
 * @param className - Additional CSS classes
 * @param showCard - Whether to wrap the dashboard in a card
 */
const KpiDashboard: React.FC<KpiDashboardProps> = ({
  title,
  subtitle,
  kpis,
  columns = 4,
  className = '',
  showCard = true,
}) => {
  // Determine grid columns based on the number of KPIs and specified columns
  const getGridCols = () => {
    if (kpis.length <= 2) return 2;
    if (kpis.length <= 3) return 3;
    return columns;
  };
  
  const gridCols = getGridCols();
  
  const content = (
    <div className={`w-full ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} gap-4`}>
        {kpis.map((kpi) => (
          <MetricCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            previousValue={kpi.previousValue}
            change={kpi.change}
            changeType={kpi.changeType}
            changeTimeframe={kpi.changeTimeframe}
            icon={kpi.icon}
            trend={kpi.trend}
            trendColor={kpi.trendColor}
            status={kpi.status}
            onClick={kpi.onClick}
          />
        ))}
      </div>
    </div>
  );
  
  if (showCard) {
    return (
      <EnhancedCard variant="default" className={className}>
        <div className="p-4">
          {content}
        </div>
      </EnhancedCard>
    );
  }
  
  return content;
};

export default KpiDashboard;
