import React, {useState, useEffect} from 'react';
import TableData from 'components/table/TableData';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Schools() {
  const [columns] = useState([
    {
      Header: 'Tuman nomi',
      accessor: 'name',
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
        tuman_id: params.id,
        sana: "2024-05-08"
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
      <h2 className='mb-3'>Maktablar</h2>
      <TableData columns={columns} data={data}></TableData>
    </div>
  )
}

export default Schools