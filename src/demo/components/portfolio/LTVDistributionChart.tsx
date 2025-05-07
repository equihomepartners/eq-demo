import React from 'react';
import { BarChart2 } from 'lucide-react';

interface LTVDistributionChartProps {
  data: {
    ranges: string[];
    counts: number[];
    percentages: number[];
    colors: string[];
  };
  title?: string;
  height?: number;
}

const LTVDistributionChart: React.FC<LTVDistributionChartProps> = ({
  data,
  title = 'LTV Distribution',
  height = 200
}) => {
  // Validate data
  if (!data || !data.ranges || !data.counts || !data.percentages || !data.colors ||
      data.ranges.length === 0 ||
      data.counts.length === 0 ||
      data.ranges.length !== data.counts.length ||
      data.ranges.length !== data.percentages.length ||
      data.ranges.length !== data.colors.length) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...data.counts);
  const barWidth = 100 / data.ranges.length;

  return (
    <div className="w-full">
      <div className="flex items-center mb-3">
        <BarChart2 className="h-4 w-4 text-gray-500 mr-2" />
        <h5 className="text-sm font-medium text-gray-700">{title}</h5>
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = height - (height * ratio);
          const value = Math.round(maxCount * ratio);
          return (
            <div key={index} className="absolute w-full" style={{ top: `${y}px` }}>
              <div className="border-t border-gray-200 w-full"></div>
              <div className="absolute -left-8 -top-2 text-xs text-gray-500 w-6 text-right">
                {value}
              </div>
            </div>
          );
        })}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around">
          {data.ranges.map((range, index) => {
            const barHeight = (data.counts[index] / maxCount) * height;
            return (
              <div key={index} className="flex flex-col items-center" style={{ width: `${barWidth}%` }}>
                <div 
                  className="w-4/5 rounded-t-sm transition-all duration-500 ease-in-out hover:opacity-80"
                  style={{ 
                    height: `${barHeight}px`, 
                    backgroundColor: data.colors[index],
                    minHeight: '4px' // Ensure very small values are still visible
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{range}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend with percentages */}
      <div className="flex flex-wrap justify-center mt-6">
        {data.ranges.map((range, index) => (
          <div key={index} className="flex items-center mx-3 mb-2">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: data.colors[index] }}
            ></div>
            <span className="text-xs text-gray-700">
              {range}: {data.percentages[index]}%
            </span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center mt-4">
        Distribution of loans by LTV ratio
      </div>
    </div>
  );
};

export default LTVDistributionChart;
