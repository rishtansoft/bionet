
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BasicBar = (props) => {
    const [dataChart, setDataChart] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([
        {
            data: []
        }
    ]);
    const [loader, setLoader] = useState(true);

    const dataChartValue = [
        {
            data: [],
        },
    ]


    function getTodaysDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const today = getTodaysDate();
        setCurrentDate(today);
    }, []);



    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state?.auth?.session?.token);
    useEffect(() => {
        const today = getTodaysDate();
        setLoader(true)
        if (user.user_type == "RESPUBLIKA") {
            const req = {
                "viloyat_id": null,
                "tuman_id": null,
                "maktab_id": null,
                "hafta": props.state.value == 'hafta' ? 1 : 0,
                "oy": props.state.value == 'oy' ? 1 : 0,
                "chorak": props.state.value == 'chorak' ? 1 : 0,
                "yil": props.state.value == 'yil' ? 1 : 0,
                "sana": currentDate ? currentDate : today
            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart3/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then(data => {
                    data && setXAxis(data.map((el) => {
                        return el[0].viloyat
                    }));
                    data && data.forEach((el) => {
                        dataChartValue[0].data.push(Number(el[0].minut))
                    });
                    setYAxis(dataChartValue);

                    setLoader(false)

                })
                .catch(err => {
                    console.log(err);
                })
        } else if (user.user_type == "VILOYAT") {
            const req = {
                "viloyat_id": user.viloyat_id,
                "tuman_id": null,
                "maktab_id": null,
                "hafta": props.state.value == 'hafta' ? 1 : 0,
                "oy": props.state.value == 'oy' ? 1 : 0,
                "chorak": props.state.value == 'chorak' ? 1 : 0,
                "yil": props.state.value == 'yil' ? 1 : 0,
                "sana": currentDate ? currentDate : today
            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart3/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then(data => {
                    data && setXAxis(data.map((el) => {
                        return el[0].tuman
                    }));
                    data && data.forEach((el) => {
                        dataChartValue[0].data.push(Number(el[0].minut))
                    });

                    setYAxis(dataChartValue)
                    setLoader(false)

                })
                .catch(err => {
                    console.log(err);
                })
        } else if (user.user_type == "TUMAN") {
            const req = {
                "viloyat_id": user.viloyat_id,
                "tuman_id": user.tumanshahar,
                "maktab_id": null,
                "hafta": props.state.value == 'hafta' ? 1 : 0,
                "oy": props.state.value == 'oy' ? 1 : 0,
                "chorak": props.state.value == 'chorak' ? 1 : 0,
                "yil": props.state.value == 'yil' ? 1 : 0,
                "sana": currentDate ? currentDate : today
            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart3/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then(data => {
                    data && setXAxis(data.map((el) => {
                        return el[0].school
                    }));
                    data && data.forEach((el) => {
                        dataChartValue[0].data.push(Number(el[0].minut))
                    });

                    setYAxis(dataChartValue)
                    setLoader(false)

                })
                .catch(err => {
                    console.log(err);
                })
        } else if (user.user_type == "MAKTAB") {
            const req = {
                "viloyat_id": user.viloyat_id,
                "tuman_id": user.tumanshahar,
                "maktab_id": user.school,
                "hafta": props.state.value == 'hafta' ? 1 : 0,
                "oy": props.state.value == 'oy' ? 1 : 0,
                "chorak": props.state.value == 'chorak' ? 1 : 0,
                "yil": props.state.value == 'yil' ? 1 : 0,
                "sana": currentDate ? currentDate : today
            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart3/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then(data => {
                    data && setXAxis(data.map((el) => {
                        if (props.state.value == 'chorak' || props.state.value == 'yil') {
                            return el[0].month
                        } else {
                            return el[0].sana
                        }

                    }));
                    data && data.forEach((el) => {
                        dataChartValue[0].data.push(Number(el[0].minut))
                    });

                    setYAxis(dataChartValue)
                    setLoader(false)

                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [props.state]);

    return (
        <>
            {
                loader ? (
                    <Skeleton height={20} count={15} />
                ) : (
                    <Chart
                        options={{
                            plotOptions: {
                                bar: {
                                    horizontal: true,
                                },
                            },
                            colors: COLORS,
                            dataLabels: {
                                enabled: false,
                            },
                            xaxis: {
                                categories: xAxis,
                            },
                        }}
                        series={yAxis}
                        type="bar"
                        height={450}
                    />
                )
            }

        </>

    )
}

export default BasicBar

