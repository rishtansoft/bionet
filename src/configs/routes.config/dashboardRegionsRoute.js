import React from 'react'
import { DASHBOARD_REGION_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const dashboardRegionRoute = [
    {
        key: 'dashboardRegion.dashboardRegion',
        path: `${DASHBOARD_REGION_PATH}/`,
        component: React.lazy(() => import('views/dashboard')),
        authority: [ADMIN],
    }
]

export default dashboardRegionRoute
