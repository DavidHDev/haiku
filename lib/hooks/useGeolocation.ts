import { useEffect, useState } from 'react';

interface GeolocationCoordinates {
  latitude: number | null;
  longitude: number | null;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface UseGeolocationReturn {
  latitude: number | null;
  longitude: number | null;
  error: GeolocationError | null;
  loading: boolean;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const {
    enableHighAccuracy = false,
    timeout = 5000,
    maximumAge = 0,
    watch = false,
  } = options;

  const [position, setPosition] = useState<GeolocationCoordinates>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser.',
      });
      setLoading(false);
      return;
    }

    const positionOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    const onSuccess = (geolocationPosition: GeolocationPosition) => {
      setPosition({
        latitude: geolocationPosition.coords.latitude,
        longitude: geolocationPosition.coords.longitude,
      });
      setError(null);
      setLoading(false);
    };

    const onError = (error: GeolocationPositionError) => {
      let message: string;
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          message = 'The request to get user location timed out.';
          break;
        default:
          message = 'An unknown error occurred.';
          break;
      }

      setError({
        code: error.code,
        message,
      });
      setLoading(false);
    };

    let watchId: number | undefined;

    if (watch) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, positionOptions);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
    }

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [enableHighAccuracy, timeout, maximumAge, watch]);

  return {
    latitude: position.latitude,
    longitude: position.longitude,
    error,
    loading,
  };
}
