import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  useEffect(() => {
    // Create map instance and specify initial center and zoom level
    const map = L.map('map').setView([41.3775, 64.5853], 7);

    // Add the tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add markers, polygons, or other map features as needed
    // Example:
    // L.marker([41.3775, 64.5853]).addTo(map)
    //   .bindPopup('Tashkent')
    //   .openPopup();
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default Map;
