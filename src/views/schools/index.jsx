import React, { useState, useEffect } from 'react';
import TableData from 'components/table/TableData';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DatePicker } from 'components/ui';

function Schools() {
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
      setRedirectTo('/school-school/' + params.school_id);
    }
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

  return (
    <div>
      <h2 className='mb-3'>Maktablar bo'yicha</h2>
      <div className='date-filter text-right mb-4 flex justify-end'>
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
      ></TableData>
    </div>
  );
}

export default Schools;
