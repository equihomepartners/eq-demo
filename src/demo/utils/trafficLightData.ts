/**
 * Traffic Light Data Utility
 *
 * This utility ensures the Traffic Light System uses the correct data
 * whether running in standalone mode or within the platform.
 */

import { isStandalone } from './environment';

// Import traffic light zones
import { trafficLightZones } from '../../data/trafficLightZones';

// Import standalone data
import standaloneBoundaries from '../standalone/data/sydneySuburbBoundaries';
import { trafficLightOverlays as standaloneOverlays, defaultOverlay, mapboxAccessToken, initialViewState, demoProperties } from '../standalone/data/trafficLightOverlays';

// Get the correct suburb boundaries data
export const getSuburbBoundaries = () => {
  if (isStandalone()) {
    return standaloneBoundaries;
  }

  try {
    // Try to import from the platform
    const platformBoundaries = require('../../../data/sydneySuburbBoundaries').default;
    return platformBoundaries;
  } catch (error) {
    console.warn('Failed to load platform suburb boundaries, falling back to standalone data');
    return standaloneBoundaries;
  }
};

// Get the correct overlay data
export const getTrafficLightOverlays = () => {
  if (isStandalone()) {
    return standaloneOverlays;
  }

  try {
    // Try to import from the platform
    const platformOverlays = require('../../../data/trafficLightOverlays').trafficLightOverlays;
    return platformOverlays;
  } catch (error) {
    console.warn('Failed to load platform overlays, falling back to standalone data');
    return standaloneOverlays;
  }
};

// Get the default overlay
export const getDefaultOverlay = () => {
  if (isStandalone()) {
    return defaultOverlay;
  }

  try {
    // Try to import from the platform
    const platformDefaultOverlay = require('../../../data/trafficLightOverlays').defaultOverlay;
    return platformDefaultOverlay;
  } catch (error) {
    console.warn('Failed to load platform default overlay, falling back to standalone data');
    return defaultOverlay;
  }
};

// Get the Mapbox access token
export const getMapboxAccessToken = () => {
  if (isStandalone()) {
    return mapboxAccessToken;
  }

  try {
    // Try to import from the platform
    const platformToken = require('../../../data/trafficLightOverlays').mapboxAccessToken;
    return platformToken;
  } catch (error) {
    console.warn('Failed to load platform Mapbox token, falling back to standalone data');
    return mapboxAccessToken;
  }
};

// Get the initial view state
export const getInitialViewState = () => {
  if (isStandalone()) {
    return initialViewState;
  }

  try {
    // Try to import from the platform
    const platformViewState = require('../../../data/trafficLightOverlays').initialViewState;
    return platformViewState;
  } catch (error) {
    console.warn('Failed to load platform view state, falling back to standalone data');
    return initialViewState;
  }
};

// Get the demo properties
export const getDemoProperties = () => {
  if (isStandalone()) {
    return demoProperties;
  }

  try {
    // Try to import from the platform
    const platformProperties = require('../../../data/trafficLightOverlays').demoProperties;
    return platformProperties;
  } catch (error) {
    console.warn('Failed to load platform properties, falling back to standalone data');
    return demoProperties;
  }
};

// Get all traffic light data for the map component
export const getTrafficLightData = () => {
  const boundaries = getSuburbBoundaries();

  // Create a simplified data structure for the map component
  return {
    zones: trafficLightZones,
    suburbPolygons: boundaries,
    overlays: getTrafficLightOverlays(),
    defaultOverlay: getDefaultOverlay(),
    mapboxAccessToken: getMapboxAccessToken(),
    initialViewState: getInitialViewState(),
    demoProperties: getDemoProperties()
  };
};
