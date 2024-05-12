import { REGIONS_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const docNavigationConfig = [
    {
        key: 'guide_reg',
        path: '',
        title: 'Regions',
        translateKey: 'Regions',
        icon: 'regions',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'regions.regions',
                path: `${REGIONS_PREFIX_PATH}`,
                title: 'Regions',
                translateKey: 'Regions',
                icon: 'regions',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            }
        ],
    },
]

export default docNavigationConfig
