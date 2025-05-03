/**
 * Mock Data for Equihome Platform Demo
 *
 * This file contains mock data for the demo, including loan applications,
 * suburb data, decision results, portfolio metrics, and simulation results.
 */

// Import enhanced mock data for UI components
import portfolioMockData from './portfolioMockData';
import trafficLightMockData from './trafficLightMockData';
import underwritingMockData from './underwritingMockData';
import simulationMockData from './simulationMockData';
import decisionMockData from './decisionMockData';

// Mock loan application
export const mockLoanApplication = {
  id: 'DEMO-2024-001',
  status: 'submitted',
  submittedAt: new Date('2020-01-01').toISOString(),
  lastUpdatedAt: new Date('2020-01-01').toISOString(),
  borrower: {
    name: 'Thomas & Sabrina',
    email: 'thomas.sabrina@example.com',
    phone: '0412 345 678',
    annualIncome: 200000,
    employmentStatus: 'retired',
    age: '66 and 66',
    familyStatus: 'Married, Kids Left the house',
    creditScore: 820,
    existingDebt: 0,
    debtServiceRatio: 0,
    carLoans: 0,
    creditCards: 0,
    equihomeProfile: 'Bank of Mum and Dad',
    useOfFunds: 'Bank of Mum and Dad'
  },
  property: {
    address: '49A Central Avenue',
    suburb: 'Mosman',
    state: 'NSW',
    postcode: '2088',
    council: 'MOSMAN MUNICIPAL COUNCIL',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    garage: 1,
    landSize: 676,
    buildingSize: 271,
    yearBuilt: 1998,
    condition: 'excellent',
    currentValue: 2660000, // Risk adjusted home value
    originalValue: 2800000, // PropTrack AVM value
    mortgageBalance: 0,
    rentalIncome: 0,
    occupancyStatus: 'owner-occupied',
    previousTransactions: [
      { date: 'March 2020', price: 2800000 },
      { date: 'October 1998', price: 825000 },
      { date: 'August 1997', price: 750000 }
    ],
    ownershipProfile: {
      ownerOutright: 38,
      ownerMortgage: 26,
      ownerTotal: 64,
      renterTotal: 33
    }
  },
  loan: {
    amount: 500000,
    purpose: 'Bank of Mum and Dad',
    term: 10, // Standard 10-year term with early exit flexibility
    startDate: '2020-01-01',
    actualExitDate: '2023-05-31', // Example of early exit after 3.42 years
    ltv: 18.80,
    interestRate: 5,
    originationFee: 3,
    appreciationShare: 18.80, // Same as LTV
    monthlyPayment: 0,
    exitValue: 4500000 // Property sold value at early exit
  }
};

// Mock suburb data from Traffic Light System
export const mockSuburbData = {
  suburb: 'Mosman',
  postcode: '2088',
  zone: 'green',
  confidence: 92.5,
  riskScore: 18,
  metrics: {
    growth: {
      historical: 7.8,
      forecast: 6.2,
      confidence: 88
    },
    liquidity: {
      score: 92,
      daysOnMarket: 28,
      confidence: 95
    },
    infrastructure: {
      score: 88,
      planned: 'high',
      confidence: 90
    },
    crime: {
      score: 95,
      trend: 'stable',
      confidence: 93
    },
    demographics: {
      income: 'high',
      education: 'high',
      employment: 'high',
      confidence: 96
    }
  },
  marketCycle: {
    position: 'growth',
    confidence: 85,
    forecast: 'continued growth'
  },
  comparableSuburbs: [
    'Double Bay',
    'Cremorne',
    'Neutral Bay',
    'Balmoral'
  ],
  mlDecision: {
    recommendation: 'strong invest',
    confidence: 92,
    factors: [
      { name: 'Historical Growth', impact: 'positive', weight: 0.25 },
      { name: 'Infrastructure', impact: 'positive', weight: 0.20 },
      { name: 'Demographics', impact: 'positive', weight: 0.30 },
      { name: 'Market Cycle', impact: 'positive', weight: 0.15 },
      { name: 'Crime Rate', impact: 'positive', weight: 0.10 }
    ]
  }
};

