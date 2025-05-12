import React, { useState } from 'react';
import { Database, ArrowRight, Filter, RefreshCw, Server, CheckCircle, XCircle, AlertTriangle, Workflow, GitMerge, GitBranch, GitCommit } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const ETLProcessVisualization: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const etlStages = [
    {
      id: 'extraction',
      name: 'Data Extraction',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-blue-500',
      description: 'Automated systems pull data from hundreds of sources using APIs, web scraping, and direct database connections',
      metrics: {
        throughput: '1.2TB/day',
        reliability: '99.98%',
        sources: '216 active connectors'
      },
      processes: [
        'API Integration (42%)',
        'Database Connectors (28%)',
        'Web Scraping (18%)',
        'File Ingestion (12%)'
      ],
      technologies: ['Apache Airflow', 'Python', 'Kafka', 'Custom Connectors']
    },
    {
      id: 'validation',
      name: 'Data Validation',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'bg-green-500',
      description: 'Automated validation checks ensure data quality, completeness, and consistency before processing',
      metrics: {
        qualityScore: '98.7%',
        rejectionRate: '1.3%',
        validationRules: '1,850+'
      },
      processes: [
        'Schema Validation (25%)',
        'Range Checking (20%)',
        'Consistency Verification (30%)',
        'Anomaly Detection (25%)'
      ],
      technologies: ['Great Expectations', 'Deequ', 'Custom Validators', 'ML Anomaly Detectors']
    },
    {
      id: 'transformation',
      name: 'Data Transformation',
      icon: <RefreshCw className="h-5 w-5" />,
      color: 'bg-purple-500',
      description: 'Raw data is cleaned, normalized, and transformed into standardized formats for analysis',
      metrics: {
        transformations: '3,200+ operations',
        processingTime: '4.2 hours (full run)',
        dataReduction: '68% compression'
      },
      processes: [
        'Cleaning & Normalization (35%)',
        'Feature Extraction (25%)',
        'Temporal Alignment (20%)',
        'Spatial Processing (20%)'
      ],
      technologies: ['Apache Spark', 'dbt', 'Python', 'SQL', 'PostGIS']
    },
    {
      id: 'enrichment',
      name: 'Data Enrichment',
      icon: <GitMerge className="h-5 w-5" />,
      color: 'bg-amber-500',
      description: 'Data from different sources is combined and enriched to create comprehensive property profiles',
      metrics: {
        joinOperations: '850+ per day',
        enrichmentSources: '42 reference datasets',
        featureExpansion: '3.2x original features'
      },
      processes: [
        'Entity Resolution (30%)',
        'Spatial Joins (25%)',
        'Temporal Correlation (25%)',
        'Feature Generation (20%)'
      ],
      technologies: ['Apache Spark', 'PostGIS', 'Custom Entity Resolution', 'Feature Store']
    },
    {
      id: 'loading',
      name: 'Data Loading',
      icon: <Server className="h-5 w-5" />,
      color: 'bg-cyan-500',
      description: 'Processed data is loaded into specialized data stores optimized for different access patterns',
      metrics: {
        dataVolume: '850GB per day',
        loadTime: '1.8 hours (full load)',
        compressionRatio: '4.2:1'
      },
      processes: [
        'Dimensional Modeling (30%)',
        'Partitioning Strategy (25%)',
        'Indexing Optimization (25%)',
        'Versioning & Lineage (20%)'
      ],
      technologies: ['Snowflake', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Feature Store']
    }
  ];

  const dataQualityMetrics = [
    { name: 'Completeness', value: 99.2, target: 99.0 },
    { name: 'Accuracy', value: 98.7, target: 98.0 },
    { name: 'Consistency', value: 99.5, target: 99.0 },
    { name: 'Timeliness', value: 99.8, target: 99.5 },
    { name: 'Uniqueness', value: 99.9, target: 99.5 },
    { name: 'Validity', value: 98.5, target: 98.0 }
  ];

  const transformationExamples = [
    {
      name: 'Property Price Normalization',
      description: 'Converting raw property prices to standardized metrics accounting for inflation, property size, and features',
      before: '$1,250,000 for 3-bedroom house sold on 12/05/2019',
      after: 'Normalized price: $12,500/sqm, Indexed value: 142.3 (2020 base), Quality-adjusted: $1,180,000'
    },
    {
      name: 'Address Standardization',
      description: 'Converting various address formats to a standardized structure with geocoding',
      before: 'Flat 3, 25 Smith St, Mosman NSW',
      after: 'Unit 3, 25 Smith Street, Mosman, NSW 2088, Australia | Lat: -33.8267, Long: 151.2431'
    },
    {
      name: 'Time Series Alignment',
      description: 'Aligning time series data from different sources to consistent intervals',
      before: 'Monthly price data (ABS), Weekly rental data (REA), Quarterly economic indicators',
      after: 'All metrics aligned to monthly intervals with appropriate interpolation and seasonal adjustment'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">ETL Pipeline Architecture</h3>
        <div className="text-xs text-gray-500 mb-3">Conceptual design based on industry best practices and modern data engineering principles</div>
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {etlStages.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex flex-col items-center cursor-pointer transition-all ${selectedStage === stage.id ? 'scale-110' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => setSelectedStage(stage.id)}
              >
                <div className={`${stage.color} text-white p-3 rounded-full mb-2`}>
                  {stage.icon}
                </div>
                <div className="text-xs font-medium text-center">{stage.name}</div>
                {index < etlStages.length - 1 && (
                  <ArrowRight className="absolute h-4 w-4 text-gray-400" style={{
                    left: `${(index * 25) + 16}%`,
                    top: '15%'
                  }} />
                )}
              </div>
            ))}
          </div>

          {selectedStage ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {etlStages.filter(stage => stage.id === selectedStage).map(stage => (
                <div key={stage.id}>
                  <div className="flex items-center mb-3">
                    <div className={`${stage.color} text-white p-2 rounded-md mr-3`}>
                      {stage.icon}
                    </div>
                    <h4 className="text-lg font-medium">{stage.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{stage.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(stage.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white p-3 rounded border border-gray-200">
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Process Breakdown</h5>
                      <div className="space-y-2">
                        {stage.processes.map((process, index) => {
                          const [name, percentage] = process.split('(');
                          const percentValue = percentage ? parseInt(percentage.replace('%)','')) : 0;

                          return (
                            <div key={index}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{name}</span>
                                <span>{percentage ? `(${percentage}` : ''}</span>
                              </div>
                              <Progress value={percentValue} className="h-1.5" />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {stage.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="bg-white">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-500">Select a stage above to see details</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Target Data Quality Metrics</h3>
          <div className="text-xs text-gray-500 mb-3">Based on industry standards (DAMA DMBOK) and academic research on data quality</div>
          <div className="space-y-4">
            {dataQualityMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">{metric.value}%</span>
                    {metric.value >= metric.target ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        metric.value >= metric.target ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                  <div
                    className="absolute h-4 w-0.5 bg-red-500 top-0"
                    style={{ left: `${metric.target}%` }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">Target: {metric.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Transformation Examples</h3>
          <div className="space-y-4">
            {transformationExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <h4 className="text-sm font-medium">{example.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{example.description}</p>
                </div>
                <div className="p-3">
                  <div className="mb-2">
                    <div className="text-xs text-gray-500 mb-1">Raw Data:</div>
                    <div className="text-sm p-2 bg-gray-100 rounded">{example.before}</div>
                  </div>
                  <div className="flex items-center justify-center my-2">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Transformed Data:</div>
                    <div className="text-sm p-2 bg-blue-50 rounded border border-blue-100">{example.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Proposed ETL Infrastructure</h3>
        <div className="text-xs text-gray-500 mb-3">Specifications based on cloud provider capabilities (AWS, GCP, Azure) for similar workloads</div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-500" />
              Processing Infrastructure
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Processing Nodes</span>
                <span className="font-medium">128</span>
              </li>
              <li className="flex justify-between">
                <span>Total CPU Cores</span>
                <span className="font-medium">2,048</span>
              </li>
              <li className="flex justify-between">
                <span>Total RAM</span>
                <span className="font-medium">16 TB</span>
              </li>
              <li className="flex justify-between">
                <span>Processing Capacity</span>
                <span className="font-medium">3.2 PB/day</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Database className="h-4 w-4 mr-2 text-green-500" />
              Storage Infrastructure
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Raw Data Storage</span>
                <span className="font-medium">8.5 PB</span>
              </li>
              <li className="flex justify-between">
                <span>Processed Data</span>
                <span className="font-medium">2.1 PB</span>
              </li>
              <li className="flex justify-between">
                <span>Daily Ingest</span>
                <span className="font-medium">12 TB</span>
              </li>
              <li className="flex justify-between">
                <span>Backup Capacity</span>
                <span className="font-medium">15 PB</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Workflow className="h-4 w-4 mr-2 text-purple-500" />
              Orchestration
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span>Daily Workflows</span>
                <span className="font-medium">850+</span>
              </li>
              <li className="flex justify-between">
                <span>Avg. Completion Time</span>
                <span className="font-medium">4.2 hours</span>
              </li>
              <li className="flex justify-between">
                <span>Success Rate</span>
                <span className="font-medium">99.8%</span>
              </li>
              <li className="flex justify-between">
                <span>Auto-recovery Rate</span>
                <span className="font-medium">98.2%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETLProcessVisualization;
