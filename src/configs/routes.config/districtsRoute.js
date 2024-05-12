import React from 'react'
import { DISTRICTS_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const districtsRoute = [
    {
        key: 'districts.districts',
        path: `${DISTRICTS_PREFIX_PATH}/`,
        component: React.lazy(() => import('views/districts')),
        authority: [ADMIN],
    }
]

export default districtsRoute
