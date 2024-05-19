import React from 'react'
import { DASHBOARD_DISTRICT_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const dashboardDistrictRoute = [
    {
        key: 'dashboardDistrict.dashboardDistrict',
        path: `${DASHBOARD_DISTRICT_PATH}/`,
        component: React.lazy(() => import('views/dashboard')),
        authority: [ADMIN],
    }
]

export default dashboardDistrictRoute
