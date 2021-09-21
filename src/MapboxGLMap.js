import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxGLMap = ({ stations, currentIndex }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const currentStationFeature = stations.features[currentIndex]
  const currentStationMarker = currentStationFeature.properties.marker

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
        center: [-73.970524, 40.674594],
        zoom: 14.5,
        // interactive: false
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        map.addSource('stations', {
          type: 'geojson',
          data: stations
        })

        map.addLayer({
          id: 'stations-circle',
          type: 'circle',
          source: 'stations',
          'paint': {
            'circle-radius': 3,
            'circle-color': '#4287f5',
            'circle-opacity': 0.6
          },
        })

        map.addLayer({
          id: 'stations-highlighted-circle',
          type: 'circle',
          source: 'stations',
          'paint': {
            'circle-radius': 4,
            'circle-color': 'yellow'
          },
          filter: ['==', 'marker', currentStationMarker]
        })
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]) // eslint-disable-line

useEffect(() => {
  if (map) {
    map.setFilter('stations-highlighted-circle', ['==', 'marker', currentStationMarker]);
    map.flyTo({
      center: currentStationFeature.geometry.coordinates,
      speed: 0.1
    })
  }
}, [ currentStationMarker ]) // eslint-disable-line


  return <div ref={el => (mapContainer.current = el)} className='w-full h-full' />
};

export default MapboxGLMap;
