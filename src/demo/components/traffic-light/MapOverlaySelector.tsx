import React from 'react';
import { Droplet, Shield, Building2, TrendingUp, BarChart2 } from 'lucide-react';

export type OverlayType = 'equihome' | 'liquidity' | 'crime' | 'infrastructure' | 'growth';

interface MapOverlaySelectorProps {
  selectedOverlay: OverlayType;
  onSelectOverlay: (overlay: OverlayType) => void;
}

const MapOverlaySelector: React.FC<MapOverlaySelectorProps> = ({ 
  selectedOverlay, 
  onSelectOverlay 
}) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onSelectOverlay('equihome')}
        className={`px-3 py-1.5 text-xs rounded-md ${
          selectedOverlay === 'equihome'
            ? 'bg-primary-100 text-primary-700 font-medium'
            : 'bg-white text-neutral-600 border border-neutral-200'
        }`}
      >
        <TrendingUp className="h-3 w-3 inline mr-1" />
        Equihome Score
      </button>
      <button
        onClick={() => onSelectOverlay('liquidity')}
        className={`px-3 py-1.5 text-xs rounded-md ${
          selectedOverlay === 'liquidity'
            ? 'bg-blue-100 text-blue-700 font-medium'
            : 'bg-white text-neutral-600 border border-neutral-200'
        }`}
      >
        <Droplet className="h-3 w-3 inline mr-1" />
        Liquidity
      </button>
      <button
        onClick={() => onSelectOverlay('crime')}
        className={`px-3 py-1.5 text-xs rounded-md ${
          selectedOverlay === 'crime'
            ? 'bg-green-100 text-green-700 font-medium'
            : 'bg-white text-neutral-600 border border-neutral-200'
        }`}
      >
        <Shield className="h-3 w-3 inline mr-1" />
        Safety
      </button>
      <button
        onClick={() => onSelectOverlay('infrastructure')}
        className={`px-3 py-1.5 text-xs rounded-md ${
          selectedOverlay === 'infrastructure'
            ? 'bg-sky-100 text-sky-700 font-medium'
            : 'bg-white text-neutral-600 border border-neutral-200'
        }`}
      >
        <Building2 className="h-3 w-3 inline mr-1" />
        Infrastructure
      </button>
      <button
        onClick={() => onSelectOverlay('growth')}
        className={`px-3 py-1.5 text-xs rounded-md ${
          selectedOverlay === 'growth'
            ? 'bg-success-100 text-success-700 font-medium'
            : 'bg-white text-neutral-600 border border-neutral-200'
        }`}
      >
        <BarChart2 className="h-3 w-3 inline mr-1" />
        Growth
      </button>
    </div>
  );
};

export default MapOverlaySelector;
