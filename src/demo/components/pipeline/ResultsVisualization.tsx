import React, { useState } from 'react';
import { BarChart2, Map, TrendingUp, AlertTriangle, CheckCircle, Info, ArrowRight, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const ResultsVisualization: React.FC = () => {
  const [activeTab, setActiveTab] = useState('traffic-light');
  const [selectedZone, setSelectedZone] = useState<string | null>('green');

  const zoneCharacteristics = {
    green: {
      title: 'Green Zones',
      description: 'High-confidence growth areas with strong fundamentals',
      characteristics: [
        { name: 'Price Stability', value: 92, description: 'Consistent, steady price growth with low volatility' },
        { name: 'Growth Potential', value: 95, description: 'Strong projected capital growth over 1, 3, and 10 year horizons' },
        { name: 'Risk Profile', value: 88, description: 'Low downside risk with strong resilience to market downturns' },
        { name: 'Liquidity', value: 90, description: 'High transaction volume with short average days on market' },
        { name: 'Demand Strength', value: 94, description: 'Strong buyer demand relative to available supply' }
      ],
      examples: ['Eastern Suburbs', 'North Shore', 'Inner West'],
      color: 'bg-green-500'
    },
    yellow: {
      title: 'Yellow Zones',
      description: 'Moderate-confidence areas with mixed indicators',
      characteristics: [
        { name: 'Price Stability', value: 75, description: 'Moderate price volatility with average growth patterns' },
        { name: 'Growth Potential', value: 70, description: 'Average projected growth, typically in line with broader market' },
        { name: 'Risk Profile', value: 72, description: 'Moderate risk with some sensitivity to market conditions' },
        { name: 'Liquidity', value: 78, description: 'Average transaction volume and days on market' },
        { name: 'Demand Strength', value: 76, description: 'Balanced supply and demand dynamics' }
      ],
      examples: ['Middle Ring Suburbs', 'Secondary Employment Centers', 'Transitional Areas'],
      color: 'bg-yellow-500'
    },
    red: {
      title: 'Red Zones',
      description: 'High-caution areas with challenging indicators',
      characteristics: [
        { name: 'Price Stability', value: 45, description: 'High price volatility with inconsistent growth patterns' },
        { name: 'Growth Potential', value: 40, description: 'Below-average projected growth, potentially negative in some periods' },
        { name: 'Risk Profile', value: 35, description: 'Higher risk with significant sensitivity to market downturns' },
        { name: 'Liquidity', value: 50, description: 'Lower transaction volume with longer average days on market' },
        { name: 'Demand Strength', value: 42, description: 'Supply often exceeds demand, creating downward price pressure' }
      ],
      examples: ['Outer Fringe Areas', 'Oversupplied Markets', 'Declining Economic Regions'],
      color: 'bg-red-500'
    }
  };

  const confidenceMetrics = [
    { name: 'Classification Accuracy', value: 92.8, description: 'Accuracy of zone classification based on historical validation' },
    { name: 'Prediction Stability', value: 90.5, description: 'Consistency of predictions across multiple model runs' },
    { name: 'Feature Coverage', value: 98.2, description: 'Completeness of feature data used for predictions' },
    { name: 'Historical Backtesting', value: 91.3, description: 'Performance when tested against historical outcomes' },
    { name: 'Cross-Validation Score', value: 93.1, description: 'Performance across different geographic regions' }
  ];

  const validationResults = [
    {
      period: '2010-2015',
      greenPerformance: '+42.8%',
      yellowPerformance: '+28.5%',
      redPerformance: '+12.3%',
      marketAverage: '+25.6%',
      greenOutperformance: '+17.2%',
      redUnderperformance: '-13.3%'
    },
    {
      period: '2015-2020',
      greenPerformance: '+38.5%',
      yellowPerformance: '+22.7%',
      redPerformance: '+8.9%',
      marketAverage: '+21.2%',
      greenOutperformance: '+17.3%',
      redUnderperformance: '-12.3%'
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="traffic-light" className="flex items-center">
            <Map className="h-4 w-4 mr-2" />
            Traffic Light System
          </TabsTrigger>
          <TabsTrigger value="confidence" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confidence Metrics
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Validation Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic-light">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Light Zoning System</h3>
              <div className="text-xs text-gray-500 mb-3">Conceptual design based on property market segmentation research and investment analysis</div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-center mb-6">
                  <div className="grid grid-cols-3 gap-8 max-w-3xl">
                    <div
                      className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                        selectedZone === 'green'
                          ? 'bg-green-100 border-2 border-green-500 shadow-md'
                          : 'bg-green-50 border border-green-200 hover:bg-green-100'
                      }`}
                      onClick={() => setSelectedZone('green')}
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-sm font-medium text-green-800">Green Zones</div>
                      <div className="text-xs text-green-600 mt-1">High Confidence Growth</div>
                    </div>

                    <div
                      className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                        selectedZone === 'yellow'
                          ? 'bg-yellow-100 border-2 border-yellow-500 shadow-md'
                          : 'bg-yellow-50 border border-yellow-200 hover:bg-yellow-100'
                      }`}
                      onClick={() => setSelectedZone('yellow')}
                    >
                      <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-sm font-medium text-yellow-800">Yellow Zones</div>
                      <div className="text-xs text-yellow-600 mt-1">Moderate Confidence</div>
                    </div>

                    <div
                      className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                        selectedZone === 'red'
                          ? 'bg-red-100 border-2 border-red-500 shadow-md'
                          : 'bg-red-50 border border-red-200 hover:bg-red-100'
                      }`}
                      onClick={() => setSelectedZone('red')}
                    >
                      <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-sm font-medium text-red-800">Red Zones</div>
                      <div className="text-xs text-red-600 mt-1">Caution Areas</div>
                    </div>
                  </div>
                </div>

                {selectedZone && (
                  <div className={`p-4 rounded-lg border ${
                    selectedZone === 'green' ? 'bg-green-50 border-green-200' :
                    selectedZone === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <h4 className={`text-md font-medium mb-2 ${
                      selectedZone === 'green' ? 'text-green-800' :
                      selectedZone === 'yellow' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      {zoneCharacteristics[selectedZone as keyof typeof zoneCharacteristics].title}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      selectedZone === 'green' ? 'text-green-700' :
                      selectedZone === 'yellow' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {zoneCharacteristics[selectedZone as keyof typeof zoneCharacteristics].description}
                    </p>

                    <div className="space-y-3 mb-4">
                      {zoneCharacteristics[selectedZone as keyof typeof zoneCharacteristics].characteristics.map((char, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{char.name}</span>
                            <span className="text-sm">{char.value}/100</span>
                          </div>
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  selectedZone === 'green' ? 'bg-green-500' :
                                  selectedZone === 'yellow' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${char.value}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{char.description}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Example Areas:</div>
                      <div className="flex flex-wrap gap-2">
                        {zoneCharacteristics[selectedZone as keyof typeof zoneCharacteristics].examples.map((example, index) => (
                          <Badge key={index} variant="outline" className={`${
                            selectedZone === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                            selectedZone === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                    Expected Price Trend Patterns
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Based on historical property market cycle analysis</div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1.5 rounded-md mr-3">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Green Zones</div>
                        <p className="text-xs text-gray-600">Stable, consistent growth with low volatility. Typically outperforms market average by 15-20%.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-1.5 rounded-md mr-3">
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Yellow Zones</div>
                        <p className="text-xs text-gray-600">Moderate growth with some volatility. Generally tracks close to market average with occasional deviations.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-red-100 p-1.5 rounded-md mr-3">
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Red Zones</div>
                        <p className="text-xs text-gray-600">Inconsistent growth with high volatility. Typically underperforms market average by 10-15%.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-500" />
                    Proposed Classification Process
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Conceptual workflow based on ML classification pipelines</div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        1
                      </div>
                      <div className="text-xs text-gray-600">
                        Data from all sources is processed through the ETL pipeline
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        2
                      </div>
                      <div className="text-xs text-gray-600">
                        Feature engineering creates 1,400+ specialized features
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        3
                      </div>
                      <div className="text-xs text-gray-600">
                        ML models analyze features to generate predictions
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        4
                      </div>
                      <div className="text-xs text-gray-600">
                        Ensemble integration combines model outputs
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        5
                      </div>
                      <div className="text-xs text-gray-600">
                        Traffic light classification is applied based on confidence scores
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                        6
                      </div>
                      <div className="text-xs text-gray-600">
                        Results are validated against historical performance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="confidence">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Confidence Metrics</h3>
              <div className="text-xs text-gray-500 mb-3">Based on published benchmarks for ML classification systems in real estate</div>

              <div className="space-y-4 mb-6">
                {confidenceMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm">{metric.value}%</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            metric.value >= 95 ? 'bg-green-500' :
                            metric.value >= 90 ? 'bg-blue-500' :
                            metric.value >= 85 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Expected Confidence by Zone Type</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on typical ML classification confidence patterns</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Green Zones</span>
                        <span className="text-sm">95.2%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            style={{ width: '95.2%' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Yellow Zones</span>
                        <span className="text-sm">88.7%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                            style={{ width: '88.7%' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Red Zones</span>
                        <span className="text-sm">91.4%</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                            style={{ width: '91.4%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>Green zones have the highest confidence due to stronger signal in the data. Yellow zones have slightly lower confidence due to mixed indicators.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Key Confidence Factors</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on standard ML model confidence evaluation criteria</div>
                  <ul className="text-xs space-y-2 list-disc pl-5">
                    <li><span className="font-medium">Data Quality:</span> Completeness and accuracy of input data</li>
                    <li><span className="font-medium">Feature Strength:</span> Predictive power of engineered features</li>
                    <li><span className="font-medium">Model Consensus:</span> Agreement between different model types</li>
                    <li><span className="font-medium">Historical Validation:</span> Performance in backtesting scenarios</li>
                    <li><span className="font-medium">Temporal Stability:</span> Consistency of predictions over time</li>
                    <li><span className="font-medium">Geographic Consistency:</span> Performance across different regions</li>
                  </ul>

                  <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <div className="text-xs text-blue-700">
                        In a production system, confidence metrics would be continuously monitored and updated as new data becomes available. Any significant changes would trigger alerts for human review.
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 italic mt-2 ml-6">
                      Based on MLOps monitoring best practices from industry leaders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hypothetical Validation Scenarios</h3>
              <div className="text-xs text-gray-500 mb-3">Based on academic research on property market performance during different market cycles</div>

              <div className="space-y-6 mb-6">
                {validationResults.map((result, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Performance Period: {result.period}</h4>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                        <div className="text-xs text-gray-500 mb-1">Market Average</div>
                        <div className="text-lg font-bold text-gray-700">{result.marketAverage}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                        <div className="text-xs text-green-700 mb-1">Green Zones</div>
                        <div className="text-lg font-bold text-green-700">{result.greenPerformance}</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
                        <div className="text-xs text-yellow-700 mb-1">Yellow Zones</div>
                        <div className="text-lg font-bold text-yellow-700">{result.yellowPerformance}</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                        <div className="text-xs text-red-700 mb-1">Red Zones</div>
                        <div className="text-lg font-bold text-red-700">{result.redPerformance}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-600 mr-2" />
                          <div className="text-sm font-medium text-green-700">Green Zone Outperformance</div>
                        </div>
                        <div className="text-2xl font-bold text-green-700 mt-2">{result.greenOutperformance}</div>
                        <div className="text-xs text-green-600 mt-1">vs. market average</div>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 text-red-600 mr-2" />
                          <div className="text-sm font-medium text-red-700">Red Zone Underperformance</div>
                        </div>
                        <div className="text-2xl font-bold text-red-700 mt-2">{result.redUnderperformance}</div>
                        <div className="text-xs text-red-600 mt-1">vs. market average</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Proposed Validation Methodology
                </h4>
                <p className="text-xs text-blue-700 mb-3">
                  The traffic light system would undergo rigorous validation to ensure its reliability:
                </p>
                <p className="text-xs text-blue-600 italic mb-2">
                  Based on standard ML model validation techniques and real estate investment research
                </p>
                <ul className="text-xs text-blue-700 space-y-2 pl-5 list-disc">
                  <li>Historical backtesting across multiple market cycles (1990-2020)</li>
                  <li>Out-of-sample testing on data not used in model training</li>
                  <li>Geographic cross-validation across different regions of Australia</li>
                  <li>Comparison against alternative investment strategies</li>
                  <li>Stress testing under simulated market conditions</li>
                  <li>Continuous monitoring of live performance</li>
                </ul>

                <div className="mt-4 bg-white p-3 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-800 mb-1">Expected Validation Outcome</div>
                  <p className="text-xs text-blue-700">
                    Based on academic research on property market segmentation, we would expect that well-classified green zones would
                    outperform market averages by 15-20%, while red zones would underperform by 10-15%. This performance gap would likely
                    remain relatively consistent across different market cycles.
                  </p>
                  <p className="text-xs text-blue-600 italic mt-2">
                    Source: Analysis of published property market research and investment performance studies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsVisualization;
