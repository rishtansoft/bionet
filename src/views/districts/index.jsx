import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableData from 'components/table/TableData';
import { useSelector } from 'react-redux';

function Districts() {
  const [columns] = useState([
    {
      Header: 'Tuman nomi',
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

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params.id) {
      navigate('/regions');
    }
  }, []);

  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token = useSelector((state) => state?.auth?.session?.token);

  useEffect(() => {
    if (token && params.id) {
      console.log('params', params);
      const testToken = 'eb577759f4ca0dde05b02ea699892ee560920594';
      const sendData = {
        viloyat_id: params.id,
        sana: "2024-05-08"
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
          console.log(67, d);
          setApiData(d);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      let res = [];
      apiData.forEach((el) => {
        const reg = {
          name: el[0].tuman,
          schoolCount: el[0].maktabsoni,
          studentsCount: el[0].bolasoni,
          arrivalsCount: el[0].kelganlar,
          arrivalsCountPercent: el[0].foizi,
          absenteesCount: el[0].kelmaganlar,
          absenteesCountPercent: 100 - el[0].foizi,
          id: el[0].tuman_id,
        };

        res.push(reg);

      });

      setData(res);
    }
  }, [apiData]);
  return (
    <div>
      <h2 className='mb-3'>Tumanlar</h2>
      <TableData
        redirectTo='/schools'
        columns={columns}
        data={data}
      ></TableData>
    </div>
  );
}

export default Districts;
