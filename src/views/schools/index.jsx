import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    const seen = new Set();
    return arr.filter(item => {
      const duplicate = seen.has(item.url);
      seen.add(item.url);
      return !duplicate;
    });
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
  }, [currentDate]);

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

      setData(res);
    }
  }, [apiData]);

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

  return (
    <div>
      <div className="mb-4">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          {backLinksNew &&
            backLinksNew?.length > 0 &&
            backLinksNew.map((value, index) => (
              <Link key={index} to={value.old_url} className="hover:underline" onMouseDown={() => changeUrls(value)}>
                {value.name}
              </Link>
            ))}
          {/* <Link className="hover:underline">
            Maktablar
          </Link> */}
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
