import React from 'react'
import { DASHBOARD_REPUBLIC_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const dashboardRepublicRoute = [
    {
        key: 'dashboardRepublic.dashboardRepublic',
        path: `${DASHBOARD_REPUBLIC_PATH}/`,
        component: React.lazy(() => import('views/dashboard')),
        authority: [ADMIN],
    }
]

export default dashboardRepublicRoute
