import React from 'react'
import { STUDENTS_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const studentsRoute = [
    {
        key: 'students.students',
        path: `${STUDENTS_PREFIX_PATH}/:id`,
        component: React.lazy(() => import('views/students')),
        authority: [ADMIN],
    }
]

export default studentsRoute
