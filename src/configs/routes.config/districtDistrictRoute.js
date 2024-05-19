import React from 'react'
import { DISTRICT_DISTRICT_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const districtDistrictRoute = [
    {
        key: 'republicRepublic.republicRepublic',
        path: `${DISTRICT_DISTRICT_PATH}/`,
        component: React.lazy(() => import('views/schools')),
        authority: [ADMIN],
    },
    {
        key: 'districtDistrictClasses.districtDistrictClasses',
        path: `${DISTRICT_DISTRICT_PATH}/:district_id/:school_id/`,
        component: React.lazy(() => import('views/classes')),
        authority: [ADMIN],
    },
    {
        key: 'districtDistrictStudents.districtDistrictStudents',
        path: `${DISTRICT_DISTRICT_PATH}/:district_id/:school_id/:student_id`,
        component: React.lazy(() => import('views/students')),
        authority: [ADMIN],
    }
]

export default districtDistrictRoute
