import React, { useState } from 'react';
import { Database, Globe, Home, TrendingUp, Users, Building, School, AlertTriangle, Droplet, Wind, Umbrella, FileText, Briefcase, DollarSign, Zap, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface DataSourceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  sourceCount: number;
  dataPoints: string;
  timespan: string;
  examples: Array<{
    name: string;
    provider: string;
    frequency: string;
    description: string;
    dataPoints: string;
    expanded?: boolean;
  }>;
}

const DataSourcesVisualization: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const dataCategories: DataSourceCategory[] = [
    {
      id: 'macro',
      name: 'Macroeconomic',
      icon: <Globe className="h-5 w-5" />,
      color: 'bg-blue-500',
      description: 'National and global economic indicators that impact property markets',
      sourceCount: 42,
      dataPoints: '1.2B+',
      timespan: '30 years',
      examples: [
        {
          name: 'Interest Rates',
          provider: 'Reserve Bank of Australia',
          frequency: 'Daily',
          description: 'Cash rate, mortgage rates, bond yields, and yield curves',
          dataPoints: '250M+',
        },
        {
          name: 'GDP Growth',
          provider: 'Australian Bureau of Statistics',
          frequency: 'Quarterly',
          description: 'National and state-level GDP growth rates and components',
          dataPoints: '180M+',
        },
        {
          name: 'Inflation Metrics',
          provider: 'Australian Bureau of Statistics',
          frequency: 'Monthly',
          description: 'CPI, PPI, wage growth, and inflation expectations',
          dataPoints: '320M+',
        },
      ],
    },
    {
      id: 'property',
      name: 'Property Data',
      icon: <Home className="h-5 w-5" />,
      color: 'bg-green-500',
      description: 'Historical property transactions, valuations, and physical characteristics',
      sourceCount: 68,
      dataPoints: '3.8B+',
      timespan: '30 years',
      examples: [
        {
          name: 'AVM History',
          provider: 'PropTrack & Proprietary',
          frequency: 'Daily',
          description: 'Automated valuation model history for 10M+ properties across Australia',
          dataPoints: '1.2B+',
        },
        {
          name: 'Property Transactions',
          provider: 'Land Registry Services',
          frequency: 'Daily',
          description: 'Sale prices, dates, and transaction details for all property sales',
          dataPoints: '850M+',
        },
        {
          name: 'Property Attributes',
          provider: 'Multiple Sources',
          frequency: 'Continuous',
          description: 'Bedrooms, bathrooms, land size, building age, renovations, etc.',
          dataPoints: '750M+',
        },
      ],
    },
    {
      id: 'demographic',
      name: 'Demographics',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-500',
      description: 'Population trends, household formation, and demographic shifts',
      sourceCount: 35,
      dataPoints: '920M+',
      timespan: '25 years',
      examples: [
        {
          name: 'Census Data',
          provider: 'Australian Bureau of Statistics',
          frequency: '5 Years',
          description: 'Comprehensive demographic data at suburb and SA1 level',
          dataPoints: '420M+',
        },
        {
          name: 'Migration Patterns',
          provider: 'Department of Home Affairs',
          frequency: 'Quarterly',
          description: 'International and interstate migration flows',
          dataPoints: '180M+',
        },
        {
          name: 'Household Formation',
          provider: 'Multiple Sources',
          frequency: 'Annual',
          description: 'Household size, composition, and formation rates',
          dataPoints: '150M+',
        },
      ],
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: <Building className="h-5 w-5" />,
      color: 'bg-amber-500',
      description: 'Transportation, utilities, and public infrastructure developments',
      sourceCount: 29,
      dataPoints: '680M+',
      timespan: '20 years',
      examples: [
        {
          name: 'Transport Projects',
          provider: 'State Infrastructure Agencies',
          frequency: 'Monthly',
          description: 'Major transport infrastructure projects and timelines',
          dataPoints: '120M+',
        },
        {
          name: 'Accessibility Metrics',
          provider: 'Proprietary Analysis',
          frequency: 'Quarterly',
          description: 'Travel time to CBD, schools, hospitals, and amenities',
          dataPoints: '280M+',
        },
        {
          name: 'Utility Infrastructure',
          provider: 'Utility Companies',
          frequency: 'Quarterly',
          description: 'Water, power, and telecommunications infrastructure quality',
          dataPoints: '150M+',
        },
      ],
    },
    {
      id: 'education',
      name: 'Education',
      icon: <School className="h-5 w-5" />,
      color: 'bg-cyan-500',
      description: 'School performance, catchment areas, and educational facilities',
      sourceCount: 18,
      dataPoints: '420M+',
      timespan: '15 years',
      examples: [
        {
          name: 'School Performance',
          provider: 'Education Departments',
          frequency: 'Annual',
          description: 'NAPLAN results, HSC/VCE outcomes, and school rankings',
          dataPoints: '180M+',
        },
        {
          name: 'Catchment Boundaries',
          provider: 'Education Departments',
          frequency: 'Annual',
          description: 'School catchment area boundaries and changes over time',
          dataPoints: '85M+',
        },
        {
          name: 'Educational Facilities',
          provider: 'Multiple Sources',
          frequency: 'Quarterly',
          description: 'Location and quality of educational facilities',
          dataPoints: '65M+',
        },
      ],
    },
    {
      id: 'risk',
      name: 'Risk Factors',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-red-500',
      description: 'Natural hazards, crime statistics, and environmental risks',
      sourceCount: 24,
      dataPoints: '560M+',
      timespan: '25 years',
      examples: [
        {
          name: 'Natural Hazards',
          provider: 'Geoscience Australia',
          frequency: 'Continuous',
          description: 'Flood, fire, earthquake, and other natural hazard risk data',
          dataPoints: '220M+',
        },
        {
          name: 'Crime Statistics',
          provider: 'State Police Departments',
          frequency: 'Monthly',
          description: 'Crime rates and types at suburb and local area levels',
          dataPoints: '180M+',
        },
        {
          name: 'Environmental Risks',
          provider: 'Environmental Agencies',
          frequency: 'Quarterly',
          description: 'Pollution, contamination, and environmental quality metrics',
          dataPoints: '120M+',
        },
      ],
    },
  ];

  const totalSources = dataCategories.reduce((acc, category) => acc + category.sourceCount, 0);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleSource = (id: string) => {
    setExpandedSource(expandedSource === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Potential Data Universe</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-700">{totalSources}</div>
              <div className="text-sm text-blue-600">Potential Data Sources</div>
              <div className="text-xs text-blue-500 mt-1">Based on industry availability</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-700">10M+</div>
              <div className="text-sm text-green-600">Properties in Australia</div>
              <div className="text-xs text-green-500 mt-1">ABS Census & Property Data</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-700">30</div>
              <div className="text-sm text-purple-600">Years of Available History</div>
              <div className="text-xs text-purple-500 mt-1">Public & Commercial Records</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-amber-700">8B+</div>
              <div className="text-sm text-amber-600">Estimated Data Points</div>
              <div className="text-xs text-amber-500 mt-1">Based on data density analysis</div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Data Categories</h4>
            {dataCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${category.color} p-1.5 rounded-md mr-3`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">{category.sourceCount} sources</span>
                  <Badge variant="outline">{category.dataPoints}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Target Data Quality Metrics</h3>
          <div className="text-xs text-gray-500 mb-3">Based on industry benchmarks and published data quality standards</div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Geographic Coverage</span>
                <span className="text-sm text-gray-500">95-99%</span>
              </div>
              <Progress value={98.7} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Target coverage of all residential areas in Australia</p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Historical Depth</span>
                <span className="text-sm text-gray-500">90-95%</span>
              </div>
              <Progress value={92.3} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Estimated completeness of 30-year historical data</p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Data Freshness</span>
                <span className="text-sm text-gray-500">95-99%</span>
              </div>
              <Progress value={99.1} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Industry standard for data update frequency</p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Feature Completeness</span>
                <span className="text-sm text-gray-500">90-95%</span>
              </div>
              <Progress value={94.8} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Expected availability of key property features</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Potential Data Sources Explorer</h3>
        <div className="text-xs text-gray-500 mb-3">Representative examples of data that would be integrated into our pipeline</div>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search data sources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {dataCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div
                className={`flex items-center justify-between p-3 cursor-pointer ${expandedCategory === category.id ? 'bg-gray-50' : 'bg-white'}`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center">
                  <div className={`${category.color} p-1.5 rounded-md mr-3 text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{category.name}</h4>
                    <p className="text-xs text-gray-500">{category.sourceCount} sources · {category.dataPoints} data points</p>
                  </div>
                </div>
                <div>
                  {expandedCategory === category.id ?
                    <ChevronDown className="h-4 w-4 text-gray-500" /> :
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  }
                </div>
              </div>
              {expandedCategory === category.id && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <div className="text-xs text-gray-500">Sources</div>
                      <div className="text-sm font-medium">{category.sourceCount}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <div className="text-xs text-gray-500">Data Points</div>
                      <div className="text-sm font-medium">{category.dataPoints}</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-200">
                      <div className="text-xs text-gray-500">History</div>
                      <div className="text-sm font-medium">{category.timespan}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-700">Example Sources:</h5>
                    {category.examples.map((example, index) => (
                      <div key={index} className="bg-white rounded border border-gray-200 overflow-hidden">
                        <div
                          className="flex items-center justify-between p-2 cursor-pointer"
                          onClick={() => toggleSource(`${category.id}-${index}`)}
                        >
                          <div className="text-sm font-medium">{example.name}</div>
                          <div>
                            {expandedSource === `${category.id}-${index}` ?
                              <ChevronDown className="h-4 w-4 text-gray-500" /> :
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            }
                          </div>
                        </div>
                        {expandedSource === `${category.id}-${index}` && (
                          <div className="p-2 bg-gray-50 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-medium">Provider:</span> {example.provider}
                              </div>
                              <div>
                                <span className="font-medium">Frequency:</span> {example.frequency}
                              </div>
                              <div className="col-span-2">
                                <span className="font-medium">Description:</span> {example.description}
                              </div>
                              <div className="col-span-2">
                                <span className="font-medium">Data Points:</span> {example.dataPoints}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSourcesVisualization;
