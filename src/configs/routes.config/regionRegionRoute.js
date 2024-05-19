import React from 'react'
import { REGION_REGION_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const regionRegionRoute = [
    {
        key: 'regionRegion.regionRegion',
        path: `${REGION_REGION_PATH}/`,
        component: React.lazy(() => import('views/districts')),
        authority: [ADMIN],
    },
    {
        key: 'regionRegionSchools.regionRegionSchools',
        path: `${REGION_REGION_PATH}/:district_id/`,
        component: React.lazy(() => import('views/schools')),
        authority: [ADMIN],
    },
    {
        key: 'regionRegionClasses.regionRegionClasses',
        path: `${REGION_REGION_PATH}/:district_id/:school_id/`,
        component: React.lazy(() => import('views/classes')),
        authority: [ADMIN],
    },
    {
        key: 'regionRegionStudents.regionRegionStudents',
        path: `${REGION_REGION_PATH}/:district_id/:school_id/:student_id`,
        component: React.lazy(() => import('views/students')),
        authority: [ADMIN],
    }
]

export default regionRegionRoute
