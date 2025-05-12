import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Calculator,
  Sliders,
  BarChart2,
  TrendingUp,
  DollarSign,
  Percent,
  Shield,
  RefreshCw,
  Layers,
  Briefcase,
  Scale,
  Zap,
  ArrowRight,
  Network,
  Brain
} from 'lucide-react';
import { EnhancedCard } from '../ui';
import theme from '../../utils/theme';

interface SimulationLauncherProps {
  runSimulation: () => void;
  isSimulating: boolean;
}

const SimulationLauncher: React.FC<SimulationLauncherProps> = ({
  runSimulation,
  isSimulating
}) => {
  const [simulationParams, setSimulationParams] = useState({
    iterations: 10000,
    confidenceLevel: 95,
    timeHorizon: 10,
    marketScenario: 'base',
    stressTest: 'moderate'
  });

  const handleParamChange = (param: string, value: number | string) => {
    setSimulationParams({
      ...simulationParams,
      [param]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Simulation</CardTitle>
          <CardDescription>
            Run a Monte Carlo simulation to project the long-term performance of the portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Simulation Parameters</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Monte Carlo Iterations</label>
                      <span className="text-sm text-gray-500">{simulationParams.iterations.toLocaleString()}</span>
                    </div>
                    <select
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      value={simulationParams.iterations}
                      onChange={(e) => handleParamChange('iterations', parseInt(e.target.value))}
                    >
                      <option value="1000">1,000</option>
                      <option value="5000">5,000</option>
                      <option value="10000">10,000</option>
                      <option value="20000">20,000</option>
                      <option value="50000">50,000</option>
                    </select>
                    <p className="text-xs text-gray-500">Higher values increase accuracy but take longer to compute</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Confidence Level</label>
                      <span className="text-sm text-gray-500">{simulationParams.confidenceLevel}%</span>
                    </div>
                    <select
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      value={simulationParams.confidenceLevel}
                      onChange={(e) => handleParamChange('confidenceLevel', parseInt(e.target.value))}
                    >
                      <option value="80">80%</option>
                      <option value="85">85%</option>
                      <option value="90">90%</option>
                      <option value="95">95%</option>
                      <option value="99">99%</option>
                    </select>
                    <p className="text-xs text-gray-500">Statistical confidence level for projections</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Time Horizon (Years)</label>
                      <span className="text-sm text-gray-500">{simulationParams.timeHorizon}</span>
                    </div>
                    <select
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      value={simulationParams.timeHorizon}
                      onChange={(e) => handleParamChange('timeHorizon', parseInt(e.target.value))}
                    >
                      <option value="1">1 year</option>
                      <option value="3">3 years</option>
                      <option value="5">5 years</option>
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                    </select>
                    <p className="text-xs text-gray-500">Projection period for the simulation</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Market Scenario</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['base', 'bull', 'bear'].map((scenario) => (
                        <Button
                          key={scenario}
                          variant={simulationParams.marketScenario === scenario ? "default" : "outline"}
                          onClick={() => handleParamChange('marketScenario', scenario)}
                          className="capitalize"
                        >
                          {scenario}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Base case, bullish, or bearish market assumptions</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Stress Test Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['mild', 'moderate', 'severe'].map((level) => (
                        <Button
                          key={level}
                          variant={simulationParams.stressTest === level ? "default" : "outline"}
                          onClick={() => handleParamChange('stressTest', level)}
                          className="capitalize"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Severity of stress scenarios to test</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EnhancedCard variant="elevated" className="md:col-span-1">
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <Network className="h-4 w-4 mr-2 text-purple-500" />
                    Traffic Light Integration
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The simulation engine incorporates Traffic Light zoning data to model geographic risk factors and growth patterns.
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Green zones modeled with higher growth, lower volatility</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Yellow zones with moderate growth, medium volatility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs">Red zones with lower growth, higher volatility</span>
                    </div>
                  </div>
                </div>
              </EnhancedCard>

              <EnhancedCard variant="elevated" className="md:col-span-1">
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-blue-500" />
                    Simulation Methodology
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our advanced simulation engine uses multiple methodologies to provide comprehensive insights:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 list-disc pl-5 mt-auto">
                    <li>Monte Carlo simulation with {simulationParams.iterations.toLocaleString()} iterations</li>
                    <li>Modern Portfolio Theory and efficient frontier analysis</li>
                    <li>Stress testing across multiple economic scenarios</li>
                    <li>Sensitivity analysis for key risk factors</li>
                    <li>Correlation modeling between geographic zones</li>
                  </ul>
                </div>
              </EnhancedCard>

              <EnhancedCard variant="elevated" className="md:col-span-1">
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                    <Sliders className="h-4 w-4 mr-2 text-amber-500" />
                    Key Parameters
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The simulation incorporates hundreds of parameters, including:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 list-disc pl-5 mt-auto">
                    <li>Property growth rates by traffic light zone</li>
                    <li>Interest rate scenarios and yield curves</li>
                    <li>Default and early exit probabilities</li>
                    <li>Reinvestment assumptions and cash drag</li>
                    <li>Management and performance fee structures</li>
                    <li>Macroeconomic variables and correlations</li>
                  </ul>
                </div>
              </EnhancedCard>
            </div>

            <div className="text-center py-8">
              <Calculator className="h-16 w-16 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Portfolio Simulation Engine</h3>
              <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
                The simulation engine will process hundreds of variables and parameters including market data, Traffic Light System metrics,
                macro-economic variables, individual portfolio characteristics, and business model parameters.
              </p>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Using Monte Carlo methods with {simulationParams.iterations.toLocaleString()}+ iterations, Modern Portfolio Theory, and efficient frontier analysis,
                the engine will generate comprehensive insights on how this loan affects the entire portfolio's performance,
                risk profile, and optimal allocation strategy.
              </p>
              <Button
                onClick={runSimulation}
                disabled={isSimulating}
                size="lg"
              >
                {isSimulating ? 'Running Complex Simulation...' : 'Run Advanced Simulation'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationLauncher;
