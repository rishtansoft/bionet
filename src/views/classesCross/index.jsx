import React, { useEffect, useState } from 'react';
import TableData from 'components/table/TableData';
import { useSelector } from 'react-redux';
import { DatePicker, Select, Button } from 'components/ui';

function ClassesCross() {
    const [currentDate, setCurrentDate] = useState(null);
    const [regionDataList, setRegionDataList] = useState([]);
    const [districtsDataList, setDistrictsDataList] = useState([]);
    const [schoolDataList, setSchoolDataList] = useState([]);
    const [regionDataValue, setRegionDataValue] = useState(null);
    const [districtsDataValue, setDistrictsDataValue] = useState(null);
    const [schoolDataValue, setSchoolDataValue] = useState(null);

    const [columns] = useState([
        {
            Header: 'N#',
            accessor: 'number',
        },
        {
            Header: 'Viloyat nomi',
            accessor: 'name',
        },
        {
            Header: 'Maktablar soni',
            accessor: 'schoolCount',
        },
        {
            Header: 'O`quvchilar soni',
            accessor: 'studentsCount',
        },
        {
            Header: 'Davomat',
            accessor: 'arrivalsCount',
        },
        {
            Header: 'Davomat (%)',
            accessor: 'arrivalsCountPercent',
        },
        {
            Header: 'Kelmaganlar soni',
            accessor: 'absenteesCount',
        },
        {
            Header: 'Kelmaganlar soni (%)',
            accessor: 'absenteesCountPercent',
        },
    ]);

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

    const selectRegionFun = (event) => {
        setDistrictsDataValue(null);
        setSchoolDataValue(null);
        setRegionDataValue(event);
    }

    const selectDistrictsFun = (event) => {
        setSchoolDataValue(null);
        setDistrictsDataValue(event);
    }

    const selectSchoolFun = (event) => {
        setSchoolDataValue(event)
    }


    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState([]);

    const token = useSelector((state) => state?.auth?.session?.token);

    useEffect(() => {
        if (token && currentDate) {
            const req = {
                sana: currentDate,
            };

            const testToken = 'eb577759f4ca0dde05b02ea699892ee560920594';
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatresp/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${testToken}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(req),
            })
                .then((res) => res.json())
                .then((d) => {
                    const data = d.map((el) => {
                        return {
                            id: el[0].viloyat_id,
                            label: el[0].viloyat,
                            value: el[0].viloyat_id
                        }
                    }).filter((el) => el && el)
                    setRegionDataList(data);
                    setApiData(d);
                });
        }
    }, [currentDate]);


    useEffect(() => {
        if (token && regionDataValue) {
            const testToken = 'eb577759f4ca0dde05b02ea699892ee560920594';
            const sendData = {
                viloyat_id: regionDataValue.value,
                sana: currentDate
            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatviloyat/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${testToken}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(sendData)
            })
                .then((res) => res.json())
                .then((d) => {
                    const data = d.map((el) => {
                        return {
                            label: el[0].tuman,
                            value: el[0].tuman_id
                        }
                    }).filter((el) => el && el)
                    setDistrictsDataList(data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [regionDataValue, currentDate]);


    useEffect(() => {
        if (token && districtsDataValue) {
            const testToken = 'eb577759f4ca0dde05b02ea699892ee560920594';
            const sendData = {
                tuman_id: districtsDataValue.value,
                sana: currentDate

            }
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomattuman/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${testToken}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(sendData)
            })
                .then((res) => res.json())
                .then((d) => {
                    const data = d.map((el) => {
                        return {
                            label: el[0].maktabnomi,
                            value: el[0].maktab_id
                        }
                    }).filter((el) => el && el)
                    setSchoolDataList(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [districtsDataValue, currentDate]);



    useEffect(() => {
        let today = getTodaysDate();
        setCurrentDate(today);
    }, []);

    function handleChangeDate(e) {
        setCurrentDate(formatDate(e));
    }

    useEffect(() => {
        if (apiData.length > 0) {
            let res = [];
            apiData.forEach((el, index) => {
                const reg = {
                    number: index + 1,
                    name: el[0].viloyat,
                    districtCount: 19,
                    schoolCount: el[0].maktabsoni,
                    studentsCount: el[0].bolasoni,
                    arrivalsCount: el[0].kelganlar,
                    arrivalsCountPercent: el[0].foizi,
                    absenteesCount: el[0].kelmaganlar,
                    absenteesCountPercent: 100 - el[0].foizi,
                    id: el[0].viloyat_id,
                };

                res.push(reg);
            });
            setData(res);
        }
    }, [apiData]);

    return (
        <div>
            <h2 className='mb-3'>Sinflar kesimida</h2>

            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem 1rem',
                    marginBottom: '1rem',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        width: '22%'
                    }}>
                        <Select
                            options={
                                [
                                    {
                                        value: '1',
                                        label: '1-Sinf'
                                    },
                                    {
                                        value: '2',
                                        label: '2-Sinf'
                                    },
                                    {
                                        value: '3',
                                        label: '3-Sinf'
                                    },
                                    {
                                        value: '4',
                                        label: '4-Sinf'
                                    },
                                    {
                                        value: '5',
                                        label: '5-Sinf'
                                    },
                                    {
                                        value: '6',
                                        label: '6-Sinf'
                                    },
                                    {
                                        value: '7',
                                        label: '7-Sinf'
                                    },
                                    {
                                        value: '8',
                                        label: '8-Sinf'
                                    },
                                    {
                                        value: '9',
                                        label: '9-Sinf'
                                    },
                                    {
                                        value: '10',
                                        label: '10-Sinf'
                                    },
                                    {
                                        value: '11',
                                        label: '11-Sinf'
                                    },
                                ]
                            }
                            placeholder='Sinf'

                        >

                        </Select>
                    </div>
                    <div style={{
                        width: '22%'
                    }}>
                        <Select
                            placeholder='Viloyatlar'
                            value={regionDataValue}
                            onChange={selectRegionFun}
                            options={
                                regionDataList
                            } >

                        </Select>

                    </div>
                    <div style={{
                        width: '22%'
                    }}>
                        <Select
                            options={districtsDataList}
                            placeholder='Tuman'
                            isDisabled={!regionDataValue ? true : false}
                            value={districtsDataValue}
                            onChange={selectDistrictsFun}
                        >

                        </Select>
                    </div>

                    <div style={{
                        width: '22%'
                    }}>
                        <Select
                            options={schoolDataList}
                            placeholder='Maktab'
                            value={schoolDataValue}
                            onChange={selectSchoolFun}
                            isDisabled={!districtsDataValue ? true : false}
                        >

                        </Select>
                    </div>
                    <div>

                        <Button>
                            Filter
                        </Button>
                    </div>
                </div>

            </div>

            <div className='date-filter text-right mb-4 flex justify-end'>
                <DatePicker
                    value={currentDate}
                    onChange={handleChangeDate}
                    placeholder={currentDate}
                    className='w-1/4'
                />
            </div>

            <TableData
                redirectTo='/districts'
                columns={columns}
                data={data}
                is_location={5}
            ></TableData>
        </div>
    );
}

export default ClassesCross;
