import React from 'react'

import 'assets/map/mapdata';
import 'assets/map/countrymap';

function Map() {
  return (
    <div className='xl:col-span-5 rounded-lg border p-6 col-5'>
     <div id="map"></div>
    </div>
  )
}

export default Map