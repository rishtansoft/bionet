import React from 'react'
import { DASHBOARD_SCHOOL_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const dashboardSchoolRoute = [
    {
        key: 'dashboardRepublic.dashboardRepublic',
        path: `${DASHBOARD_SCHOOL_PATH}/`,
        component: React.lazy(() => import('views/dashboardSchool')),
        authority: [ADMIN],
    }
]

export default dashboardSchoolRoute
