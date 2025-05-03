/**
 * Mock data for the Simulation Dashboard
 */
export const simulationMockData = {
  // Simulation results
  results: {
    expectedIrr: 16.8,
    previousExpectedIrr: 16.2,
    irrChange: 3.7,
    projectedValue: 32500000,
    previousProjectedValue: 30800000,
    valueChange: 5.5,
    confidenceLevel: 85.2,
    previousConfidenceLevel: 82.5,
    confidenceChange: 3.3,
    riskScore: 28.5,
    previousRiskScore: 30.2,
    riskChange: -5.6,
  },

  // Efficient frontier data
  efficientFrontier: {
    portfolios: [
      { risk: 10, return: 8, name: "Portfolio 1" },
      { risk: 12, return: 9, name: "Portfolio 2" },
      { risk: 15, return: 10.5, name: "Portfolio 3" },
      { risk: 18, return: 12, name: "Portfolio 4" },
      { risk: 22, return: 13.5, name: "Portfolio 5" },
      { risk: 25, return: 14.2, name: "Portfolio 6" },
      { risk: 30, return: 15.5, name: "Portfolio 7" },
      { risk: 35, return: 16.2, name: "Portfolio 8" },
      { risk: 40, return: 16.8, name: "Portfolio 9" },
      { risk: 45, return: 17.2, name: "Portfolio 10" },
    ],
    frontier: [
      { risk: 15, return: 11.2 },
      { risk: 18, return: 12.8 },
      { risk: 22, return: 14.5 },
      { risk: 25, return: 15.8 },
      { risk: 30, return: 16.9 },
      { risk: 35, return: 17.5 },
      { risk: 40, return: 17.8 },
    ],
    currentPortfolio: { risk: 28.5, return: 16.8, name: "Current Portfolio" },
    optimalPortfolio: { risk: 25, return: 15.8, name: "Optimal Portfolio" },
  },

  // Monte Carlo simulation results
  monteCarloResults: [
    { year: 1, p10: 26500000, p25: 27200000, p50: 28000000, p75: 28800000, p90: 29500000 },
    { year: 2, p10: 27800000, p25: 28900000, p50: 30000000, p75: 31100000, p90: 32200000 },
    { year: 3, p10: 29100000, p25: 30600000, p50: 32000000, p75: 33400000, p90: 34900000 },
    { year: 4, p10: 30400000, p25: 32300000, p50: 34000000, p75: 35700000, p90: 37600000 },
    { year: 5, p10: 31700000, p25: 34000000, p50: 36000000, p75: 38000000, p90: 40300000 },
    { year: 6, p10: 33000000, p25: 35700000, p50: 38000000, p75: 40300000, p90: 43000000 },
    { year: 7, p10: 34300000, p25: 37400000, p50: 40000000, p75: 42600000, p90: 45700000 },
    { year: 8, p10: 35600000, p25: 39100000, p50: 42000000, p75: 44900000, p90: 48400000 },
    { year: 9, p10: 36900000, p25: 40800000, p50: 44000000, p75: 47200000, p90: 51100000 },
    { year: 10, p10: 38200000, p25: 42500000, p50: 46000000, p75: 49500000, p90: 53800000 },
  ],

  // Sensitivity analysis
  sensitivityAnalysis: [
    { parameter: 'Property Growth Rate', impact: 3.2 },
    { parameter: 'Interest Rate', impact: -1.8 },
    { parameter: 'Default Rate', impact: -1.5 },
    { parameter: 'Loan Term', impact: 1.2 },
    { parameter: 'Origination Fee', impact: 0.8 },
    { parameter: 'Management Fee', impact: -0.7 },
    { parameter: 'Early Exit Rate', impact: -0.5 },
    { parameter: 'Appreciation Fee', impact: 2.5 },
  ],

  // Portfolio allocation
  allocation: {
    greenZone: 65,
    yellowZone: 30,
    redZone: 5,
  },

  // Scenario comparison
  scenarioComparison: [
    { scenario: 'Base Case', irr: 16.8 },
    { scenario: 'Bull Market', irr: 19.5 },
    { scenario: 'Bear Market', irr: 12.2 },
    { scenario: 'High Inflation', irr: 15.3 },
    { scenario: 'Low Inflation', irr: 17.2 },
    { scenario: 'Recession', irr: 10.5 },
    { scenario: 'Housing Boom', irr: 21.8 },
  ],

  // Simulation parameters
  parameters: [
    {
      name: 'Property Growth Rate',
      value: 5.8,
      type: 'percentage',
      description: 'Annual property value appreciation rate',
      category: 'Market',
    },
    {
      name: 'Interest Rate',
      value: 5.0,
      type: 'percentage',
      description: 'Simple interest rate on loans',
      category: 'Loan',
    },
    {
      name: 'Default Rate',
      value: 0.5,
      type: 'percentage',
      description: 'Expected loan default rate',
      category: 'Portfolio',
    },
    {
      name: 'Average Loan Term',
      value: 7.2,
      type: 'years',
      description: 'Average time until loan exit',
      category: 'Portfolio',
    },
    {
      name: 'Origination Fee',
      value: 3.0,
      type: 'percentage',
      description: 'Fee charged at loan origination',
      category: 'Loan',
    },
    {
      name: 'Management Fee',
      value: 2.0,
      type: 'percentage',
      description: 'Annual management fee',
      category: 'Fund',
    },
    {
      name: 'Performance Fee',
      value: 20.0,
      type: 'percentage',
      description: 'Performance fee on returns above hurdle',
      category: 'Fund',
    },
    {
      name: 'Hurdle Rate',
      value: 6.0,
      type: 'percentage',
      description: 'Minimum return before performance fees',
      category: 'Fund',
    },
    {
      name: 'Early Exit Rate',
      value: 15.0,
      type: 'percentage',
      description: 'Percentage of loans exiting before term',
      category: 'Portfolio',
    },
    {
      name: 'Average LTV',
      value: 18.5,
      type: 'percentage',
      description: 'Average loan-to-value ratio',
      category: 'Loan',
    },
    {
      name: 'Appreciation Fee',
      value: 18.5,
      type: 'percentage',
      description: 'Fee on property appreciation',
      category: 'Loan',
    },
    {
      name: 'Fund Size',
      value: 25000000,
      type: 'currency',
      description: 'Total fund size',
      category: 'Fund',
    },
  ],
};

export default simulationMockData;