// Mock decision result from Underwriting System
export const mockDecisionResult = {
  approved: true,
  loanAmount: 500000,
  interestRate: 5.0,
  ltv: 18.80,
  riskLevel: 'low',
  explanation: 'The loan application has been approved based on strong property fundamentals, excellent borrower profile, and green-zone suburb classification. This Bank of Mum and Dad loan aligns perfectly with Equihome\'s investment criteria.',
  trafficLight: 'Green',
  suburb: 'Mosman',
  score: 95,
  factors: [
    { factor: 'Loan-to-Value Ratio', value: '18.80%', risk: 'low', impact: 'positive', score: 98 },
    { factor: 'Traffic Light Zone', value: 'Green', risk: 'low', impact: 'positive', score: 100 },
    { factor: 'Credit Score', value: 820, risk: 'low', impact: 'positive', score: 95 },
    { factor: 'Debt Service Ratio', value: '0%', risk: 'low', impact: 'positive', score: 100 },
    { factor: 'Property Condition', value: 'Excellent', risk: 'low', impact: 'positive', score: 95 },
    { factor: 'Portfolio Fit', value: 'Excellent', risk: 'low', impact: 'positive', score: 90 },
    { factor: 'Suburb Growth Rate', value: '7.90%', risk: 'low', impact: 'positive', score: 92 }
  ],
  loanTerms: {
    originationFee: 15000, // 3% of $500,000
    monthlyPayment: 0,
    term: 10, // Standard 10-year term
    startDate: '2020-01-01',
    actualExitDate: '2023-05-31', // Example of early exit after 3.42 years
    actualExitTerm: 3.42, // 3 years and 5 months (41 months)
    appreciationShare: 18.80, // Same as LTV
    exitFlexibility: true,
    earlyExitPreferred: true
  },
  returns: {
    // Actual historical performance based on the provided data
    initialPropertyValue: 2660000, // Risk adjusted value
    finalPropertyValue: 4500000, // Exit value at 3.42 years
    propertyAppreciation: 1840000, // $4,500,000 - $2,660,000
    appreciationShareAmount: 345920, // 18.80% of $1,840,000
    totalInterest: 85833, // 5% simple interest for 3.42 years on $500,000
    originationFee: 15000, // 3% of $500,000
    totalReturn: 446753, // Interest + Appreciation Share + Origination Fee
    annualizedReturn: 26.12, // Annualized return over 3.42 years

    // Detailed breakdown by year (actual and forecasted)
    yearlyBreakdown: [
      {
        year: 1,
        date: '2021-01-01',
        propertyValue: 2870000, // Estimated based on growth rate
        accruedInterest: 25000, // 5% of $500,000 for 1 year
        appreciationShare: 82460, // 18.80% of ($2,870,000 - $2,660,000)
        originationFee: 15000, // Collected at start
        totalReturn: 122460, // Interest + Appreciation Share + Origination Fee
        irr: 24.49, // Annualized return if exited at year 1
        isActual: false
      },
      {
        year: 2,
        date: '2022-01-01',
        propertyValue: 3097000, // Estimated based on growth rate
        accruedInterest: 50000, // 5% of $500,000 for 2 years
        appreciationShare: 82082, // 18.80% of ($3,097,000 - $2,870,000)
        originationFee: 15000, // Already collected
        totalReturn: 229542, // Cumulative return if exited at year 2
        irr: 22.95, // Annualized return if exited at year 2
        isActual: false
      },
      {
        year: 3,
        date: '2023-01-01',
        propertyValue: 3342000, // Estimated based on growth rate
        accruedInterest: 75000, // 5% of $500,000 for 3 years
        appreciationShare: 46035, // 18.80% of ($3,342,000 - $3,097,000)
        originationFee: 15000, // Already collected
        totalReturn: 350577, // Cumulative return if exited at year 3
        irr: 23.37, // Annualized return if exited at year 3
        isActual: false
      },
      {
        year: 3.42,
        date: '2023-05-31', // Actual exit date
        propertyValue: 4500000, // Actual exit value
        accruedInterest: 85833, // 5% of $500,000 for 3.42 years
        appreciationShare: 217828, // 18.80% of ($4,500,000 - $3,342,000)
        originationFee: 15000, // Already collected
        totalReturn: 446753, // Interest + Appreciation Share + Origination Fee
        irr: 26.12, // Actual annualized return at exit
        isActual: true
      },
      {
        year: 4,
        date: '2024-01-01',
        propertyValue: 3608000, // Forecasted based on growth rate
        accruedInterest: 100000, // 5% of $500,000 for 4 years
        appreciationShare: 50044, // 18.80% of ($3,608,000 - $3,342,000)
        originationFee: 15000, // Already collected
        totalReturn: 415621, // Cumulative return if exited at year 4
        irr: 20.78, // Annualized return if exited at year 4
        isActual: false,
        isForecast: true
      },
      {
        year: 5,
        date: '2025-01-01',
        propertyValue: 3896000, // Forecasted based on growth rate
        accruedInterest: 125000, // 5% of $500,000 for 5 years
        appreciationShare: 54112, // 18.80% of ($3,896,000 - $3,608,000)
        originationFee: 15000, // Already collected
        totalReturn: 494733, // Cumulative return if exited at year 5
        irr: 19.79, // Annualized return if exited at year 5
        isActual: false,
        isForecast: true
      },
      {
        year: 6,
        date: '2026-01-01',
        propertyValue: 4208000, // Forecasted based on growth rate
        accruedInterest: 150000, // 5% of $500,000 for 6 years
        appreciationShare: 58624, // 18.80% of ($4,208,000 - $3,896,000)
        originationFee: 15000, // Already collected
        totalReturn: 578357, // Cumulative return if exited at year 6
        irr: 19.28, // Annualized return if exited at year 6
        isActual: false,
        isForecast: true
      },
      {
        year: 7,
        date: '2027-01-01',
        propertyValue: 4545000, // Forecasted based on growth rate
        accruedInterest: 175000, // 5% of $500,000 for 7 years
        appreciationShare: 63364, // 18.80% of ($4,545,000 - $4,208,000)
        originationFee: 15000, // Already collected
        totalReturn: 666721, // Cumulative return if exited at year 7
        irr: 19.05, // Annualized return if exited at year 7
        isActual: false,
        isForecast: true
      },
      {
        year: 8,
        date: '2028-01-01',
        propertyValue: 4909000, // Forecasted based on growth rate
        accruedInterest: 200000, // 5% of $500,000 for 8 years
        appreciationShare: 68432, // 18.80% of ($4,909,000 - $4,545,000)
        originationFee: 15000, // Already collected
        totalReturn: 760153, // Cumulative return if exited at year 8
        irr: 18.88, // Annualized return if exited at year 8
        isActual: false,
        isForecast: true
      },
      {
        year: 9,
        date: '2029-01-01',
        propertyValue: 5302000, // Forecasted based on growth rate
        accruedInterest: 225000, // 5% of $500,000 for 9 years
        appreciationShare: 73906, // 18.80% of ($5,302,000 - $4,909,000)
        originationFee: 15000, // Already collected
        totalReturn: 859059, // Cumulative return if exited at year 9
        irr: 18.76, // Annualized return if exited at year 9
        isActual: false,
        isForecast: true
      },
      {
        year: 10,
        date: '2030-01-01',
        propertyValue: 5726000, // Forecasted based on growth rate
        accruedInterest: 250000, // 5% of $500,000 for 10 years
        appreciationShare: 79712, // 18.80% of ($5,726,000 - $5,302,000)
        originationFee: 15000, // Already collected
        totalReturn: 963771, // Cumulative return if exited at year 10
        irr: 18.68, // Annualized return if exited at year 10
        isActual: false,
        isForecast: true
      }
    ],

    // Actual returns at exit (3.42 years)
    actualTotalInterest: 85833,
    actualAppreciationShare: 345920,
    actualTotalReturn: 446753,
    actualIRR: 26.12,

    // Forecasted returns at term end (10 years)
    forecastTotalInterest: 250000,
    forecastAppreciationShare: 698771,
    forecastTotalReturn: 963771,
    forecastIRR: 18.68,

    // Growth metrics
    suburbHistoricalGrowth: 7.90,
    suburbForecastGrowth: 5.90,
    actualGrowth: 19.14, // Annualized growth over the 3.42 year period
    forecastGrowth: 5.90  // Forecasted annual growth rate
  },

  // Additional metrics for the deal
  dealMetrics: {
    discountFromAVM: -5.00, // 5% discount from PropTrack AVM
    originalAVMValue: 2800000,
    riskAdjustedValue: 2660000,
    firstMortgageDebt: 0,
    equityReleased: 500000,
    totalDebt: 500000,
    growthProfile: {
      suburbHistorical: 7.90,
      suburbForecast: 5.90
    }
  }
};

