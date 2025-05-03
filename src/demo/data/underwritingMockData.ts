/**
 * Mock data for the Underwriting Dashboard
 */
export const underwritingMockData = {
  // Overall metrics
  metrics: {
    totalApplications: 128,
    previousTotalApplications: 115,
    applicationsChange: 11.3,
    approvalRate: 72.5,
    previousApprovalRate: 70.2,
    approvalRateChange: 3.3,
    avgLoanAmount: 685000,
    previousAvgLoanAmount: 650000,
    avgLoanAmountChange: 5.4,
    avgProcessingTime: 5.2,
    previousAvgProcessingTime: 5.8,
    avgProcessingTimeChange: -10.3,
  },
  
  // Application trends
  applicationTrends: [
    { month: 'Jan', applications: 8, approvals: 6, declines: 2 },
    { month: 'Feb', applications: 10, approvals: 7, declines: 3 },
    { month: 'Mar', applications: 12, approvals: 9, declines: 3 },
    { month: 'Apr', applications: 9, approvals: 6, declines: 3 },
    { month: 'May', applications: 11, approvals: 8, declines: 3 },
    { month: 'Jun', applications: 14, approvals: 10, declines: 4 },
    { month: 'Jul', applications: 16, approvals: 12, declines: 4 },
    { month: 'Aug', applications: 15, approvals: 11, declines: 4 },
    { month: 'Sep', applications: 13, approvals: 9, declines: 4 },
    { month: 'Oct', applications: 12, approvals: 9, declines: 3 },
    { month: 'Nov', applications: 10, approvals: 7, declines: 3 },
    { month: 'Dec', applications: 8, approvals: 6, declines: 2 },
  ],
  
  // Status distribution
  statusDistribution: {
    approved: 72.5,
    declined: 18.5,
    pending: 6.0,
    review: 3.0,
  },
  
  // Suburb distribution
  suburbDistribution: [
    { suburb: 'Bondi', count: 18, approved: 15 },
    { suburb: 'Manly', count: 16, approved: 13 },
    { suburb: 'Mosman', count: 14, approved: 11 },
    { suburb: 'Paddington', count: 12, approved: 9 },
    { suburb: 'Balmain', count: 10, approved: 7 },
    { suburb: 'Double Bay', count: 9, approved: 7 },
    { suburb: 'Surry Hills', count: 8, approved: 6 },
    { suburb: 'Other', count: 41, approved: 25 },
  ],
  
  // LTV distribution
  ltvDistribution: [
    { range: '0-10%', count: 12, approvalRate: 92 },
    { range: '10-15%', count: 28, approvalRate: 89 },
    { range: '15-20%', count: 45, approvalRate: 82 },
    { range: '20-25%', count: 32, approvalRate: 65 },
    { range: '25-30%', count: 8, approvalRate: 38 },
    { range: '30%+', count: 3, approvalRate: 0 },
  ],
  
  // Applications data
  applications: [
    {
      id: '2001',
      borrower: 'John Smith',
      property: '42 Campbell Parade, Bondi',
      amount: 650000,
      ltv: 18.5,
      submittedAt: '2023-07-15T10:30:00Z',
      status: 'Approved',
    },
    {
      id: '2002',
      borrower: 'Sarah Johnson',
      property: '15 The Corso, Manly',
      amount: 720000,
      ltv: 19.2,
      submittedAt: '2023-07-18T14:45:00Z',
      status: 'Approved',
    },
    {
      id: '2003',
      borrower: 'Michael Brown',
      property: '8 Raglan Street, Mosman',
      amount: 850000,
      ltv: 17.8,
      submittedAt: '2023-07-20T09:15:00Z',
      status: 'Pending',
    },
    {
      id: '2004',
      borrower: 'Emma Wilson',
      property: '22 Oxford Street, Paddington',
      amount: 580000,
      ltv: 16.5,
      submittedAt: '2023-07-22T11:30:00Z',
      status: 'Review',
    },
    {
      id: '2005',
      borrower: 'David Lee',
      property: '5 Darling Street, Balmain',
      amount: 620000,
      ltv: 18.0,
      submittedAt: '2023-07-23T16:20:00Z',
      status: 'Pending',
    },
    {
      id: '2006',
      borrower: 'Jessica Taylor',
      property: '18 Crown Street, Surry Hills',
      amount: 590000,
      ltv: 17.2,
      submittedAt: '2023-07-24T13:10:00Z',
      status: 'Approved',
    },
    {
      id: '2007',
      borrower: 'Robert Chen',
      property: '7 Bay Street, Double Bay',
      amount: 780000,
      ltv: 19.5,
      submittedAt: '2023-07-25T10:45:00Z',
      status: 'Pending',
    },
    {
      id: '2008',
      borrower: 'Amanda Harris',
      property: '31 Lamrock Avenue, Bondi',
      amount: 680000,
      ltv: 18.2,
      submittedAt: '2023-07-26T15:30:00Z',
      status: 'Approved',
    },
    {
      id: '2009',
      borrower: 'Thomas Wright',
      property: '12 Whistler Street, Manly',
      amount: 710000,
      ltv: 19.0,
      submittedAt: '2023-07-27T09:20:00Z',
      status: 'Declined',
    },
    {
      id: '2010',
      borrower: 'Olivia Green',
      property: '25 Awaba Street, Mosman',
      amount: 820000,
      ltv: 22.5,
      submittedAt: '2023-07-28T14:15:00Z',
      status: 'Declined',
    },
    {
      id: '2011',
      borrower: 'William Turner',
      property: '9 Glenmore Road, Paddington',
      amount: 600000,
      ltv: 17.0,
      submittedAt: '2023-07-29T11:40:00Z',
      status: 'Approved',
    },
    {
      id: '2012',
      borrower: 'Sophia Martinez',
      property: '14 Beattie Street, Balmain',
      amount: 640000,
      ltv: 18.5,
      submittedAt: '2023-07-30T16:50:00Z',
      status: 'Review',
    },
  ],
};

export default underwritingMockData;
