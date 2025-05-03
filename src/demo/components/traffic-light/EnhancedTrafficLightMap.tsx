import React, { useState, useCallback } from 'react';
import Map, { Source, Layer, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import sydneySuburbBoundaries from '../../data/sydneySuburbBoundariesSimplified';
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

  // Overlay color scales
  const overlayColorScales = {
    equihome: {
      high: '#22c55e', // Green
      medium: '#f97316', // Orange
      low: '#ef4444' // Red
    },
    liquidity: {
      high: '#3b82f6', // Blue
      medium: '#a855f7', // Purple
      low: '#f43f5e' // Pink
    },
    crime: {
      high: '#22c55e', // Green
      medium: '#f97316', // Orange
      low: '#ef4444' // Red
    },
    infrastructure: {
      high: '#0ea5e9', // Sky
      medium: '#6366f1', // Indigo
      low: '#a855f7' // Purple
    },
    growth: {
      high: '#22c55e', // Green
      medium: '#f97316', // Orange
      low: '#ef4444' // Red
    }
  };

  // Process suburb data with scores
  const processedData = {
    type: 'FeatureCollection',
    features: sydneySuburbBoundaries.features.map(feature => {
      // Get suburb name from properties
      const name = feature.properties?.nsw_loca_2 ||
                   feature.properties?.name ||
                   'Unknown';

      // Determine zone based on selected overlay
      let zone = 'yellow';
      let score = 50;

      // Simulate different scores for different overlays
      if (name === 'MOSMAN' || name === 'DOUBLE BAY' || name === 'VAUCLUSE' || name === 'BELLEVUE HILL') {
        zone = 'green';
        score = 85 + Math.random() * 15;
      } else if (name === 'MARRICKVILLE' || name === 'NEWTOWN' || name === 'SURRY HILLS') {
        zone = 'yellow';
        score = 50 + Math.random() * 25;
      } else if (name === 'BLACKTOWN' || name === 'MOUNT DRUITT' || name === 'LIVERPOOL') {
        zone = 'red';
        score = 20 + Math.random() * 30;
      } else {
        // Random zone for other suburbs
        const rand = Math.random();
        if (rand > 0.7) {
          zone = 'green';
          score = 75 + Math.random() * 25;
        } else if (rand > 0.3) {
          zone = 'yellow';
          score = 50 + Math.random() * 25;
        } else {
          zone = 'red';
          score = 20 + Math.random() * 30;
        }
      }

      return {
        ...feature,
        properties: {
          ...feature.properties,
          name,
          zone,
          score
        }
      };
    })
  };

  // Style for polygon features with gradient based on score
  const fillLayer = {
    id: 'suburb-fill',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'zone'],
        'green', overlayColorScales[selectedOverlay].high,
        'yellow', overlayColorScales[selectedOverlay].medium,
        'red', overlayColorScales[selectedOverlay].low,
        '#ccc'
      ],
      'fill-opacity': [
        'case',
        ['==', ['get', 'name'], selectedSuburb.toUpperCase()],
        0.8,
        0.6
      ]
    }
  };

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

          <NavigationControl position="top-right" />
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
