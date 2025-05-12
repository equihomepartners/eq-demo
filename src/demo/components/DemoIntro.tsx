import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Building2, LineChart, Map, FileCheck, Calculator, Info } from 'lucide-react';

const DemoIntro: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Equihome Platform Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          This interactive demo will guide you through the complete workflow of the Equihome platform,
          showcasing how our systems work together to provide a comprehensive property investment solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Underwriting System</h3>
              <p className="text-gray-600 text-sm">
                Processes loan applications, evaluates properties and homeowners, and generates term sheets
                for no-monthly-payment loans.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Traffic Light System</h3>
              <p className="text-gray-600 text-sm">
                Classifies suburbs into green, yellow, and red zones based on investment potential,
                using machine learning to analyze market data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Portfolio Management System</h3>
              <p className="text-gray-600 text-sm">
                Manages loan portfolios, applies CIO guidelines, runs simulations for portfolio optimization,
                and provides financial modeling.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Demo Workflow</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-blue-600 font-medium">1</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Introduction</h4>
              <p className="text-gray-600">
                Overview of the Equihome platform and its integrated systems.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-blue-600 font-medium">2</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Loan Application</h4>
              <p className="text-gray-600">
                Start with a loan application submission in the Underwriting System.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-indigo-600 font-medium">3</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Data Science Pipeline</h4>
              <p className="text-gray-600">
                Explore the sophisticated ML pipeline that powers our Traffic Light investment thesis, processing hundreds of data sources.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-green-600 font-medium">4</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Traffic Light Analysis</h4>
              <p className="text-gray-600">
                See how the Traffic Light System evaluates the suburb and provides risk assessment with detailed geospatial analysis.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-purple-600 font-medium">5</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Portfolio Analysis</h4>
              <p className="text-gray-600">
                Analyze how the potential loan impacts the overall portfolio metrics, run advanced simulations,
                and make data-driven investment decisions based on comprehensive analysis.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-blue-600 font-medium">6</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Underwriting Decision</h4>
              <p className="text-gray-600">
                Observe the decision engine process and how it generates a loan decision based on all available data.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-indigo-600 font-medium">7</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Executive Summary</h4>
              <p className="text-gray-600">
                Review comprehensive metrics and insights about the portfolio and investment strategy.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-0.5">
              <span className="text-emerald-600 font-medium">8</span>
            </div>
            <div>
              <h4 className="text-lg font-medium">Complete</h4>
              <p className="text-gray-600">
                Demo completion with options to restart or explore specific sections.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
        <p className="text-amber-700">
          This demonstration is designed to showcase the various components of our platform and the flow of data in a
          simplified manner to help understand high-level logic. It is not in any way representative of actual performance
          in production, and there may be some inconsistencies within the data.
        </p>
        <p className="text-amber-700 mt-3">
          All data shown is mock data, isolated from actual platform functionality, and is not representative of
          investment thesis and actual decision making.
        </p>
      </div>

      {/* Navigation guidance */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900">Navigation Guide</h3>
            <p className="text-sm text-blue-700 mt-1">
              To proceed with the demo, click the "Application" tab above to start the loan application process. After that, you'll explore our Data Science Pipeline, Traffic Light System, and Portfolio Analysis.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Throughout the demo, you'll find guidance like this at the bottom of each section to help you navigate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoIntro;
