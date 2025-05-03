import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Shield,
  MapPin,
  FileText,
  User,
  Home,
  Calendar,
  Clock,
  ArrowRight,
  Zap,
  Briefcase,
  PieChart,
  Download,
  Printer,
  Share2
} from 'lucide-react';
import DemoContext from '../../context/DemoContext';

const ExecutiveSummary: React.FC = () => {
  const { demoState } = useContext(DemoContext);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number | string | undefined) => {
    if (value === undefined || value === null) {
      return '0.0%';
    }

    if (typeof value === 'string') {
      if (value.startsWith('+')) {
        return `+${parseFloat(value.substring(1)).toFixed(1)}%`;
      } else if (value.startsWith('-')) {
        return `-${parseFloat(value.substring(1)).toFixed(1)}%`;
      } else {
        return `${parseFloat(value).toFixed(1)}%`;
      }
    } else {
      return `${value.toFixed(1)}%`;
    }
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

  // Get decision status
  const getDecisionStatus = () => {
    if (!demoState.decisionResult) return 'Pending';
    return demoState.decisionResult.approved ? 'Approved' : 'Declined';
  };

  // Get decision status color
  const getDecisionStatusColor = () => {
    if (!demoState.decisionResult) return 'bg-gray-100 text-gray-800';
    return demoState.decisionResult.approved
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  // Get decision status icon
  const getDecisionStatusIcon = () => {
    if (!demoState.decisionResult) return <Clock className="h-5 w-5" />;
    return demoState.decisionResult.approved
      ? <CheckCircle className="h-5 w-5 text-green-600" />
      : <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
              <CardDescription>
                Comprehensive overview of loan application #{demoState.application.id} for executive review
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Decision Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Loan Decision Summary</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Final decision based on comprehensive analysis across all systems
                  </p>
                </div>
                <Badge className={getDecisionStatusColor()}>
                  {getDecisionStatus()}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Zap className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Decision Engine Score</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-purple-600">
                      {demoState.decisionResult?.score || 0}/100
                    </div>
                    <div className="text-sm text-gray-500">
                      Threshold: 70
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${demoState.decisionResult?.score || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Loan Details</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-medium">{formatCurrency(demoState.application.loan.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">LTV:</span>
                      <span className="text-sm font-medium">{formatPercentage(demoState.decisionResult?.ltv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Interest Rate:</span>
                      <span className="text-sm font-medium">{formatPercentage(demoState.decisionResult?.interestRate)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Timeline</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Application Date:</span>
                      <span className="text-sm font-medium">{formatDate(demoState.application.submittedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Decision Date:</span>
                      <span className="text-sm font-medium">{formatDate(new Date().toISOString())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Term:</span>
                      <span className="text-sm font-medium">10 years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Insights */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cross-System Insights</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Traffic Light System</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Green Zone Property</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {demoState.application.property.suburb} is in a high-liquidity green zone with strong growth potential.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Strong Market Fundamentals</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          High demand, limited supply, and positive demographic trends support property value growth.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Low Risk Score: 18/100</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Minimal geographic risk based on comprehensive suburb analysis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Portfolio Management System</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Portfolio Fit Score: 92/100</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Excellent alignment with portfolio strategy and diversification goals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">IRR Enhancement: +0.1%</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Addition of this loan improves overall portfolio IRR.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Concentration Warning</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {demoState.application.property.suburb} concentration approaching 21% (limit: 25%).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <PieChart className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Simulation Engine</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Simulation Score: 97/100</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Monte Carlo simulations project strong long-term performance.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Stress Test: Resilient</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Portfolio maintains strong performance even in stress scenarios.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Growth Sensitivity: High</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Performance highly dependent on property growth rates (elasticity: 1.8).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-amber-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Borrower Profile</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Credit Score: Excellent</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {demoState.application.borrower.name} has an excellent credit history.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Income Stability: High</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Stable employment history with consistent income growth.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">Existing Debt: Low</h5>
                        <p className="text-xs text-gray-600 mt-1">
                          Minimal existing debt obligations, strong debt service capacity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Metrics</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Expected IRR</span>
                    <div className="text-2xl font-bold text-purple-600 mt-2">
                      {formatPercentage(demoState.decisionResult?.returns?.irr || 16.9)}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">ROI</span>
                    <div className="text-2xl font-bold text-purple-600 mt-2">
                      {formatPercentage(demoState.decisionResult?.returns?.roi || 152.4)}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Risk Score</span>
                    <div className="text-2xl font-bold text-green-600 mt-2">
                      18/100
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Portfolio Impact</span>
                    <div className="text-2xl font-bold text-green-600 mt-2">
                      +0.1%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Home className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Property Information</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Address:</span>
                      <span className="text-sm font-medium">{demoState.application.property.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Suburb:</span>
                      <span className="text-sm font-medium">{demoState.application.property.suburb}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Property Type:</span>
                      <span className="text-sm font-medium">{demoState.application.property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bedrooms:</span>
                      <span className="text-sm font-medium">{demoState.application.property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bathrooms:</span>
                      <span className="text-sm font-medium">{demoState.application.property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Land Size:</span>
                      <span className="text-sm font-medium">{demoState.application.property.landSize} m²</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">Valuation</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      <span className="text-sm font-medium">{formatCurrency(demoState.application.property.currentValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Purchase Price:</span>
                      <span className="text-sm font-medium">{formatCurrency(demoState.application.property.previousTransactions?.[0]?.price || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Purchase Date:</span>
                      <span className="text-sm font-medium">{demoState.application.property.previousTransactions?.[0]?.date || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Appreciation:</span>
                      <span className="text-sm font-medium">
                        {formatPercentage(
                          demoState.application.property.previousTransactions?.[0]?.price
                            ? ((demoState.application.property.currentValue - demoState.application.property.previousTransactions[0].price) /
                               demoState.application.property.previousTransactions[0].price) * 100
                            : 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Projected Growth:</span>
                      <span className="text-sm font-medium">{formatPercentage(5.8)} annually</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Executive Recommendations</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Approve Loan</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      This loan meets all criteria for approval with strong performance across all systems.
                      The property is in a high-growth green zone area with excellent market fundamentals,
                      and the borrower has a strong credit profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Monitor Concentration</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      While this loan is recommended for approval, note that {demoState.application.property.suburb}
                      concentration is approaching the recommended maximum. Future loans in this suburb should be
                      carefully evaluated to maintain optimal portfolio diversification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Growth Opportunity</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      This loan represents an excellent growth opportunity for the portfolio. The property's
                      location in a high-demand area with limited supply positions it well for strong appreciation,
                      which aligns with our investment strategy of focusing on green zone suburbs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Next Steps</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    The loan has been approved and is ready for origination. The next steps include finalizing
                    documentation, conducting final verification checks, and proceeding with settlement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Report Generated:</span> {new Date().toLocaleString()}
          </div>
          <Button>Proceed to Origination</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;