// Mock portfolio metrics
export const mockPortfolioMetrics = {
  totalValue: 25000000,
  totalLoans: 12,
  averageLoanSize: 2083333,
  averageInterestRate: 5.2,
  averageLTV: 22.5,
  zoneAllocation: {
    green: 75,
    yellow: 20,
    red: 5
  },
  performance: {
    irr: 16.8,
    roi: 21.2,
    cashYield: 8.2
  },
  riskMetrics: {
    riskScore: 28,
    diversificationScore: 82,
    volatility: 8.5,
    sharpeRatio: 1.8
  },
  allocationBySuburb: [
    { suburb: 'Mosman', allocation: 18, zone: 'green' },
    { suburb: 'Double Bay', allocation: 15, zone: 'green' },
    { suburb: 'Bondi', allocation: 12, zone: 'green' },
    { suburb: 'Vaucluse', allocation: 10, zone: 'green' },
    { suburb: 'Paddington', allocation: 8, zone: 'green' },
    { suburb: 'Randwick', allocation: 7, zone: 'yellow' },
    { suburb: 'Surry Hills', allocation: 6, zone: 'yellow' },
    { suburb: 'Newtown', allocation: 5, zone: 'yellow' },
    { suburb: 'Parramatta', allocation: 3, zone: 'red' },
    { suburb: 'Liverpool', allocation: 2, zone: 'red' }
  ],
  allocationByPropertyType: [
    { type: 'House', allocation: 65 },
    { type: 'Apartment', allocation: 25 },
    { type: 'Townhouse', allocation: 10 }
  ],
  cashFlowProjections: [
    { date: '2024-12-31', interestIncome: 1300000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1300000 },
    { date: '2025-12-31', interestIncome: 1380000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1380000 },
    { date: '2026-12-31', interestIncome: 1460000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1460000 },
    { date: '2027-12-31', interestIncome: 1550000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1550000 },
    { date: '2028-12-31', interestIncome: 1640000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1640000 },
    { date: '2029-12-31', interestIncome: 1740000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1740000 },
    { date: '2030-12-31', interestIncome: 1840000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1840000 },
    { date: '2031-12-31', interestIncome: 1950000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 1950000 },
    { date: '2032-12-31', interestIncome: 2070000, principalRepayments: 0, defaultLosses: 0, netCashFlow: 2070000 },
    { date: '2033-12-31', interestIncome: 2190000, principalRepayments: 25000000, defaultLosses: 0, netCashFlow: 27190000 }
  ]
};

