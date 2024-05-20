
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import { useSelector } from 'react-redux'

const BasicBar = (props) => {
    const [dataChart, setDataChart] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);

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

    const data = [
        {
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
    ]

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state?.auth?.session?.token);
    useEffect(() => {
        if (user.user_type == 'RESPUBLIKA') {
            console.log('data', currentDate);
            for(let i = 1; i <= 14; i++) {
                const req = {
                    "viloyat_id": i,
                    "tuman_id": null,
                    "maktab_id": null,    
                    "hafta": props.state.value == 'hafta' ? 1 : 0,
                    "oy": props.state.value == 'oy' ? 1 : 0,
                    "chorak": props.state.value == 'chorak' ? 1 : 0,
                    "yil": props.state.value == 'yil' ? 1 : 0,
                    "sana": currentDate
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
                        console.log(59, data[0][0]);
                        if (data.length > 0) {

                        } else {

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }, [])
    return (
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
                    categories: [
                        'Fargona',
                        'Andijon',
                        'Namangan',
                        'Jizzax',
                        'Buxoro',
                        'Navoiy',
                        'Xorazm',
                        'Sirdaryo',
                        'Surxondaryo',
                        'Samarqand',
                    ],
                },
            }}
            series={data}
            type="bar"
            height={300}
        />
    )
}

export default BasicBar

