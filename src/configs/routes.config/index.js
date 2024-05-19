import authRoute from './authRoute'
import homeRoute from './homeRoute'
import appsRoute from './appsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import pagesRoute from './pagesRoute'
import authDemoRoute from './authDemoRoute'
import docsRoute from './docsRoute'
import regionsRoute from './regionsRoute'
import districtsRoute from './districtsRoute'
import schoolsRoute from './schoolsRoute'
import classesRoute from './classesRoute'
import studentsRoute from './studentsRoute'

import dashboardRepublicRoute from './dashboardRepublicRoute'
import republicRepublicRoute from './republicRepublicRoute'
import acrossClassRepublicRoute from './acrossClassRepublicRoute'

import dashboardRegionRoute from './dashboardRegionsRoute';
import regionRegionRoute from './regionRegionRoute';
import acrossClassRegionRoute from './acrossClassRegionRoute';

import dashboardDistrictRoute from './dashboardDistrictRoute';
import districtDistrictRoute from './districtDistrictRoute';
import acrossClassDistrictRoute from './acrossClassDistrictRoute';

import dashboardSchoolRoute from './dashboardSchoolRoute';
import schoolSchoolRoute from './schoolSchoolRoute';
import acrossClassSchoolRoute from './acrossClassSchoolRoute';
import teacherSchoolRoute from './teacherSchoolRoute';

export const publicRoutes = [...authRoute, ...homeRoute]

export const protectedRoutes = [
    ...appsRoute,
    // ...uiComponentsRoute,
    // ...pagesRoute,
    // ...authDemoRoute,
    // ...docsRoute,
    // ...regionsRoute,
    // ...districtsRoute,
    // ...schoolsRoute,
    // ...classesRoute,
    // ...studentsRoute,
    ...dashboardRepublicRoute,
    ...republicRepublicRoute,
    ...acrossClassRepublicRoute,
    ...dashboardSchoolRoute,
    ...schoolSchoolRoute,
    ...acrossClassSchoolRoute,
    ...dashboardDistrictRoute,
    ...districtDistrictRoute,
    ...acrossClassDistrictRoute,
    ...dashboardRegionRoute,
    ...regionRegionRoute,
    ...acrossClassRegionRoute
]

export const protectedRoutesRepublic = [
    ...dashboardRepublicRoute,
    ...republicRepublicRoute,
    ...acrossClassRepublicRoute
]

export const protectedRoutesRegions = [
    ...dashboardRegionRoute,
    ...regionRegionRoute,
    ...acrossClassRegionRoute
]

export const protectedRoutesDistricts = [
    ...dashboardDistrictRoute,
    ...districtDistrictRoute,
    ...acrossClassDistrictRoute
]

export const protectedRoutesSchools = [
    ...dashboardSchoolRoute,
    ...schoolSchoolRoute,
    ...acrossClassSchoolRoute,
    ...teacherSchoolRoute,
]
