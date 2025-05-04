// This file provides access to the full Sydney suburb boundaries GeoJSON data
import { useEffect, useState } from 'react';

// Define the GeoJSON type
interface GeoJSONData {
  type: string;
  features: any[];
}

// Initial empty GeoJSON structure
const initialGeoJSON: GeoJSONData = {
  type: "FeatureCollection",
  features: []
};

// Function to fetch the GeoJSON data
export const fetchSydneySuburbBoundaries = async (): Promise<GeoJSONData> => {
  try {
    console.log('Fetching GeoJSON data...');
    const response = await fetch('/eq-demo/data/sydney-suburbs.geojson');
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sydney suburb boundaries:', error);
    return initialGeoJSON;
  }
};

// Hook to use the GeoJSON data in components
export const useSydneySuburbBoundaries = () => {
  const [boundaries, setBoundaries] = useState<GeoJSONData>(initialGeoJSON);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadBoundaries = async () => {
      try {
        const data = await fetchSydneySuburbBoundaries();
        setBoundaries(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    loadBoundaries();
  }, []);

  return { boundaries, loading, error };
};

// For backward compatibility, export the initial GeoJSON structure
export default initialGeoJSON;
