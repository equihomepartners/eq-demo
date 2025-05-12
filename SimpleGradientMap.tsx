import React, { useState, useCallback, useMemo } from 'react';
import Map, { Source, Layer, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sydneySuburbBoundaries from '../../../data/sydneySuburbBoundaries';
import suburbScores from '../../../data/suburbScores';
import { formatNumber } from '../../../shared/utils/formatters';
import { BarChart2, Droplet, Shield, Building2, TrendingUp } from 'lucide-react';

interface SimpleGradientMapProps {
  onSuburbSelect: (suburb: string) => void;
}

// Define overlay types
type OverlayType = 'equihome' | 'liquidity' | 'crime' | 'infrastructure' | 'growth';

// Define overlay metadata
const overlayMetadata: Record<OverlayType, {
  name: string;
  description: string;
  icon: React.ReactNode;
  colorScale: {
    high: string;
    medium: string;
    low: string;
  };
}> = {
  equihome: {
    name: 'Equihome',
    description: 'Aggregate score based on all factors for overall investment potential',
    icon: <BarChart2 className="h-4 w-4 text-primary-500" />,
    colorScale: {
      high: '#10b981',
      medium: '#f59e0b',
      low: '#ef4444'
    }
  },
  liquidity: {
    name: 'Liquidity',
    description: 'Market activity and transaction volume',
    icon: <Droplet className="h-4 w-4 text-blue-500" />,
    colorScale: {
      high: '#3b82f6',
      medium: '#93c5fd',
      low: '#dbeafe'
    }
  },
  crime: {
    name: 'Safety',
    description: 'Safety index based on crime statistics (higher is safer)',
    icon: <Shield className="h-4 w-4 text-indigo-500" />,
    colorScale: {
      high: '#6366f1',
      medium: '#a5b4fc',
      low: '#e0e7ff'
    }
  },
  infrastructure: {
    name: 'Infrastructure',
    description: 'Access to amenities, services, and public facilities',
    icon: <Building2 className="h-4 w-4 text-amber-500" />,
    colorScale: {
      high: '#f59e0b',
      medium: '#fcd34d',
      low: '#fef3c7'
    }
  },
  growth: {
    name: 'Growth',
    description: 'Projected capital appreciation based on market trends',
    icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
    colorScale: {
      high: '#10b981',
      medium: '#6ee7b7',
      low: '#d1fae5'
    }
  }
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXF1aWhvbWVwYXJ0bmVycyIsImEiOiJjbTNzaDVnNnEwZTU0MmpyMGM1MWh0OWJvIn0.4-N9TZtnFGMNF9KYl34o5Q';

const SimpleGradientMap: React.FC<SimpleGradientMapProps> = ({ onSuburbSelect }) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayType>('equihome');

  // Process the GeoJSON data to add realistic scores for all overlays
  const processedData = useMemo(() => {
    // Define areas by investment potential for Equihome's business model
    // Premium areas - High equity, stable values, high liquidity
    const premiumAreas = [
      'Vaucluse', 'Bellevue Hill', 'Double Bay', 'Rose Bay', 'Point Piper',
      'Mosman', 'Cremorne', 'Neutral Bay', 'Kirribilli', 'Balmoral',
      'Woollahra', 'Paddington', 'Darling Point', 'Palm Beach'
    ];

    // Good areas - Solid investment with good potential
    const goodAreas = [
      'Bondi', 'Coogee', 'Bronte', 'Randwick', 'Clovelly',
      'Balmain', 'Rozelle', 'Hunters Hill', 'Northbridge', 'Cammeray',
      'Manly', 'Fairlight', 'Freshwater', 'Curl Curl', 'Avalon',
      'Lane Cove', 'Willoughby', 'Chatswood', 'Artarmon'
    ];

    // Mixed areas - Some potential but more risk factors
    const mixedAreas = [
      'Marrickville', 'Dulwich Hill', 'Ashfield', 'Summer Hill', 'Petersham',
      'Stanmore', 'Enmore', 'St Peters', 'Tempe', 'Sydenham',
      'Ryde', 'Gladesville', 'Drummoyne', 'Five Dock', 'Leichhardt',
      'Concord', 'Strathfield', 'Burwood', 'Croydon', 'Ashbury',
      'Newtown', 'Erskineville', 'Alexandria', 'Waterloo', 'Zetland',
      'Maroubra', 'Mascot', 'Botany', 'Rockdale', 'Kogarah'
    ];

    // Challenging areas - Higher risk, lower equity, more volatility
    const challengingAreas = [
      'Parramatta', 'Auburn', 'Granville', 'Merrylands', 'Guildford',
      'Bankstown', 'Canterbury', 'Campsie', 'Belmore', 'Lakemba',
      'Liverpool', 'Fairfield', 'Cabramatta', 'Canley Vale', 'Carramar',
      'Blacktown', 'Mount Druitt', 'St Marys', 'Penrith', 'Campbelltown'
    ];

    // Areas with high crime rates
    const highCrimeAreas = [
      'Kings Cross', 'Redfern', 'Waterloo', 'Mount Druitt', 'Blacktown',
      'Bankstown', 'Lakemba', 'Punchbowl', 'Cabramatta', 'Liverpool'
    ];

    // Areas with good infrastructure
    const goodInfrastructureAreas = [
      'Sydney', 'North Sydney', 'Chatswood', 'Parramatta', 'Bondi Junction',
      'Hurstville', 'Strathfield', 'Rhodes', 'Olympic Park', 'Macquarie Park'
    ];

    // Growth corridors
    const growthAreas = [
      'Parramatta', 'Liverpool', 'Blacktown', 'Penrith',
      'Alexandria', 'Waterloo', 'Zetland', 'Mascot', 'Green Square',
      'Marrickville', 'Dulwich Hill', 'Sydenham', 'Arncliffe', 'Wolli Creek',
      'Rhodes', 'Wentworth Point', 'Olympic Park', 'Meadowbank'
    ];

    // High liquidity areas
    const highLiquidityAreas = [
      'Vaucluse', 'Bellevue Hill', 'Double Bay', 'Rose Bay', 'Point Piper',
      'Mosman', 'Cremorne', 'Neutral Bay', 'Kirribilli',
      'Bondi', 'Coogee', 'Bronte', 'Randwick',
      'Manly', 'Fairlight', 'Freshwater',
      'Chatswood', 'Lane Cove', 'Willoughby'
    ];

    // Low liquidity areas
    const lowLiquidityAreas = [
      'Mount Druitt', 'St Marys', 'Penrith', 'Campbelltown',
      'Fairfield', 'Cabramatta', 'Canley Vale', 'Carramar',
      'Lakemba', 'Punchbowl', 'Wiley Park', 'Yagoona'
    ];

    // Generate a consistent random value for each suburb
    const getConsistentRandom = (name: string, salt: string = '') => {
      // Simple hash function to generate a consistent value for each name
      let hash = 0;
      const str = name + salt;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      // Normalize to 0-1 range
      return Math.abs((hash % 1000) / 1000);
    };

    // Helper function to check if a suburb name contains any of the areas in a list
    const containsAny = (name: string, areas: string[]) => {
      return areas.some(area => name.includes(area));
    };

    // Process features with realistic scores for all overlays
    return {
      type: 'FeatureCollection',
      features: sydneySuburbBoundaries.features.map(feature => {
        const name = feature.properties?.nsw_loca_2 || feature.properties?.name || 'Unknown';

        // Get score from suburbScores if available
        const scoreData = suburbScores[name];

        // Base score - either from suburbScores or generated
        let baseScore = 50;
        let confidence = 70;
        let zone = 'yellow';

        if (scoreData) {
          baseScore = scoreData.score;
          confidence = scoreData.confidence;
          zone = scoreData.zone;
        } else {
          // Generate realistic base score based on area type and Equihome's investment thesis
          if (containsAny(name, premiumAreas)) {
            // Premium areas - High score but with some variation
            baseScore = 75 + Math.floor(getConsistentRandom(name) * 20);
            // Higher confidence in premium areas
            confidence = 75 + Math.floor(getConsistentRandom(name, 'conf') * 20);
          } else if (containsAny(name, goodAreas)) {
            // Good areas - Solid scores with more variation
            baseScore = 65 + Math.floor(getConsistentRandom(name) * 20);
            confidence = 70 + Math.floor(getConsistentRandom(name, 'conf') * 20);
          } else if (containsAny(name, mixedAreas)) {
            // Mixed areas - Wide range of scores
            baseScore = 40 + Math.floor(getConsistentRandom(name) * 35);
            confidence = 60 + Math.floor(getConsistentRandom(name, 'conf') * 20);
          } else if (containsAny(name, challengingAreas)) {
            // Challenging areas - Lower scores with some exceptions
            baseScore = 20 + Math.floor(getConsistentRandom(name) * 30);
            confidence = 50 + Math.floor(getConsistentRandom(name, 'conf') * 20);
          } else {
            // For other suburbs, use distance from CBD as a factor
            const coords = feature.geometry.type === 'Polygon' && feature.geometry.coordinates[0] ?
              feature.geometry.coordinates[0][0] : [151.0, -33.9];

            // Rough distance from CBD (151.2093, -33.8688)
            const distX = coords[0] - 151.2093;
            const distY = coords[1] - (-33.8688);

            // Eastern suburbs (positive distX) and Northern suburbs (negative distY) tend to score higher
            let locationBonus = 0;
            if (distX > 0) locationBonus += 10; // Eastern
            if (distY < 0) locationBonus += 10; // Northern

            // Distance penalty (further = lower score, but with randomness)
            const distance = Math.sqrt(distX * distX + distY * distY);
            const distancePenalty = Math.min(30, distance * 15);

            // Add significant randomness to create a more varied map
            const randomFactor = getConsistentRandom(name) * 40 - 20;

            baseScore = Math.min(95, Math.max(10,
              50 + locationBonus - distancePenalty + randomFactor
            ));

            confidence = 40 + Math.floor(getConsistentRandom(name, 'conf') * 40);
          }

          // Determine zone based on score
          zone = baseScore >= 75 ? 'green' : (baseScore >= 45 ? 'yellow' : 'red');
        }

        // 1. Liquidity Score - Critical for Equihome's business model
        // Higher in premium areas and eastern/northern suburbs
        let liquidityScore;
        if (containsAny(name, highLiquidityAreas)) {
          liquidityScore = 70 + Math.floor(getConsistentRandom(name, 'liq') * 25);
        } else if (containsAny(name, lowLiquidityAreas)) {
          liquidityScore = 10 + Math.floor(getConsistentRandom(name, 'liq') * 25);
        } else {
          // Base liquidity on distance from CBD with significant randomness
          const coords = feature.geometry.type === 'Polygon' && feature.geometry.coordinates[0] ?
            feature.geometry.coordinates[0][0] : [151.0, -33.9];

          const distX = coords[0] - 151.2093;
          const distY = coords[1] - (-33.8688);

          let locationBonus = 0;
          if (distX > 0) locationBonus += 15; // Eastern suburbs bonus
          if (distY < 0) locationBonus += 15; // Northern suburbs bonus

          const distance = Math.sqrt(distX * distX + distY * distY);
          const distancePenalty = Math.min(40, distance * 20);

          // Add significant randomness
          const randomFactor = getConsistentRandom(name, 'liq') * 30 - 15;

          liquidityScore = Math.min(95, Math.max(10,
            50 + locationBonus - distancePenalty + randomFactor
          ));
        }

        // 2. Safety Score - Important for property value stability
        let safetyScore;
        if (containsAny(name, highCrimeAreas)) {
          safetyScore = 10 + Math.floor(getConsistentRandom(name, 'safety') * 30);
        } else if (containsAny(name, premiumAreas)) {
          safetyScore = 70 + Math.floor(getConsistentRandom(name, 'safety') * 25);
        } else if (containsAny(name, goodAreas)) {
          safetyScore = 60 + Math.floor(getConsistentRandom(name, 'safety') * 30);
        } else {
          // Add significant randomness for safety
          safetyScore = 20 + Math.floor(getConsistentRandom(name, 'safety') * 60);
        }

        // 3. Infrastructure Score - Impacts property values and growth
        let infraScore;
        if (containsAny(name, goodInfrastructureAreas)) {
          infraScore = 70 + Math.floor(getConsistentRandom(name, 'infra') * 25);
        } else {
          // Base on distance from CBD but with significant randomness
          const coords = feature.geometry.type === 'Polygon' && feature.geometry.coordinates[0] ?
            feature.geometry.coordinates[0][0] : [151.0, -33.9];

          const distance = Math.sqrt(
            Math.pow(coords[0] - 151.2093, 2) +
            Math.pow(coords[1] - (-33.8688), 2)
          );

          const distancePenalty = Math.min(50, distance * 25);
          const randomFactor = getConsistentRandom(name, 'infra') * 40 - 20;

          infraScore = Math.min(95, Math.max(10,
            70 - distancePenalty + randomFactor
          ));
        }

        // 4. Growth Score - Future potential, important for long-term returns
        let growthScore;
        if (containsAny(name, growthAreas)) {
          growthScore = 60 + Math.floor(getConsistentRandom(name, 'growth') * 35);
        } else if (containsAny(name, premiumAreas)) {
          // Premium areas have less growth potential (already high value)
          growthScore = 30 + Math.floor(getConsistentRandom(name, 'growth') * 30);
        } else {
          // Significant randomness for growth potential
          growthScore = 20 + Math.floor(getConsistentRandom(name, 'growth') * 60);
        }

        // Calculate a more realistic confidence score
        // Higher confidence in areas with more data and established patterns
        let confidenceScore;
        if (containsAny(name, premiumAreas) || containsAny(name, goodAreas)) {
          confidenceScore = 70 + Math.floor(getConsistentRandom(name, 'conf2') * 25);
        } else if (containsAny(name, growthAreas)) {
          // Less confidence in growth areas (more speculative)
          confidenceScore = 50 + Math.floor(getConsistentRandom(name, 'conf2') * 30);
        } else {
          // Wide range of confidence for other areas
          confidenceScore = 30 + Math.floor(getConsistentRandom(name, 'conf2') * 50);
        }

        return {
          ...feature,
          properties: {
            ...feature.properties,
            name,
            score: Math.round(baseScore),
            confidence: Math.round(confidenceScore),
            zone: baseScore >= 75 ? 'green' : (baseScore >= 45 ? 'yellow' : 'red'),
            liquidity_score: Math.round(liquidityScore),
            safety_score: Math.round(safetyScore),
            infrastructure_score: Math.round(infraScore),
            growth_score: Math.round(growthScore)
          }
        };
      })
    };
  }, [selectedOverlay]);

  // Handle click on map
  const handleClick = useCallback((event: any) => {
    if (!event.features || !event.features.length) return;

    const feature = event.features[0];
    const name = feature.properties?.name || feature.properties?.nsw_loca_2;

    if (name) {
      // Create popup data
      const popupData = {
        suburb: name,
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        zone: feature.properties.zone,
        score: feature.properties.score,
        confidence: feature.properties.confidence,
        overlayType: selectedOverlay,
        liquidity_score: feature.properties.liquidity_score,
        safety_score: feature.properties.safety_score,
        infrastructure_score: feature.properties.infrastructure_score,
        growth_score: feature.properties.growth_score
      };

      setPopupInfo(popupData);
      onSuburbSelect(name);
    }
  }, [onSuburbSelect, selectedOverlay]);

  // Layer styles based on selected overlay
  const fillLayer = useMemo(() => {
    // Define color schemes for different overlays
    const colorSchemes = {
      equihome: [
        'interpolate',
        ['linear'],
        ['get', 'score'],
        0, 'rgba(178, 34, 34, 0.6)',   // Deep red for lowest scores
        20, 'rgba(220, 80, 20, 0.6)',  // Orange-red
        40, 'rgba(240, 140, 20, 0.6)', // Orange
        50, 'rgba(240, 180, 20, 0.6)', // Amber
        60, 'rgba(200, 200, 20, 0.6)', // Yellow
        70, 'rgba(150, 190, 20, 0.6)', // Light yellow-green
        80, 'rgba(100, 175, 15, 0.6)', // Medium-light green
        90, 'rgba(60, 160, 15, 0.6)',  // Medium-dark green
        100, 'rgba(34, 139, 34, 0.6)'  // Deep green for highest scores
      ],
      liquidity: [
        'interpolate',
        ['linear'],
        ['get', 'liquidity_score'],
        0, 'rgba(239, 246, 255, 0.7)',  // Lightest blue
        25, 'rgba(191, 219, 254, 0.7)', // Light blue
        50, 'rgba(147, 197, 253, 0.7)', // Medium blue
        75, 'rgba(96, 165, 250, 0.7)',  // Blue
        100, 'rgba(59, 130, 246, 0.7)'  // Dark blue
      ],
      crime: [
        'interpolate',
        ['linear'],
        ['get', 'safety_score'],
        0, 'rgba(224, 231, 255, 0.7)',  // Lightest indigo
        25, 'rgba(199, 210, 254, 0.7)', // Light indigo
        50, 'rgba(165, 180, 252, 0.7)', // Medium indigo
        75, 'rgba(129, 140, 248, 0.7)', // Indigo
        100, 'rgba(99, 102, 241, 0.7)'  // Dark indigo
      ],
      infrastructure: [
        'interpolate',
        ['linear'],
        ['get', 'infrastructure_score'],
        0, 'rgba(254, 243, 199, 0.7)',  // Lightest amber
        25, 'rgba(253, 230, 138, 0.7)', // Light amber
        50, 'rgba(252, 211, 77, 0.7)',  // Medium amber
        75, 'rgba(251, 191, 36, 0.7)',  // Amber
        100, 'rgba(245, 158, 11, 0.7)'  // Dark amber
      ],
      growth: [
        'interpolate',
        ['linear'],
        ['get', 'growth_score'],
        0, 'rgba(209, 250, 229, 0.7)',  // Lightest emerald
        25, 'rgba(167, 243, 208, 0.7)', // Light emerald
        50, 'rgba(110, 231, 183, 0.7)', // Medium emerald
        75, 'rgba(52, 211, 153, 0.7)',  // Emerald
        100, 'rgba(16, 185, 129, 0.7)'  // Dark emerald
      ]
    };

    return {
      id: 'suburb-fill',
      type: 'fill',
      paint: {
        // Use the color scheme based on the selected overlay
        'fill-color': colorSchemes[selectedOverlay],
        // Vary opacity slightly based on confidence for more visual depth
        'fill-opacity': [
          'interpolate',
          ['linear'],
          ['get', 'confidence'],
          60, 0.5,
          80, 0.65,
          95, 0.8
        ]
      }
    };
  }, [selectedOverlay]);

  const lineLayer = {
    id: 'suburb-line',
    type: 'line',
    paint: {
      'line-color': '#2d3748',
      'line-width': 0.5,
      'line-opacity': 0.5
    }
  };

  return (
    <div className="space-y-4">
      {/* Overlay Selection Controls */}
      <div className="bg-white rounded-md shadow-sm border border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-neutral-700">Data Overlay</h3>
          <div className="text-xs text-neutral-500">
            Select an overlay to view different metrics
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {Object.keys(overlayMetadata).map((overlay) => (
            <button
              key={overlay}
              onClick={() => setSelectedOverlay(overlay as OverlayType)}
              className={`
                px-3 py-2.5 rounded-md border text-xs font-medium
                ${selectedOverlay === overlay
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }
                transition-colors duration-150 flex flex-col items-center justify-center
              `}
            >
              <span className="mb-1">{overlayMetadata[overlay as OverlayType].icon}</span>
              {overlayMetadata[overlay as OverlayType].name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[650px] rounded-md overflow-hidden relative shadow-sm border border-neutral-200">
        <Map
        initialViewState={{
          latitude: -33.8688, // Sydney CBD
          longitude: 151.2093,
          zoom: 9.0
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['suburb-fill']}
        onClick={handleClick}
        cursor="pointer"
      >
        <Source id="suburbs" type="geojson" data={processedData}>
          <Layer {...fillLayer as any} />
          <Layer {...lineLayer as any} />
        </Source>

        {/* Enhanced Popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            className="suburb-popup"
            maxWidth="300px"
          >
            <div className="p-0 max-w-xs overflow-hidden">
              <div className="border-b border-neutral-100 bg-neutral-50 px-3 py-2">
                <h3 className="font-medium text-base text-neutral-800">{popupInfo.suburb}</h3>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {overlayMetadata[popupInfo.overlayType].name} Analysis
                </div>
              </div>

              <div className="p-3">
                {/* Score and Confidence */}
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-neutral-700">Score:</span>
                    <span className="text-xs font-semibold">
                      {popupInfo.overlayType === 'equihome' ? popupInfo.score :
                       popupInfo.overlayType === 'liquidity' ? popupInfo.liquidity_score :
                       popupInfo.overlayType === 'crime' ? popupInfo.safety_score :
                       popupInfo.overlayType === 'infrastructure' ? popupInfo.infrastructure_score :
                       popupInfo.growth_score}/100
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${popupInfo.overlayType === 'equihome' ? popupInfo.score :
                                popupInfo.overlayType === 'liquidity' ? popupInfo.liquidity_score :
                                popupInfo.overlayType === 'crime' ? popupInfo.safety_score :
                                popupInfo.overlayType === 'infrastructure' ? popupInfo.infrastructure_score :
                                popupInfo.growth_score}%`,
                        backgroundColor: overlayMetadata[popupInfo.overlayType].colorScale.high
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium text-neutral-700">Confidence:</span>
                    <span className="text-xs">{popupInfo.confidence}%</span>
                  </div>
                </div>

                {/* View Full Analysis Button */}
                <div className="mt-3 pt-2 border-t border-neutral-100">
                  <button
                    className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-md border border-blue-200 transition-colors"
                    onClick={() => {
                      // Close the popup and trigger the analysis
                      setPopupInfo(null);
                      onSuburbSelect(popupInfo.suburb);
                    }}
                  >
                    View Full Analysis
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        )}

        <NavigationControl position="top-right" />
      </Map>

      {/* Map Legend */}
      <div className="absolute bottom-5 right-5 bg-white rounded-md shadow-sm z-10 max-w-xs border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-2">
          <h4 className="text-sm font-medium text-neutral-700">{overlayMetadata[selectedOverlay].name} Score</h4>
        </div>
        <div className="p-4">
          <div className="text-xs text-neutral-500 mb-3">{overlayMetadata[selectedOverlay].description}</div>

          {/* Gradient bar */}
          <div className="mb-3">
            <div className="h-3 w-full rounded-full overflow-hidden">
              <div className="h-full w-full" style={{
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
              }}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SimpleGradientMap;
