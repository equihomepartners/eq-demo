import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import initialGeoJSON, { fetchSydneySuburbBoundaries } from '../../data/sydneySuburbBoundaries';
import suburbScores from '../../data/suburbScores';
import MapOverlaySelector, { OverlayType } from './MapOverlaySelector';
import MapLegend from './MapLegend';
import SuburbInfo from './SuburbInfo';

interface EnhancedTrafficLightMapProps {
  selectedSuburb?: string;
  propertyLocation?: {
    address: string;
    lat: number;
    lng: number;
  };
  onSuburbSelect?: (suburb: string) => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXF1aWhvbWVwYXJ0bmVycyIsImEiOiJjbTNzaDVnNnEwZTU0MmpyMGM1MWh0OWJvIn0.4-N9TZtnFGMNF9KYl34o5Q';

// Utility function to generate a consistent random number based on a seed string
function getConsistentRandom(seed: string, salt: string = ''): number {
  const combinedSeed = seed + salt;
  let hash = 0;
  for (let i = 0; i < combinedSeed.length; i++) {
    hash = ((hash << 5) - hash) + combinedSeed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // Convert to a number between 0 and 1
  return Math.abs((hash % 1000) / 1000);
}

// Function to generate diverse suburb scores for suburbs not explicitly defined
function generateDiverseSuburbScore(name: string): {
  score: number;
  confidence: number;
  zone: 'green' | 'yellow' | 'red';
  liquidity_score: number;
  liquidity_confidence: number;
  safety_score: number;
  safety_confidence: number;
  infrastructure_score: number;
  infrastructure_confidence: number;
  growth_score: number;
  growth_confidence: number;
} {
  // Use the suburb name as a seed for consistent randomness
  const baseRandom = getConsistentRandom(name);

  // Generate a base score with extreme bias toward yellow and red
  // This creates NO green zones outside of explicitly defined Eastern suburbs
  let baseScore: number;

  // Check if this is a western suburb based on name patterns
  // This is a simple heuristic and not geographically accurate
  const westernSuburbPatterns = [
    'WEST', 'PARK', 'VILLE', 'FIELD', 'WOOD', 'HILL', 'GROVE', 'VALE',
    'HEIGHTS', 'CREEK', 'BURY', 'TOWN', 'DALE', 'FORD', 'BRIDGE'
  ];

  // Check if this is an eastern suburb or northern beaches
  const easternSuburbPatterns = [
    'EAST', 'POINT', 'BEACH', 'BAY', 'HARBOUR', 'COVE', 'NORTH'
  ];

  const isLikelyWestern = westernSuburbPatterns.some(pattern => name.includes(pattern));
  const isLikelyEastern = easternSuburbPatterns.some(pattern => name.includes(pattern));

  // No randomly generated green zones at all - only explicitly defined ones
  if (false) {
    // This branch is never taken - no random green zones
    baseScore = 80 + Math.floor(baseRandom * 100) % 11;
  } else if (isLikelyWestern || baseRandom < 0.65) {
    // 65% chance of a low score (red zone), much higher if western suburb
    baseScore = 20 + Math.floor(baseRandom * 100) % 25;
  } else {
    // 35% chance of a middle score (yellow zone) with wide variation
    // Create more diversity within yellow zones
    if (baseRandom < 0.80) {
      // Lower yellow (closer to red)
      baseScore = 45 + Math.floor(baseRandom * 100) % 10;
    } else if (baseRandom < 0.95) {
      // Mid yellow
      baseScore = 50 + Math.floor(baseRandom * 100) % 10;
    } else {
      // Upper yellow (but not green)
      baseScore = 55 + Math.floor(baseRandom * 100) % 15;
    }
  }

  // Special case: Ensure western suburbs are almost always red
  if (isLikelyWestern) {
    baseScore = Math.min(baseScore, 44);
  }

  // Determine zone based on score
  const zone = baseScore >= 80 ? 'green' : (baseScore < 45 ? 'red' : 'yellow');

  // Generate confidence score - generally lower for most suburbs
  // Only about 10-15 suburbs should have confidence over 60
  let confidenceBase;

  // Use a different seed for confidence to ensure it's not correlated with score
  const confidenceRandom = getConsistentRandom(name, 'confidence_base');

  if (zone === 'green') {
    // Green zones get higher confidence, but still limited
    confidenceBase = 65;
  } else if (zone === 'yellow') {
    // Most yellow zones get moderate to low confidence
    if (confidenceRandom < 0.1) {
      // 10% of yellow zones get higher confidence
      confidenceBase = 55 + Math.floor(confidenceRandom * 100) % 10;
    } else {
      // 90% get lower confidence
      confidenceBase = 40 + Math.floor(confidenceRandom * 100) % 15;
    }
  } else {
    // Red zones get low confidence
    confidenceBase = 35 + Math.floor(confidenceRandom * 100) % 15;
  }

  // Special case: A few random suburbs get unusually high confidence
  // This ensures only about 10-15 suburbs total have confidence over 60
  let confBoost = 0;
  if (getConsistentRandom(name, 'high_conf') > 0.985) {
    // Only about 1.5% of suburbs get this boost
    confBoost = 15 + Math.floor(getConsistentRandom(name, 'conf_boost') * 15);
  }

  // Add some randomness to the confidence
  const confidence = confidenceBase + confBoost + Math.floor(getConsistentRandom(name, 'conf') * 15);

  // Generate individual scores with more significant variations
  // This creates more diversity in the overlay maps
  let liquidityScore = baseScore + Math.floor((getConsistentRandom(name, 'liq') * 40) - 20);
  let safetyScore = baseScore + Math.floor((getConsistentRandom(name, 'safety') * 40) - 20);
  let infrastructureScore = baseScore + Math.floor((getConsistentRandom(name, 'infra') * 40) - 20);
  let growthScore = baseScore + Math.floor((getConsistentRandom(name, 'growth') * 40) - 20);

  // Add some special cases for more realism
  // Some areas might have good infrastructure but poor safety, etc.
  if (getConsistentRandom(name, 'special') > 0.8) {
    // 20% of suburbs get a significant boost in one random category
    const specialCategory = Math.floor(getConsistentRandom(name, 'category') * 4);
    const boost = 15 + Math.floor(getConsistentRandom(name, 'boost') * 15);

    if (specialCategory === 0) {
      liquidityScore += boost;
    } else if (specialCategory === 1) {
      safetyScore += boost;
    } else if (specialCategory === 2) {
      infrastructureScore += boost;
    } else {
      growthScore += boost;
    }
  }

  // Generate confidence scores for each metric
  const liquidityConfidence = confidence + Math.floor((getConsistentRandom(name, 'liqconf') * 10) - 5);
  const safetyConfidence = confidence + Math.floor((getConsistentRandom(name, 'safetyconf') * 10) - 5);
  const infrastructureConfidence = confidence + Math.floor((getConsistentRandom(name, 'infraconf') * 10) - 5);
  const growthConfidence = confidence + Math.floor((getConsistentRandom(name, 'growthconf') * 10) - 5);

  // Ensure all scores are within valid ranges
  const clamp = (num: number) => Math.min(100, Math.max(0, num));

  return {
    score: clamp(baseScore),
    confidence: clamp(confidence),
    zone,
    liquidity_score: clamp(liquidityScore),
    liquidity_confidence: clamp(liquidityConfidence),
    safety_score: clamp(safetyScore),
    safety_confidence: clamp(safetyConfidence),
    infrastructure_score: clamp(infrastructureScore),
    infrastructure_confidence: clamp(infrastructureConfidence),
    growth_score: clamp(growthScore),
    growth_confidence: clamp(growthConfidence)
  };
}

const EnhancedTrafficLightMap: React.FC<EnhancedTrafficLightMapProps> = ({
  selectedSuburb = 'Mosman',
  propertyLocation = {
    address: '42 Mosman Street',
    lat: -33.8269,
    lng: 151.2466
  },
  onSuburbSelect
}) => {
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayType>('equihome');
  const [suburbBoundaries, setSuburbBoundaries] = useState(initialGeoJSON);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the full GeoJSON data when the component mounts
  useEffect(() => {
    const loadBoundaries = async () => {
      try {
        console.log('Loading full suburb boundaries...');
        const data = await fetchSydneySuburbBoundaries();
        console.log('Boundaries loaded:', data.features.length, 'features');
        setSuburbBoundaries(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading suburb boundaries:', error);
        setIsLoading(false);
      }
    };

    loadBoundaries();
  }, []);

  // Overlay color scales with gradient stops - Exact colors from production code
  const overlayColorScales = {
    equihome: {
      stops: [
        [0, 'rgba(178, 34, 34, 0.6)'],   // Deep red for lowest scores
        [20, 'rgba(220, 80, 20, 0.6)'],  // Orange-red
        [40, 'rgba(240, 140, 20, 0.6)'], // Orange
        [50, 'rgba(240, 180, 20, 0.6)'], // Amber
        [60, 'rgba(200, 200, 20, 0.6)'], // Yellow
        [70, 'rgba(150, 190, 20, 0.6)'], // Light yellow-green
        [80, 'rgba(100, 175, 15, 0.6)'], // Medium-light green
        [90, 'rgba(60, 160, 15, 0.6)'],  // Medium-dark green
        [100, 'rgba(34, 139, 34, 0.6)']  // Deep green for highest scores
      ],
      high: '#10b981',    // Green
      medium: '#f59e0b',  // Orange
      low: '#ef4444'      // Red
    },
    liquidity: {
      stops: [
        [0, 'rgba(239, 246, 255, 0.7)'],  // Lightest blue
        [25, 'rgba(191, 219, 254, 0.7)'], // Light blue
        [50, 'rgba(147, 197, 253, 0.7)'], // Medium blue
        [75, 'rgba(96, 165, 250, 0.7)'],  // Blue
        [100, 'rgba(59, 130, 246, 0.7)']  // Dark blue
      ],
      high: '#3b82f6',    // Blue
      medium: '#93c5fd',  // Medium blue
      low: '#dbeafe'      // Light blue
    },
    crime: {
      stops: [
        [0, 'rgba(224, 231, 255, 0.7)'],  // Lightest indigo
        [25, 'rgba(199, 210, 254, 0.7)'], // Light indigo
        [50, 'rgba(165, 180, 252, 0.7)'], // Medium indigo
        [75, 'rgba(129, 140, 248, 0.7)'], // Indigo
        [100, 'rgba(99, 102, 241, 0.7)']  // Dark indigo
      ],
      high: '#6366f1',    // Indigo
      medium: '#a5b4fc',  // Medium indigo
      low: '#e0e7ff'      // Light indigo
    },
    infrastructure: {
      stops: [
        [0, 'rgba(254, 243, 199, 0.7)'],  // Lightest amber
        [25, 'rgba(253, 230, 138, 0.7)'], // Light amber
        [50, 'rgba(252, 211, 77, 0.7)'],  // Medium amber
        [75, 'rgba(251, 191, 36, 0.7)'],  // Amber
        [100, 'rgba(245, 158, 11, 0.7)']  // Dark amber
      ],
      high: '#f59e0b',    // Amber
      medium: '#fcd34d',  // Medium amber
      low: '#fef3c7'      // Light amber
    },
    growth: {
      stops: [
        [0, 'rgba(209, 250, 229, 0.7)'],  // Lightest emerald
        [25, 'rgba(167, 243, 208, 0.7)'], // Light emerald
        [50, 'rgba(110, 231, 183, 0.7)'], // Medium emerald
        [75, 'rgba(52, 211, 153, 0.7)'],  // Emerald
        [100, 'rgba(16, 185, 129, 0.7)']  // Dark emerald
      ],
      high: '#10b981',    // Emerald
      medium: '#6ee7b7',  // Medium emerald
      low: '#d1fae5'      // Light emerald
    }
  };

  // Process suburb data with scores
  const processedData = useMemo(() => {
    console.log('Processing data with', suburbBoundaries.features.length, 'features');

    return {
      type: 'FeatureCollection',
      features: suburbBoundaries.features.map(feature => {
        // Get suburb name from properties
        const name = feature.properties?.nsw_loca_2 ||
                    feature.properties?.name ||
                    'Unknown';

        // Get suburb score data or generate a diverse score if not found
        const suburbScore = suburbScores[name] || generateDiverseSuburbScore(name);

        // Determine score and confidence based on selected overlay
        let score = suburbScore.score; // Default to overall score
        let confidence = suburbScore.confidence; // Default to overall confidence

        if (selectedOverlay === 'liquidity') {
          score = suburbScore.liquidity_score;
          confidence = suburbScore.liquidity_confidence;
        } else if (selectedOverlay === 'crime') {
          score = suburbScore.safety_score;
          confidence = suburbScore.safety_confidence;
        } else if (selectedOverlay === 'infrastructure') {
          score = suburbScore.infrastructure_score;
          confidence = suburbScore.infrastructure_confidence;
        } else if (selectedOverlay === 'growth') {
          score = suburbScore.growth_score;
          confidence = suburbScore.growth_confidence;
        }

        // Determine zone based on score with more nuanced thresholds
        let zone = 'yellow';
        if (score >= 80) {
          zone = 'green';
        } else if (score < 45) {
          zone = 'red';
        }

        return {
          ...feature,
          properties: {
            ...feature.properties,
            name,
            zone,
            score,
            confidence,
            // Include all scores for popup display
            overall_score: suburbScore.score,
            overall_confidence: suburbScore.confidence,
            liquidity_score: suburbScore.liquidity_score,
            liquidity_confidence: suburbScore.liquidity_confidence,
            safety_score: suburbScore.safety_score,
            safety_confidence: suburbScore.safety_confidence,
            infrastructure_score: suburbScore.infrastructure_score,
            infrastructure_confidence: suburbScore.infrastructure_confidence,
            growth_score: suburbScore.growth_score,
            growth_confidence: suburbScore.growth_confidence
          }
        };
      })
    };
  }, [selectedOverlay, suburbBoundaries]);

  // Style for polygon features with gradient based on score - Exact from production code
  const fillLayer = useMemo(() => {
    // Define color schemes for different overlays - Exact from production code
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
        // Vary opacity based on confidence for more visual depth
        'fill-opacity': [
          'interpolate',
          ['linear'],
          ['get', 'confidence'],
          40, 0.5,  // Low confidence = more transparent
          60, 0.65, // Medium confidence
          80, 0.75, // High confidence
          95, 0.85  // Very high confidence
        ]
      }
    };
  }, [selectedOverlay]);

  // Style for polygon outlines
  const lineLayer = {
    id: 'suburb-line',
    type: 'line',
    paint: {
      'line-color': '#ffffff',
      'line-width': [
        'case',
        ['==', ['get', 'name'], selectedSuburb.toUpperCase()],
        2,
        0.5
      ]
    }
  };

  // Property marker layer
  const propertyLayer = {
    id: 'property-marker',
    type: 'circle',
    paint: {
      'circle-radius': 8,
      'circle-color': '#3b82f6',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  };

  // Handle click on map
  const handleClick = useCallback((event: any) => {
    const features = event.features;

    if (!features || features.length === 0) {
      return;
    }

    const feature = features[0];
    const name = feature.properties?.name;

    if (name && onSuburbSelect) {
      onSuburbSelect(name);
    }
  }, [onSuburbSelect]);

  return (
    <div className="space-y-4">
      {/* Overlay selector */}
      <MapOverlaySelector
        selectedOverlay={selectedOverlay}
        onSelectOverlay={setSelectedOverlay}
      />

      {/* Map Container */}
      <div className="h-[500px] rounded-md overflow-hidden relative shadow-sm border border-neutral-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-neutral-600">Loading detailed suburb boundaries...</p>
            </div>
          </div>
        )}
        <Map
          initialViewState={{
            latitude: -33.8688, // Sydney CBD
            longitude: 151.2093,
            zoom: 10.5
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['suburb-fill']}
          onClick={handleClick}
          cursor="pointer"
          scrollZoom={false}
          dragRotate={false}
          dragPan={false}
          touchZoom={false}
          doubleClickZoom={false}
          touchPitch={false}
          keyboard={false}
        >
          <Source id="suburbs" type="geojson" data={processedData}>
            <Layer {...fillLayer as any} />
            <Layer {...lineLayer as any} />
          </Source>

          {/* Property location marker */}
          <Source
            id="property"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [propertyLocation.lng, propertyLocation.lat]
              },
              properties: {
                address: propertyLocation.address
              }
            }}
          >
            <Layer {...propertyLayer as any} />
          </Source>

          {/* Property popup */}
          <Popup
            longitude={propertyLocation.lng}
            latitude={propertyLocation.lat}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
          >
            <div className="p-2">
              <div className="text-xs font-medium">{propertyLocation.address}</div>
              <div className="text-xs text-neutral-500">Property Location</div>
            </div>
          </Popup>


        </Map>

        {/* Map Legend */}
        <MapLegend selectedOverlay={selectedOverlay} />

        {/* Selected suburb info */}
        <SuburbInfo selectedSuburb={selectedSuburb} />
      </div>
    </div>
  );
};

export default EnhancedTrafficLightMap;
