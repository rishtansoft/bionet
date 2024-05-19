import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const UzbekistanMap = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Sample data of provinces in Uzbekistan
  const provincesData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Andijan' },
        geometry: {
          type: 'Polygon',
          coordinates: [40.816935688714885, 72.2917567445066],
        },
      },

      {
        type: 'Feature',
        properties: { name: 'Farg`ona' },
        geometry: {
          type: 'Polygon',
          coordinates: [40.364343239650225, 71.77539935437892],
        },
      },

      {
        type: 'Feature',
        properties: { name: 'Namangan' },
        geometry: {
          type: 'Polygon',
          coordinates: [40.997528927630775, 71.6435634249846],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Toshkent' },
        geometry: {
          type: 'Polygon',
          coordinates: [41.29948441089361, 69.19361227607567],
        },
      },
      // Add more provinces similarly
    ],
  };

  const onEachProvince = (province, layer) => {
    layer.on({
      click: () => {
        setSelectedProvince(province.properties.name);
      },
    });
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={[41.3775, 64.5853]} zoom={7} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={provincesData}
          style={() => ({
            color: '#3388ff',
            weight: 1,
            fillColor: '#3388ff',
            fillOpacity: 0.3,
          })}
          onEachFeature={onEachProvince}
        />
      </MapContainer>
      {selectedProvince && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {selectedProvince.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UzbekistanMap;
