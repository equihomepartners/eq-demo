/**
 * Mock data for the Decision Dashboard
 */
export const decisionMockData = {
  // Decision score and thresholds
  score: 82,
  thresholds: {
    approval: 75,
    review: 60,
    maxLtv: 20,
    minIrr: 15,
    maxRisk: 30,
  },
  
  // Loan details
  ltv: 18.5,
  expectedIrr: 16.8,
  riskScore: 24,
  
  // Decision factors
  factors: [
    {
      factor: 'Property Location',
      score: 92,
      weight: 25,
      impact: 23.0,
      notes: 'Green zone suburb with high liquidity and growth potential',
    },
    {
      factor: 'Borrower Credit',
      score: 88,
      weight: 20,
      impact: 17.6,
      notes: 'Excellent credit history with no defaults',
    },
    {
      factor: 'Loan-to-Value Ratio',
      score: 85,
      weight: 15,
      impact: 12.8,
      notes: 'LTV within acceptable range',
    },
    {
      factor: 'Property Condition',
      score: 80,
      weight: 10,
      impact: 8.0,
      notes: 'Property in good condition with recent renovations',
    },
    {
      factor: 'Portfolio Fit',
      score: 78,
      weight: 10,
      impact: 7.8,
      notes: 'Good fit with current portfolio composition',
    },
    {
      factor: 'Market Conditions',
      score: 75,
      weight: 10,
      impact: 7.5,
      notes: 'Favorable market conditions in the area',
    },
    {
      factor: 'Income Stability',
      score: 82,
      weight: 5,
      impact: 4.1,
      notes: 'Borrower has stable employment history',
    },
    {
      factor: 'Debt Service Ratio',
      score: 78,
      weight: 5,
      impact: 3.9,
      notes: 'Borrower has manageable existing debt',
    },
  ],
  
  // IRR projection
  irrProjection: [
    { year: 1, irr: 12.5, benchmark: 14.0 },
    { year: 2, irr: 14.2, benchmark: 14.0 },
    { year: 3, irr: 15.8, benchmark: 14.0 },
    { year: 4, irr: 16.5, benchmark: 14.0 },
    { year: 5, irr: 16.8, benchmark: 14.0 },
    { year: 6, irr: 17.0, benchmark: 14.0 },
    { year: 7, irr: 17.2, benchmark: 14.0 },
    { year: 8, irr: 17.5, benchmark: 14.0 },
    { year: 9, irr: 17.8, benchmark: 14.0 },
    { year: 10, irr: 18.0, benchmark: 14.0 },
  ],
  
  // Risk breakdown
  riskBreakdown: {
    market: 25,
    credit: 20,
    property: 35,
    operational: 20,
  },
  
  // Portfolio impact
  portfolioImpact: {
    irrBefore: 16.5,
    irrAfter: 16.8,
    irrChange: 0.3,
    riskBefore: 25.0,
    riskAfter: 24.8,
    riskChange: -0.2,
    diversificationBefore: 75.0,
    diversificationAfter: 76.5,
    diversificationChange: 1.5,
    liquidityBefore: 82.0,
    liquidityAfter: 82.5,
    liquidityChange: 0.5,
  },
  
  // Returns data
  returns: {
    irr: 16.8,
    roi: 152.4,
    paybackPeriod: 6.2,
    cashOnCash: 2.5,
  },
};

export default decisionMockData;
