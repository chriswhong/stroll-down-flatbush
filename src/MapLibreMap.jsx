import React, { useEffect, useRef, useState } from "react";
import { Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapLibreMap = ({ stations, currentIndex }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const currentStationFeature = stations.features[currentIndex]
  const currentStationMarker = currentStationFeature.properties.marker

  useEffect(() => {
    // guard against React StrictMode's dev-only double effect invocation,
    // which would otherwise create two Map instances in the same container
    if (mapRef.current) return;

    const mapInstance = new MaplibreMap({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/dark",
      center: [-73.970524, 40.674594],
      zoom: 14.5,
      interactive: false,
      attributionControl: { compact: true }
    });
    mapRef.current = mapInstance;

    mapInstance.on("load", () => {
      mapInstance.addSource('stations', {
        type: 'geojson',
        data: stations
      })

      mapInstance.addLayer({
        id: 'stations-circle',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': 3,
          'circle-color': '#4287f5',
          'circle-opacity': 0.6
        },
      })

      mapInstance.addLayer({
        id: 'stations-highlighted-circle',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': 4,
          'circle-color': 'yellow'
        },
        filter: ['==', 'marker', currentStationMarker]
      })

      setMap(mapInstance);
    });

    return () => {
      mapInstance.remove();
      mapRef.current = null;
    };
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map) {
      map.setFilter('stations-highlighted-circle', ['==', 'marker', currentStationMarker]);
      map.flyTo({
        center: currentStationFeature.geometry.coordinates,
        duration: 300
      })
    }
  }, [ currentStationMarker ]) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mapContainer} className='w-full h-full' />
};

export default MapLibreMap;
