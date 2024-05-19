import React from 'react'
import { Card, Progress } from 'components/ui'

const ProgressInfo = ({ precent }) => {
    return (
        <div>
            <h3 className="font-bold">{precent}%</h3>
            <p>Bugungi kelganlar soni</p>
        </div>
    )
}

const EmailSent = ({ data = [], className }) => {
    return (
        <Card className={className}>
            <h4>Davomat statistikasi</h4>
            <div className="mt-6">
                <Progress
                    variant="circle"
                    percent={data.precent}
                    width={350}
                    className="flex justify-center text-center h5"
                    strokeWidth={4}
                    customInfo={<ProgressInfo precent={data.precent} />}
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
