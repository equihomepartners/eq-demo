/**
 * Mock data for the Portfolio Dashboard
 */
export const portfolioMockData = {
  // Portfolio metrics
  totalValue: 25000000,
  previousTotalValue: 23500000,
  valueChange: 6.38,
  irr: 16.8,
  previousIrr: 16.2,
  irrChange: 3.7,
  loanCount: 42,
  previousLoanCount: 38,
  loanCountChange: 10.5,
  avgTerm: 7.2,
  
  // IRR projection data
  irrProjection: [
    { month: 'Jan', actual: 15.2, projected: 15.2, baseline: 14.0 },
    { month: 'Feb', actual: 15.4, projected: 15.4, baseline: 14.0 },
    { month: 'Mar', actual: 15.7, projected: 15.7, baseline: 14.0 },
    { month: 'Apr', actual: 16.0, projected: 16.0, baseline: 14.0 },
    { month: 'May', actual: 16.2, projected: 16.2, baseline: 14.0 },
    { month: 'Jun', actual: 16.5, projected: 16.5, baseline: 14.0 },
    { month: 'Jul', actual: 16.8, projected: 16.8, baseline: 14.0 },
    { month: 'Aug', actual: null, projected: 17.0, baseline: 14.0 },
    { month: 'Sep', actual: null, projected: 17.2, baseline: 14.0 },
    { month: 'Oct', actual: null, projected: 17.5, baseline: 14.0 },
    { month: 'Nov', actual: null, projected: 17.8, baseline: 14.0 },
    { month: 'Dec', actual: null, projected: 18.0, baseline: 14.0 },
  ],
  
  // Target IRR
  targetIrr: 15.0,
  
  // Portfolio composition
  composition: [
    { category: 'Green Zone', percentage: 65, color: '#4ade80' },
    { category: 'Yellow Zone', percentage: 30, color: '#facc15' },
    { category: 'Red Zone', percentage: 5, color: '#f87171' },
  ],
  
  // Suburb distribution
  suburbDistribution: [
    { suburb: 'Bondi', value: 5200000, count: 8 },
    { suburb: 'Manly', value: 4800000, count: 7 },
    { suburb: 'Mosman', value: 4200000, count: 6 },
    { suburb: 'Paddington', value: 3800000, count: 5 },
    { suburb: 'Balmain', value: 3500000, count: 5 },
    { suburb: 'Surry Hills', value: 3200000, count: 4 },
    { suburb: 'Double Bay', value: 2800000, count: 4 },
    { suburb: 'Other', value: 2500000, count: 3 },
  ],
  
  // Performance metrics
  performanceMetrics: [
    { category: 'Green Zone', irr: 17.5, growth: 8.2, risk: 25 },
    { category: 'Yellow Zone', irr: 16.2, growth: 6.8, risk: 45 },
    { category: 'Red Zone', irr: 14.8, growth: 5.5, risk: 65 },
    { category: 'Overall', irr: 16.8, growth: 7.5, risk: 35 },
  ],
  
  // Loans data
  loans: [
    {
      id: '1001',
      borrower: 'John Smith',
      suburb: 'Bondi',
      amount: 650000,
      ltv: 18.5,
      originationDate: '2023-02-15',
      status: 'Active',
    },
    {
      id: '1002',
      borrower: 'Sarah Johnson',
      suburb: 'Manly',
      amount: 720000,
      ltv: 19.2,
      originationDate: '2023-03-22',
      status: 'Active',
    },
    {
      id: '1003',
      borrower: 'Michael Brown',
      suburb: 'Mosman',
      amount: 850000,
      ltv: 17.8,
      originationDate: '2023-04-10',
      status: 'Active',
    },
    {
      id: '1004',
      borrower: 'Emma Wilson',
      suburb: 'Paddington',
      amount: 580000,
      ltv: 16.5,
      originationDate: '2023-05-05',
      status: 'Active',
    },
    {
      id: '1005',
      borrower: 'David Lee',
      suburb: 'Balmain',
      amount: 620000,
      ltv: 18.0,
      originationDate: '2023-06-18',
      status: 'Active',
    },
    {
      id: '1006',
      borrower: 'Jessica Taylor',
      suburb: 'Surry Hills',
      amount: 590000,
      ltv: 17.2,
      originationDate: '2023-07-02',
      status: 'Active',
    },
    {
      id: '1007',
      borrower: 'Robert Chen',
      suburb: 'Double Bay',
      amount: 780000,
      ltv: 19.5,
      originationDate: '2023-07-20',
      status: 'Pending',
    },
    {
      id: '1008',
      borrower: 'Amanda Harris',
      suburb: 'Bondi',
      amount: 680000,
      ltv: 18.2,
      originationDate: '2022-12-10',
      status: 'Active',
    },
    {
      id: '1009',
      borrower: 'Thomas Wright',
      suburb: 'Manly',
      amount: 710000,
      ltv: 19.0,
      originationDate: '2023-01-25',
      status: 'Active',
    },
    {
      id: '1010',
      borrower: 'Olivia Green',
      suburb: 'Mosman',
      amount: 820000,
      ltv: 17.5,
      originationDate: '2022-11-15',
      status: 'Active',
    },
  ],
};

export default portfolioMockData;
