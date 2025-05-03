import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  BarChart2,
  TrendingUp,
  Users,
  Home,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import mockData from '../../data/mockData';
import { EnhancedUnderwritingDashboard } from '../enhanced';

// Mock dashboard data
const mockDashboardData = {
  summary: {
    totalApplications: 42,
    pendingReview: 15,
    approved: 22,
    declined: 5,
    conversionRate: 81.5
  },
  performance: {
    averageProcessingTime: 2.3,
    approvalRate: 81.5,
    averageLoanSize: 920000,
    totalLoanVolume: 20240000
  },
  trends: {
    applicationsWeekly: [12, 15, 18, 22, 19, 24, 28],
    approvalRateWeekly: [78, 80, 82, 79, 83, 81, 82],
    loanVolumeWeekly: [8500000, 9200000, 10500000, 12800000, 11200000, 14500000, 16800000]
  },
  trafficLightDistribution: {
    green: 68,
    yellow: 24,
    red: 8
  },
  recentApplications: [
    {
      id: 'DEMO-2024-001',
      borrower: 'James & Sarah Wilson',
      property: 'Mosman',
      amount: 850000,
      status: 'submitted',
      trafficLight: 'green'
    },
    {
      id: 'DEMO-2024-002',
      borrower: 'Michael Johnson',
      property: 'Double Bay',
      amount: 1200000,
      status: 'approved',
      trafficLight: 'green'
    },
    {
      id: 'DEMO-2024-003',
      borrower: 'Emma & David Chen',
      property: 'Bondi',
      amount: 950000,
      status: 'in_review',
      trafficLight: 'green'
    },
    {
      id: 'DEMO-2024-004',
      borrower: 'Robert Smith',
      property: 'Randwick',
      amount: 780000,
      status: 'in_review',
      trafficLight: 'yellow'
    }
  ]
};

const Dashboard: React.FC = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in_review':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  // Get traffic light badge color
  const getTrafficLightBadgeColor = (zone: string) => {
    switch (zone.toLowerCase()) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
      case 'orange':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Underwriting Dashboard</h2>
          <p className="text-gray-500">Overview of loan applications and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="h-4 w-4 mr-1" />
            May 2024
          </Badge>
        </div>
      </div>

      {/* Enhanced Underwriting Dashboard */}
      <EnhancedUnderwritingDashboard
        underwritingData={mockData.enhancedUI.underwriting}
        selectedApplication="2003"
        onApplicationSelect={(applicationId) => console.log(`Selected application: ${applicationId}`)}
        onReviewApplication={(applicationId) => console.log(`Review application: ${applicationId}`)}
      />
    </div>
  );
};

export default Dashboard;