// Mock portfolio impact after adding the new loan
export const mockPortfolioImpact = {
  beforeLoan: {
    totalValue: 25000000,
    totalLoans: 12,
    averageLoanSize: 2083333,
    averageInterestRate: 5.2,
    averageLTV: 22.5,
    irr: 16.8,
    riskScore: 28,
    diversificationScore: 82,
    mosmanAllocation: 18
  },
  afterLoan: {
    totalValue: 25850000,
    totalLoans: 13,
    averageLoanSize: 1988462,
    averageInterestRate: 5.23,
    averageLTV: 22.3,
    irr: 16.9,
    riskScore: 27,
    diversificationScore: 81,
    mosmanAllocation: 21
  },
  impact: {
    totalValue: '+850000',
    totalLoans: '+1',
    averageLoanSize: '-94871',
    averageInterestRate: '+0.03',
    averageLTV: '-0.2',
    irr: '+0.1',
    riskScore: '-1',
    diversificationScore: '-1',
    mosmanAllocation: '+3'
  },
  analysis: {
    summary: 'The addition of this loan has a positive impact on the portfolio, increasing the total value and IRR while slightly reducing the average LTV and risk score.',
    concerns: 'The increased allocation to Mosman slightly reduces the diversification score, but the impact is minimal.',
    recommendations: 'Consider targeting different suburbs for future loans to maintain diversification.'
  }
};

