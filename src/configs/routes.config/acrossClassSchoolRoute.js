import React from 'react'
import { ACROSS_CLASS_SCHOOL_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const acrossClassSchoolRoute = [
    {
        key: 'acrossClassSchool.acrossClassSchool',
        path: `${ACROSS_CLASS_SCHOOL_PATH}/`,
        component: React.lazy(() => import('views/acrossClassSchool')),
        authority: [ADMIN],
    }
]

export default acrossClassSchoolRoute
