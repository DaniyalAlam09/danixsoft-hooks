import { useState, useEffect } from 'react';

export interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    let watchId: number;

    const onEvent = (event: GeolocationPosition) => {
      if (mounted) {
        setState({
          loading: false,
          accuracy: event.coords.accuracy,
          altitude: event.coords.altitude,
          altitudeAccuracy: event.coords.altitudeAccuracy,
          heading: event.coords.heading,
          latitude: event.coords.latitude,
          longitude: event.coords.longitude,
          speed: event.coords.speed,
          timestamp: event.timestamp,
          error: null,
        });
      }
    };

    const onEventError = (error: GeolocationPositionError) => {
      if (mounted) {
        setState(s => ({ ...s, loading: false, error }));
      }
    };

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
      watchId = navigator.geolocation.watchPosition(onEvent, onEventError, options);
    } else {
      setState(s => ({ ...s, loading: false }));
    }

    return () => {
      mounted = false;
      if (watchId !== undefined && navigator?.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  return state;
}
