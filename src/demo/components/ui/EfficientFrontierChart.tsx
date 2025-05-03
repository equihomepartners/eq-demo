import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from 'recharts';
import theme from '../../utils/theme';

interface DataPoint {
  risk: number;
  return: number;
  name?: string;
  size?: number;
  color?: string;
}

interface EfficientFrontierChartProps {
  data: DataPoint[];
  frontierData: DataPoint[];
  currentPortfolio?: DataPoint;
  optimalPortfolio?: DataPoint;
  height?: number;
  title?: string;
  subtitle?: string;
}

const EfficientFrontierChart: React.FC<EfficientFrontierChartProps> = ({
  data,
  frontierData,
  currentPortfolio,
  optimalPortfolio,
  height = 300,
  title,
  subtitle
}) => {
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
          <p className="text-sm font-medium">{data.name || 'Portfolio'}</p>
          <p className="text-xs text-gray-500">Risk: {formatPercentage(data.risk)}</p>
          <p className="text-xs text-gray-500">Return: {formatPercentage(data.return)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-base font-medium text-gray-900">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.gray[200]} />
          <XAxis 
            type="number" 
            dataKey="risk" 
            name="Risk" 
            domain={[0, 'dataMax + 5']} 
            tickFormatter={formatPercentage}
            label={{ value: 'Risk (%)', position: 'insideBottom', offset: -10 }}
            stroke={theme.colors.gray[500]}
          />
          <YAxis 
            type="number" 
            dataKey="return" 
            name="Return" 
            domain={[0, 'dataMax + 2']} 
            tickFormatter={formatPercentage}
            label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }}
            stroke={theme.colors.gray[500]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Portfolio scatter points */}
          <Scatter 
            name="Portfolios" 
            data={data} 
            fill={theme.colors.gray[400]}
            shape="circle"
          />
          
          {/* Efficient frontier line */}
          <Scatter 
            name="Efficient Frontier" 
            data={frontierData} 
            fill={theme.colors.primary[500]}
            line={{ stroke: theme.colors.primary[500], strokeWidth: 2 }}
            lineType="curve"
            shape="circle"
          />
          
          {/* Current portfolio */}
          {currentPortfolio && (
            <Scatter 
              name="Current Portfolio" 
              data={[currentPortfolio]} 
              fill={theme.colors.info[500]}
              shape="circle"
            />
          )}
          
          {/* Optimal portfolio */}
          {optimalPortfolio && (
            <Scatter 
              name="Optimal Portfolio" 
              data={[optimalPortfolio]} 
              fill={theme.colors.success[500]}
              shape="star"
            />
          )}
          
          {/* Reference lines */}
          <ReferenceLine 
            y={optimalPortfolio?.return || 0} 
            stroke={theme.colors.success[500]} 
            strokeDasharray="3 3"
          >
            <Label 
              value="Target Return" 
              position="right" 
              fill={theme.colors.success[500]}
            />
          </ReferenceLine>
          
          <ReferenceLine 
            x={currentPortfolio?.risk || 0} 
            stroke={theme.colors.info[500]} 
            strokeDasharray="3 3"
          >
            <Label 
              value="Current Risk" 
              position="top" 
              fill={theme.colors.info[500]}
            />
          </ReferenceLine>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficientFrontierChart;
