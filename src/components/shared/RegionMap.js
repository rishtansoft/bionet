import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// GeoJSON data for Uzbekistan
const uzbekistanGeo = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Uzbekistan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [55.968191, 41.308642],
            [55.928057, 41.29596],
            [55.905941, 41.300832],
            // Add more coordinates as needed
          ]
        ]
      }
    }
  ]
};

const UzbekistanMap = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1200 }}>
        <Geographies geography={uzbekistanGeo}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#D6D6DA"
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default UzbekistanMap;
