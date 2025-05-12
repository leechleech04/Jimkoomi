import axios from 'axios';
import { LocationData } from '../types';

const url = 'https://api.mapbox.com/search/geocode/v6/forward';

export const fetchLocationData = async (
  query: string
): Promise<LocationData | null> => {
  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        access_token: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
        language: 'ko',
        limit: 1,
      },
    });

    if (response.data.features.length === 1) {
      const properties = response.data.features[0].properties;
      return {
        fullAddress: properties.full_address,
        latitude: properties.coordinates.latitude,
        longitude: properties.coordinates.longitude,
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
