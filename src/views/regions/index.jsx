import React, { useEffect, useState } from 'react';
import TableData from 'components/table/TableData';
import { useSelector } from 'react-redux';

function Regions() {
  const [columns] = useState([
    {
      Header: 'Viloyat nomi',
      accessor: 'name',
    },
    {
      Header: 'Tumanlar soni',
      accessor: 'districtCount',
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
      Header: 'Kelganlar soni',
      accessor: 'arrivalsCount',
    },
    {
      Header: 'Kelganlar soni (%)',
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

  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token = useSelector(state => state?.auth?.session?.token);
  
  useEffect(() => {
     if (token) {
          const testToken = 'eb577759f4ca0dde05b02ea699892ee560920594'
          fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatresp/`, {
               method: "POST",
               headers: {
                    Authorization: `Token ${testToken}`,
                    'Content-type' :"application/json"
               }
          })
               .then(res => res.json())
               .then(d => {
                    setApiData(d)
               })
     }
  }, [])

  useEffect(() => {
     if (apiData.length > 0) {
          let res = [];
          apiData.forEach(el => {
               const reg = {
                    name: el[0].viloyat,
                    districtCount: 19,
                    schoolCount: el[0].maktabsoni,
                    studentsCount: el[0].bolasoni,
                    arrivalsCount: el[0].kelganlar,
                    arrivalsCountPercent: el[0].foizi,
                    absenteesCount: el[0].kelmaganlar,
                    absenteesCountPercent: 100 - el[0].foizi,
                    id: el[0].viloyat_id
               }

               res.push(reg)
          })

          setData(res);
     }
  }, [apiData])

  return (
    <div>
      <h2 className='mb-3'>Viloyatlar</h2>
      <TableData redirectTo = '/districts' columns={columns} data={data}></TableData>
    </div>
  );
}

export default Regions;
