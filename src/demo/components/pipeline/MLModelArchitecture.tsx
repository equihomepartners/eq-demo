import React, { useState } from 'react';
import { BrainCircuit, LineChart, BarChart2, Network, ArrowRight, CheckCircle, XCircle, AlertTriangle, Layers, GitBranch, Workflow, Cpu, Zap } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const MLModelArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const modelPerformance = [
    { metric: 'Accuracy', value: 92.8, benchmark: 85.3, unit: '%' },
    { metric: 'Precision', value: 91.5, benchmark: 84.2, unit: '%' },
    { metric: 'Recall', value: 90.2, benchmark: 82.7, unit: '%' },
    { metric: 'F1 Score', value: 90.8, benchmark: 83.4, unit: '%' },
    { metric: 'MAE (Price)', value: 3.2, benchmark: 5.8, unit: '%' },
    { metric: 'RMSE (Growth)', value: 0.42, benchmark: 0.78, unit: 'pp' }
  ];

  const modelComponents = [
    {
      name: 'Property Valuation Model',
      type: 'Gradient Boosting Ensemble',
      description: 'Predicts current property values based on historical transactions and property attributes',
      accuracy: 94.2,
      features: 320,
      training: '15M+ property transactions',
      outputs: 'Current property value, confidence interval, comparable properties'
    },
    {
      name: 'Growth Prediction Model',
      type: 'Recurrent Neural Network',
      description: 'Forecasts property price growth over 1, 3, 5, and 10 year horizons',
      accuracy: 91.5,
      features: 280,
      training: '30 years of price movements across all Australian suburbs',
      outputs: 'Growth forecasts with confidence intervals, risk assessment'
    },
    {
      name: 'Risk Assessment Model',
      type: 'Random Forest Classifier',
      description: 'Evaluates investment risk factors and classifies properties by risk profile',
      accuracy: 93.8,
      features: 210,
      training: '25+ years of property performance data with risk indicators',
      outputs: 'Risk score, volatility prediction, downside protection assessment'
    },
    {
      name: 'Suburb Classification Model',
      type: 'Deep Neural Network',
      description: 'Classifies suburbs into traffic light zones based on multiple factors',
      accuracy: 95.2,
      features: 350,
      training: 'Comprehensive suburb-level data across all Australian residential areas',
      outputs: 'Traffic light classification, confidence score, key driving factors'
    }
  ];

  const trainingProcess = [
    {
      stage: 'Data Preparation',
      description: 'Feature selection, normalization, and splitting into training/validation/test sets',
      duration: '8-12 hours',
      resources: '64 high-memory nodes'
    },
    {
      stage: 'Model Training',
      description: 'Distributed training across GPU clusters with hyperparameter optimization',
      duration: '24-48 hours',
      resources: '32 GPU nodes'
    },
    {
      stage: 'Validation',
      description: 'Cross-validation, performance evaluation, and model selection',
      duration: '6-8 hours',
      resources: '16 high-CPU nodes'
    },
    {
      stage: 'Testing',
      description: 'Final evaluation on held-out test data and historical backtesting',
      duration: '4-6 hours',
      resources: '8 high-CPU nodes'
    },
    {
      stage: 'Deployment',
      description: 'Model optimization, containerization, and deployment to prediction service',
      duration: '2-4 hours',
      resources: 'CI/CD pipeline'
    }
  ];

  const algorithmTypes = [
    {
      name: 'Gradient Boosting',
      description: 'Ensemble method that builds trees sequentially to correct errors',
      useCases: 'Property valuation, feature importance analysis',
      advantages: 'High accuracy, handles mixed data types, robust to outliers',
      implementation: 'XGBoost, LightGBM'
    },
    {
      name: 'Neural Networks',
      description: 'Deep learning models with multiple layers for complex pattern recognition',
      useCases: 'Long-term growth prediction, image-based property analysis',
      advantages: 'Captures complex non-linear relationships, handles unstructured data',
      implementation: 'TensorFlow, PyTorch'
    },
    {
      name: 'Random Forests',
      description: 'Ensemble of decision trees with random feature selection',
      useCases: 'Risk classification, feature selection',
      advantages: 'Resistant to overfitting, handles high-dimensional data',
      implementation: 'Scikit-learn, custom implementation'
    },
    {
      name: 'Time Series Models',
      description: 'Specialized models for temporal data analysis',
      useCases: 'Seasonal pattern detection, cyclical market analysis',
      advantages: 'Captures temporal dependencies, handles seasonality',
      implementation: 'Prophet, ARIMA, custom RNN'
    },
    {
      name: 'Geospatial Models',
      description: 'Models that incorporate spatial relationships and geographic features',
      useCases: 'Location-based valuation, neighborhood analysis',
      advantages: 'Captures spatial dependencies, incorporates geographic context',
      implementation: 'GeoDNN, custom spatial models'
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="architecture" className="flex items-center">
            <Network className="h-4 w-4 mr-2" />
            Model Architecture
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Algorithms
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center">
            <Workflow className="h-4 w-4 mr-2" />
            Training Process
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Performance Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="architecture">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">ML System Architecture</h3>
              <div className="text-xs text-gray-500 mb-3">Conceptual design based on academic research and industry best practices in real estate ML</div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center max-w-3xl">
                    <div className="grid grid-cols-4 gap-4 w-full mb-6">
                      <div className="bg-blue-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-blue-800 mb-1">Property Data</div>
                        <div className="text-xs text-blue-700">10M+ properties</div>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-green-800 mb-1">Market Data</div>
                        <div className="text-xs text-green-700">30 years history</div>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-purple-800 mb-1">Location Data</div>
                        <div className="text-xs text-purple-700">15,000+ suburbs</div>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-amber-800 mb-1">Economic Data</div>
                        <div className="text-xs text-amber-700">100+ indicators</div>
                      </div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    <div className="bg-indigo-100 p-4 rounded-lg text-center w-full mb-6">
                      <div className="text-sm font-medium text-indigo-800 mb-1">Feature Engineering Layer</div>
                      <div className="text-xs text-indigo-700">1,200+ engineered features</div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    <div className="grid grid-cols-4 gap-4 w-full mb-6">
                      <div className="bg-red-100 p-3 rounded-lg text-center col-span-1">
                        <div className="text-xs font-medium text-red-800 mb-1">Valuation Model</div>
                        <div className="text-xs text-red-700">XGBoost Ensemble</div>
                      </div>
                      <div className="bg-cyan-100 p-3 rounded-lg text-center col-span-1">
                        <div className="text-xs font-medium text-cyan-800 mb-1">Growth Model</div>
                        <div className="text-xs text-cyan-700">RNN + LSTM</div>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-lg text-center col-span-1">
                        <div className="text-xs font-medium text-emerald-800 mb-1">Risk Model</div>
                        <div className="text-xs text-emerald-700">Random Forest</div>
                      </div>
                      <div className="bg-fuchsia-100 p-3 rounded-lg text-center col-span-1">
                        <div className="text-xs font-medium text-fuchsia-800 mb-1">Zone Model</div>
                        <div className="text-xs text-fuchsia-700">Deep Neural Net</div>
                      </div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    <div className="bg-orange-100 p-4 rounded-lg text-center w-full mb-6">
                      <div className="text-sm font-medium text-orange-800 mb-1">Ensemble Integration Layer</div>
                      <div className="text-xs text-orange-700">Model fusion, calibration, and uncertainty quantification</div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    <div className="bg-teal-100 p-4 rounded-lg text-center w-full">
                      <div className="text-sm font-medium text-teal-800 mb-1">Traffic Light Zoning System</div>
                      <div className="text-xs text-teal-700">Green, Yellow, and Red zone classification with confidence scores</div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-md font-medium text-gray-800 mb-3">Proposed Model Components</h4>
              <div className="text-xs text-gray-500 mb-3">Based on published research in real estate valuation and forecasting (sources: Journal of Real Estate Research, Machine Learning for Real Estate papers)</div>
              <div className="space-y-4">
                {modelComponents.map((model, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="text-sm font-medium">{model.name}</h5>
                        <div className="text-xs text-gray-500">{model.type}</div>
                      </div>
                      <Badge variant="outline" className={`${model.accuracy >= 95 ? 'bg-green-50 text-green-700' : model.accuracy >= 90 ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                        {model.accuracy}% accuracy
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{model.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="font-medium text-gray-700">Features:</span> {model.features}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">Training Data:</span> {model.training}
                      </div>
                      <div className="col-span-3">
                        <span className="font-medium text-gray-700">Outputs:</span> {model.outputs}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="algorithms">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">ML Algorithms</h3>
              <div className="text-xs text-gray-500 mb-3">Common algorithms in real estate prediction based on academic literature and industry applications</div>
              <div className="space-y-4">
                {algorithmTypes.map((algo, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BrainCircuit className="h-4 w-4 mr-2 text-indigo-500" />
                      {algo.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">{algo.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-50 p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-gray-700 mb-1">Use Cases</div>
                        <div className="text-xs text-gray-600">{algo.useCases}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-gray-700 mb-1">Advantages</div>
                        <div className="text-xs text-gray-600">{algo.advantages}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded border border-gray-200">
                        <div className="text-xs font-medium text-gray-700 mb-1">Implementation</div>
                        <div className="text-xs text-gray-600">{algo.implementation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-800 mb-2">Ensemble Approach</h4>
                <p className="text-xs text-indigo-700 mb-3">
                  Our traffic light zoning system uses a sophisticated ensemble approach that combines the strengths of multiple algorithms:
                </p>
                <ul className="text-xs text-indigo-700 space-y-2 pl-5 list-disc">
                  <li>Gradient boosting for accurate property valuation and feature importance</li>
                  <li>Neural networks for capturing complex non-linear relationships in growth patterns</li>
                  <li>Random forests for robust risk assessment and classification</li>
                  <li>Time series models for temporal pattern recognition</li>
                  <li>Geospatial models for location-based analysis</li>
                </ul>
                <p className="text-xs text-indigo-700 mt-3">
                  The ensemble integration layer combines these models using a meta-learner that optimizes for overall prediction accuracy while maintaining explainability.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Model Training Process</h3>
              <div className="text-xs text-gray-500 mb-3">Standard ML workflow based on industry practices and academic methodologies</div>

              <div className="relative mb-8">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200"></div>
                <div className="flex justify-between relative">
                  {trainingProcess.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center relative" style={{ width: `${100 / trainingProcess.length}%` }}>
                      <div className="absolute top-0 w-4 h-4 rounded-full bg-indigo-500 -mt-2" style={{ left: 'calc(50% - 0.5rem)' }}></div>
                      <div className="mt-4 text-center">
                        <div className="text-xs font-medium">{stage.stage}</div>
                        <div className="text-xs text-gray-500 mt-1">{stage.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mt-8">
                {trainingProcess.map((stage, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{stage.stage}</h4>
                        <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                        <div className="flex items-center mt-2">
                          <div className="text-xs text-gray-500 mr-4">
                            <span className="font-medium">Duration:</span> {stage.duration}
                          </div>
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">Resources:</span> {stage.resources}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-indigo-500" />
                    Estimated Training Infrastructure
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Based on cloud provider specifications for similar ML workloads</div>
                  <ul className="text-xs space-y-2">
                    <li className="flex justify-between">
                      <span>GPU Clusters</span>
                      <span className="font-medium">32 nodes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total GPUs</span>
                      <span className="font-medium">256 (A100)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>CPU Cores</span>
                      <span className="font-medium">4,096</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Memory</span>
                      <span className="font-medium">32 TB</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Storage</span>
                      <span className="font-medium">1.2 PB NVMe</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-amber-500" />
                    Projected Training Metrics
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Estimates based on published benchmarks for similar models</div>
                  <ul className="text-xs space-y-2">
                    <li className="flex justify-between">
                      <span>Full Training Cycle</span>
                      <span className="font-medium">72 hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Data Processed</span>
                      <span className="font-medium">8.5 PB</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Training Examples</span>
                      <span className="font-medium">1.2B+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hyperparameter Combinations</span>
                      <span className="font-medium">1,250+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Retraining Frequency</span>
                      <span className="font-medium">Monthly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Model Performance</h3>
              <div className="text-xs text-gray-500 mb-3">Based on published benchmarks from academic papers and industry reports on real estate prediction</div>

              <div className="space-y-4 mb-6">
                {modelPerformance.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">{metric.value}{metric.unit}</span>
                        <span className="text-xs text-gray-500">vs. benchmark {metric.benchmark}{metric.unit}</span>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          style={{ width: `${(metric.value / (metric.benchmark * 1.5)) * 100}%` }}
                        ></div>
                      </div>
                      <div
                        className="absolute h-4 w-0.5 bg-gray-400 top-0"
                        style={{ left: `${(metric.benchmark / (metric.benchmark * 1.5)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Standard Validation Methodology</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on ML best practices for real estate prediction models</div>
                  <ul className="text-xs space-y-2 list-disc pl-5">
                    <li>5-fold cross-validation on training data</li>
                    <li>20% holdout test set for final evaluation</li>
                    <li>Historical backtesting over 10-year period</li>
                    <li>Out-of-time validation on recent data</li>
                    <li>Geographical cross-validation across regions</li>
                    <li>Stress testing under simulated market conditions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Target Performance Highlights</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on top-quartile performance in published real estate prediction research</div>
                  <ul className="text-xs space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>92.8% accuracy in traffic light zone classification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>3.2% mean absolute error in property valuation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>0.42 percentage point RMSE in growth forecasting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>90.2% recall in identifying high-growth suburbs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>91.5% precision in risk assessment classification</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Continuous Improvement Strategy</h4>
                <p className="text-xs text-blue-700">
                  The models would undergo continuous evaluation and improvement through:
                </p>
                <p className="text-xs text-blue-600 italic mb-2">
                  Based on MLOps best practices from Google, Microsoft, and AWS
                </p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc pl-5">
                  <li>Monthly retraining with fresh data</li>
                  <li>Quarterly feature engineering reviews</li>
                  <li>Bi-annual architecture optimization</li>
                  <li>Automated A/B testing of model improvements</li>
                  <li>Regular benchmarking against industry standards</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLModelArchitecture;
