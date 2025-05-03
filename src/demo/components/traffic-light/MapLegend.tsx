import React from 'react';
import { Badge } from '../ui/badge';
import { OverlayType } from './MapOverlaySelector';

interface MapLegendProps {
  selectedOverlay: OverlayType;
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedOverlay }) => {
  // Overlay metadata
  const overlayMetadata = {
    equihome: {
      title: 'Equihome Score',
      description: 'Overall investment potential based on ML analysis'
    },
    liquidity: {
      title: 'Liquidity',
      description: 'Market liquidity and days on market'
    },
    crime: {
      title: 'Safety',
      description: 'Crime rates and safety metrics'
    },
    infrastructure: {
      title: 'Infrastructure',
      description: 'Transport, amenities, and development'
    },
    growth: {
      title: 'Growth Potential',
      description: 'Historical and projected price growth'
    }
  };

  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md border border-neutral-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-medium text-neutral-700">{overlayMetadata[selectedOverlay].title}</h4>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className="bg-green-100 text-green-800">Green Zone</Badge>
        <Badge className="bg-orange-100 text-orange-800">Yellow Zone</Badge>
        <Badge className="bg-red-100 text-red-800">Red Zone</Badge>
      </div>
      <div className="text-xs text-neutral-500 mt-1">
        {overlayMetadata[selectedOverlay].description}
      </div>
    </div>
  );
};

export default MapLegend;
