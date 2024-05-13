import { APP_PREFIX_PATH, REGIONS_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    // NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsNavigationConfig = [
    {
        key: 'apps',
        path: '',
        title: 'DASHBOARD',
        translateKey: 'MAIN',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            // {
            //     key: 'appsCrm.dashboard',
            //     path: `${APP_PREFIX_PATH}/crm/dashboard`,
            //     title: 'Dashboard',
            //     translateKey: 'DASHBOARD',
            //     icon: 'dashboard',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },
            {
                key: 'regions.regions',
                path: `${REGIONS_PREFIX_PATH}`,
                title: 'Viloyatlar',
                translateKey: 'Regions',
                icon: 'regions',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            }
        ],
    },
]

export default appsNavigationConfig
