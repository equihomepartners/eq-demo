import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import EnhancedCard from './EnhancedCard';
import theme from '../../utils/theme';

interface MetricCardProps {
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
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Metric Card component for displaying key metrics with trends
 * 
 * @param title - Metric title
 * @param value - Current metric value
 * @param previousValue - Previous metric value
 * @param change - Change amount
 * @param changeType - Type of change (percentage or absolute value)
 * @param changeTimeframe - Timeframe for the change (e.g., "vs last month")
 * @param icon - Icon to display
 * @param trend - Direction of trend
 * @param trendColor - Color of trend indicator
 * @param status - Card status
 * @param footer - Footer content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 */
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  change,
  changeType = 'percentage',
  changeTimeframe,
  icon,
  trend,
  trendColor = 'gray',
  status = 'default',
  footer,
  className = '',
  onClick,
}) => {
  // Determine trend if not explicitly provided
  if (trend === undefined && change !== undefined) {
    if (change > 0) {
      trend = 'up';
    } else if (change < 0) {
      trend = 'down';
    } else {
      trend = 'neutral';
    }
  }
  
  // Determine trend color if not explicitly provided
  if (trendColor === 'gray' && trend !== undefined) {
    if (trend === 'up') {
      trendColor = 'green';
    } else if (trend === 'down') {
      trendColor = 'red';
    }
  }
  
  // Get trend color from theme
  const getTrendColor = () => {
    switch (trendColor) {
      case 'green':
        return theme.colors.success[500];
      case 'red':
        return theme.colors.error[500];
      case 'yellow':
        return theme.colors.warning[500];
      case 'blue':
        return theme.colors.info[500];
      default:
        return theme.colors.gray[500];
    }
  };
  
  // Get trend background color
  const getTrendBgColor = () => {
    switch (trendColor) {
      case 'green':
        return theme.colors.success[50];
      case 'red':
        return theme.colors.error[50];
      case 'yellow':
        return theme.colors.warning[50];
      case 'blue':
        return theme.colors.info[50];
      default:
        return theme.colors.gray[100];
    }
  };
  
  // Format change value
  const formatChange = () => {
    if (change === undefined) return null;
    
    const absChange = Math.abs(change);
    const prefix = change > 0 ? '+' : change < 0 ? '-' : '';
    
    if (changeType === 'percentage') {
      return `${prefix}${absChange.toFixed(1)}%`;
    } else {
      return `${prefix}${absChange}`;
    }
  };
  
  // Get trend icon
  const getTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUpIcon className="h-4 w-4" />;
    } else if (trend === 'down') {
      return <TrendingDownIcon className="h-4 w-4" />;
    } else {
      return <ArrowRightIcon className="h-4 w-4" />;
    }
  };
  
  return (
    <EnhancedCard
      variant={onClick ? 'interactive' : 'elevated'}
      status={status}
      className={`${className}`}
    >
      <div 
        className="p-4 flex flex-col h-full"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {icon && (
            <div className="p-2 rounded-full bg-gray-100">
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-baseline mb-2">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          
          {change !== undefined && (
            <div 
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium flex items-center"
              style={{ 
                backgroundColor: getTrendBgColor(),
                color: getTrendColor()
              }}
            >
              {trend === 'up' && <ArrowUpIcon className="h-3 w-3 mr-0.5" />}
              {trend === 'down' && <ArrowDownIcon className="h-3 w-3 mr-0.5" />}
              {trend === 'neutral' && <ArrowRightIcon className="h-3 w-3 mr-0.5" />}
              {formatChange()}
            </div>
          )}
        </div>
        
        {(previousValue !== undefined || changeTimeframe) && (
          <div className="text-xs text-gray-500 mb-4">
            {previousValue !== undefined && (
              <span>Previous: {previousValue} </span>
            )}
            {changeTimeframe && (
              <span>{changeTimeframe}</span>
            )}
          </div>
        )}
        
        {footer && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </EnhancedCard>
  );
};

export default MetricCard;
