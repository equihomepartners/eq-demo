import React, { useState } from 'react';
import { Server, Database, Cpu, Network, ArrowRight, Clock, BarChart2, Shield, Zap, Activity, Globe, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const PredictionServiceDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const serviceMetrics = [
    { name: 'Availability', value: 99.99, target: 99.95, unit: '%', status: 'good' },
    { name: 'Latency (p95)', value: 120, target: 150, unit: 'ms', status: 'good' },
    { name: 'Throughput', value: 1250, target: 1000, unit: 'req/s', status: 'good' },
    { name: 'Error Rate', value: 0.02, target: 0.05, unit: '%', status: 'good' },
    { name: 'Cache Hit Rate', value: 92.5, target: 90, unit: '%', status: 'good' },
    { name: 'Model Freshness', value: 12, target: 30, unit: 'days', status: 'good' }
  ];

  const requestTypes = [
    { name: 'Property Valuation', percentage: 35, avgLatency: 85, volume: '450K/day' },
    { name: 'Growth Prediction', percentage: 25, avgLatency: 110, volume: '320K/day' },
    { name: 'Risk Assessment', percentage: 20, avgLatency: 95, volume: '260K/day' },
    { name: 'Zone Classification', percentage: 15, avgLatency: 75, volume: '190K/day' },
    { name: 'Portfolio Analysis', percentage: 5, avgLatency: 180, volume: '65K/day' }
  ];

  const infrastructureComponents = [
    {
      name: 'API Gateway',
      description: 'Handles request routing, authentication, and rate limiting',
      instances: 24,
      technology: 'AWS API Gateway / Kong',
      metrics: {
        throughput: '2,500 req/s',
        latency: '5ms',
        availability: '99.999%'
      }
    },
    {
      name: 'Prediction Servers',
      description: 'Stateless servers that process prediction requests',
      instances: 64,
      technology: 'Kubernetes / TensorFlow Serving',
      metrics: {
        throughput: '1,800 req/s',
        latency: '85ms',
        availability: '99.99%'
      }
    },
    {
      name: 'Feature Store',
      description: 'Low-latency access to pre-computed features',
      instances: 16,
      technology: 'Redis / Feast',
      metrics: {
        throughput: '15,000 req/s',
        latency: '2ms',
        availability: '99.995%'
      }
    },
    {
      name: 'Model Registry',
      description: 'Stores and serves trained models',
      instances: 8,
      technology: 'MLflow / Custom Registry',
      metrics: {
        models: '120+ active',
        versions: '850+ total',
        size: '1.2TB'
      }
    },
    {
      name: 'Monitoring System',
      description: 'Tracks service health and model performance',
      instances: 12,
      technology: 'Prometheus / Grafana',
      metrics: {
        metrics: '15,000+',
        alerts: '250+ rules',
        dashboards: '45+'
      }
    }
  ];

  const monitoringMetrics = [
    { name: 'Request Volume', current: '1,285 req/s', trend: '+5% week-over-week', status: 'normal' },
    { name: 'Error Rate', current: '0.02%', trend: '-15% week-over-week', status: 'good' },
    { name: 'P95 Latency', current: '120ms', trend: 'Stable', status: 'normal' },
    { name: 'CPU Utilization', current: '62%', trend: '+3% week-over-week', status: 'normal' },
    { name: 'Memory Usage', current: '58%', trend: 'Stable', status: 'normal' },
    { name: 'Model Drift', current: '0.8%', trend: '+0.1% week-over-week', status: 'normal' }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="architecture" className="flex items-center">
            <Network className="h-4 w-4 mr-2" />
            Service Architecture
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="flex items-center">
            <Server className="h-4 w-4 mr-2" />
            Infrastructure
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="architecture">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Proposed Prediction Service Architecture</h3>
              <div className="text-xs text-gray-500 mb-3">Conceptual design based on industry best practices for high-performance ML serving</div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center max-w-3xl">
                    {/* Client Layer */}
                    <div className="grid grid-cols-3 gap-4 w-full mb-6">
                      <div className="bg-blue-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-blue-800 mb-1">Web Applications</div>
                        <div className="text-xs text-blue-700">User interfaces</div>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-blue-800 mb-1">Mobile Apps</div>
                        <div className="text-xs text-blue-700">iOS and Android</div>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-blue-800 mb-1">Partner APIs</div>
                        <div className="text-xs text-blue-700">External systems</div>
                      </div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    {/* API Gateway */}
                    <div className="bg-green-100 p-4 rounded-lg text-center w-full mb-6">
                      <div className="text-sm font-medium text-green-800 mb-1">API Gateway</div>
                      <div className="text-xs text-green-700">Authentication, rate limiting, request routing</div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    {/* Service Layer */}
                    <div className="grid grid-cols-3 gap-4 w-full mb-6">
                      <div className="bg-purple-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-purple-800 mb-1">Prediction Service</div>
                        <div className="text-xs text-purple-700">Model inference</div>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-purple-800 mb-1">Feature Service</div>
                        <div className="text-xs text-purple-700">Feature retrieval</div>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-purple-800 mb-1">Caching Service</div>
                        <div className="text-xs text-purple-700">Result caching</div>
                      </div>
                    </div>

                    <div className="w-full h-8 flex justify-center items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 transform rotate-90" />
                    </div>

                    {/* Data Layer */}
                    <div className="grid grid-cols-3 gap-4 w-full mb-6">
                      <div className="bg-amber-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-amber-800 mb-1">Feature Store</div>
                        <div className="text-xs text-amber-700">Pre-computed features</div>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-amber-800 mb-1">Model Registry</div>
                        <div className="text-xs text-amber-700">Trained models</div>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg text-center">
                        <div className="text-xs font-medium text-amber-800 mb-1">Results Cache</div>
                        <div className="text-xs text-amber-700">Cached predictions</div>
                      </div>
                    </div>

                    {/* Monitoring Layer (Horizontal) */}
                    <div className="bg-red-100 p-3 rounded-lg text-center w-full">
                      <div className="text-xs font-medium text-red-800 mb-1">Monitoring & Observability</div>
                      <div className="text-xs text-red-700">Metrics, logging, alerting, and model drift detection</div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-md font-medium text-gray-800 mb-3">Conceptual Request Flow</h4>
              <div className="text-xs text-gray-500 mb-3">Based on standard ML serving architectures from cloud providers</div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Client Request</h5>
                    <p className="text-xs text-gray-600">Client sends a prediction request (e.g., property valuation, growth forecast)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">API Gateway Processing</h5>
                    <p className="text-xs text-gray-600">Request is authenticated, validated, and routed to the appropriate service</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Cache Check</h5>
                    <p className="text-xs text-gray-600">System checks if the result is already cached (92.5% hit rate)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Feature Retrieval</h5>
                    <p className="text-xs text-gray-600">Required features are retrieved from the Feature Store</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Model Inference</h5>
                    <p className="text-xs text-gray-600">Features are passed to the appropriate ML model for inference</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Result Processing</h5>
                    <p className="text-xs text-gray-600">Raw model outputs are processed, formatted, and enriched</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Response Delivery</h5>
                    <p className="text-xs text-gray-600">Final result is returned to the client (avg. 120ms end-to-end)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Service Performance</h3>
              <div className="text-xs text-gray-500 mb-3">Based on industry benchmarks for similar ML serving workloads in cloud environments</div>

              <div className="space-y-4 mb-6">
                {serviceMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">{metric.value}{metric.unit}</span>
                        {metric.status === 'good' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : metric.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            metric.status === 'good' ? 'bg-green-500' :
                            metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{
                            width: metric.name === 'Error Rate' || metric.name === 'Latency (p95)' || metric.name === 'Model Freshness'
                              ? `${100 - (metric.value / metric.target * 100)}%`
                              : `${(metric.value / metric.target) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div
                        className="absolute h-4 w-0.5 bg-gray-400 top-0"
                        style={{
                          left: `${100}%`
                        }}
                      ></div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-md font-medium text-gray-800 mb-3">Anticipated Request Types</h4>
              <div className="text-xs text-gray-500 mb-3">Projected distribution based on typical real estate prediction workloads</div>
              <div className="space-y-3">
                {requestTypes.map((type, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.percentage}% of traffic</div>
                    </div>
                    <div className="relative pt-1 mb-2">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <div>Avg. Latency: {type.avgLatency}ms</div>
                      <div>Volume: {type.volume}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Target Performance Highlights</h4>
                <div className="text-xs text-blue-600 italic mb-2">Based on published capabilities of enterprise ML serving platforms</div>
                <ul className="text-xs text-blue-700 space-y-2 pl-5 list-disc">
                  <li>99.9%+ service availability with geographic redundancy (industry standard SLA)</li>
                  <li>Sub-150ms p95 latency (typical for optimized ML serving)</li>
                  <li>1,000+ requests per second sustained throughput (based on cloud benchmarks)</li>
                  <li>90%+ cache hit rate reducing load on prediction servers (typical for property data)</li>
                  <li>Auto-scaling to handle traffic spikes (standard cloud capability)</li>
                  <li>Regular model updates with zero-downtime deployment (MLOps best practice)</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Proposed Infrastructure Components</h3>
              <div className="text-xs text-gray-500 mb-3">Based on reference architectures from major cloud providers for ML serving at scale</div>

              <div className="space-y-4">
                {infrastructureComponents.map((component, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-md mr-3 flex-shrink-0 ${
                        index === 0 ? 'bg-green-100 text-green-700' :
                        index === 1 ? 'bg-purple-100 text-purple-700' :
                        index === 2 ? 'bg-amber-100 text-amber-700' :
                        index === 3 ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {index === 0 ? <Globe className="h-5 w-5" /> :
                         index === 1 ? <Cpu className="h-5 w-5" /> :
                         index === 2 ? <Database className="h-5 w-5" /> :
                         index === 3 ? <Server className="h-5 w-5" /> :
                         <Activity className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{component.name}</h4>
                          <Badge variant="outline">{component.instances} instances</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 mb-2">{component.description}</p>
                        <div className="text-xs text-gray-500 mb-2">Technology: {component.technology}</div>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(component.metrics).map(([key, value], idx) => (
                            <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-200">
                              <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                              <div className="text-xs font-medium">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Reliability Design Principles
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Based on cloud reliability engineering best practices</div>
                  <ul className="text-xs space-y-2 list-disc pl-5">
                    <li>Multi-region deployment with automatic failover</li>
                    <li>Kubernetes-based auto-scaling and self-healing</li>
                    <li>Circuit breakers and graceful degradation</li>
                    <li>Redundant data storage with real-time replication</li>
                    <li>Comprehensive backup and disaster recovery</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-amber-500" />
                    Performance Optimization Strategies
                  </h4>
                  <div className="text-xs text-gray-500 mb-2">Based on ML serving optimization techniques from industry publications</div>
                  <ul className="text-xs space-y-2 list-disc pl-5">
                    <li>Multi-tiered caching strategy (92.5% hit rate)</li>
                    <li>Model optimization for inference speed</li>
                    <li>Asynchronous processing for non-critical operations</li>
                    <li>Optimized feature store for sub-millisecond lookups</li>
                    <li>Content delivery network for static resources</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Proposed Monitoring Dashboard</h3>
              <div className="text-xs text-gray-500 mb-3">Conceptual design based on standard observability practices for ML systems</div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {monitoringMetrics.map((metric, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">{metric.name}</div>
                      {metric.status === 'good' ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Good</Badge>
                      ) : metric.status === 'normal' ? (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Normal</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>
                      )}
                    </div>
                    <div className="text-lg font-bold">{metric.current}</div>
                    <div className="text-xs text-gray-500 mt-1">{metric.trend}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Monitoring System Design</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on enterprise observability platforms (Datadog, New Relic, Prometheus)</div>
                  <ul className="text-xs space-y-2">
                    <li className="flex justify-between">
                      <span>Metrics Collected</span>
                      <span className="font-medium">15,000+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alert Rules</span>
                      <span className="font-medium">250+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dashboards</span>
                      <span className="font-medium">45+</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Log Retention</span>
                      <span className="font-medium">90 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Metric Resolution</span>
                      <span className="font-medium">10 seconds</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Model Monitoring Approach</h4>
                  <div className="text-xs text-gray-500 mb-2">Based on MLOps best practices for model performance tracking</div>
                  <ul className="text-xs space-y-2">
                    <li className="flex justify-between">
                      <span>Prediction Accuracy</span>
                      <span className="font-medium">92.8%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Feature Drift</span>
                      <span className="font-medium">0.8%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Model Freshness</span>
                      <span className="font-medium">12 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Outlier Detection</span>
                      <span className="font-medium">99.5% accuracy</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Feedback Loop</span>
                      <span className="font-medium">Real-time</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Alerting & Response Strategy</h4>
                <p className="text-xs text-blue-700 mb-3">
                  The proposed monitoring system would enable rapid detection and response to issues:
                </p>
                <p className="text-xs text-blue-600 italic mb-2">
                  Based on SRE practices from Google, Netflix, and other tech leaders
                </p>
                <ul className="text-xs text-blue-700 space-y-2 pl-5 list-disc">
                  <li>24/7 automated monitoring with intelligent alerting</li>
                  <li>Tiered alert severity with appropriate response SLAs</li>
                  <li>Automated remediation for common issues</li>
                  <li>On-call rotation with 5-minute response time for critical alerts</li>
                  <li>Post-incident analysis and continuous improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictionServiceDiagram;
