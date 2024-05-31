import React, { useEffect, useState } from 'react'
import { Card, Progress } from 'components/ui'
import { useSelector } from "react-redux";


const ProgressInfo = ({ precent, student_count }) => {

    return (
        <div>
            <h3 className="font-bold">{precent ? Number(precent) : 0}%</h3>
            <p>Bugungi kelganlar soni: {student_count ? student_count : 0}</p>
        </div>
    )
}

const EmailSent = ({ className }) => {
    const token = useSelector((state) => state?.auth?.session?.token);

    const [data, setData] = useState(null);

    useEffect(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const date = new Date().getDate();

        const newDate = year + '-' + (month <= 9 ? '0' : '') + month + '-' + (date <= 9 ? '0' : '') + date;

        const sendData = {
            sana: newDate
        }
        fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatchart1/`, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sendData)
        })
            .then((res) => res.json())
            .then((d) => {
                setData(d[0][0])
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <Card className={className}>
            <h4>Davomat statistikasi</h4>
            <div className="mt-6">
                <Progress
                    variant="circle"
                    percent={data && Number(data.foizi)}
                    width={350}
                    className="flex justify-center text-center h5"
                    strokeWidth={4}
                    customInfo={<ProgressInfo precent={data && data.foizi} student_count={data && data.bolasoni} />}
                />
            </div>
            {/* <div className="text-center mt-6">
                <p className="font-semibold">Performace</p>
                <h4 className="font-bold">Average</h4>
            </div> */}
        </Card>
    )
}

export default EmailSent
