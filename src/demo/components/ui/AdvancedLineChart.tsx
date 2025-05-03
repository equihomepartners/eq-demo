import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine,
  ReferenceArea,
  Brush
} from 'recharts';
import theme from '../../utils/theme';

interface DataPoint {
  [key: string]: any;
}

interface Dataset {
  id: string;
  name: string;
  color?: string;
  dataKey: string;
  type?: 'line' | 'area';
  strokeDasharray?: string;
  fillOpacity?: number;
}

interface AdvancedLineChartProps {
  data: DataPoint[];
  datasets: Dataset[];
  xAxisDataKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
  showGrid?: boolean;
  showBrush?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  referenceLines?: {
    y?: number;
    label?: string;
    color?: string;
    strokeDasharray?: string;
  }[];
  referenceAreas?: {
    y1: number;
    y2: number;
    label?: string;
    color?: string;
    fillOpacity?: number;
  }[];
  yAxisDomain?: [number | 'auto', number | 'auto'];
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number, name: string) => [string, string];
}

/**
 * Advanced Line Chart component using Recharts
 * 
 * @param data - Array of data points
 * @param datasets - Configuration for each dataset
 * @param xAxisDataKey - Key for x-axis data
 * @param title - Chart title
 * @param subtitle - Chart subtitle
 * @param height - Chart height
 * @param yAxisLabel - Y-axis label
 * @param xAxisLabel - X-axis label
 * @param showGrid - Whether to show grid lines
 * @param showBrush - Whether to show brush for zooming
 * @param showTooltip - Whether to show tooltip
 * @param showLegend - Whether to show legend
 * @param referenceLines - Reference lines configuration
 * @param referenceAreas - Reference areas configuration
 * @param yAxisDomain - Y-axis domain
 * @param formatYAxis - Function to format Y-axis values
 * @param formatTooltip - Function to format tooltip values
 */
const AdvancedLineChart: React.FC<AdvancedLineChartProps> = ({
  data,
  datasets,
  xAxisDataKey,
  title,
  subtitle,
  height = 400,
  yAxisLabel,
  xAxisLabel,
  showGrid = true,
  showBrush = false,
  showTooltip = true,
  showLegend = true,
  referenceLines = [],
  referenceAreas = [],
  yAxisDomain = ['auto', 'auto'],
  formatYAxis,
  formatTooltip,
}) => {
  const [activeDatasets, setActiveDatasets] = useState<string[]>(
    datasets.map(dataset => dataset.id)
  );

  // Handle legend click to toggle datasets
  const handleLegendClick = (entry: any) => {
    const { id } = entry;
    
    setActiveDatasets(prevActiveDatasets => {
      if (prevActiveDatasets.includes(id)) {
        return prevActiveDatasets.filter(datasetId => datasetId !== id);
      } else {
        return [...prevActiveDatasets, id];
      }
    });
  };

  // Validate data
  if (!data || data.length === 0 || !datasets || datasets.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-gray-500 text-sm">No data available</div>
      </div>
    );
  }

  // Get colors from theme or use provided colors
  const getColor = (index: number, providedColor?: string) => {
    if (providedColor) return providedColor;
    return theme.chartColors.series[index % theme.chartColors.series.length];
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
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />}
            
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
              tickLine={{ stroke: theme.colors.gray[300] }}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5, fill: theme.colors.gray[600] } : undefined}
            />
            
            <YAxis 
              domain={yAxisDomain}
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
              tickLine={{ stroke: theme.colors.gray[300] }}
              tickFormatter={formatYAxis}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: theme.colors.gray[600] } : undefined}
            />
            
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
                onClick={handleLegendClick}
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value, entry) => (
                  <span style={{ color: theme.colors.gray[700], fontSize: 12 }}>{value}</span>
                )}
              />
            )}
            
            {/* Reference Lines */}
            {referenceLines.map((line, index) => (
              <ReferenceLine 
                key={`ref-line-${index}`}
                y={line.y} 
                stroke={line.color || theme.colors.gray[400]} 
                strokeDasharray={line.strokeDasharray || "3 3"}
                label={line.label ? {
                  value: line.label,
                  position: 'right',
                  fill: line.color || theme.colors.gray[600],
                  fontSize: 12
                } : undefined}
              />
            ))}
            
            {/* Reference Areas */}
            {referenceAreas.map((area, index) => (
              <ReferenceArea 
                key={`ref-area-${index}`}
                y1={area.y1} 
                y2={area.y2} 
                fill={area.color || theme.colors.primary[100]} 
                fillOpacity={area.fillOpacity || 0.3}
                label={area.label ? {
                  value: area.label,
                  position: 'insideTopRight',
                  fill: theme.colors.gray[700],
                  fontSize: 12
                } : undefined}
              />
            ))}
            
            {/* Datasets */}
            {datasets.map((dataset, index) => {
              const isActive = activeDatasets.includes(dataset.id);
              const color = getColor(index, dataset.color);
              
              if (!isActive) return null;
              
              if (dataset.type === 'area') {
                return (
                  <Area
                    key={dataset.id}
                    type="monotone"
                    dataKey={dataset.dataKey}
                    name={dataset.name}
                    stroke={color}
                    fill={color}
                    fillOpacity={dataset.fillOpacity || 0.3}
                    strokeWidth={2}
                    dot={{ r: 3, fill: color, strokeWidth: 1, stroke: 'white' }}
                    activeDot={{ r: 5, strokeWidth: 1, stroke: 'white' }}
                    strokeDasharray={dataset.strokeDasharray}
                  />
                );
              }
              
              return (
                <Line
                  key={dataset.id}
                  type="monotone"
                  dataKey={dataset.dataKey}
                  name={dataset.name}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: color, strokeWidth: 1, stroke: 'white' }}
                  activeDot={{ r: 5, strokeWidth: 1, stroke: 'white' }}
                  strokeDasharray={dataset.strokeDasharray}
                />
              );
            })}
            
            {/* Brush for zooming */}
            {showBrush && (
              <Brush 
                dataKey={xAxisDataKey} 
                height={30} 
                stroke={theme.colors.primary[500]}
                fill={theme.colors.gray[100]}
                tickFormatter={(value) => value.toString()}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedLineChart;
