import React from 'react'
import { SCHOOLS_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const classesCrossRouter = [
    {
        key: 'classes_cross.classes_cross',
        path: `/class-cross`,
        component: React.lazy(() => import('views/classesCross')),
        authority: [ADMIN],
    }
]

export default classesCrossRouter
