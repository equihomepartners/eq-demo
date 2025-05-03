import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { trafficLightZones } from '../../../data/trafficLightZones';

interface TrafficLightMapProps {
  selectedSuburb?: string;
}

const TrafficLightMap: React.FC<TrafficLightMapProps> = ({ selectedSuburb = 'Mosman' }) => {
  // Mock data for Sydney map visualization
  const mapData = {
    width: 800,
    height: 600,
    viewBox: "0 0 800 600",
    center: { x: 400, y: 300 },
  };

  // Get zone color
  const getZoneColor = (suburb: string) => {
    if (trafficLightZones.green.includes(suburb)) {
      return "#22c55e"; // Green
    } else if (trafficLightZones.orange.includes(suburb)) {
      return "#f97316"; // Orange
    } else {
      return "#ef4444"; // Red
    }
  };

  // Get zone name
  const getZoneName = (suburb: string) => {
    if (trafficLightZones.green.includes(suburb)) {
      return "Green";
    } else if (trafficLightZones.orange.includes(suburb)) {
      return "Orange";
    } else {
      return "Red";
    }
  };

  // Simplified suburb polygons for visualization
  const suburbPolygons = {
    "Mosman": [
      { x: 420, y: 250 },
      { x: 450, y: 260 },
      { x: 460, y: 290 },
      { x: 440, y: 310 },
      { x: 410, y: 300 },
      { x: 400, y: 270 },
    ],
    "Double Bay": [
      { x: 460, y: 320 },
      { x: 490, y: 330 },
      { x: 500, y: 350 },
      { x: 480, y: 370 },
      { x: 450, y: 360 },
      { x: 440, y: 340 },
    ],
    "Bondi": [
      { x: 510, y: 340 },
      { x: 540, y: 350 },
      { x: 550, y: 380 },
      { x: 530, y: 400 },
      { x: 500, y: 390 },
      { x: 490, y: 360 },
    ],
    "Randwick": [
      { x: 500, y: 400 },
      { x: 530, y: 410 },
      { x: 540, y: 440 },
      { x: 520, y: 460 },
      { x: 490, y: 450 },
      { x: 480, y: 420 },
    ],
    "Marrickville": [
      { x: 450, y: 400 },
      { x: 480, y: 410 },
      { x: 490, y: 440 },
      { x: 470, y: 460 },
      { x: 440, y: 450 },
      { x: 430, y: 420 },
    ],
    "Blacktown": [
      { x: 200, y: 300 },
      { x: 230, y: 310 },
      { x: 240, y: 340 },
      { x: 220, y: 360 },
      { x: 190, y: 350 },
      { x: 180, y: 320 },
    ],
  };

  return (
    <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-neutral-700">Traffic Light Zoning Map</h3>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">Green Zone</Badge>
          <Badge className="bg-orange-100 text-orange-800">Orange Zone</Badge>
          <Badge className="bg-red-100 text-red-800">Red Zone</Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="relative bg-blue-50 rounded-md overflow-hidden" style={{ height: '400px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox={mapData.viewBox}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Water background */}
            <rect x="0" y="0" width={mapData.width} height={mapData.height} fill="#e0f2fe" />
            
            {/* Suburb polygons */}
            {Object.entries(suburbPolygons).map(([suburb, points]) => {
              const color = getZoneColor(suburb);
              const isSelected = suburb === selectedSuburb;
              
              return (
                <g key={suburb}>
                  <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill={color}
                    fillOpacity={isSelected ? 0.8 : 0.6}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    x={points.reduce((sum, p) => sum + p.x, 0) / points.length}
                    y={points.reduce((sum, p) => sum + p.y, 0) / points.length}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {suburb}
                  </text>
                </g>
              );
            })}
            
            {/* Selected suburb highlight */}
            {selectedSuburb && suburbPolygons[selectedSuburb] && (
              <g>
                <circle
                  cx={suburbPolygons[selectedSuburb].reduce((sum, p) => sum + p.x, 0) / suburbPolygons[selectedSuburb].length}
                  cy={suburbPolygons[selectedSuburb].reduce((sum, p) => sum + p.y, 0) / suburbPolygons[selectedSuburb].length}
                  r="10"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              </g>
            )}
          </svg>
          
          {/* Selected suburb info */}
          {selectedSuburb && (
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md border border-neutral-200">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium">{selectedSuburb}</h4>
                <Badge className={`bg-${getZoneName(selectedSuburb).toLowerCase()}-100 text-${getZoneName(selectedSuburb).toLowerCase()}-800`}>
                  {getZoneName(selectedSuburb)} Zone
                </Badge>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Click on a suburb to view details</p>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-xs text-neutral-500 text-center">
          Simplified visualization of Sydney suburbs with Traffic Light System zoning
        </div>
      </div>
    </div>
  );
};

export default TrafficLightMap;
