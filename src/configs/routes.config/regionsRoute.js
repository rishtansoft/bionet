import React from 'react'
import { REGIONS_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const regionsRoute = [
    {
        key: 'regions.regions',
        path: `${REGIONS_PREFIX_PATH}/`,
        component: React.lazy(() => import('views/regions')),
        authority: [ADMIN],
    }
]

export default regionsRoute
