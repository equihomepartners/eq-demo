import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertCircle, CheckCircle, FileText, User, Home, DollarSign, Info } from 'lucide-react';
import DemoContext from '../../context/DemoContext';
import { mockLoanApplication } from '../../data/mockData';

const Application: React.FC = () => {
  const { demoState, updateDemoState } = useContext(DemoContext);
  const [activeTab, setActiveTab] = useState('borrower');
  const [formData, setFormData] = useState({
    borrowerName: 'James & Sarah Wilson',
    borrowerEmail: 'james.wilson@example.com',
    borrowerPhone: '0412 345 678',
    borrowerIncome: '450000',
    borrowerEmploymentStatus: 'self-employed',
    propertyAddress: '42 Mosman Street',
    propertySuburb: 'Mosman',
    propertyState: 'NSW',
    propertyPostcode: '2088',
    propertyType: 'house',
    propertyBedrooms: '4',
    propertyBathrooms: '3',
    propertyLandSize: '650',
    propertyValue: '4200000',
    propertyMortgageBalance: '1800000',
    loanAmount: '850000',
    loanPurpose: 'investment',
    loanTerm: '10'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      updateDemoState({ application: mockLoanApplication });
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  // Navigate to next tab
  const nextTab = () => {
    if (activeTab === 'borrower') setActiveTab('property');
    else if (activeTab === 'property') setActiveTab('loan');
  };

  // Navigate to previous tab
  const prevTab = () => {
    if (activeTab === 'loan') setActiveTab('property');
    else if (activeTab === 'property') setActiveTab('borrower');
  };

  // Reset form
  const resetForm = () => {
    setIsSubmitted(false);
    updateDemoState({ application: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Application</h2>
          <p className="text-gray-500">Submit a new loan application to the Underwriting System</p>
        </div>
        {isSubmitted && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Application Submitted</span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <Card>
          <CardHeader>
            <CardTitle>New Loan Application</CardTitle>
            <CardDescription>Enter borrower, property, and loan details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="borrower" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Borrower Information
                  </TabsTrigger>
                  <TabsTrigger value="property" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Property Information
                  </TabsTrigger>
                  <TabsTrigger value="loan" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Loan Information
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="borrower">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="borrowerName">Borrower Name</Label>
                        <Input
                          id="borrowerName"
                          name="borrowerName"
                          value={formData.borrowerName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="borrowerEmail">Email</Label>
                        <Input
                          id="borrowerEmail"
                          name="borrowerEmail"
                          type="email"
                          value={formData.borrowerEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="borrowerPhone">Phone</Label>
                        <Input
                          id="borrowerPhone"
                          name="borrowerPhone"
                          value={formData.borrowerPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="borrowerIncome">Annual Income</Label>
                        <Input
                          id="borrowerIncome"
                          name="borrowerIncome"
                          type="number"
                          value={formData.borrowerIncome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="borrowerEmploymentStatus">Employment Status</Label>
                      <Select
                        value={formData.borrowerEmploymentStatus}
                        onValueChange={(value) => handleSelectChange('borrowerEmploymentStatus', value)}
                      >
                        <SelectTrigger id="borrowerEmploymentStatus">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={nextTab}>Next</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="property">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertySuburb">Suburb</Label>
                        <Input
                          id="propertySuburb"
                          name="propertySuburb"
                          value={formData.propertySuburb}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyState">State</Label>
                        <Select
                          value={formData.propertyState}
                          onValueChange={(value) => handleSelectChange('propertyState', value)}
                        >
                          <SelectTrigger id="propertyState">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NSW">NSW</SelectItem>
                            <SelectItem value="VIC">VIC</SelectItem>
                            <SelectItem value="QLD">QLD</SelectItem>
                            <SelectItem value="SA">SA</SelectItem>
                            <SelectItem value="WA">WA</SelectItem>
                            <SelectItem value="TAS">TAS</SelectItem>
                            <SelectItem value="NT">NT</SelectItem>
                            <SelectItem value="ACT">ACT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyPostcode">Postcode</Label>
                        <Input
                          id="propertyPostcode"
                          name="propertyPostcode"
                          value={formData.propertyPostcode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleSelectChange('propertyType', value)}
                        >
                          <SelectTrigger id="propertyType">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyBedrooms">Bedrooms</Label>
                        <Select
                          value={formData.propertyBedrooms}
                          onValueChange={(value) => handleSelectChange('propertyBedrooms', value)}
                        >
                          <SelectTrigger id="propertyBedrooms">
                            <SelectValue placeholder="Select bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyBathrooms">Bathrooms</Label>
                        <Select
                          value={formData.propertyBathrooms}
                          onValueChange={(value) => handleSelectChange('propertyBathrooms', value)}
                        >
                          <SelectTrigger id="propertyBathrooms">
                            <SelectValue placeholder="Select bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyLandSize">Land Size (sqm)</Label>
                        <Input
                          id="propertyLandSize"
                          name="propertyLandSize"
                          type="number"
                          value={formData.propertyLandSize}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyValue">Property Value</Label>
                        <Input
                          id="propertyValue"
                          name="propertyValue"
                          type="number"
                          value={formData.propertyValue}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyMortgageBalance">Mortgage Balance</Label>
                        <Input
                          id="propertyMortgageBalance"
                          name="propertyMortgageBalance"
                          type="number"
                          value={formData.propertyMortgageBalance}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                      <Button type="button" onClick={nextTab}>Next</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="loan">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount">Loan Amount</Label>
                        <Input
                          id="loanAmount"
                          name="loanAmount"
                          type="number"
                          value={formData.loanAmount}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanPurpose">Loan Purpose</Label>
                        <Select
                          value={formData.loanPurpose}
                          onValueChange={(value) => handleSelectChange('loanPurpose', value)}
                        >
                          <SelectTrigger id="loanPurpose">
                            <SelectValue placeholder="Select loan purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                      <Select
                        value={formData.loanTerm}
                        onValueChange={(value) => handleSelectChange('loanTerm', value)}
                      >
                        <SelectTrigger id="loanTerm">
                          <SelectValue placeholder="Select loan term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Equihome Loan Terms</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• No monthly payments required</li>
                        <li>• 3% origination fee</li>
                        <li>• 5% simple interest capitalized at term end</li>
                        <li>• LTV-based appreciation fee</li>
                        <li>• 10-year term with exit flexibility</li>
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Application Submitted</CardTitle>
                  <CardDescription>Application ID: {mockLoanApplication.id}</CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {mockLoanApplication.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <User className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Borrower Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Name:</span>
                      <span>{mockLoanApplication.borrower.name}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Email:</span>
                      <span>{mockLoanApplication.borrower.email}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Phone:</span>
                      <span>{mockLoanApplication.borrower.phone}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Income:</span>
                      <span>${mockLoanApplication.borrower.annualIncome.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Employment:</span>
                      <span className="capitalize">{mockLoanApplication.borrower.employmentStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <Home className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Property Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Address:</span>
                      <span>{mockLoanApplication.property.address}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Suburb:</span>
                      <span>{mockLoanApplication.property.suburb}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">State/Postcode:</span>
                      <span>{mockLoanApplication.property.state} {mockLoanApplication.property.postcode}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Property Type:</span>
                      <span className="capitalize">{mockLoanApplication.property.type}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Bedrooms/Bathrooms:</span>
                      <span>{mockLoanApplication.property.bedrooms}br / {mockLoanApplication.property.bathrooms}ba</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Value:</span>
                      <span>${mockLoanApplication.property.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Mortgage Balance:</span>
                      <span>${mockLoanApplication.property.mortgageBalance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Loan Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Loan Amount:</span>
                      <span>${mockLoanApplication.loan.amount.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Purpose:</span>
                      <span className="capitalize">{mockLoanApplication.loan.purpose}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">Term:</span>
                      <span>{mockLoanApplication.loan.term} years</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500">LTV Ratio:</span>
                      <span>{mockLoanApplication.loan.ltv.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Submitted:</span> {new Date(mockLoanApplication.submittedAt).toLocaleString()}
              </div>
              <Button variant="outline" onClick={resetForm}>
                Reset Form
              </Button>
            </CardFooter>
          </Card>

          {/* Navigation guidance */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-900">Navigation Guide</h3>
                <p className="text-sm text-blue-700 mt-1">
                  The application has been submitted successfully. The next step is to analyze the property's suburb using the Traffic Light System.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Click the "Traffic Light" tab above to proceed to the Traffic Light Analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
