import React from 'react';
import { Badge } from '../ui/badge';
import { OverlayType } from './MapOverlaySelector';

interface MapLegendProps {
  selectedOverlay: OverlayType;
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedOverlay }) => {
  // Overlay metadata with color stops
  const overlayMetadata = {
    equihome: {
      title: 'Equihome Score',
      description: 'Overall investment potential based on ML analysis',
      stops: [
        '#ef4444', // Red (low score)
        '#f97316', // Orange (medium-low score)
        '#facc15', // Yellow (medium score)
        '#84cc16', // Lime (medium-high score)
        '#22c55e'  // Green (high score)
      ]
    },
    liquidity: {
      title: 'Liquidity',
      description: 'Market liquidity and days on market',
      stops: [
        '#f43f5e', // Pink (low liquidity)
        '#a855f7', // Purple (medium-low liquidity)
        '#8b5cf6', // Violet (medium liquidity)
        '#6366f1', // Indigo (medium-high liquidity)
        '#3b82f6'  // Blue (high liquidity)
      ]
    },
    crime: {
      title: 'Safety',
      description: 'Crime rates and safety metrics',
      stops: [
        '#ef4444', // Red (high crime)
        '#f97316', // Orange (medium-high crime)
        '#facc15', // Yellow (medium crime)
        '#84cc16', // Lime (medium-low crime)
        '#22c55e'  // Green (low crime)
      ]
    },
    infrastructure: {
      title: 'Infrastructure',
      description: 'Transport, amenities, and development',
      stops: [
        '#a855f7', // Purple (low infrastructure)
        '#6366f1', // Indigo (medium-low infrastructure)
        '#3b82f6', // Blue (medium infrastructure)
        '#0ea5e9', // Sky (medium-high infrastructure)
        '#06b6d4'  // Cyan (high infrastructure)
      ]
    },
    growth: {
      title: 'Growth Potential',
      description: 'Historical and projected price growth',
      stops: [
        '#ef4444', // Red (low growth)
        '#f97316', // Orange (medium-low growth)
        '#facc15', // Yellow (medium growth)
        '#84cc16', // Lime (medium-high growth)
        '#22c55e'  // Green (high growth)
      ]
    }
  };

  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md border border-neutral-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-medium text-neutral-700">{overlayMetadata[selectedOverlay].title}</h4>
      </div>

      {/* Gradient legend */}
      <div className="mb-2">
        <div
          className="h-3 w-full rounded-sm mb-1"
          style={{
            background: selectedOverlay === 'equihome' ?
              `linear-gradient(to right,
                rgba(178, 34, 34, 0.65),
                rgba(220, 80, 20, 0.65),
                rgba(240, 180, 20, 0.65),
                rgba(150, 190, 20, 0.65),
                rgba(34, 139, 34, 0.65))` :
              selectedOverlay === 'liquidity' ?
              `linear-gradient(to right,
                rgba(239, 246, 255, 0.7),
                rgba(191, 219, 254, 0.7),
                rgba(147, 197, 253, 0.7),
                rgba(96, 165, 250, 0.7),
                rgba(59, 130, 246, 0.7))` :
              selectedOverlay === 'crime' ?
              `linear-gradient(to right,
                rgba(224, 231, 255, 0.7),
                rgba(199, 210, 254, 0.7),
                rgba(165, 180, 252, 0.7),
                rgba(129, 140, 248, 0.7),
                rgba(99, 102, 241, 0.7))` :
              selectedOverlay === 'infrastructure' ?
              `linear-gradient(to right,
                rgba(254, 243, 199, 0.7),
                rgba(253, 230, 138, 0.7),
                rgba(252, 211, 77, 0.7),
                rgba(251, 191, 36, 0.7),
                rgba(245, 158, 11, 0.7))` :
              `linear-gradient(to right,
                rgba(209, 250, 229, 0.7),
                rgba(167, 243, 208, 0.7),
                rgba(110, 231, 183, 0.7),
                rgba(52, 211, 153, 0.7),
                rgba(16, 185, 129, 0.7))`
          }}
        />
        <div className="flex justify-between text-[10px] text-neutral-600">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Zone indicators */}
      <div className="flex items-center space-x-2 mb-1">
        <Badge className="bg-green-100 text-green-800 text-[10px]">Green Zone</Badge>
        <Badge className="bg-orange-100 text-orange-800 text-[10px]">Yellow Zone</Badge>
        <Badge className="bg-red-100 text-red-800 text-[10px]">Red Zone</Badge>
      </div>

      <div className="text-xs text-neutral-500 mt-1">
        {overlayMetadata[selectedOverlay].description}
      </div>
    </div>
  );
};

export default MapLegend;
