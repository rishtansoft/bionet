import React from 'react'
import { SCHOOLS_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const schoolsRoute = [
    {
        key: 'schools.schools',
        path: `${SCHOOLS_PREFIX_PATH}/:id`,
        component: React.lazy(() => import('views/schools')),
        authority: [ADMIN],
    }
]

export default schoolsRoute
