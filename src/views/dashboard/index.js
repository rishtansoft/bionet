import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCrmDashboardData } from './store/dataSlice';
import { Loading } from 'components/shared';
import Statistic from './components/Statistic';
import LeadByCountries from './components/LeadByCountries';
import EmailSent from './components/EmailSent';
import DashboardChart from 'components/dashboardChart';
import DashboardChartLate from 'components/DashboardChartLate';
import { Select } from 'components/ui';

const CrmDashboard = () => {
    const [dataRange] = useState([
        { value: 'hafta', label: 'Haftalik' },
        { value: 'oy', label: 'Oylik' },
        { value: 'chorak', label: 'Choraklik' },
        { value: 'yil', label: 'Yillik' },
    ])
    const [chartDataSelect1, setChartDataSelect1] = useState(dataRange[0]);
    const dispatch = useDispatch();
    const [dataMap, setDataMap] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const token = JSON.parse(JSON.parse(localStorage.getItem('admin')).auth).session.token;
    const [headData, setHeadData] = useState({});
    const [statisticData, setStatisticData] = useState([]);
    const [lateState, setLateState] = useState(dataRange[0]);

    function getTodaysDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const today = getTodaysDate();
        setCurrentDate(today);
    }, []);

    useEffect(() => {
        const req = { sana: currentDate };
        fetch(`${process.env.REACT_APP_API_URL}api/v1/headerchart/`, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then((resp) => {
                console.log(61, resp);
                setHeadData(resp[0][0])
            })
            .catch((err) => console.log(err));
    }, [])

    function handleChangeDate(e) {
        setCurrentDate(formatDate(e));
    }

    useEffect(() => {
        fetchData();

        if (token) {
            const req = { sana: currentDate };
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatresp/`, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(req),
            })
                .then((res) => res.json())
                .then((resp) => {
                    if (resp.length) {
                        const result = resp.map((element) => ({
                            name: element[0].viloyat,
                            value: element[0].foizi ? element[0].foizi : 0,
                        }));
                        setDataMap(result);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [currentDate, token]);

    const fetchData = () => {
        dispatch(getCrmDashboardData());
    };

    useEffect(() => {
        if (headData.maktabsoni) {
            setStatisticData([
                { key: 'newLeads', label: 'Maktablar', value: headData.maktabsoni, growShrink: 2.6 },
                { key: 'emailResponse', label: "O'qituvchilar", value: headData.ustozsoni, growShrink: 5.5 },
                { key: 'proposals', label: 'Qizlar', value: headData.qizlar_foiz ? Number(headData.qizlar_foiz).toFixed(0) : 0, growShrink: 32.7 },
                { key: 'appointment', label: 'Bollar', value: Number(headData.bolalar_foiz).toFixed(0), growShrink: 2.6 },
            ])
        }
    }, [headData])


    const emailSentData = {
        precent: 97.2,
        opened: 893,
        unopen: 330,
        total: 2000,
    };

    const davSelectFun = (event) => {
        setChartDataSelect1(event);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={false}>
                <Statistic data={statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    <LeadByCountries currentDate={currentDate} change={handleChangeDate} className="xl:col-span-5" data={dataMap} />
                    {/* <MapUzb className="xl:col-span-5" /> */}
                    <EmailSent className="xl:col-span-2" data={emailSentData} />
                </div>

                <div className="flex gap-6">
                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3 className="text-xl">Davomat bo'yicha</h3>
                            <Select
                                placeholder="Please Select"
                                options={dataRange}
                                value={chartDataSelect1}
                                onChange={davSelectFun}
                            />
                        </div>
                        <DashboardChart select_value={chartDataSelect1} />
                    </div>

                    <div className="chart-block w-1/2 border p-5 rounded-lg">
                        <div className="head flex justify-between items-center mb-5 pl-3">
                            <h3 className="text-xl">Kech qolishlar bo'yicha (minutlarda)</h3>
                            <Select
                                placeholder="Please Select"
                                options={dataRange}
                                value={lateState}
                                onChange={(e) => { setLateState(e) }}
                            />
                        </div>
                        <DashboardChartLate state={lateState} />
                    </div>
                </div>
                {/* <Leads data={recentLeadsData} /> */}
            </Loading>
        </div>
    );
};

export default CrmDashboard;
