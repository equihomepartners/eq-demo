import React from 'react';
import { Bar } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  metrics: {
    growth: number;
    risk: number;
    infrastructure: number;
    liquidity: number;
    safety: number;
  };
}

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  // Chart data for metrics
  const metricsChartData = {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Liquidity', 'Safety'],
    datasets: [
      {
        label: 'Metrics',
        data: [
          metrics.growth,
          metrics.risk,
          metrics.infrastructure,
          metrics.liquidity,
          metrics.safety
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',  // Green - Growth
          'rgba(239, 68, 68, 0.6)',  // Red - Risk
          'rgba(59, 130, 246, 0.6)', // Blue - Infrastructure
          'rgba(168, 85, 247, 0.6)', // Purple - Liquidity
          'rgba(14, 165, 233, 0.6)'  // Sky - Safety
        ],
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.y}/100`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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
        <TrendingUp className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
      </div>
      <div className="h-64">
        <Bar data={metricsChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MetricsChart;
