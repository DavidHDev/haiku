import { useGeolocation } from 'react-haiku';
import React from 'react';

export const UseGeolocationDemo = () => {
  const { latitude, longitude, error, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
  });
  
  return (
    <div className="demo-container-center">
      <b style={{ "marginBottom": "1em" }}>Geolocation Tracker!</b>
      
      {loading && (
        <p style={{ "marginBottom": "0", "color": "#007acc" }}>
          Loading location...
        </p>
      )}
      
      {error && (
        <div style={{ "marginBottom": "0", "color": "#ff4444" }}>
          <p style={{ "marginBottom": "0" }}>Error: {error.message}</p>
          <p style={{ "marginBottom": "0" }}>Code: {error.code}</p>
        </div>
      )}
      
      {!loading && !error && latitude !== null && longitude !== null && (
        <div>
          <p style={{ "marginBottom": "0" }}>
            Latitude: <span style={{"color": "#E46B39"}}>{latitude.toFixed(6)}</span>
          </p>
          <p style={{ "marginBottom": "0" }}>
            Longitude: <span style={{"color": "#E46B39"}}>{longitude.toFixed(6)}</span>
          </p>
        </div>
      )}
      
      <small style={{ "marginTop": "1em", "color": "#888" }}>
        Note: You may need to allow location permission in your browser.
      </small>
    </div>
  );
}
