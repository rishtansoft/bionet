import React from 'react';
import { REPUBLIC_REPUBLIC_PATH } from 'constants/route.constant';
import { ADMIN } from 'constants/roles.constant';

const republicRepublicRoute = [
  {
    key: 'republicRepublic.republicRepublic',
    path: `${REPUBLIC_REPUBLIC_PATH}/`,
    component: React.lazy(() => import('views/republicRepublic')),
    authority: [ADMIN],
  },
  {
    key: 'republicRepublicDistrict.republicRepublicDistrict',
    path: `${REPUBLIC_REPUBLIC_PATH}/:region_id/`,
    component: React.lazy(() => import('views/districts')),
    authority: [ADMIN],
  },
  {
    key: 'republicRepublicSchool.republicRepublicSchool',
    path: `${REPUBLIC_REPUBLIC_PATH}/:region_id/:district_id/`,
    component: React.lazy(() => import('views/schools')),
    authority: [ADMIN],
  },
  {
    key: 'republicRepublicClass.republicRepublicClass',
    path: `${REPUBLIC_REPUBLIC_PATH}/:region_id/:district_id/:school_id/`,
    component: React.lazy(() => import('views/classes')),
    authority: [ADMIN],
  },
  {
    key: 'republicRepublicStudent.republicRepublicStudent',
    path: `${REPUBLIC_REPUBLIC_PATH}/:region_id/:district_id/:school_id/:student_id`,
    component: React.lazy(() => import('views/students')),
    authority: [ADMIN],
  },
];

export default republicRepublicRoute;
