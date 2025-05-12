import React, { useState } from 'react';
import { Layers, Search, ChevronDown, ChevronRight, ArrowRight, BarChart2, TrendingUp, Clock, MapPin, AlertTriangle, DollarSign, Home, Users, Building } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface FeatureCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  description: string;
  examples: Array<{
    name: string;
    description: string;
    importance: number;
    formula?: string;
    inputs?: string[];
  }>;
}

const FeatureEngineeringExplorer: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const featureCategories: FeatureCategory[] = [
    {
      id: 'property',
      name: 'Property Features',
      icon: <Home className="h-5 w-5" />,
      color: 'bg-blue-500',
      count: 320,
      description: 'Features derived from physical property attributes and characteristics',
      examples: [
        {
          name: 'Quality-Adjusted Size Index',
          description: 'Normalized property size adjusted for quality of finishes and amenities',
          importance: 92,
          formula: 'property_size * quality_factor * location_adjustment',
          inputs: ['Property size (sqm)', 'Quality rating (1-10)', 'Location premium factor']
        },
        {
          name: 'Renovation Impact Score',
          description: 'Estimated value impact of renovations based on age, type, and quality',
          importance: 85,
          formula: 'sum(renovation_value * age_decay_factor * quality_multiplier)',
          inputs: ['Renovation type', 'Renovation age', 'Quality assessment', 'Market segment']
        },
        {
          name: 'Architectural Premium Index',
          description: 'Premium associated with architectural style and design quality',
          importance: 78,
          formula: 'style_premium + design_quality_score + uniqueness_factor',
          inputs: ['Architectural style', 'Design quality assessment', 'Uniqueness in local market']
        }
      ]
    },
    {
      id: 'temporal',
      name: 'Temporal Features',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-green-500',
      count: 280,
      description: 'Time-based features capturing trends, seasonality, and cyclical patterns',
      examples: [
        {
          name: 'Cyclical Market Position',
          description: 'Position in the property market cycle based on historical patterns',
          importance: 94,
          formula: 'cycle_phase_detection(price_trends, volume_trends, time_since_peak)',
          inputs: ['30-year price history', 'Transaction volume trends', 'Previous cycle peaks and troughs']
        },
        {
          name: 'Seasonal Adjustment Factor',
          description: 'Adjustment for seasonal variations in property prices and demand',
          importance: 82,
          formula: 'month_factor * seasonal_strength * market_segment_adjustment',
          inputs: ['Month of year', 'Historical seasonal strength', 'Market segment seasonality']
        },
        {
          name: 'Momentum Indicator',
          description: 'Rate of change in prices over multiple time horizons',
          importance: 88,
          formula: 'weighted_average(price_change_3m, price_change_6m, price_change_12m)',
          inputs: ['3-month price change', '6-month price change', '12-month price change']
        }
      ]
    },
    {
      id: 'spatial',
      name: 'Spatial Features',
      icon: <MapPin className="h-5 w-5" />,
      color: 'bg-purple-500',
      count: 250,
      description: 'Location-based features capturing geographic relationships and proximity',
      examples: [
        {
          name: 'Accessibility Score',
          description: 'Composite measure of access to transportation, amenities, and services',
          importance: 91,
          formula: 'weighted_sum(transport_access, amenity_access, service_access)',
          inputs: ['Public transport proximity', 'Amenity density', 'Service availability']
        },
        {
          name: 'Neighborhood Quality Index',
          description: 'Comprehensive assessment of neighborhood quality and desirability',
          importance: 89,
          formula: 'weighted_average(school_quality, safety_score, amenity_score, green_space)',
          inputs: ['School ratings', 'Crime statistics', 'Amenity ratings', 'Green space proximity']
        },
        {
          name: 'Spatial Growth Potential',
          description: 'Estimated growth potential based on spatial development patterns',
          importance: 86,
          formula: 'development_trend + infrastructure_investment + spatial_demand_pressure',
          inputs: ['Development applications', 'Infrastructure projects', 'Migration patterns']
        }
      ]
    },
    {
      id: 'economic',
      name: 'Economic Features',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-amber-500',
      count: 210,
      description: 'Features derived from economic indicators and market conditions',
      examples: [
        {
          name: 'Interest Rate Sensitivity',
          description: 'Estimated price sensitivity to changes in interest rates',
          importance: 93,
          formula: 'regression_coefficient(price_changes, rate_changes) * current_rate_environment',
          inputs: ['Historical price changes', 'Interest rate changes', 'Current rate environment']
        },
        {
          name: 'Affordability Index',
          description: 'Measure of property affordability relative to local incomes',
          importance: 87,
          formula: 'median_price / (median_income * borrowing_capacity_factor)',
          inputs: ['Median property price', 'Median household income', 'Current lending conditions']
        },
        {
          name: 'Economic Resilience Score',
          description: 'Measure of how well property values withstand economic downturns',
          importance: 84,
          formula: 'weighted_sum(employment_diversity, income_stability, historical_downturn_performance)',
          inputs: ['Employment diversity', 'Income stability', 'Historical performance during downturns']
        }
      ]
    },
    {
      id: 'demographic',
      name: 'Demographic Features',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-red-500',
      count: 180,
      description: 'Features based on population characteristics and demographic trends',
      examples: [
        {
          name: 'Population Growth Momentum',
          description: 'Composite measure of population growth trends and projections',
          importance: 88,
          formula: 'weighted_average(historical_growth_5y, projected_growth_5y, migration_trends)',
          inputs: ['5-year historical growth', '5-year projected growth', 'Migration patterns']
        },
        {
          name: 'Demographic Demand Index',
          description: 'Estimated housing demand based on demographic composition',
          importance: 85,
          formula: 'sum(age_cohort_size * housing_preference_weight * income_factor)',
          inputs: ['Age cohort sizes', 'Housing preferences by cohort', 'Income levels by cohort']
        },
        {
          name: 'Gentrification Indicator',
          description: 'Measure of gentrification progress and potential',
          importance: 82,
          formula: 'weighted_sum(income_change, education_change, occupation_change, renovation_activity)',
          inputs: ['Income trends', 'Education level changes', 'Occupation shifts', 'Renovation activity']
        }
      ]
    },
    {
      id: 'risk',
      name: 'Risk Features',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-cyan-500',
      count: 160,
      description: 'Features that capture various risk factors affecting property values',
      examples: [
        {
          name: 'Volatility Index',
          description: 'Measure of historical price volatility and stability',
          importance: 90,
          formula: 'standard_deviation(monthly_returns_5y) * market_adjustment_factor',
          inputs: ['5-year monthly price returns', 'Market segment adjustment', 'Seasonal adjustment']
        },
        {
          name: 'Environmental Risk Score',
          description: 'Composite assessment of environmental risks affecting the property',
          importance: 83,
          formula: 'weighted_sum(flood_risk, fire_risk, climate_change_exposure, pollution_exposure)',
          inputs: ['Flood risk rating', 'Fire risk rating', 'Climate change exposure', 'Pollution levels']
        },
        {
          name: 'Market Liquidity Indicator',
          description: 'Measure of how quickly properties can be sold in the local market',
          importance: 86,
          formula: 'weighted_average(days_on_market, sales_volume_ratio, price_discount_trend)',
          inputs: ['Average days on market', 'Sales volume to listing ratio', 'Price discount trends']
        }
      ]
    }
  ];

  const topFeatures = [
    { name: 'Cyclical Market Position', category: 'Temporal', importance: 94 },
    { name: 'Interest Rate Sensitivity', category: 'Economic', importance: 93 },
    { name: 'Quality-Adjusted Size Index', category: 'Property', importance: 92 },
    { name: 'Accessibility Score', category: 'Spatial', importance: 91 },
    { name: 'Volatility Index', category: 'Risk', importance: 90 },
    { name: 'Neighborhood Quality Index', category: 'Spatial', importance: 89 },
    { name: 'Population Growth Momentum', category: 'Demographic', importance: 88 },
    { name: 'Momentum Indicator', category: 'Temporal', importance: 88 },
    { name: 'Affordability Index', category: 'Economic', importance: 87 },
    { name: 'Spatial Growth Potential', category: 'Spatial', importance: 86 }
  ];

  const totalFeatures = featureCategories.reduce((acc, category) => acc + category.count, 0);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleFeature = (id: string) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const filteredCategories = searchTerm
    ? featureCategories.map(category => ({
        ...category,
        examples: category.examples.filter(example =>
          example.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          example.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.examples.length > 0)
    : featureCategories;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Engineering Approach</h3>
          <div className="text-xs text-gray-500 mb-3">Conceptual design based on feature engineering techniques from real estate ML research</div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-700">{totalFeatures}</div>
              <div className="text-sm text-blue-600">Engineered Features</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-700">1,200+</div>
              <div className="text-sm text-green-600">Raw Data Points</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-700">6</div>
              <div className="text-sm text-purple-600">Feature Categories</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-amber-700">85%</div>
              <div className="text-sm text-amber-600">Feature Importance Coverage</div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Feature Categories</h4>
            {featureCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${category.color} p-1.5 rounded-md mr-3 text-white`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">{category.count} features</span>
                  <Badge variant="outline">{Math.round((category.count / totalFeatures) * 100)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Potential High-Impact Features</h3>
          <div className="text-xs text-gray-500 mb-3">Based on feature importance analysis in published real estate prediction research</div>
          <div className="space-y-3">
            {topFeatures.map((feature, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{index + 1}.</span>
                    <span className="text-sm">{feature.name}</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {feature.category}
                  </Badge>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      style={{ width: `${feature.importance}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">{feature.importance}% importance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Concept Explorer</h3>
        <div className="text-xs text-gray-500 mb-3">Representative examples of features that could be engineered from available data sources</div>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search features..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {filteredCategories.map((category) => (
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
                    <p className="text-xs text-gray-500">{category.count} features</p>
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
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-700">Example Features:</h5>
                    {category.examples.map((feature, index) => (
                      <div key={index} className="bg-white rounded border border-gray-200 overflow-hidden">
                        <div
                          className="flex items-center justify-between p-2 cursor-pointer"
                          onClick={() => toggleFeature(`${category.id}-${index}`)}
                        >
                          <div className="text-sm font-medium">{feature.name}</div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                              {feature.importance}% importance
                            </Badge>
                            {expandedFeature === `${category.id}-${index}` ?
                              <ChevronDown className="h-4 w-4 text-gray-500" /> :
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            }
                          </div>
                        </div>
                        {expandedFeature === `${category.id}-${index}` && (
                          <div className="p-2 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                            {feature.formula && (
                              <div className="mb-2">
                                <div className="text-xs font-medium text-gray-700">Formula:</div>
                                <div className="text-xs bg-gray-100 p-1.5 rounded font-mono">{feature.formula}</div>
                              </div>
                            )}
                            {feature.inputs && (
                              <div>
                                <div className="text-xs font-medium text-gray-700">Input Data:</div>
                                <ul className="text-xs text-gray-600 list-disc pl-5">
                                  {feature.inputs.map((input, idx) => (
                                    <li key={idx}>{input}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
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

export default FeatureEngineeringExplorer;
