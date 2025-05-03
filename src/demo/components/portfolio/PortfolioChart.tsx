import React from 'react';

interface PortfolioChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  title?: string;
  height?: number;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data, title, height = 200 }) => {
  // Validate data
  if (!data || !data.labels || !data.values || !data.colors ||
      data.labels.length === 0 ||
      data.values.length === 0 ||
      data.labels.length !== data.values.length ||
      data.values.length !== data.colors.length) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

  // Filter out invalid values
  const validData = data.labels.map((label, index) => ({
    label,
    value: data.values[index],
    color: data.colors[index] || '#cccccc',
    isValid: !isNaN(data.values[index]) && data.values[index] >= 0
  })).filter(item => item.isValid);

  if (validData.length === 0) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No valid data to display</div>
        </div>
      </div>
    );
  }

  const validValues = validData.map(item => item.value);
  const maxValue = Math.max(...validValues);

  return (
    <div className="w-full">
      {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
      <div className="space-y-3" style={{ height: `${height}px` }}>
        {validData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-24 text-xs text-gray-500">{item.label}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                    backgroundColor: item.color
                  }}
                ></div>
              </div>
            </div>
            <div className="w-16 text-xs text-right font-medium">{item.value.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioChart;
