import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  Cell
} from 'recharts';
import theme from '../../utils/theme';

interface DataPoint {
  [key: string]: any;
}

interface Dataset {
  id: string;
  name: string;
  dataKey: string;
  color?: string;
  stackId?: string;
}

interface AdvancedBarChartProps {
  data: DataPoint[];
  datasets: Dataset[];
  xAxisDataKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  horizontal?: boolean;
  stacked?: boolean;
  referenceLines?: {
    y?: number;
    x?: number | string;
    label?: string;
    color?: string;
    strokeDasharray?: string;
  }[];
  yAxisDomain?: [number | 'auto', number | 'auto'];
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number, name: string) => [string, string];
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number;
  highlightedBars?: {
    dataKey: string;
    itemIndex: number | string;
  }[];
}

/**
 * Advanced Bar Chart component using Recharts
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
 * @param showTooltip - Whether to show tooltip
 * @param showLegend - Whether to show legend
 * @param showLabels - Whether to show data labels
 * @param horizontal - Whether to display bars horizontally
 * @param stacked - Whether to stack bars
 * @param referenceLines - Reference lines configuration
 * @param yAxisDomain - Y-axis domain
 * @param formatYAxis - Function to format Y-axis values
 * @param formatTooltip - Function to format tooltip values
 * @param barSize - Size of bars
 * @param barGap - Gap between bars in the same category
 * @param barCategoryGap - Gap between bar categories
 * @param highlightedBars - Configuration for highlighted bars
 */
const AdvancedBarChart: React.FC<AdvancedBarChartProps> = ({
  data,
  datasets,
  xAxisDataKey,
  title,
  subtitle,
  height = 400,
  yAxisLabel,
  xAxisLabel,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  showLabels = false,
  horizontal = false,
  stacked = false,
  referenceLines = [],
  yAxisDomain = ['auto', 'auto'],
  formatYAxis,
  formatTooltip,
  barSize,
  barGap,
  barCategoryGap,
  highlightedBars = [],
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
    return theme.chartColors.categorical[index % theme.chartColors.categorical.length];
  };

  // Check if a bar should be highlighted
  const isHighlighted = (dataKey: string, itemIndex: number | string) => {
    return highlightedBars.some(
      highlight => highlight.dataKey === dataKey && highlight.itemIndex === itemIndex
    );
  };

  // Get the appropriate chart component based on orientation
  const ChartComponent = horizontal ? BarChart : BarChart;
  const BarComponent = horizontal ? Bar : Bar;
  const XAxisComponent = horizontal ? YAxis : XAxis;
  const YAxisComponent = horizontal ? XAxis : YAxis;

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
          <ChartComponent
            data={data}
            layout={horizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            barSize={barSize}
            barGap={barGap}
            barCategoryGap={barCategoryGap}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />}
            
            <XAxisComponent 
              dataKey={horizontal ? undefined : xAxisDataKey}
              type={horizontal ? 'number' : 'category'}
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
              tickLine={{ stroke: theme.colors.gray[300] }}
              label={horizontal ? (yAxisLabel ? { value: yAxisLabel, position: 'insideBottom', offset: -5, fill: theme.colors.gray[600] } : undefined) : (xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5, fill: theme.colors.gray[600] } : undefined)}
              domain={horizontal ? yAxisDomain : undefined}
              tickFormatter={horizontal ? formatYAxis : undefined}
            />
            
            <YAxisComponent 
              dataKey={horizontal ? xAxisDataKey : undefined}
              type={horizontal ? 'category' : 'number'}
              domain={horizontal ? undefined : yAxisDomain}
              tick={{ fill: theme.colors.gray[600], fontSize: 12 }}
              axisLine={{ stroke: theme.colors.gray[300] }}
              tickLine={{ stroke: theme.colors.gray[300] }}
              tickFormatter={horizontal ? undefined : formatYAxis}
              label={horizontal ? (xAxisLabel ? { value: xAxisLabel, angle: -90, position: 'insideLeft', fill: theme.colors.gray[600] } : undefined) : (yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: theme.colors.gray[600] } : undefined)}
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
                y={horizontal ? undefined : line.y} 
                x={horizontal ? line.y : line.x}
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
            
            {/* Datasets */}
            {datasets.map((dataset, index) => {
              const isActive = activeDatasets.includes(dataset.id);
              const color = getColor(index, dataset.color);
              
              if (!isActive) return null;
              
              return (
                <BarComponent
                  key={dataset.id}
                  dataKey={dataset.dataKey}
                  name={dataset.name}
                  fill={color}
                  stackId={stacked ? (dataset.stackId || 'stack') : undefined}
                >
                  {showLabels && (
                    <LabelList 
                      dataKey={dataset.dataKey} 
                      position={horizontal ? 'right' : 'top'} 
                      fill={theme.colors.gray[700]}
                      fontSize={10}
                      formatter={formatYAxis}
                    />
                  )}
                  
                  {/* Highlight specific bars if needed */}
                  {data.map((entry, entryIndex) => {
                    const shouldHighlight = isHighlighted(dataset.dataKey, horizontal ? entry[xAxisDataKey] : entryIndex);
                    
                    return (
                      <Cell 
                        key={`cell-${entryIndex}`} 
                        fill={shouldHighlight ? theme.colors.primary[700] : color}
                        stroke={shouldHighlight ? theme.colors.primary[900] : undefined}
                        strokeWidth={shouldHighlight ? 1 : 0}
                      />
                    );
                  })}
                </BarComponent>
              );
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedBarChart;
