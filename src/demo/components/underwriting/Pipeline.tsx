import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Filter, ArrowUpDown, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Mock pipeline data
const mockPipeline = [
  {
    id: 'DEMO-2024-001',
    borrower: 'James & Sarah Wilson',
    property: '42 Mosman Street, Mosman',
    amount: 850000,
    ltv: 20.24,
    status: 'submitted',
    submittedAt: '2024-05-15T10:30:00Z',
    trafficLight: 'green',
    score: 92
  },
  {
    id: 'DEMO-2024-002',
    borrower: 'Michael Johnson',
    property: '15 Ocean Street, Double Bay',
    amount: 1200000,
    ltv: 25.53,
    status: 'approved',
    submittedAt: '2024-05-14T09:15:00Z',
    trafficLight: 'green',
    score: 88
  },
  {
    id: 'DEMO-2024-003',
    borrower: 'Emma & David Chen',
    property: '8 Campbell Parade, Bondi',
    amount: 950000,
    ltv: 22.09,
    status: 'in_review',
    submittedAt: '2024-05-14T14:45:00Z',
    trafficLight: 'green',
    score: 85
  },
  {
    id: 'DEMO-2024-004',
    borrower: 'Robert Smith',
    property: '22 Alison Road, Randwick',
    amount: 780000,
    ltv: 30.12,
    status: 'in_review',
    submittedAt: '2024-05-13T11:20:00Z',
    trafficLight: 'yellow',
    score: 72
  },
  {
    id: 'DEMO-2024-005',
    borrower: 'Jennifer Taylor',
    property: '5 Crown Street, Surry Hills',
    amount: 650000,
    ltv: 28.26,
    status: 'declined',
    submittedAt: '2024-05-12T16:10:00Z',
    trafficLight: 'yellow',
    score: 65
  }
];

const Pipeline: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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

  // Sort applications
  const sortedApplications = [...mockPipeline].sort((a, b) => {
    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === 'ltv') {
      return sortOrder === 'asc' ? a.ltv - b.ltv : b.ltv - a.ltv;
    } else if (sortBy === 'score') {
      return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
    } else {
      // Default sort by date
      return sortOrder === 'asc' 
        ? new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        : new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    }
  });

  // Filter applications
  const filteredApplications = sortedApplications.filter(app => 
    app.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle sort
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Pipeline</h2>
          <p className="text-gray-500">Manage and track loan applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search applications..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Loan Applications</CardTitle>
          <CardDescription>
            Showing {filteredApplications.length} of {mockPipeline.length} applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Borrower</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Property</th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => toggleSort('amount')}
                  >
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => toggleSort('ltv')}
                  >
                    <div className="flex items-center">
                      LTV
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Traffic Light</th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => toggleSort('score')}
                  >
                    <div className="flex items-center">
                      Score
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => toggleSort('submittedAt')}
                  >
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application, index) => (
                  <tr 
                    key={application.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 text-gray-900">{application.id}</td>
                    <td className="px-4 py-3 text-gray-900">{application.borrower}</td>
                    <td className="px-4 py-3 text-gray-900">{application.property}</td>
                    <td className="px-4 py-3 text-gray-900">{formatCurrency(application.amount)}</td>
                    <td className="px-4 py-3 text-gray-900">{application.ltv.toFixed(2)}%</td>
                    <td className="px-4 py-3">
                      <Badge className={getTrafficLightBadgeColor(application.trafficLight)}>
                        {application.trafficLight.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{application.score}/100</td>
                    <td className="px-4 py-3 text-gray-900">{formatDate(application.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {getStatusIcon(application.status)}
                        <Badge className={`ml-2 ${getStatusBadgeColor(application.status)}`}>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pipeline;
