import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker } from "components/ui";
import { ExportToExcelStudent } from '../excelConvert'
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


function Schools() {
    const [currentDate, setCurrentDate] = useState(null);
    const [backLinks, setBackLinks] = useState([]);
    const [columns] = useState([
        {
            Header: "N#",
            accessor: "number",
        },
        {
            Header: "Maktab nomi",
            accessor: "name",
        },
        {
            Header: "O`quvchilar soni",
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
    const [backLinksNew, setBackLinksNew] = useState([]);
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

    const user = useSelector((state) => state.auth.user);
    const params = useParams();
    const navigate = useNavigate();
    function removeDuplicates(arr) {

    }
    useEffect(() => {
        if (user.user_type == 'TUMAN') {
            params.district_id = user.tumanshahar;
            params.region_id = user.viloyat_id;
        }

        if (user.user_type == 'MAKTAB') {
            params.district_id = user.tumanshahar;
            params.region_id = user.viloyat_id;
            params.school_id = user.school;
        }

        if (!params.district_id) {
            navigate('/');
        }

        if (user.user_type == 'RESPUBLIKA') {
            setRedirectTo(
                '/republic-regions/' + params.region_id + '/' + params.district_id
            );
        }

        if (user.user_type == 'VILOYAT') {
            setRedirectTo(
                '/region-regions/' + params.district_id
            );
        }

        if (user.user_type == 'TUMAN') {
            setRedirectTo('/district-district/' + params.district_id);
        }

        if (user.user_type == 'MAKTAB') {
            setRedirectTo('/school-school');
        }
        let getBackUrls = localStorage.getItem("backUrls");
        let filterGetBackUrls = removeDuplicates(JSON.parse(getBackUrls));
        setBackLinks(filterGetBackUrls);


        let getBackUrlsNew = localStorage.getItem("locationUrlName");
        let filterGetBackUrlsNew = JSON.parse(getBackUrlsNew);
        setBackLinksNew(filterGetBackUrlsNew);
    }, []);

    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState([]);

    const token = useSelector((state) => state?.auth?.session?.token);

    useEffect(() => {
        if (token && params.district_id) {
            const sendData = {
                sana: currentDate,
                tuman_id: params.district_id,
            };
            fetch(`${process.env.REACT_APP_API_URL}api/v1/davomattuman/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-type': 'application/json',
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
                    name: el[0].maktabnomi,
                    studentsCount: el[0].bolasoni,
                    arrivalsCount: el[0].kelganlar,
                    arrivalsCountPercent: el[0].foizi,
                    absenteesCount: el[0].kelmaganlar,
                    absenteesCountPercent: 100 - el[0].foizi,
                    id: el[0].maktab_id,
                };

                res.push(reg);
            });
        }
        setData(res);
    }, [apiData, location.pathname]);

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
        } catch (error) {
            console.log(204, error);
        }
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
            <h2 className='mb-3'>Maktablar bo'yicha</h2>
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
                columns={columns}
                data={data}
                is_location={4}
                locationName={'Maktablar'}
            ></TableData>
        </div>
    );
}

export default Schools;
