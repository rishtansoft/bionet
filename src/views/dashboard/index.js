import React, { useEffect } from 'react'
import reducer from './store'
import { getCrmDashboardData } from './store/dataSlice'
import { Loading } from 'components/shared'
import Statistic from './components/Statistic'
import LeadByCountries from './components/LeadByCountries'
import EmailSent from './components/EmailSent'
import { useDispatch, useSelector } from 'react-redux'
import DashboardChart from 'components/dashboardChart';
import DashboardChartLate from 'components/DashboardChartLate';
import { Select } from 'components/ui'

const CrmDashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        dispatch(getCrmDashboardData())
    }

    const statisticData = [
        {
            key: 'newLeads',
            label: 'Maktablar',
            value: "10522",
            growShrink: 2.6,
        },
        {
            key: 'emailResponse',
            label: 'O\'qituvchilar',
            value: "10534",
            growShrink: 5.5,
        },
        {
            key: 'proposals',
            label: 'Qizlar',
            value: "45.2%",
            growShrink: 32.7,
        },
        {
            key: 'appointment',
            label: 'Bollar',
            value: "54.8%",
            growShrink: 2.6,
        },
    ]

    const leadByRegionData = [
        {
            name: 'Toshkent',
            value: 37.61,
        },
        {
            name: 'Namangan',
            value: 16.79,
        },
        {
            name: 'Andjion',
            value: 12.42,
        },
        {
            name: 'Farg\'ona',
            value: 9.85,
        },
        {
            name: 'Jizzax',
            value: 9.85,
        },
        {
            name: 'Surxondaryo',
            value: 9.85,
        },
        {
            name: 'Qarshi',
            value: 7.68,
        },
        {
            name: 'Buxoro',
            value: 5.11,
        },
        {
            name: 'Navoiy',
            value: 9.11,
        },
        {
            name: 'Samarqand',
            value: 53.11,
        },
        {
            name: 'Xorazm',
            value: 5.11,
        },
        {
            name: 'Qoraqalpog\'iston',
            value: 23.11,
        },
    ]

    const recentLeadsData = [
        {
            id: 1,
            name: 'Eileen Horton',
            avatar: '/img/avatars/thumb-1.jpg',
            status: 0,
            createdTime: 1623430400,
            email: 'eileen_h@hotmail.com',
            assignee: 'Carrie Harris',
        },
        {
            id: 2,
            name: 'Terrance Moreno',
            avatar: '/img/avatars/thumb-2.jpg',
            status: 1,
            createdTime: 1632393600,
            email: 'terrance_moreno@infotech.io',
            assignee: 'Toni Lane',
        },
        {
            id: 3,
            name: 'Ron Vargas',
            avatar: '/img/avatars/thumb-3.jpg',
            status: 1,
            createdTime: 1632393600,
            email: 'ronnie_vergas@infotech.io',
            assignee: 'Joanne Mendoza',
        },
        {
            id: 4,
            name: 'Luke Cook',
            avatar: '/img/avatars/thumb-4.jpg',
            status: 2,
            createdTime: 1632761600,
            email: 'cookie_lukie@hotmail.com',
            assignee: 'Lorraine Carr',
        },
        {
            id: 5,
            name: 'Joyce Freeman',
            avatar: '/img/avatars/thumb-5.jpg',
            status: 3,
            createdTime: 1632416000,
            email: 'joyce991@infotech.io',
            assignee: 'Myrtle Mason',
        },
        {
            id: 6,
            name: 'Samantha Phillips',
            avatar: '/img/avatars/thumb-6.jpg',
            status: 0,
            createdTime: 1633107200,
            email: 'samanthaphil@infotech.io',
            assignee: 'Perry Ward',
        },
    ]

    const emailSentData=  {
        precent:97.2,
        opened: 893,
        unopen: 330,
        total: 1223,
    }

    const dataRange = [
        {value: "haftalik", label: "Haftalik"},
        {value: "oylik", label: "Oylik"},
        {value: "choraklik", label: "Choraklik"},
        {value: "yillik", label: "Yillik"},
    ];

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={false}>
                <Statistic data={statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    <LeadByCountries
                        className="xl:col-span-5"
                        data={leadByRegionData}
                    />
                    <EmailSent className="xl:col-span-2" data={emailSentData} />
                </div>

                <div className='flex gap-6'>
                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3>Davomat bo'yicha</h3>

                            <Select
                                placeholder="Please Select"
                                options={dataRange}
                                value = {dataRange[0]}
                            ></Select>
                        </div>
                        <DashboardChart></DashboardChart>
                    </div>

                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3>Kech qolishlar bo'yicha (minutlarda)</h3>

                            <Select
                                placeholder="Please Select"
                                options={dataRange}
                                value = {dataRange[0]}
                            ></Select>
                        </div>
                        <DashboardChartLate></DashboardChartLate>
                    </div>
                    
                </div>
                {/* <Leads data={recentLeadsData} /> */}
            </Loading>
        </div>
    )
}

export default CrmDashboard
