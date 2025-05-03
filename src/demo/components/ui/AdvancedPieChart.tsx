import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from 'recharts';
import theme from '../../utils/theme';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface AdvancedPieChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  activeIndex?: number;
  formatValue?: (value: number) => string;
  formatTooltip?: (value: number, name: string, props: any) => any;
  onSliceClick?: (data: DataPoint, index: number) => void;
}

/**
 * Advanced Pie Chart component using Recharts
 * 
 * @param data - Array of data points
 * @param title - Chart title
 * @param subtitle - Chart subtitle
 * @param height - Chart height
 * @param innerRadius - Inner radius for donut chart (0 for pie chart)
 * @param outerRadius - Outer radius
 * @param showTooltip - Whether to show tooltip
 * @param showLegend - Whether to show legend
 * @param showLabels - Whether to show labels
 * @param activeIndex - Index of the active slice
 * @param formatValue - Function to format values
 * @param formatTooltip - Function to format tooltip
 * @param onSliceClick - Function to call when a slice is clicked
 */
const AdvancedPieChart: React.FC<AdvancedPieChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  innerRadius = 0,
  outerRadius = 80,
  showTooltip = true,
  showLegend = true,
  showLabels = true,
  activeIndex: externalActiveIndex,
  formatValue = (value) => value.toString(),
  formatTooltip,
  onSliceClick,
}) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | undefined>(undefined);
  
  // Use external active index if provided, otherwise use internal state
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

  // Validate data
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-gray-500 text-sm">No data available</div>
      </div>
    );
  }

  // Get colors from theme or use provided colors
  const getColor = (index: number, providedColor?: string) => {
    if (providedColor) return providedColor;
    return theme.chartColors.categorical[index % theme.chartColors.categorical.length];
  };

  // Handle mouse enter
  const handleMouseEnter = (_, index: number) => {
    if (externalActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (externalActiveIndex === undefined) {
      setInternalActiveIndex(undefined);
    }
  };

  // Handle click
  const handleClick = (data: DataPoint, index: number) => {
    if (onSliceClick) {
      onSliceClick(data, index);
    }
  };

  // Custom active shape for the pie
  const renderActiveShape = (props: any) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
        {showLabels && (
          <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={theme.colors.gray[700]} fontSize={14} fontWeight={500}>
            {payload.name}
          </text>
        )}
        {showLabels && (
          <text x={cx} y={cy} textAnchor="middle" fill={theme.colors.gray[900]} fontSize={18} fontWeight={600}>
            {formatValue(value)}
          </text>
        )}
        {showLabels && (
          <text x={cx} y={cy} dy={20} textAnchor="middle" fill={theme.colors.gray[500]} fontSize={12}>
            {`(${(percent * 100).toFixed(1)}%)`}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div style={{ height: `${height}px`, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              paddingAngle={2}
              label={showLabels && activeIndex === undefined ? {
                fill: theme.colors.gray[700],
                fontSize: 12,
                offset: 10,
                position: 'outside',
              } : false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(index, entry.color)}
                  stroke={theme.colors.gray[100]}
                  strokeWidth={1}
                  style={{ cursor: onSliceClick ? 'pointer' : 'default' }}
                />
              ))}
            </Pie>
            
            {showTooltip && (
              <Tooltip
                formatter={formatTooltip}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: `1px solid ${theme.colors.gray[200]}`,
                  borderRadius: theme.borderRadius.md,
                  boxShadow: theme.shadows.md,
                }}
              />
            )}
            
            {showLegend && (
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value, entry) => (
                  <span style={{ color: theme.colors.gray[700], fontSize: 12 }}>{value}</span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedPieChart;
