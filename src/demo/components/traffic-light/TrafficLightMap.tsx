import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { getTrafficLightData } from '../../utils/trafficLightData';

interface TrafficLightMapProps {
  selectedSuburb?: string;
}

const TrafficLightMap: React.FC<TrafficLightMapProps> = ({ selectedSuburb = 'Mosman' }) => {
  const [trafficLightData, setTrafficLightData] = useState<any>(null);

  // Load traffic light data
  useEffect(() => {
    const data = getTrafficLightData();
    setTrafficLightData(data);
  }, []);

  // Map configuration
  const mapData = {
    width: 800,
    height: 600,
    viewBox: "0 0 800 600",
    center: { x: 400, y: 300 },
  };

  // Get zone color
  const getZoneColor = (suburb: string) => {
    if (!trafficLightData) return "#cccccc"; // Default gray if data not loaded

    if (trafficLightData.zones.green.includes(suburb)) {
      return "#22c55e"; // Green
    } else if (trafficLightData.zones.orange.includes(suburb)) {
      return "#f97316"; // Orange
    } else if (trafficLightData.zones.red.includes(suburb)) {
      return "#ef4444"; // Red
    } else {
      return "#cccccc"; // Gray for unknown
    }
  };

  // Get zone name
  const getZoneName = (suburb: string) => {
    if (!trafficLightData) return "Unknown";

    if (trafficLightData.zones.green.includes(suburb)) {
      return "Green";
    } else if (trafficLightData.zones.orange.includes(suburb)) {
      return "Orange";
    } else if (trafficLightData.zones.red.includes(suburb)) {
      return "Red";
    } else {
      return "Unknown";
    }
  };

  // Get suburb polygons from traffic light data
  const suburbPolygons = trafficLightData?.suburbPolygons || {};

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
            {trafficLightData && Object.entries(suburbPolygons).map(([suburb, points]) => {
              const color = getZoneColor(suburb);
              const isSelected = suburb === selectedSuburb;

              // Skip rendering if no points or invalid data
              if (!Array.isArray(points) || points.length === 0) return null;

              return (
                <g key={suburb}>
                  <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill={color}
                    fillOpacity={isSelected ? 0.8 : 0.6}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  {/* Only show text for selected suburb or major suburbs to avoid clutter */}
                  {(isSelected || ['Mosman', 'Bondi', 'Randwick', 'Marrickville', 'Blacktown', 'Double Bay'].includes(suburb)) && (
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
                  )}
                </g>
              );
            })}

            {/* Selected suburb highlight */}
            {trafficLightData && selectedSuburb && suburbPolygons[selectedSuburb] && Array.isArray(suburbPolygons[selectedSuburb]) && suburbPolygons[selectedSuburb].length > 0 && (
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
          Detailed visualization of Sydney suburbs with Traffic Light System zoning
        </div>
      </div>
    </div>
  );
};

export default TrafficLightMap;
