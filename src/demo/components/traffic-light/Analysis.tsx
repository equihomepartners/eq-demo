import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, MapPin, TrendingUp, Shield, BarChart2, Building2, Brain, ListFilter, Map, Info, DollarSign } from 'lucide-react';
import DemoContext from '../../context/DemoContext';
import mockData, { mockSuburbData, mockLoanApplication } from '../../data/mockData';
import EnhancedTrafficLightMap from './EnhancedTrafficLightMap';
import MLDecisionEngine from './MLDecisionEngine';
import Pipeline from './Pipeline';
import { EnhancedTrafficLightDashboard } from '../enhanced';

const Analysis: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Check if application exists
  const applicationExists = demoState.application !== null;

  // Run analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      updateDemoState({ suburbData: mockSuburbData });
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2000);
  };

  // Reset analysis
  const resetAnalysis = () => {
    setIsAnalyzed(false);
    updateDemoState({ suburbData: null });
  };

  // Get zone badge color
  const getZoneBadgeColor = (zone: string) => {
    switch (zone.toLowerCase()) {
      case 'green':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'yellow':
      case 'orange':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'red':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Format score
  const formatScore = (value: number) => {
    return value.toFixed(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Traffic Light Analysis</h2>
          <p className="text-gray-500">Analyze the suburb using the Traffic Light System</p>
        </div>
        {isAnalyzed && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Analysis Complete</span>
          </div>
        )}
      </div>

      {!applicationExists ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">No Application Found</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please submit a loan application first before proceeding with the Traffic Light Analysis.
              </p>
            </div>
          </div>
        </div>
      ) : !isAnalyzed ? (
        <Card>
          <CardHeader>
            <CardTitle>Suburb Analysis</CardTitle>
            <CardDescription>
              Analyze {demoState.application.property.suburb}, {demoState.application.property.state} {demoState.application.property.postcode} using the Traffic Light System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{demoState.application.property.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Suburb</p>
                    <p className="font-medium">{demoState.application.property.suburb}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State/Postcode</p>
                    <p className="font-medium">{demoState.application.property.state} {demoState.application.property.postcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium capitalize">{demoState.application.property.type}</p>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <Map className="h-16 w-16 mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Traffic Light System Analysis</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  The Traffic Light System will analyze the suburb using machine learning to classify it into green, yellow, or red zones based on investment potential.
                </p>
                <Button
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Suburb and Property Analysis Results</CardTitle>
                  <CardDescription>
                    Analysis of {mockSuburbData.suburb}, {demoState.application.property.state} {mockSuburbData.postcode}
                  </CardDescription>
                </div>
                <Badge className={getZoneBadgeColor(mockSuburbData.zone)}>
                  {mockSuburbData.zone.toUpperCase()} ZONE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="overview" className="flex items-center">
                    <Map className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger value="forecast" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Forecast
                  </TabsTrigger>
                  <TabsTrigger value="ml-decision" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    ML Decision
                  </TabsTrigger>
                  <TabsTrigger value="decision-engine" className="flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Decision Engine
                  </TabsTrigger>
                  <TabsTrigger value="pipeline" className="flex items-center">
                    <ListFilter className="h-4 w-4 mr-2" />
                    Pipeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* PropTrack AVM Report */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="w-full">
                          <h4 className="text-sm font-medium text-blue-900">PropTrack AVM Report</h4>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-blue-700">Property Value:</p>
                              <p className="text-sm font-semibold text-blue-900">${demoState.application.property.originalValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-blue-700">Risk Adjustment:</p>
                              <p className="text-sm font-semibold text-blue-900">-5.00%</p>
                            </div>
                            <div>
                              <p className="text-xs text-blue-700">Adjusted Value:</p>
                              <p className="text-sm font-semibold text-blue-900">${(demoState.application.property.originalValue * 0.95).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-blue-700">Confidence Level:</p>
                              <p className="text-sm font-semibold text-blue-900">High (92%)</p>
                            </div>
                          </div>
                          <p className="text-xs text-blue-600 mt-2">
                            Automated Valuation Model report for {demoState.application.property.address}, {demoState.application.property.suburb}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Property Transaction History */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Property Transaction History</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">March 2020</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Sale</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">$2,800,000</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600">+239.4%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">October 1998</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Sale</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">$825,000</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600">+10.0%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">August 1997</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Sale</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">$750,000</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Initial</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Property Value History Chart */}
                    <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Property Value History (20 Years)</h4>
                      <div className="h-64 relative">
                        {/* Simplified chart representation */}
                        <div className="absolute inset-0 flex items-end">
                          {/* Chart bars/line representation */}
                          <div className="w-full h-full relative">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                              <span>$3M</span>
                              <span>$2.5M</span>
                              <span>$2M</span>
                              <span>$1.5M</span>
                              <span>$1M</span>
                              <span>$0.5M</span>
                              <span>$0</span>
                            </div>

                            {/* Chart area */}
                            <div className="ml-10 h-full relative">
                              {/* Chart line */}
                              <div className="absolute bottom-0 left-0 w-full h-full">
                                <svg className="w-full h-full">
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                    </linearGradient>
                                  </defs>
                                  {/* Area under the curve */}
                                  <path
                                    d="M0,224 L100,200 L200,180 L300,150 L400,120 L500,80 L600,40 L700,0 L700,224 L0,224 Z"
                                    fill="url(#gradient)"
                                  />
                                  {/* Line */}
                                  <path
                                    d="M0,224 L100,200 L200,180 L300,150 L400,120 L500,80 L600,40 L700,0"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                  />
                                  {/* Data points */}
                                  <circle cx="0" cy="224" r="4" fill="#3b82f6" />
                                  <circle cx="200" cy="180" r="4" fill="#3b82f6" />
                                  <circle cx="700" cy="0" r="4" fill="#3b82f6" />
                                </svg>
                              </div>

                              {/* X-axis labels */}
                              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 transform translate-y-6">
                                <span>1997</span>
                                <span>2002</span>
                                <span>2007</span>
                                <span>2012</span>
                                <span>2017</span>
                                <span>2022</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Historical Growth Rate (CAGR)</p>
                          <p className="text-sm font-medium text-gray-900">7.90% p.a.</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Forecast Growth Rate</p>
                          <p className="text-sm font-medium text-gray-900">5.90% p.a.</p>
                        </div>
                      </div>
                    </div>

                    {/* Map and Metrics Grid */}
                    <div className="mb-6">
                      {/* Enhanced Map */}
                      <EnhancedTrafficLightMap
                        selectedSuburb={mockSuburbData.suburb}
                        propertyLocation={{
                          address: demoState.application.property.address,
                          lat: -33.8269, // Mosman coordinates
                          lng: 151.2466
                        }}
                      />
                    </div>

                    {/* Property Metrics Section */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Property Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Property Type</p>
                          <p className="text-sm font-medium text-gray-900 capitalize">{demoState.application.property.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Land Size</p>
                          <p className="text-sm font-medium text-gray-900">676 sqm</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Building Size</p>
                          <p className="text-sm font-medium text-gray-900">271 sqm</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Year Built</p>
                          <p className="text-sm font-medium text-gray-900">1998</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bedrooms</p>
                          <p className="text-sm font-medium text-gray-900">{demoState.application.property.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bathrooms</p>
                          <p className="text-sm font-medium text-gray-900">{demoState.application.property.bathrooms}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Condition</p>
                          <p className="text-sm font-medium text-gray-900">Excellent</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Renovation</p>
                          <p className="text-sm font-medium text-gray-900">2018</p>
                        </div>
                      </div>
                    </div>

                    {/* Comparable Properties Section */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Comparable Properties</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-xs text-gray-500">38 Mosman Street, Mosman</p>
                          <p className="text-sm font-medium text-gray-900">$2,750,000 (Mar 2023)</p>
                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>4 bed</span>
                            <span>3 bath</span>
                            <span>680 sqm</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-xs text-gray-500">15 Raglan Street, Mosman</p>
                          <p className="text-sm font-medium text-gray-900">$2,950,000 (Nov 2022)</p>
                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>4 bed</span>
                            <span>2 bath</span>
                            <span>710 sqm</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-xs text-gray-500">7 Harnett Avenue, Mosman</p>
                          <p className="text-sm font-medium text-gray-900">$2,680,000 (Feb 2023)</p>
                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>3 bed</span>
                            <span>3 bath</span>
                            <span>650 sqm</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Street-Level Analysis */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Street-Level Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Street Appeal</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Traffic Volume</span>
                              <span className="text-sm font-medium text-gray-900">Low</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Parking Availability</span>
                              <span className="text-sm font-medium text-gray-900">Good</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Street Width</span>
                              <span className="text-sm font-medium text-gray-900">Medium</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Proximity to Schools</span>
                              <span className="text-sm font-medium text-gray-900">0.8 km</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Proximity to Transport</span>
                              <span className="text-sm font-medium text-gray-900">0.5 km</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Proximity to Shops</span>
                              <span className="text-sm font-medium text-gray-900">1.2 km</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Proximity to Parks</span>
                              <span className="text-sm font-medium text-gray-900">0.3 km</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Suburb Analysis Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Zone Classification</h4>
                          <Badge className={getZoneBadgeColor(mockSuburbData.zone)}>
                            {mockSuburbData.zone.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Confidence</span>
                            <span className="text-sm font-medium">{mockSuburbData.confidence}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Risk Score</span>
                            <span className="text-sm font-medium">{mockSuburbData.riskScore}/100</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Market Cycle</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Position</span>
                            <span className="text-sm font-medium capitalize">{mockSuburbData.marketCycle.position}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Forecast</span>
                            <span className="text-sm font-medium">{mockSuburbData.marketCycle.forecast}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Confidence</span>
                            <span className="text-sm font-medium">{mockSuburbData.marketCycle.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Growth Profiles</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Suburb Growth Rate</span>
                            <span className="text-sm font-medium">7.90%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Forecast Growth Rate</span>
                            <span className="text-sm font-medium">5.90%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last Updated</span>
                            <span className="text-sm font-medium">Today</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparable Suburbs and ML Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Comparable Suburbs</h4>
                        <div className="flex flex-wrap gap-2">
                          {mockSuburbData.comparableSuburbs.map((suburb, index) => (
                            <Badge key={index} variant="outline" className="bg-white">
                              {suburb}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">ML System Insights</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Model Version</span>
                            <span className="text-sm font-medium">v1.0 (April 2025)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Data Points</span>
                            <span className="text-sm font-medium">~250,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last Updated</span>
                            <span className="text-sm font-medium">Today</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">Green Zone Classification</h3>
                          <p className="text-sm text-green-700 mt-1">
                            {mockSuburbData.suburb} is classified as a green zone with high confidence ({mockSuburbData.confidence}%).
                            Green zones are ideal for Equihome's no-monthly-payment loans due to strong property fundamentals,
                            low risk, and excellent growth prospects.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation guidance */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                          <Info className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-blue-900">Navigation Guide</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            You're viewing the Traffic Light Analysis overview. To explore more details:
                          </p>
                          <ul className="text-sm text-blue-700 mt-2 list-disc pl-5 space-y-1">
                            <li>Click the "Metrics" tab to view detailed metrics for the suburb</li>
                            <li>Click the "Forecast" tab to see growth projections</li>
                            <li>Click the "ML Decision" tab to see the machine learning recommendation</li>
                            <li>Click the "Decision Engine" tab to see the decision engine analysis</li>
                          </ul>
                          <p className="text-sm text-blue-700 mt-2">
                            After exploring the Traffic Light Analysis, click the "Portfolio" tab above to see how this loan impacts the overall portfolio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <EnhancedTrafficLightDashboard
                    trafficLightData={mockData.enhancedUI.trafficLight}
                    selectedSuburb={mockSuburbData.suburb}
                    onSuburbSelect={(suburb) => console.log(`Selected suburb: ${suburb}`)}
                  />
                </TabsContent>

                <TabsContent value="forecast">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Growth Forecast</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Short-Term (1 Year)</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              +{mockSuburbData.metrics.growth.forecast}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Confidence: {mockSuburbData.metrics.growth.confidence}%
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Medium-Term (3 Years)</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              +{(mockSuburbData.metrics.growth.forecast * 0.9 * 3).toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Confidence: {(mockSuburbData.metrics.growth.confidence * 0.9).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-center">
                            <span className="text-sm text-gray-500">Long-Term (10 Years)</span>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              +{(mockSuburbData.metrics.growth.forecast * 0.8 * 10).toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Confidence: {(mockSuburbData.metrics.growth.confidence * 0.7).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Market Cycle Forecast</h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-1/4 text-sm font-medium">Current Position:</div>
                          <div className="w-3/4">
                            <div className="relative">
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div className="absolute h-4 w-4 bg-blue-600 rounded-full top-1/2 transform -translate-y-1/2" style={{ left: '30%' }}></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Recovery</span>
                                <span>Growth</span>
                                <span>Peak</span>
                                <span>Correction</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-1/4 text-sm font-medium">12-Month Forecast:</div>
                          <div className="w-3/4">
                            <div className="relative">
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div className="absolute h-4 w-4 bg-green-600 rounded-full top-1/2 transform -translate-y-1/2" style={{ left: '45%' }}></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Recovery</span>
                                <span>Growth</span>
                                <span>Peak</span>
                                <span>Correction</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>
                          {mockSuburbData.suburb} is currently in the <strong>growth phase</strong> of its market cycle,
                          with strong fundamentals supporting continued price appreciation over the next 12 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ml-decision">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-900">ML Decision</h4>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {mockSuburbData.mlDecision.recommendation.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-1/4 text-sm font-medium">Confidence:</div>
                          <div className="w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${mockSuburbData.mlDecision.confidence}%` }}
                              ></div>
                            </div>
                            <div className="text-right text-xs text-gray-500 mt-1">
                              {mockSuburbData.mlDecision.confidence}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Decision Factors</h4>
                      <div className="space-y-3">
                        {mockSuburbData.mlDecision.factors.map((factor, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1/3 text-sm font-medium">{factor.name}:</div>
                            <div className="w-1/3">
                              <Badge className={
                                factor.impact === 'positive'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : factor.impact === 'negative'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }>
                                {factor.impact.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="w-1/3 text-sm text-gray-500">
                              Weight: {(factor.weight * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">ML Recommendation</h3>
                          <p className="text-sm text-green-700 mt-1">
                            The machine learning model strongly recommends investing in {mockSuburbData.suburb} with a confidence level of {mockSuburbData.mlDecision.confidence}%.
                            This suburb aligns perfectly with Equihome's investment criteria, showing strong growth potential, excellent liquidity, and low risk.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="decision-engine">
                  <MLDecisionEngine
                    suburbData={mockSuburbData}
                    propertyData={demoState.application.property}
                    borrowerData={demoState.application.borrower}
                  />
                </TabsContent>

                <TabsContent value="pipeline">
                  <Pipeline />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Analysis Date:</span> {new Date().toLocaleDateString()}
              </div>
              <Button variant="outline" onClick={resetAnalysis}>
                Reset Analysis
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Next Steps</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  The Traffic Light System has classified {mockSuburbData.suburb} as a green zone.
                  The next step is to run the Underwriting Decision Engine to evaluate the loan application.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
