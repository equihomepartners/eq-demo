import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GrowthChartProps {
  predictions: {
    shortTerm: {
      growth: number;
    };
    mediumTerm: {
      growth: number;
    };
    longTerm: {
      growth: number;
    };
  };
}

const GrowthChart: React.FC<GrowthChartProps> = ({ predictions }) => {
  // Growth prediction chart
  const growthChartData = {
    labels: ['1 Year', '2 Years', '3 Years', '5 Years', '10 Years'],
    datasets: [
      {
        label: 'Predicted Growth (%)',
        data: [
          predictions.shortTerm.growth,
          predictions.shortTerm.growth * 0.95,
          predictions.mediumTerm.growth,
          predictions.mediumTerm.growth * 0.9,
          predictions.longTerm.growth
        ],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointRadius: 4,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Sydney Average (%)',
        data: [4.5, 4.3, 4.2, 4.0, 3.8],
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(156, 163, 175, 1)',
        pointRadius: 3,
        borderDash: [5, 5],
        tension: 0.3,
        fill: false
      }
    ]
  };

  // Growth chart options
  const growthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 8,
        title: {
          display: true,
          text: 'Annual Growth Rate (%)',
          font: {
            size: 10
          }
        },
        ticks: {
          font: {
            size: 10
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Growth Projections</h3>
      </div>
      <div className="h-64">
        <Line data={growthChartData} options={growthChartOptions} />
      </div>
    </div>
  );
};

export default GrowthChart;
