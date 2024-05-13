import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// GeoJSON data for Uzbekistan with complete coordinates
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
            [55.968191, 41.308642], // Start point (west-north)
            [55.928057, 41.29596],
            [55.905941, 41.300832],
            [55.883789, 41.292178],
            [55.868713, 41.283523],
            [55.853637, 41.274868],
            [55.838561, 41.266213],
            [55.823485, 41.257558],
            [55.808409, 41.248903], // West-South

            [55.808409, 37.206323], // South-West
            [62.242773, 37.206323], // South-East
            [62.242773, 45.579132], // North-East

            [55.968191, 45.579132], // North-West (close the polygon)
            [55.968191, 41.308642] // Start point again for continuity
          ]
        ]
      }
    }
  ]
};

const UzbekistanMap = () => {
  return (
    <div style={{ width: '100%', height: '500px', margin: '0 auto' }}> {/* Added styles */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1200 }}
        style={{ width: '100%', height: '500px' }} // Added inline styles
      >
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
