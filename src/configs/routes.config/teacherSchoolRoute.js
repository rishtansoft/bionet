import React from 'react'
import { TEACHER_SCHOOL_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const acrossClassSchoolRoute = [
    {
        key: 'acrossClassSchool.acrossClassSchool',
        path: `${TEACHER_SCHOOL_PATH}/`,
        component: React.lazy(() => import('views/teachers')),
        authority: [ADMIN],
    }
]

export default acrossClassSchoolRoute
