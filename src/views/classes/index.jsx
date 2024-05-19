import React, { useState, useEffect } from 'react';
import TableData from 'components/table/TableData';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DatePicker } from 'components/ui';

function Classes() {
  const [currentDate, setCurrentDate] = useState(null);
  const [columns] = useState([
    {
      Header: 'N#',
      accessor: 'number',
    },
    {
      Header: 'Tuman nomi',
      accessor: 'name',
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
  const [redirectTo, setRedirectTo] = useState('');

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

  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user_type == 'VILOYAT') {
      // params.region_id = user.viloyat_id;
      params.region_id = 6;
    }

    if (!params.school_id) {
      navigate('/');
    }

    if(user.user_type == 'RESPUBLIKA') {
      setRedirectTo('/republic-regions/' + params.region_id)
    }

    if(user.user_type == 'VILOYAT') {
      setRedirectTo('/region-regions/' + params.region_id)
    }

    if(user.user_type == 'TUMAN') {
      setRedirectTo('/district-district/' + params.district_id + '/' + params.school_id)
    }
  }, []);




  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token = useSelector((state) => state?.auth?.session?.token);

  useEffect(() => {
    if (token && params.school_id) {
      const sendData = {
        // maktab_id: params.id,
        // sana: currentDate
        maktab_id: 2,
        sane: "2024-05-08"
      }
      fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatmaktab/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(sendData)
      })
        .then((res) => res.json())
        .then((d) => {
          setApiData(d);
        })
        .catch(err => {
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
          name: el[0].sinfnomi,
          studentsCount: el[0].bolasoni,
          arrivalsCount: el[0].kelganlar,
          arrivalsCountPercent: el[0].foizi,
          absenteesCount: el[0].kelmaganlar,
          absenteesCountPercent: 100 - el[0].foizi,
          id: el[0].sinf_id,
        };

        res.push(reg);

      });

      setData(res);
    }
  }, [apiData]);

  return (
    <div>
      <h2 className='mb-3'>Sinflar bo'yicha</h2>
      <div className='date-filter text-right mb-4 flex justify-end'>
        <DatePicker
          value={currentDate}
          onChange={handleChangeDate}
          placeholder={currentDate}
          className='w-1/4'
        />
      </div>
      <TableData redirectTo={redirectTo} is_location={9999} columns={columns} data={data}></TableData>
    </div>
  )
}

export default Classes