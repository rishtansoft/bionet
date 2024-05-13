import React, { useEffect, useState } from 'react';
import TableData from 'components/table/TableData';
import { useSelector } from 'react-redux';
import { DatePicker } from 'components/ui';

function Regions() {
  const [currentDate, setCurrentDate] = useState(null);
  const [columns] = useState([
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
          setApiData(d);
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
      apiData.forEach((el) => {
        const reg = {
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
      <h2 className='mb-3'>Viloyatlar bo'yicha</h2>

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
      ></TableData>
    </div>
  );
}

export default Regions;
