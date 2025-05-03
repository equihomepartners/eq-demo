# Traffic Light System - Standalone Setup Guide

This guide explains how to ensure the Traffic Light System works correctly in the standalone demo, with all the map boundaries, overlays, and data from the main platform.

## Overview

The Traffic Light System is a geographic analysis tool that displays Sydney suburbs color-coded by various investment metrics. It uses:

1. GeoJSON data for suburb boundaries
2. Overlay data for different metrics (liquidity, growth, infrastructure, etc.)
3. Mapbox for rendering the interactive map
4. Property data for displaying on the map

## Production Data Files

The standalone demo includes the following files with the exact production data from the main platform:

1. **`src/demo/standalone/data/sydneySuburbBoundaries.js`**: Contains the complete GeoJSON data for Sydney suburbs with their exact boundaries and metrics
2. **`src/demo/standalone/data/trafficLightOverlays.js`**: Contains the production overlay configurations with institutional-grade color schemes
3. **`src/demo/utils/trafficLightData.ts`**: Utility to ensure the correct data is used in standalone mode

## How It Works

The Traffic Light System uses environment detection to determine whether it's running in standalone mode or within the platform:

1. When running in standalone mode, it uses the data from the `standalone/data` directory
2. When running within the platform, it tries to use the data from the platform's data directory
3. If the platform data is not available, it falls back to the standalone data

## Ensuring the Map Works in Standalone Mode

To ensure the Traffic Light System works correctly in standalone mode:

1. Make sure the `sydneySuburbBoundaries.js` file contains complete and accurate GeoJSON data
2. Verify that the `trafficLightOverlays.js` file has the correct overlay configurations
3. Ensure the Mapbox access token in `trafficLightOverlays.js` is valid
4. Check that the `trafficLightData.ts` utility is correctly importing and exporting the data

## Production Data Details

### Suburb Boundaries

The `sydneySuburbBoundaries.js` file contains the complete GeoJSON data for all Sydney suburbs with their exact boundary coordinates. This is the same data used in the main platform, ensuring that the standalone demo displays the exact same map with all the detailed suburb boundaries.

### Overlay Configurations

The `trafficLightOverlays.js` file contains the production overlay configurations with the following metrics:

1. **Equihome Aggregate**: Overall investment opportunity score
2. **Market Liquidity**: Property market liquidity and transaction volume
3. **Safety Index**: Area safety based on crime statistics
4. **Infrastructure**: Public transport, amenities, and development
5. **Growth Potential**: Projected capital growth over next 5 years

Each overlay uses institutional-grade color schemes with carefully selected colors for optimal visualization:

- **Equihome**: Vibrant green (high) → Gold/amber (medium) → Vibrant red (low)
- **Liquidity**: Deep blue (high) → Steel blue (medium) → Light steel blue (low)
- **Safety**: Vibrant green (high) → Gold/amber (medium) → Vibrant red (low)
- **Infrastructure**: Deep teal (high) → Turquoise (medium) → Pale turquoise (low)
- **Growth**: Dark slate blue (high) → Slate blue (medium) → Medium purple (low)

### Updating the Map Data

If you need to update the map data:

1. Replace the content of `sydneySuburbBoundaries.js` with your updated GeoJSON data
2. Update the overlay configurations in `trafficLightOverlays.js` if needed
3. Update the Mapbox access token in `trafficLightOverlays.js` if it has expired

## Troubleshooting

If the map is not displaying correctly in standalone mode:

1. **Map not showing**: Check the browser console for errors. The most common issue is an invalid Mapbox token.
2. **Boundaries not appearing**: Verify that the GeoJSON data in `sydneySuburbBoundaries.js` is valid and complete.
3. **Colors not displaying correctly**: Check that the overlay configurations in `trafficLightOverlays.js` have the correct color scales.
4. **Properties not showing**: Ensure the demo properties in `trafficLightOverlays.js` have valid coordinates.

## Using the Traffic Light System in Your Application

To use the Traffic Light System in your application:

1. Import the necessary components from the demo:
   ```jsx
   import TrafficLightDemo from './demo/components/traffic-light/TrafficLightDemo';
   ```

2. Use the component in your application:
   ```jsx
   <TrafficLightDemo.Analysis />
   ```

3. The component will automatically use the correct data based on the environment.

## Customizing the Traffic Light System

To customize the Traffic Light System:

1. **Change the color scales**: Update the `colorScale` arrays in `trafficLightOverlays.js`
2. **Add new overlays**: Add new entries to the `trafficLightOverlays` object in `trafficLightOverlays.js`
3. **Update suburb metrics**: Modify the `metrics` objects in the features of `sydneySuburbBoundaries.js`
4. **Change the initial view**: Update the `initialViewState` object in `trafficLightOverlays.js`

## Important Notes

1. The Traffic Light System requires an internet connection to load the Mapbox tiles
2. The Mapbox access token has usage limits - for production use, you should use your own token
3. The GeoJSON data in the standalone demo is simplified for performance - for a complete dataset, you should use the actual data from your platform
