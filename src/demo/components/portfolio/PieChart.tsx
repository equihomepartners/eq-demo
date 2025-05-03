import React from 'react';

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  title?: string;
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, size = 200 }) => {
  // Ensure we have valid data
  if (!data || !data.values || !data.labels || !data.colors ||
      data.values.length === 0 ||
      data.values.length !== data.labels.length ||
      data.values.length !== data.colors.length) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3 text-center">{title}</h5>}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

  // Calculate total, handling edge cases
  const total = data.values.reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);

  // If total is 0, show empty chart
  if (total === 0) {
    return (
      <div className="w-full">
        {title && <h5 className="text-sm font-medium text-gray-700 mb-3 text-center">{title}</h5>}
        <div className="flex flex-col items-center">
          <div
            className="rounded-full bg-gray-200"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              position: 'relative'
            }}
          >
            <div
              className="absolute rounded-full bg-white"
              style={{
                width: `${size * 0.6}px`,
                height: `${size * 0.6}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-4">No data to display</div>
        </div>
      </div>
    );
  }

  // Create the conic gradient for the pie chart
  const createConicGradient = () => {
    let gradient = 'conic-gradient(';
    let cumulativePercent = 0;

    data.values.forEach((value, index) => {
      // Skip invalid values
      if (isNaN(value) || value <= 0) return;

      const percent = (value / total) * 100;
      gradient += `${data.colors[index] || '#cccccc'} ${cumulativePercent}% ${cumulativePercent + percent}%`;
      cumulativePercent += percent;

      if (index < data.values.length - 1) {
        gradient += ', ';
      }
    });

    // If no valid segments were added, use a default gray
    if (cumulativePercent === 0) {
      gradient += '#cccccc 0% 100%';
    }

    gradient += ')';
    return gradient;
  };

  return (
    <div className="w-full">
      {title && <h5 className="text-sm font-medium text-gray-700 mb-3 text-center">{title}</h5>}
      <div className="flex flex-col items-center">
        <div
          className="rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: createConicGradient(),
            position: 'relative'
          }}
        >
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: `${size * 0.6}px`,
              height: `${size * 0.6}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.labels.map((label, index) => {
            // Skip items with invalid values
            if (isNaN(data.values[index]) || data.values[index] <= 0) return null;

            return (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: data.colors[index] || '#cccccc' }}
                ></div>
                <span className="text-xs text-gray-700">
                  {label}: {((data.values[index] / total) * 100).toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
