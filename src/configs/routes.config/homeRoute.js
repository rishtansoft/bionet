import React from 'react'

const authRoute = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/Home')),
        authority: [],
    }
]

export default authRoute
