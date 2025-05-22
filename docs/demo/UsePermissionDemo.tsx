import React from "react";
import { useState } from "react";
import { usePermission } from "react-haiku"

export const UsePermissionDemo = () => {
  const state = usePermission("geolocation")
  const [location, setLocation] = useState<GeolocationPosition | null>(null)

  function handleGetCurrentPosition() {
    if (state !== "prompt" && state !== "granted") return

    navigator.geolocation.getCurrentPosition((location) => {
      setLocation(location)
    })
  }

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Permission state: {state}</h3>

      <pre>
        {JSON.stringify(location ?? {}, null, 2)}
      </pre>

      <div style={{ marginTop: '1em', display: 'flex', gap: '1em' }}>
        <button
          className="demo-button green-button"
          onClick={handleGetCurrentPosition}
        >
          Get current position
        </button>
      </div>
    </div>
  );
}
