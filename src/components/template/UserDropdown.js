import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'
import avatar01 from 'assets/thumb-13.jpg';
const dropdownItemList = [
    {
        label: 'Profile',
        path: '/app/account/settings/profile',
        icon: <HiOutlineUser />,
    }
]

function AvatarSelf() {
    return (
        <img className='w-[40px] h-[40px] rounded-[50%]' src={avatar01} alt="" />
    );
}

export const UserDropdown = ({ className }) => {
    const { avatar, userName, authority, email } = useSelector(
        (state) => state.auth.user
    )

    const { signOut } = useAuth()

    const signOutFunction = () => {
        localStorage.removeItem('backUrls');
        localStorage.removeItem('locationUrlName');
        signOut();
    }

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <AvatarSelf></AvatarSelf>
            <div className="hidden md:block">
                <div className="text-xs capitalize">
                    {authority[0] || 'guest'}
                </div>
                <div className="font-bold">{userName}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                    <AvatarSelf></AvatarSelf>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userName}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        eventKey={item.label}
                        key={item.label}
                        className="mb-1"
                    >
                        <Link
                            className="flex gap-2 items-center"
                            to={item.path}
                        >
                            <span className="text-xl opacity-50">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOutFunction}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Chiqish</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)
