import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Database, Server, Cpu, LineChart, BarChart2, Network, ArrowRight, Info, BrainCircuit, Layers, GitBranch, Workflow } from 'lucide-react';
import DataSourcesVisualization from './DataSourcesVisualization';
import ETLProcessVisualization from './ETLProcessVisualization';
import MLModelArchitecture from './MLModelArchitecture';
import FeatureEngineeringExplorer from './FeatureEngineeringExplorer';
import PredictionServiceDiagram from './PredictionServiceDiagram';
import ResultsVisualization from './ResultsVisualization';

const DataSciencePipeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Science Pipeline</h2>
          <p className="text-gray-500">The sophisticated ML pipeline powering our Traffic Light investment thesis</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900">Investment Thesis Foundation</h3>
            <p className="text-sm text-blue-700 mt-1">
              Before analyzing specific properties through our Traffic Light System, we would build and maintain a sophisticated
              data science pipeline designed to process hundreds of data sources to generate our proprietary zoning map. This
              pipeline would form the foundation of our investment thesis and operate independently of individual loan applications.
            </p>
            <p className="text-xs text-blue-600 mt-2">
              The following visualization represents our target architecture based on industry standards and academic research.
              Performance metrics shown are derived from published benchmarks in similar domains.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Science & Machine Learning Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="data-sources" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Data Sources
              </TabsTrigger>
              <TabsTrigger value="etl-process" className="flex items-center">
                <Workflow className="h-4 w-4 mr-2" />
                ETL Process
              </TabsTrigger>
              <TabsTrigger value="ml-models" className="flex items-center">
                <BrainCircuit className="h-4 w-4 mr-2" />
                ML Models
              </TabsTrigger>
              <TabsTrigger value="feature-engineering" className="flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                Feature Engineering
              </TabsTrigger>
              <TabsTrigger value="prediction-service" className="flex items-center">
                <Server className="h-4 w-4 mr-2" />
                Prediction Service
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-2" />
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data Science Pipeline Overview</h3>
                  <div className="text-xs text-gray-500 mb-3">Conceptual architecture based on industry best practices for real estate ML systems</div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center max-w-3xl">
                        {/* Pipeline Visualization */}
                        <div className="w-full grid grid-cols-5 gap-4 mb-6">
                          <div className="bg-blue-100 p-3 rounded-lg text-center">
                            <div className="text-xs font-medium text-blue-800 mb-1">Data Sources</div>
                            <div className="text-xs text-blue-700">400+ sources</div>
                          </div>
                          <div className="bg-purple-100 p-3 rounded-lg text-center">
                            <div className="text-xs font-medium text-purple-800 mb-1">ETL Pipeline</div>
                            <div className="text-xs text-purple-700">Data processing</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded-lg text-center">
                            <div className="text-xs font-medium text-green-800 mb-1">Feature Engineering</div>
                            <div className="text-xs text-green-700">1,400+ features</div>
                          </div>
                          <div className="bg-amber-100 p-3 rounded-lg text-center">
                            <div className="text-xs font-medium text-amber-800 mb-1">ML Models</div>
                            <div className="text-xs text-amber-700">Ensemble approach</div>
                          </div>
                          <div className="bg-red-100 p-3 rounded-lg text-center">
                            <div className="text-xs font-medium text-red-800 mb-1">Traffic Light Zones</div>
                            <div className="text-xs text-red-700">Classification</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Data Collection & Integration</h5>
                        <p className="text-xs text-gray-600">
                          We would integrate 400+ data sources including property transactions, demographic data, economic indicators,
                          infrastructure projects, and more. These sources would be continuously updated to ensure freshness.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">ETL Processing</h5>
                        <p className="text-xs text-gray-600">
                          Our ETL pipeline would clean, normalize, and transform raw data into a consistent format.
                          Quality checks would ensure data integrity throughout the process.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Feature Engineering</h5>
                        <p className="text-xs text-gray-600">
                          We would create 1,400+ specialized features that capture complex patterns in property markets,
                          including temporal, spatial, economic, and demographic factors.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Machine Learning Models</h5>
                        <p className="text-xs text-gray-600">
                          An ensemble of ML models would analyze these features to generate predictions about property
                          performance, risk factors, and growth potential.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Traffic Light Classification</h5>
                        <p className="text-xs text-gray-600">
                          Based on model outputs, suburbs would be classified into green, yellow, and red zones
                          according to their investment potential and risk profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-blue-800">Explore Each Component</div>
                        <p className="text-xs text-blue-700 mt-1">
                          Use the tabs above to explore each component of our data science pipeline in detail.
                          You'll see how data flows through the system, how features are engineered, and how
                          our ML models generate the traffic light classifications.
                        </p>
                        <p className="text-xs text-blue-600 italic mt-2">
                          Note: The visualizations represent our target architecture based on industry standards and academic research.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data-sources">
              <DataSourcesVisualization />
            </TabsContent>

            <TabsContent value="etl-process">
              <ETLProcessVisualization />
            </TabsContent>

            <TabsContent value="ml-models">
              <MLModelArchitecture />
            </TabsContent>

            <TabsContent value="feature-engineering">
              <FeatureEngineeringExplorer />
            </TabsContent>

            <TabsContent value="prediction-service">
              <PredictionServiceDiagram />
            </TabsContent>

            <TabsContent value="results">
              <ResultsVisualization />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Pipeline Last Updated:</span> January 10, 2020
          </div>
          <Button variant="outline" onClick={() => setActiveTab('overview')}>
            Reset View
          </Button>
        </CardFooter>
      </Card>

      {/* Navigation guidance */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900">Navigation Guide</h3>
            <p className="text-sm text-blue-700 mt-1">
              Now that you've seen how our data science pipeline works, you can proceed to the Traffic Light Analysis
              to see how this investment thesis is applied to specific properties and suburbs.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Click the "Traffic Light" tab above to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSciencePipeline;
