
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLOR_2 } from 'constants/chart.constant'
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const BasicLine = ({ select_value }) => {
    const [dataValue, setdataValue] = useState([]);
    const token = useSelector((state) => state?.auth?.session?.token);
    const [chartData, setChartData] = useState([]);
    const [loader, setLoader] = useState(true);
    const region_id = useSelector((state) => state.auth.user.viloyat_id);
    const district_id = useSelector((state) => state.auth.user.tumanshahar);
    const school_id = useSelector((state) => state.auth.user.school);


    useEffect(() => {
        setLoader(true)
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const date = new Date().getDate();

        const newDate = year + '-' + (month <= 9 ? '0' : '') + month + '-' + (date <= 9 ? '0' : '') + date;

        const sendData = {
            "viloyat_id": region_id ? region_id : null,
            "tuman_id": district_id ? district_id : null,
            "maktab_id": school_id ? school_id : null,
            "hafta": select_value.value == 'hafta' ? 1 : 0,
            "oy": select_value.value == 'oy' ? 1 : 0,
            "chorak": select_value.value == 'chorak' ? 1 : 0,
            "yil": select_value.value == 'yil' ? 1 : 0,
            sana: newDate,

        }
        fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart2/`, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sendData)
        })
            .then((res) => res.json())
            .then((d) => {
                const dateValue = d.map((el) => {
                    return el[0].sana
                }).filter((el) => el && el);
                setdataValue(dateValue);
                setChartData([
                    {
                        name: 'Davomat',
                        data: d.map((el) => el[0].foizi)
                    }
                ])
                setLoader(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [select_value]);

    return (
        <>

            {
                loader ? (
                    <Skeleton height={20} count={15} />
                ) : (
                    <Chart
                        options={{
                            chart: {
                                type: 'line',
                                zoom: {
                                    enabled: false,
                                },
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            stroke: {
                                curve: 'smooth',
                                width: 3,
                            },
                            colors: [COLOR_2],
                            xaxis: {
                                categories: dataValue,
                            },
                        }}
                        series={chartData}
                        height={450}
                    />
                )
            }

        </>
    )
}

export default BasicLine

