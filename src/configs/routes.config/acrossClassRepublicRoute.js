import React from 'react'
import { ACROSS_CLASS_REPUBLIC_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const acrossClassRepublicRoute = [
    {
        key: 'acrossClassRegion.acrossClassRegion',
        path: `${ACROSS_CLASS_REPUBLIC_PATH}/`,
        component: React.lazy(() => import('views/acrossClassRepublic')),
        authority: [ADMIN],
    }
]

export default acrossClassRepublicRoute
