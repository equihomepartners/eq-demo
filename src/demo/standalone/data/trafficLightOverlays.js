/**
 * Traffic Light System Overlay Data
 *
 * This file contains the overlay data for the Traffic Light System.
 * Each overlay represents a different metric used to evaluate suburbs.
 *
 * This is the production overlay data from the main platform.
 */

export const trafficLightOverlays = {
  // Overall score - combines all metrics
  equihome: {
    id: "equihome",
    name: "Equihome Aggregate",
    description: "Overall Equihome investment opportunity score",
    colorScale: [
      { value: 0, color: "rgba(178, 34, 34, 0.75)" },   // More vibrant red (low score)
      { value: 50, color: "rgba(218, 165, 32, 0.8)" },  // Distinct gold/amber (medium score)
      { value: 100, color: "rgba(34, 139, 34, 0.85)" }  // More vibrant green (high score)
    ],
    dataKey: "overall",
    legendLabels: {
      high: "High Opportunity",
      medium: "Moderate Opportunity",
      low: "Limited Opportunity"
    }
  },

  // Liquidity - how easily properties can be bought/sold
  liquidity: {
    id: "liquidity",
    name: "Market Liquidity",
    description: "Property market liquidity and transaction volume",
    colorScale: [
      { value: 0, color: "rgba(176, 196, 222, 0.75)" },   // Light steel blue (low score)
      { value: 50, color: "rgba(70, 130, 180, 0.8)" },    // Steel blue (medium score)
      { value: 100, color: "rgba(25, 25, 112, 0.85)" }    // Deeper blue (high score)
    ],
    dataKey: "liquidity",
    legendLabels: {
      high: "High Liquidity",
      medium: "Moderate Liquidity",
      low: "Low Liquidity"
    }
  },

  // Crime/Safety - crime rates and general safety
  crime: {
    id: "crime",
    name: "Safety Index",
    description: "Area safety based on crime statistics (inverted)",
    colorScale: [
      { value: 0, color: "rgba(178, 34, 34, 0.75)" },   // More vibrant red (less safe)
      { value: 50, color: "rgba(218, 165, 32, 0.8)" },  // Distinct gold/amber (moderate)
      { value: 100, color: "rgba(34, 139, 34, 0.85)" }  // More vibrant green (safe)
    ],
    dataKey: "safety",
    legendLabels: {
      high: "Very Safe",
      medium: "Moderately Safe",
      low: "Less Safe"
    }
  },

  // Infrastructure - quality of local amenities
  infrastructure: {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Public transport, amenities, and development",
    colorScale: [
      { value: 0, color: "rgba(175, 238, 238, 0.75)" },   // Pale turquoise (low score)
      { value: 50, color: "rgba(64, 224, 208, 0.8)" },    // Turquoise (medium score)
      { value: 100, color: "rgba(0, 128, 128, 0.85)" }    // Deeper teal (high score)
    ],
    dataKey: "infrastructure",
    legendLabels: {
      high: "Excellent Infrastructure",
      medium: "Good Infrastructure",
      low: "Basic Infrastructure"
    }
  },

  // Growth - potential for property value increase
  growth: {
    id: "growth",
    name: "Growth Potential",
    description: "Projected capital growth over next 5 years",
    colorScale: [
      { value: 0, color: "rgba(147, 112, 219, 0.75)" },   // Medium purple (low score)
      { value: 50, color: "rgba(106, 90, 205, 0.8)" },    // Slate blue (medium score)
      { value: 100, color: "rgba(72, 61, 139, 0.85)" }    // Dark slate blue (high score)
    ],
    dataKey: "growth",
    legendLabels: {
      high: "High Growth",
      medium: "Moderate Growth",
      low: "Stable/Low Growth"
    }
  }
};

// Default overlay to show when the map first loads
export const defaultOverlay = "equihome";

// Mapbox access token for the map
export const mapboxAccessToken = "pk.eyJ1IjoiZXF1aWhvbWUiLCJhIjoiY2xnNXBtcGt1MDJvMzNkcGMxcHl1cWdvdCJ9.7Pw4VYC42jKLOUU8qOAl8g";

// Initial map view settings
export const initialViewState = {
  latitude: -33.8688,
  longitude: 151.2093,
  zoom: 10,
  bearing: 0,
  pitch: 0
};

// Property data for demo
export const demoProperties = [
  {
    id: "prop1",
    address: "123 Harbor View, Mosman",
    suburb: "MOSMAN",
    price: 2450000,
    bedrooms: 4,
    bathrooms: 3,
    carspaces: 2,
    type: "House",
    coordinates: [151.2516, -33.8219]
  },
  {
    id: "prop2",
    address: "45 Ocean Street, Double Bay",
    suburb: "DOUBLE BAY",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 2,
    carspaces: 1,
    type: "Apartment",
    coordinates: [151.2516, -33.8719]
  },
  {
    id: "prop3",
    address: "78 Bellevue Road, Bellevue Hill",
    suburb: "BELLEVUE HILL",
    price: 4100000,
    bedrooms: 5,
    bathrooms: 4,
    carspaces: 2,
    type: "House",
    coordinates: [151.2616, -33.8819]
  },
  {
    id: "prop4",
    address: "12 King Street, Newtown",
    suburb: "NEWTOWN",
    price: 1850000,
    bedrooms: 3,
    bathrooms: 2,
    carspaces: 1,
    type: "Terrace",
    coordinates: [151.1816, -33.8919]
  },
  {
    id: "prop5",
    address: "55 Campbell Parade, Bondi",
    suburb: "BONDI",
    price: 2950000,
    bedrooms: 3,
    bathrooms: 2,
    carspaces: 1,
    type: "Apartment",
    coordinates: [151.2816, -33.8919]
  }
];
