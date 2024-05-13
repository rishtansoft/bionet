import React from 'react'
import { CLASSES_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const classesRoute = [
    {
        key: 'classes.classes',
        path: `${CLASSES_PREFIX_PATH}/:id`,
        component: React.lazy(() => import('views/classes')),
        authority: [ADMIN],
    }
]

export default classesRoute
