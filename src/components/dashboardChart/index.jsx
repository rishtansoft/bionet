
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLOR_2 } from 'constants/chart.constant'
import { useSelector } from "react-redux";


const BasicLine = ({ select_value }) => {
    const [dataValue, setdataValue] = useState([]);
    const token = useSelector((state) => state?.auth?.session?.token);
    const [chartData, setChartData] = useState([]);


    useEffect(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const date = new Date().getDate();

        const newDate = year + '-' + (month <= 9 ? '0' : '') + month + '-' + (date <= 9 ? '0' : '') + date;

        const sendData = {
            "viloyat_id": null,
            "tuman_id": null,
            "maktab_id": null,
            "hafta": select_value.value == 'haftalik' ? 1 : 0,
            "oy": select_value.value == 'oylik' ? 1 : 0,
            "chorak": select_value.value == 'choraklik' ? 1 : 0,
            "yil": select_value.value == 'yillik' ? 1 : 0,
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
            })
            .catch(err => {
                console.log(err);
            });
    }, [select_value]);

    return (
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
            height={300}
        />
    )
}

export default BasicLine

