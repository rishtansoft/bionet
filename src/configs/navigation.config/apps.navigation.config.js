import {
    DASHBOARD_REPUBLIC_PATH,
    REPUBLIC_REPUBLIC_PATH,
    ACROSS_CLASS_REPUBLIC_PATH,
    DASHBOARD_REGION_PATH,
    REGION_REGION_PATH,
    ACROSS_CLASS_REGION_PATH,
    DASHBOARD_DISTRICT_PATH,
    DISTRICT_DISTRICT_PATH,
    ACROSS_CLASS_DISTRICT_PATH,
    DASHBOARD_SCHOOL_PATH,
    SCHOOL_SCHOOL_PATH,
    ACROSS_CLASS_SCHOOL_PATH,
} from 'constants/route.constant';
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant';
import { ADMIN, USER } from 'constants/roles.constant';

const user_type = JSON.parse(JSON.parse(localStorage.getItem('admin')).auth).user.user_type;

const menuItems = {
    'RESPUBLIKA': [
        { key: 'appsCrm.dashboard', path: DASHBOARD_REPUBLIC_PATH, title: 'Dashboard', icon: 'dashboard' },
        { key: 'regions.regions', path: REPUBLIC_REPUBLIC_PATH, title: 'Viloyatlar', icon: 'regions' },
        { key: 'regions.regions', path: ACROSS_CLASS_REPUBLIC_PATH, title: 'Sinflar kesimida', icon: 'acrossClass' },
    ],
    'VILOYAT': [
        { key: 'appsCrm.dashboard', path: DASHBOARD_REGION_PATH, title: 'Dashboard', icon: 'dashboard' },
        { key: 'regions.regions', path: REGION_REGION_PATH, title: 'Tumanlar', icon: 'regions' },
        { key: 'regions.regions', path: ACROSS_CLASS_REGION_PATH, title: 'Sinflar kesimida', icon: 'acrossClass' },
    ],
    'TUMAN': [
        { key: 'appsCrm.dashboard', path: DASHBOARD_DISTRICT_PATH, title: 'Dashboard', icon: 'dashboard' },
        { key: 'regions.regions', path: DISTRICT_DISTRICT_PATH, title: 'Maktablar', icon: 'regions' },
        { key: 'regions.regions', path: ACROSS_CLASS_DISTRICT_PATH, title: 'Sinflar kesimida', icon: 'acrossClass' },
    ],
    'MAKTAB': [
        { key: 'appsCrm.dashboard', path: DASHBOARD_SCHOOL_PATH, title: 'Dashboard', icon: 'dashboard' },
        { key: 'regions.regions', path: SCHOOL_SCHOOL_PATH, title: 'Sinflar', icon: 'regions' },
        { key: 'regions.regions', path: ACROSS_CLASS_SCHOOL_PATH, title: 'Sinflar kesimida', icon: 'acrossClass' },
    ],
};

const createMenuItem = (item) => ({
    ...item,
    translateKey: item.title.toUpperCase(),
    type: NAV_ITEM_TYPE_ITEM,
    authority: [ADMIN, USER],
    subMenu: [],
});

const setMenu = () => (menuItems[user_type] || []).map(createMenuItem);

const appsNavigationConfig = [
    {
        key: 'apps',
        path: '',
        title: 'DASHBOARD',
        translateKey: 'ASOSIY',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: setMenu(),
    },
];

export default appsNavigationConfig;
