import React from 'react';
import { Droplet, Shield, Building2, TrendingUp, BarChart2 } from 'lucide-react';

export type OverlayType = 'equihome' | 'liquidity' | 'crime' | 'infrastructure' | 'growth';

interface MapOverlaySelectorProps {
  selectedOverlay: OverlayType;
  onSelectOverlay: (overlay: OverlayType) => void;
}

// Overlay metadata with descriptions and colors
const overlayMetadata = {
  equihome: {
    icon: TrendingUp,
    label: 'Equihome Score',
    description: 'Overall investment potential based on ML analysis',
    activeClass: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
    iconClass: 'text-green-500'
  },
  liquidity: {
    icon: Droplet,
    label: 'Liquidity',
    description: 'Market liquidity and days on market',
    activeClass: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
    iconClass: 'text-blue-500'
  },
  crime: {
    icon: Shield,
    label: 'Safety',
    description: 'Crime rates and safety metrics',
    activeClass: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
    iconClass: 'text-green-500'
  },
  infrastructure: {
    icon: Building2,
    label: 'Infrastructure',
    description: 'Transport, amenities, and development',
    activeClass: 'bg-gradient-to-r from-sky-50 to-sky-100 text-sky-700 border-sky-200',
    iconClass: 'text-sky-500'
  },
  growth: {
    icon: BarChart2,
    label: 'Growth',
    description: 'Historical and projected price growth',
    activeClass: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
    iconClass: 'text-green-500'
  }
};

const MapOverlaySelector: React.FC<MapOverlaySelectorProps> = ({
  selectedOverlay,
  onSelectOverlay
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(overlayMetadata).map(([key, metadata]) => {
        const isSelected = selectedOverlay === key;
        const Icon = metadata.icon;

        return (
          <button
            key={key}
            onClick={() => onSelectOverlay(key as OverlayType)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-all duration-200 flex items-center ${
              isSelected
                ? metadata.activeClass + ' shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            }`}
            title={metadata.description}
          >
            <Icon className={`h-3.5 w-3.5 mr-1.5 ${isSelected ? metadata.iconClass : 'text-neutral-500'}`} />
            <span>{metadata.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MapOverlaySelector;
