import React, {useState} from 'react';
import TableData from 'components/table/TableData';

function Schools() {
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
  
  return (
    <div>
      <h2 className='mb-3'>Maktablar</h2>
      <TableData columns={columns} data={data}></TableData>
    </div>
  )
}

export default Schools