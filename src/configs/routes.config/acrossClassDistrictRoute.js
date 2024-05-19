import React from 'react'
import { ACROSS_CLASS_DISTRICT_PATH } from 'constants/route.constant'
import { ADMIN } from 'constants/roles.constant'

const acrossClassDistrictRoute = [
    {
        key: 'acrossClassDistrict.acrossClassDistrict',
        path: `${ACROSS_CLASS_DISTRICT_PATH}/`,
        component: React.lazy(() => import('views/acrossClassDistrict')),
        authority: [ADMIN],
    }
]

export default acrossClassDistrictRoute