// Mock simulation result
export const mockSimulationResult = {
  id: 'SIM-2024-001',
  name: 'Portfolio Simulation with New Mosman Loan',
  timestamp: new Date().toISOString(),
  parameters: {
    simulationPeriod: 10,
    iterations: 1000,
    confidenceLevel: 95,
    marketScenario: 'base',
    reinvestmentRate: 80
  },
  results: {
    baseMetrics: {
      irr: 16.9,
      roi: 21.4,
      cashYield: 8.3,
      totalReturn: 55400000,
      finalPortfolioValue: 81250000
    },
    scenarios: [
      {
        name: 'Optimistic',
        probability: 25,
        irr: 19.2,
        roi: 24.8,
        totalReturn: 64100000,
        finalPortfolioValue: 89900000
      },
      {
        name: 'Base',
        probability: 50,
        irr: 16.9,
        roi: 21.4,
        totalReturn: 55400000,
        finalPortfolioValue: 81250000
      },
      {
        name: 'Pessimistic',
        probability: 25,
        irr: 14.1,
        roi: 17.6,
        totalReturn: 45500000,
        finalPortfolioValue: 71400000
      }
    ],
    sensitivityAnalysis: [
      { factor: 'Property Growth Rate', impact: 'high', elasticity: 1.8 },
      { factor: 'Interest Rate', impact: 'medium', elasticity: 0.9 },
      { factor: 'Default Rate', impact: 'low', elasticity: 0.4 },
      { factor: 'Early Exit Rate', impact: 'medium', elasticity: 0.7 },
      { factor: 'Reinvestment Rate', impact: 'high', elasticity: 1.2 }
    ],
    monteCarlo: {
      percentiles: [
        { percentile: 5, irr: 12.8, totalReturn: 41800000 },
        { percentile: 25, irr: 15.2, totalReturn: 49700000 },
        { percentile: 50, irr: 16.9, totalReturn: 55400000 },
        { percentile: 75, irr: 18.5, totalReturn: 60500000 },
        { percentile: 95, irr: 20.8, totalReturn: 68100000 }
      ],
      confidenceInterval: {
        lower: 14.2,
        upper: 19.6
      }
    },
    efficientFrontier: {
      currentPosition: { risk: 27, return: 16.9 },
      optimalPosition: { risk: 25, return: 17.2 },
      improvementPotential: 0.3
    }
  }
};

