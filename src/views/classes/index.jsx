import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Button, Dialog } from "components/ui";
import AddClassModal from "./AddClassModal";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from "@mui/material";

import { ExportToExcelStudent } from '../excelConvert'
function Classes() {
    const [currentDate, setCurrentDate] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [backLinks, setBackLinks] = useState([]);
    const [backLinksNew, setBackLinksNew] = useState([]);

    const [dataUpdate, setDataUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const token = useSelector((state) => state?.auth?.session?.token);
    const [columns] = useState([
        {
            Header: "N#",
            accessor: "number",
        },
        {
            Header: "Sinf Nomi",
            accessor: 'name'
        },
        {
            Header: "O'quvchilar soni",
            accessor: "studentsCount",
        },
        {
            Header: "Davomat",
            accessor: "arrivalsCount",
        },
        {
            Header: "Davomat (%)",
            accessor: "arrivalsCountPercent",
        },
        {
            Header: "Kelmaganlar soni",
            accessor: "absenteesCount",
        },
        {
            Header: "Kelmaganlar soni (%)",
            accessor: "absenteesCountPercent",
        },
    ]);
    const [redirectTo, setRedirectTo] = useState('');
    const [onMouserValue, setonMouserValue] = useState('');
    const location = useLocation();

    function getTodaysDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function removeDuplicates(arr) {

    }

    const user = useSelector((state) => state.auth.user);
    const params = useParams();

    const navigate = useNavigate();
    useEffect(() => {

        if (user.user_type == 'VILOYAT') {
            params.region_id = user.viloyat_id;
        }

        if (!params.school_id) {
            navigate('/');
        }

        if (user.user_type == 'RESPUBLIKA') {
            setRedirectTo('/republic-regions/' + params.region_id + '/' + params.district_id + '/' + params.school_id)
        }

        if (user.user_type == 'VILOYAT') {
            setRedirectTo('/region-regions/' + params.district_id + '/' + params.school_id)
        }

        if (user.user_type == 'TUMAN') {
            setRedirectTo('/district-district/' + params.district_id + '/' + params.school_id)
        }

        if (user.user_type == 'MAKTAB') {
            setRedirectTo('/school-school/' + params.school_id)
        }
        let getBackUrls = localStorage.getItem("backUrls");
        let filterGetBackUrls = removeDuplicates(JSON.parse(getBackUrls));
        setBackLinks(filterGetBackUrls);



        let getBackUrlsNew = localStorage.getItem("locationUrlName");
        let filterGetBackUrlsNew = JSON.parse(getBackUrlsNew);
        setBackLinksNew(filterGetBackUrlsNew);
    }, []);

    useEffect(() => {
        if (user.user_type == 'VILOYAT') {
            params.region_id = user.viloyat_id;
        }

        if (!params.school_id) {
            navigate('/');
        }

        if (user.user_type == 'RESPUBLIKA') {
            setRedirectTo('/republic-regions/' + params.region_id + '/' + params.district_id + '/' + params.school_id)
        }

        if (user.user_type == 'VILOYAT') {
            setRedirectTo('/region-regions/' + params.district_id + '/' + params.school_id)
        }

        if (user.user_type == 'TUMAN') {
            setRedirectTo('/district-district/' + params.district_id + '/' + params.school_id)
        }
        if (token && params.school_id) {
            const sendData = {
                maktab_id: params.school_id,
                sana: currentDate
            };
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatmaktab/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(sendData),
            })
                .then((res) => res.json())
                .then((d) => {
                    setApiData(d);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        let getBackUrlsNew = localStorage.getItem("locationUrlName");
        let filterGetBackUrlsNew = JSON.parse(getBackUrlsNew);
        setBackLinksNew(filterGetBackUrlsNew);
    }, [currentDate, location.pathname]);
    useEffect(() => {
        if (token && params.school_id && dataUpdate) {
            const sendData = {
                maktab_id: params.school_id,
                sana: currentDate
            };
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatmaktab/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(sendData),
            })
                .then((res) => res.json())
                .then((d) => {
                    setApiData(d);
                    setDataUpdate(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [dataUpdate, location.pathname]);

    useEffect(() => {
        let today = getTodaysDate();
        setCurrentDate(today);
    }, []);

    function handleChangeDate(e) {
        setCurrentDate(formatDate(e));
    }

    useEffect(() => {
        let res = [];
        if (apiData.length > 0) {
            apiData.forEach((el, index) => {
                const reg = {
                    number: index + 1,
                    name: el[0].sinfnomi,
                    studentsCount: el[0].bolasoni,
                    arrivalsCount: Math.round(el[0].kelganlar * 100) / 100,
                    arrivalsCountPercent: Math.round(el[0].foizi * 100) / 100,
                    absenteesCount: Math.round(el[0].kelmaganlar * 100) / 100,
                    absenteesCountPercent: Math.round((100 - el[0].foizi) * 100) / 100,
                    id: el[0].sinf_id,
                };

                res.push(reg);
            });
        }
        setData(res);
    }, [apiData, location.pathname]);



    const addModalFun = (e) => {
        e.preventDefault();
        setOpenAddModal(true);
    };

    const updateData = () => {
        setDataUpdate(true);
    };

    const closeAddModal = () => {
        setOpenAddModal(false)
    }
    const changeUrls = (arg) => {
        let nerUrls = []
        if (arg.label == 'Viloyatlar') {
            nerUrls = backLinksNew.filter((el) => el.label != 'Tumanlar' && el.label != 'Maktablar' && el.label != 'Sinflar' && el.label != "O'quvchilar");

        } else if (arg.label == 'Tumanlar') {
            nerUrls = backLinksNew.filter((el) => el.label != 'Maktablar' && el.label != 'Sinflar' && el.label != "O'quvchilar");

        } else if (arg.label == 'Maktablar') {
            nerUrls = backLinksNew.filter((el) => el.label != 'Sinflar' && el.label != "O'quvchilar");

        } else if (arg.label == 'Sinflar') {
            nerUrls = backLinksNew.filter((el) => el.label != "O'quvchilar");

        }
        localStorage.setItem('locationUrlName', JSON.stringify(nerUrls));
    }

    const mouseoverFun = (e) => {
        setonMouserValue(e)
    }
    const mouseoutFun = () => {
        setonMouserValue('')
    }

    const changeItemsUrls = (arg, item) => {
        try {
            let nerUrls = []
            if (arg.label == 'Viloyatlar') {
                nerUrls = backLinksNew.filter((el) => el.label != 'Viloyatlar' && el.label != 'Tumanlar' && el.label != 'Maktablar' && el.label != 'Sinflar' && el.label != "O'quvchilar");
            } else if (arg.label == 'Tumanlar') {
                nerUrls = backLinksNew.filter((el) => el.label != 'Tumanlar' && el.label != 'Maktablar' && el.label != 'Sinflar' && el.label != "O'quvchilar");
            } else if (arg.label == 'Maktablar') {
                nerUrls = backLinksNew.filter((el) => el.label != 'Maktablar' && el.label != 'Sinflar' && el.label != "O'quvchilar");
            } else if (arg.label == 'Sinflar') {
                nerUrls = backLinksNew.filter((el) => el.label != 'Sinflar' && el.label != "O'quvchilar");
            } else if (arg.label == "O'quvchilar") {
                nerUrls = backLinksNew.filter((el) => el.label != "O'quvchilar");
            }
            const newObj = { ...arg };
            newObj.item = item;
            nerUrls.push(newObj);
            localStorage.setItem('locationUrlName', JSON.stringify(nerUrls));
            setDataUpdate(updateData);
        } catch (error) {
            console.log(204, error);
        }
    }

    return (
        <div>
            <div className="mb-4">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb">
                    {backLinksNew &&
                        backLinksNew?.length > 0 &&
                        backLinksNew.map((value, index) => (
                            <div
                                onMouseOut={() => mouseoutFun(value.label)}
                                onMouseOver={() => mouseoverFun(value.label)}
                                style={{
                                    position: 'relative',
                                    width: 'auto'

                                }}
                                key={index}>
                                <Link to={value.old_url}

                                    className="hover:underline" onMouseDown={() => changeUrls(value)}>
                                    {value.name}
                                </Link>
                                <div style={
                                    {
                                        position: 'absolute',
                                        visibility: index > 0 && (onMouserValue == value.label) ? 'visible' : 'hidden',
                                        background: '#fff',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        boxShadow: '0px 0px 10px 2px rgba(138,138,138,1)',
                                        width: '300px',
                                        borderRadius: '5px',
                                        height: "auto",
                                        maxHeight: '50vh',
                                        overflowY: 'auto',
                                    }
                                }>

                                    {
                                        value.item.map((el, i) => (
                                            <div key={`index-${i}`}>
                                                <Link to={el.old_url}
                                                    className="hover:underline" onMouseDown={() => changeItemsUrls(el, value.item)}>
                                                    {el.name}
                                                </Link>
                                            </div>
                                        ))

                                    }


                                </div>
                            </div>
                        ))}
                </Breadcrumbs>
            </div>
            <h2 className="mb-3">Sinflar bo'yicha</h2>
            {user.user_type == 'MAKTAB' && (
                <div className="flex justify-end mb-4">
                    <Button size="sm" onClick={addModalFun}>
                        Qo&apos;shish
                    </Button>
                    <Dialog
                        isOpen={openAddModal}
                        onClose={() => setOpenAddModal(false)}
                    >
                        <AddClassModal updateFun={updateData} closeFun={closeAddModal} />
                    </Dialog>
                </div>
            )}
            <div className='date-filter text-right mb-4 flex justify-end' style={{
                alignItems: 'center'
            }}>
                <ExportToExcelStudent
                    apiData={data}
                    headers={columns}
                />
                <DatePicker
                    value={currentDate}
                    onChange={handleChangeDate}
                    placeholder={currentDate}
                    className='w-1/4'
                />
            </div>
            <TableData
                redirectTo={redirectTo}
                is_location={9999}
                columns={columns}
                data={data}
                updateData={updateData}
                locationName={'Sinflar'}

            />
        </div>
    );
}

export default Classes;
