import React from 'react'
import { ACROSS_CLASS_REGION_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const acrossClassRegionRoute = [
    {
        key: 'republicRepublic.republicRepublic',
        path: `${ACROSS_CLASS_REGION_PATH}/`,
        component: React.lazy(() => import('views/acrossClassRegion')),
        authority: [ADMIN],
    }
]

export default acrossClassRegionRoute