// Mock pipeline data
export const mockPipelineData = {
  // Before the current deal is added
  before: [
    {
      id: 'LOAN-2023-001',
      borrower: 'James Wilson',
      property: {
        address: '15 Darling Point Rd, Darling Point',
        value: 5200000,
        suburb: 'Darling Point'
      },
      loanAmount: 1100000,
      ltv: 21.15,
      score: 88,
      rank: 1,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-002',
      borrower: 'Sarah Chen',
      property: {
        address: '42 Victoria St, Paddington',
        value: 3800000,
        suburb: 'Paddington'
      },
      loanAmount: 950000,
      ltv: 25.00,
      score: 85,
      rank: 2,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-003',
      borrower: 'Michael Taylor',
      property: {
        address: '8 Raglan St, Mosman',
        value: 4500000,
        suburb: 'Mosman'
      },
      loanAmount: 1000000,
      ltv: 22.22,
      score: 84,
      rank: 3,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-004',
      borrower: 'Emma Johnson',
      property: {
        address: '27 Wentworth Ave, Vaucluse',
        value: 6100000,
        suburb: 'Vaucluse'
      },
      loanAmount: 1500000,
      ltv: 24.59,
      score: 82,
      rank: 4,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-005',
      borrower: 'David Lee',
      property: {
        address: '103 Birrell St, Bondi Junction',
        value: 2800000,
        suburb: 'Bondi Junction'
      },
      loanAmount: 700000,
      ltv: 25.00,
      score: 79,
      rank: 5,
      status: 'In Progress',
      zone: 'yellow'
    },
    {
      id: 'LOAN-2023-006',
      borrower: 'Olivia Martinez',
      property: {
        address: '56 Pitt St, Redfern',
        value: 2200000,
        suburb: 'Redfern'
      },
      loanAmount: 550000,
      ltv: 25.00,
      score: 76,
      rank: 6,
      status: 'In Progress',
      zone: 'yellow'
    },
    {
      id: 'LOAN-2023-007',
      borrower: 'Thomas Brown',
      property: {
        address: '19 Glebe Point Rd, Glebe',
        value: 2500000,
        suburb: 'Glebe'
      },
      loanAmount: 600000,
      ltv: 24.00,
      score: 75,
      rank: 7,
      status: 'In Progress',
      zone: 'yellow'
    }
  ],

  // After the current deal is added and pipeline is reshuffled
  after: [
    {
      id: 'LOAN-2023-001',
      borrower: 'James Wilson',
      property: {
        address: '15 Darling Point Rd, Darling Point',
        value: 5200000,
        suburb: 'Darling Point'
      },
      loanAmount: 1100000,
      ltv: 21.15,
      score: 88,
      rank: 1,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-008', // Current deal
      borrower: 'James & Sarah Wilson',
      property: {
        address: '42 Mosman Street, Mosman',
        value: 4200000,
        suburb: 'Mosman'
      },
      loanAmount: 850000,
      ltv: 20.24,
      score: 92,
      rank: 2,
      status: 'New',
      zone: 'green',
      isCurrent: true
    },
    {
      id: 'LOAN-2023-002',
      borrower: 'Sarah Chen',
      property: {
        address: '42 Victoria St, Paddington',
        value: 3800000,
        suburb: 'Paddington'
      },
      loanAmount: 950000,
      ltv: 25.00,
      score: 85,
      rank: 3,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-003',
      borrower: 'Michael Taylor',
      property: {
        address: '8 Raglan St, Mosman',
        value: 4500000,
        suburb: 'Mosman'
      },
      loanAmount: 1000000,
      ltv: 22.22,
      score: 84,
      rank: 4,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-004',
      borrower: 'Emma Johnson',
      property: {
        address: '27 Wentworth Ave, Vaucluse',
        value: 6100000,
        suburb: 'Vaucluse'
      },
      loanAmount: 1500000,
      ltv: 24.59,
      score: 82,
      rank: 5,
      status: 'In Progress',
      zone: 'green'
    },
    {
      id: 'LOAN-2023-005',
      borrower: 'David Lee',
      property: {
        address: '103 Birrell St, Bondi Junction',
        value: 2800000,
        suburb: 'Bondi Junction'
      },
      loanAmount: 700000,
      ltv: 25.00,
      score: 79,
      rank: 6,
      status: 'In Progress',
      zone: 'yellow'
    },
    {
      id: 'LOAN-2023-006',
      borrower: 'Olivia Martinez',
      property: {
        address: '56 Pitt St, Redfern',
        value: 2200000,
        suburb: 'Redfern'
      },
      loanAmount: 550000,
      ltv: 25.00,
      score: 76,
      rank: 7,
      status: 'In Progress',
      zone: 'yellow'
    },
    {
      id: 'LOAN-2023-007',
      borrower: 'Thomas Brown',
      property: {
        address: '19 Glebe Point Rd, Glebe',
        value: 2500000,
        suburb: 'Glebe'
      },
      loanAmount: 600000,
      ltv: 24.00,
      score: 75,
      rank: 8,
      status: 'In Progress',
      zone: 'yellow'
    }
  ],

  // Pipeline metrics
  metrics: {
    totalDeals: 8,
    greenZoneDeals: 5,
    yellowZoneDeals: 3,
    redZoneDeals: 0,
    averageScore: 82.6,
    averageLTV: 23.4,
    totalLoanAmount: 7250000,
    pipelineHealth: 'Excellent',
    pipelineCapacity: 85, // percentage
    projectedIRR: 12.8,
    projectedROI: 18.5
  },

  // Intelligence insights
  insights: [
    'The current deal ranks #2 in the pipeline due to its high decision score of 92.',
    'The property\'s location in Mosman (green zone) contributes significantly to its high ranking.',
    'The deal\'s LTV ratio of 20.24% is lower than the pipeline average of 23.4%, indicating lower risk.',
    'Adding this deal improves the overall pipeline health by increasing the average decision score.',
    'The deal aligns well with the current portfolio strategy focusing on premium suburbs.'
  ]
};

// Export all mock data
export default {
  mockLoanApplication,
  mockSuburbData,
  mockDecisionResult,
  mockPortfolioMetrics,
  mockPortfolioImpact,
  mockSimulationResult,
  mockPipelineData,

  // Enhanced UI component data
  enhancedUI: {
    portfolio: portfolioMockData,
    trafficLight: trafficLightMockData,
    underwriting: underwritingMockData,
    simulation: simulationMockData,
    decision: decisionMockData
  }
};
