import authRoute from './authRoute'
import homeRoute from './homeRoute'
import appsRoute from './appsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import pagesRoute from './pagesRoute'
import authDemoRoute from './authDemoRoute'
import docsRoute from './docsRoute'

export const publicRoutes = [...authRoute, ...homeRoute]

export const protectedRoutes = [
    ...appsRoute,
    ...uiComponentsRoute,
    ...pagesRoute,
    ...authDemoRoute,
    ...docsRoute,
]
