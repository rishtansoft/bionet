import React from 'react'
import { SCHOOL_SCHOOL_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const schoolSchoolRoute = [
    {
        key: 'schoolSchool.schoolSchool',
        path: `${SCHOOL_SCHOOL_PATH}/`,
        component: React.lazy(() => import('views/schools')),
        authority: [ADMIN],
    },
    {
        key: 'republicRepublic.republicRepublic',
        path: `${SCHOOL_SCHOOL_PATH}/:school_id`,
        component: React.lazy(() => import('views/classes')),
        authority: [ADMIN],
    },
    {
        key: 'republicRepublic.republicRepublic',
        path: `${SCHOOL_SCHOOL_PATH}/:school_id/:student_id`,
        component: React.lazy(() => import('views/students')),
        authority: [ADMIN],
    }

]

export default schoolSchoolRoute
