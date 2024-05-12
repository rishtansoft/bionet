import React, { memo, useMemo, lazy, Suspense } from 'react'
import { Loading } from 'components/shared'
import { useSelector } from 'react-redux'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_SIMPLE,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
    LAYOUT_TYPE_BLANK,
} from 'constants/theme.constant'
import useAuth from 'utils/hooks/useAuth'
import useDirection from 'utils/hooks/useDirection'
import useLocale from 'utils/hooks/useLocale'
import { useLocation } from 'react-router-dom'

const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
    [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
    [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
    [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
    [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {
    const layoutType = useSelector((state) => state.theme.layout.type)
    
    const location = useLocation();
    console.log(30, location.pathname);
    const { authenticated } = useAuth()

    useDirection()

    useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./AuthLayout'))
    }, [layoutType, authenticated])

    const HomeLayout = useMemo(() => {
        console.log("home layout");
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./HomeLayout'))
    }, [layoutType, authenticated])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            {
                location.pathname == '/home' && <HomeLayout></HomeLayout>
            }
            {
                location.pathname != '/home' && <AppLayout></AppLayout>
            }
        </Suspense>
    )
}

export default memo(Layout)
