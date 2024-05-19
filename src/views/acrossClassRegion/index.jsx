import React, { useEffect, useState } from 'react';
import TableData from 'components/table/TableData';
import { useSelector } from 'react-redux';
import { DatePicker, Select, Button } from 'components/ui';

const class_list = [
     {
          value: '1',
          label: '1-Sinf'
     },
     {
          value: '2',
          label: '2-Sinf'
     },
     {
          value: '3',
          label: '3-Sinf'
     },
     {
          value: '4',
          label: '4-Sinf'
     },
     {
          value: '5',
          label: '5-Sinf'
     },
     {
          value: '6',
          label: '6-Sinf'
     },
     {
          value: '7',
          label: '7-Sinf'
     },
     {
          value: '8',
          label: '8-Sinf'
     },
     {
          value: '9',
          label: '9-Sinf'
     },
     {
          value: '10',
          label: '10-Sinf'
     },
     {
          value: '11',
          label: '11-Sinf'
     },
]

function ClassesCross() {
     const [currentDate, setCurrentDate] = useState(null);
     const [regionDataList, setRegionDataList] = useState([]);
     const [districtsDataList, setDistrictsDataList] = useState([]);
     const [schoolDataList, setSchoolDataList] = useState([]);
     const [regionDataValue, setRegionDataValue] = useState(null);
     const [districtsDataValue, setDistrictsDataValue] = useState(null);
     const [schoolDataValue, setSchoolDataValue] = useState(null);
     const [classDataValue, setClassDataValue] = useState(class_list[0]);

     const [columns, setColumns] = useState(
          [
               {
                    Header: 'N#',
                    accessor: 'number',
               },
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
                    Header: 'Davomat (%)',
                    accessor: 'arrivalsCountPercent',
               },
               {
                    Header: 'Kelmaganlar soni',
                    accessor: 'absenteesCount',
               },

          ]

     );

     const region_id = useSelector((state) => state.auth.user.viloyat_id);



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

     const selectRegionFun = (event) => {
          setDistrictsDataValue(null);
          setSchoolDataValue(null);
          setRegionDataValue(event);
     }

     const selectDistrictsFun = (event) => {
          setSchoolDataValue(null);
          setDistrictsDataValue(event);
     }
     const selectClassFun = (event) => {
          setClassDataValue(event)
     }

     const selectSchoolFun = (event) => {
          setSchoolDataValue(event)
     }


     const [data, setData] = useState([]);
     const [apiData, setApiData] = useState([]);

     const token = useSelector((state) => state?.auth?.session?.token);

     useEffect(() => {
          if (token && currentDate) {
               const req = {
                    sana: currentDate,
               };

               const testToken = 'ad7fac83fac077b1c817bfeee50d1303ded94d56';
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
                         const data = d.map((el) => {
                              return {
                                   id: region_id,
                                   label: el[0].viloyat,
                                   value: el[0].viloyat_id
                              }
                         }).filter((el) => el && el)
                         setRegionDataList(data);
                         setApiData(d);
                    });
          }
     }, [currentDate]);


     useEffect(() => {
          if (token) {
               const testToken = 'ad7fac83fac077b1c817bfeee50d1303ded94d56';
               const sendData = {
                    viloyat_id: region_id,
                    sana: currentDate
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
                         const data = d.map((el) => {
                              return {
                                   label: el[0].tuman,
                                   value: el[0].tuman_id
                              }
                         }).filter((el) => el && el)
                         setDistrictsDataList(data)
                    })
                    .catch(err => {
                         console.log(err);
                    });
          }
     }, [currentDate]);


     useEffect(() => {
          if (token && districtsDataValue) {
               const testToken = 'ad7fac83fac077b1c817bfeee50d1303ded94d56';
               const sendData = {
                    tuman_id: districtsDataValue.value,
                    sana: currentDate

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
                         const data = d.map((el) => {
                              return {
                                   label: el[0].maktabnomi,
                                   value: el[0].maktab_id
                              }
                         }).filter((el) => el && el)
                         setSchoolDataList(data);
                    })
                    .catch(err => {
                         console.log(err);
                    });
          }
     }, [districtsDataValue, currentDate]);



     useEffect(() => {
          let today = getTodaysDate();
          setCurrentDate(today);
     }, []);

     function handleChangeDate(e) {
          setCurrentDate(formatDate(e));
     }

     const filterFun = () => {
          const sendData = {
               viloyat_id: region_id,
               tuman_id: districtsDataValue ? districtsDataValue.value : null,
               maktab_id: schoolDataValue ? schoolDataValue.value : null,
               sinf: classDataValue ? Number(classDataValue.value) : 1,
               sana: currentDate
          }
          const testToken = 'ad7fac83fac077b1c817bfeee50d1303ded94d56';
          fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatrespsinf/`, {
               method: "POST",
               headers: {
                    Authorization: `Token ${testToken}`,
                    'Content-type': 'application/json',
               },
               body: JSON.stringify(sendData)
          })
               .then((res) => res.json())
               .then((d) => {
                    if (!districtsDataValue && !schoolDataValue) {
                         setColumns([
                              {
                                   Header: 'N#',
                                   accessor: 'number',
                              },
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
                                   Header: 'Davomat (%)',
                                   accessor: 'arrivalsCountPercent',
                              },
                              {
                                   Header: 'Kelmaganlar soni',
                                   accessor: 'absenteesCount',
                              },

                         ]);
                         const resData = d.map((el, index) => {
                              return {
                                   number: index + 1,
                                   name: el[0].tuman,
                                   districtCount: 19,
                                   schoolCount: el[0].maktabsoni,
                                   studentsCount: el[0].bolasoni,
                                   arrivalsCount: el[0].kelganlar,
                                   arrivalsCountPercent: el[0].foizi,
                                   absenteesCount: el[0].kelmaganlar,
                                   id: el[0].tuman_id,
                              }
                         }).filter((el) => el && el);
                         setData(resData)
                    } else if (districtsDataValue && !schoolDataValue) {
                         setColumns([
                              {
                                   Header: 'N#',
                                   accessor: 'number',
                              },
                              {
                                   Header: 'Maktab nomi',
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
                                   Header: 'Davomat (%)',
                                   accessor: 'arrivalsCountPercent',
                              },
                              {
                                   Header: 'Kelmaganlar soni',
                                   accessor: 'absenteesCount',
                              },

                         ]);
                         const resData = d.map((el, index) => {
                              return {
                                   number: index + 1,
                                   name: el[0].maktabnomi,
                                   districtCount: 19,
                                   studentsCount: el[0].bolasoni,
                                   arrivalsCount: el[0].kelganlar,
                                   arrivalsCountPercent: el[0].foizi,
                                   absenteesCount: el[0].kelmaganlar,
                                   id: el[0].viloyat_id,
                              }
                         }).filter((el) => el && el);
                         setData(resData)
                    } else if (districtsDataValue && schoolDataValue) {
                         setColumns([
                              {
                                   Header: 'N#',
                                   accessor: 'number',
                              },
                              {
                                   Header: 'Sinf nomi',
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
                                   Header: 'Davomat (%)',
                                   accessor: 'arrivalsCountPercent',
                              },
                              {
                                   Header: 'Kelmaganlar soni',
                                   accessor: 'absenteesCount',
                              },

                         ]);
                         const resData = d.map((el, index) => {
                              return {
                                   number: index + 1,
                                   name: el[0].sinfnomi,
                                   districtCount: 19,
                                   studentsCount: el[0].bolasoni,
                                   arrivalsCount: el[0].kelganlar,
                                   arrivalsCountPercent: el[0].foizi,
                                   absenteesCount: el[0].kelmaganlar,
                                   id: el[0].viloyat_id,
                              }
                         }).filter((el) => el && el);
                         setData(resData)
                    }
               })
               .catch(err => {
                    console.log(err);
               });
     }

     useEffect(() => {
          filterFun();
     }, [apiData]);

     return (
          <div>
               <h2 className='mb-3'>Sinflar kesimida</h2>

               <div>
                    <div style={{
                         display: 'flex',
                         alignItems: 'center',
                         gap: '1rem 1rem',
                         marginBottom: '1rem',
                         flexDirection: 'row',
                         width: '100%',
                         flexWrap: 'wrap'
                    }}>
                         <div style={{
                              width: '22%'
                         }}>
                              <Select
                                   options={class_list}
                                   placeholder='Sinf'
                                   value={classDataValue}
                                   onChange={selectClassFun}
                              >

                              </Select>
                         </div>

                         <div style={{
                              width: '22%'
                         }}>
                              <Select
                                   options={districtsDataList}
                                   placeholder='Tuman'
                                   // isDisabled={!regionDataValue ? true : false}
                                   value={districtsDataValue}
                                   onChange={selectDistrictsFun}
                              >

                              </Select>
                         </div>

                         <div style={{
                              width: '22%'
                         }}>
                              <Select
                                   options={schoolDataList}
                                   placeholder='Maktab'
                                   value={schoolDataValue}
                                   onChange={selectSchoolFun}
                                   isDisabled={!districtsDataValue ? true : false}
                              >

                              </Select>
                         </div>
                         <div>

                              <button
                                   style={{
                                        border: '1px solid #a5a5a5',
                                        padding: '0.7rem  1rem',
                                        borderRadius: '8px'
                                   }}
                                   onClick={filterFun}>
                                   Filter
                              </button>
                         </div>
                    </div>

               </div>

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
                    is_location={5}
                    in_link={true}
               ></TableData>
          </div>
     );
}

export default ClassesCross;
