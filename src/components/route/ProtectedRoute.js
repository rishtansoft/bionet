import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'

const ProtectedRoute = () => {
    const { authenticated } = useAuth()

    if (!authenticated) {
        return (
            <Navigate
                to='/home'
                replace
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoute
