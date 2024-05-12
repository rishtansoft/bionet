import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TableData from 'components/table/TableData';
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

  const [data] = useState([
    {
      name: 'Fargona',
      districtCount: 19,
      schoolCount: 100,
      studentsCount: 1000,
      arrivalsCount: 600,
      arrivalsCountPercent: '60%',
      absenteesCount: 400,
      absenteesCountPercent: '40%',
      id: 1
    },
    {
      name: 'Andijon',
      districtCount: 19,
      schoolCount: 100,
      studentsCount: 1000,
      arrivalsCount: 600,
      arrivalsCountPercent: '60%',
      absenteesCount: 400,
      absenteesCountPercent: '40%',
      id: 2
    },
    {
      name: 'Namangan',
      districtCount: 19,
      schoolCount: 100,
      studentsCount: 1000,
      arrivalsCount: 600,
      arrivalsCountPercent: '60%',
      absenteesCount: 400,
      absenteesCountPercent: '40%',
      id: 3
    },
    {
      name: 'Buxoro',
      districtCount: 19,
      schoolCount: 100,
      studentsCount: 1000,
      arrivalsCount: 600,
      arrivalsCountPercent: '60%',
      absenteesCount: 400,
      absenteesCountPercent: '40%',
      id: 4
    },
    {
      name: 'Navoiy',
      districtCount: 19,
      schoolCount: 100,
      studentsCount: 1000,
      arrivalsCount: 600,
      arrivalsCountPercent: '60%',
      absenteesCount: 400,
      absenteesCountPercent: '40%',
      id: 5
    },
  ]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params.id) {
      navigate('/regions')
    }
  }, [])
  return (
    <div>
      <h2 className='mb-3'>Tumanlar</h2>
      <TableData redirectTo = '/schools' columns={columns} data={data}></TableData>
    </div>
  )
}

export default Districts