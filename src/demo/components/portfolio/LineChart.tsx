import React from 'react';

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      values: number[];
      color: string;
    }[];
  };
  title?: string;
  height?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 200,
  yAxisLabel,
  xAxisLabel
}) => {
  // Validate data
  if (!data || !data.labels || !data.datasets || data.labels.length === 0 || data.datasets.length === 0) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

  // Filter out invalid values and ensure all datasets have valid values
  const validDatasets = data.datasets.filter(dataset =>
    dataset.values &&
    dataset.values.length > 0 &&
    dataset.values.some(value => !isNaN(value))
  );

  if (validDatasets.length === 0) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No valid data to display</div>
        </div>
      </div>
    );
  }

  // Get all valid values
  const allValues = validDatasets.flatMap(dataset =>
    dataset.values.filter(value => !isNaN(value))
  );

  if (allValues.length === 0) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-sm text-gray-500">No valid data points</div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  // Handle case where min and max are the same
  const range = maxValue === minValue ? maxValue * 0.1 || 1 : maxValue - minValue;

  // Add padding to the range
  const paddedMin = Math.max(0, minValue - range * 0.1);
  const paddedMax = maxValue + range * 0.1;
  const paddedRange = paddedMax - paddedMin;

  const getYPosition = (value: number) => {
    if (isNaN(value)) return height; // Place invalid values at the bottom
    return height - ((value - paddedMin) / paddedRange) * height;
  };

  const getXPosition = (index: number) => {
    const denominator = Math.max(1, data.labels.length - 1);
    return (index / denominator) * 100;
  };

  const createPath = (values: number[]) => {
    const validPoints = values
      .map((value, index) => ({ value, index }))
      .filter(point => !isNaN(point.value));

    if (validPoints.length === 0) return '';

    return validPoints.map((point, i) => {
      const x = getXPosition(point.index);
      const y = getYPosition(point.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="w-full">
      {title && <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>}
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = height - (height * ratio);
          const value = paddedMin + (paddedRange * ratio);
          return (
            <div key={index} className="absolute w-full" style={{ top: `${y}px` }}>
              <div className="border-t border-gray-200 w-full"></div>
              <div className="absolute -left-10 -top-2 text-xs text-gray-500 w-8 text-right">
                {value.toFixed(1)}
              </div>
            </div>
          );
        })}

        {/* X-axis labels */}
        <div className="absolute top-full mt-2 w-full flex justify-between">
          {data.labels.map((label, index) => (
            <div
              key={index}
              className="text-xs text-gray-500"
              style={{
                position: 'absolute',
                left: `${getXPosition(index)}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Chart lines */}
        <svg
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {validDatasets.map((dataset, index) => {
            const path = createPath(dataset.values);
            if (!path) return null;

            return (
              <path
                key={index}
                d={path}
                fill="none"
                stroke={dataset.color || '#cccccc'}
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Data points */}
        {validDatasets.map((dataset, datasetIndex) => (
          dataset.values.map((value, index) => {
            if (isNaN(value)) return null;

            return (
              <div
                key={`${datasetIndex}-${index}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: dataset.color || '#cccccc',
                  left: `${getXPosition(index)}%`,
                  top: `${getYPosition(value)}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            );
          })
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-8">
        {validDatasets.map((dataset, index) => (
          <div key={index} className="flex items-center mx-2">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: dataset.color || '#cccccc' }}
            ></div>
            <span className="text-xs text-gray-700">{dataset.label || `Series ${index + 1}`}</span>
          </div>
        ))}
      </div>

      {/* Axis labels */}
      {xAxisLabel && (
        <div className="text-xs text-gray-500 text-center mt-6">
          {xAxisLabel}
        </div>
      )}

      {yAxisLabel && (
        <div
          className="text-xs text-gray-500 absolute -left-6 top-1/2 transform -translate-y-1/2 -rotate-90"
          style={{ width: `${height}px` }}
        >
          {yAxisLabel}
        </div>
      )}
    </div>
  );
};

export default LineChart;
