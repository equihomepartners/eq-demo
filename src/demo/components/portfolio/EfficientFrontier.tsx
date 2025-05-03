import React from 'react';
import { Target, TrendingUp, Shield } from 'lucide-react';

const EfficientFrontier: React.FC = () => {
  // Mock data for visualization
  const mockData = {
    currentPortfolio: {
      return: 18.4,
      risk: 32,
      sharpeRatio: 1.8
    },
    optimalPortfolio: {
      return: 19.2,
      risk: 30,
      sharpeRatio: 2.1
    },
    efficientPortfolios: [
      { return: 14.0, risk: 22, sharpeRatio: 1.6 },
      { return: 15.5, risk: 24, sharpeRatio: 1.7 },
      { return: 17.0, risk: 26, sharpeRatio: 1.8 },
      { return: 18.5, risk: 28, sharpeRatio: 1.9 },
      { return: 19.2, risk: 30, sharpeRatio: 2.1 },
      { return: 20.8, risk: 34, sharpeRatio: 2.0 },
      { return: 22.5, risk: 40, sharpeRatio: 1.8 },
      { return: 24.0, risk: 48, sharpeRatio: 1.6 }
    ]
  };

  return (
    <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-1.5 bg-primary-50 rounded-md mr-2">
            <Target size={16} className="text-primary-600" />
          </div>
          <h3 className="text-sm font-medium text-neutral-700">Efficient Frontier Analysis</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Efficient Frontier</h4>
            <div className="h-48 bg-white rounded-md border border-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Target className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm">Efficient Frontier Chart</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Risk</span>
              <span>Return</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
              <h4 className="text-xs font-medium text-gray-700 mb-3">Current Portfolio</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      Expected Return
                    </span>
                    <span className="text-xs font-medium text-blue-600">{mockData.currentPortfolio.return}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${(mockData.currentPortfolio.return / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 flex items-center">
                      <Shield size={12} className="mr-1" />
                      Risk Score
                    </span>
                    <span className="text-xs font-medium text-blue-600">{mockData.currentPortfolio.risk}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${(mockData.currentPortfolio.risk / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
              <h4 className="text-xs font-medium text-gray-700 mb-3">Optimal Portfolio</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 flex items-center">
                      <TrendingUp size={12} className="mr-1" />
                      Expected Return
                    </span>
                    <span className="text-xs font-medium text-green-600">{mockData.optimalPortfolio.return}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${(mockData.optimalPortfolio.return / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 flex items-center">
                      <Shield size={12} className="mr-1" />
                      Risk Score
                    </span>
                    <span className="text-xs font-medium text-green-600">{mockData.optimalPortfolio.risk}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${(mockData.optimalPortfolio.risk / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficientFrontier;
