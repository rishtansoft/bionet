import React, { useEffect, useState } from 'react'
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
import MapUzb from 'components/map'

const CrmDashboard = () => {
    const dataRange = [
        {value: "haftalik", label: "Haftalik"},
        {value: "oylik", label: "Oylik"},
        {value: "choraklik", label: "Choraklik"},
        {value: "yillik", label: "Yillik"},
    ];
    const dispatch = useDispatch();
    const [chartDataSelect1, setChartDataSelect1] = useState(dataRange[0]);

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

    const emailSentData=  {
        precent:97.2,
        opened: 893,
        unopen: 330,
        total: 1223,
    }

    

    const davSelectFun=(event)=>{
        setChartDataSelect1(event)
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={false}>
                <Statistic data={statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    {/* <LeadByCountries
                        className="xl:col-span-5"
                        data={leadByRegionData}
                    /> */}
                    <MapUzb className = "xl:col-span-5" ></MapUzb>
                    <EmailSent className="xl:col-span-2" data={emailSentData} />
                </div>

                <div className='flex gap-6'>
                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3 className='text-xl'>Davomat bo'yicha</h3>

                            <Select
                                placeholder="Please Select"
                                options={dataRange}
                                value = {chartDataSelect1}
                                onChange={davSelectFun}
                            ></Select>
                        </div>
                        <DashboardChart select_value={chartDataSelect1} ></DashboardChart>
                    </div>

                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3 className='text-xl'>Kech qolishlar bo'yicha (minutlarda)</h3>

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
