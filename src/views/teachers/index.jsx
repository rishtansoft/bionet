import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dialog } from "components/ui";
import AddTeacherModal from "./AddTeacherModal";

function Teachers() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [teachersFilterData, setTeachersFilterData] = useState([]);
  const [columns] = useState([
    {
      Header: "N#",
      accessor: "number",
    },
    {
      Header: "O'qituvchi",
      accessor: "name",
    },
    {
      Header: "Manzili",
      accessor: "address",
    },
    {
      Header: "Telefon taqami",
      accessor: "phone",
    },
    {
      Header: "Qabul qilingan sanasi",
      accessor: "start",
    },
    {
      Header: "Kategoriya",
      accessor: "category",
    },
    {
      Header: "Eslatma",
      accessor: "primech",
    },
  ]);

  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.auth?.session?.token);
  useEffect(() => {
    if (token && user.school) {
      fetch(
        `${process.env.REACT_APP_API_URL}api/v1/getteachers/${user.school}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          setTeachersData(d);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    if (token && user.school && dataUpdate) {
      fetch(
        `${process.env.REACT_APP_API_URL}api/v1/getteachers/${user.school}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          setTeachersData(d);
          setDataUpdate(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dataUpdate]);

  useEffect(() => {
    if (teachersData.length > 0) {
      const data = teachersData.map((e, index) => ({
        number: index + 1,
        name: e.name,
        birthday: e.tug_sana,
        gender: e.jinsi,
        address: e.address,
        phone: e.phone,
        start: e.datapriyoma,
        email: e.email,
        id: e.id,
        category: e.category ? e.category : '',
        primech: e.primech ? e.primech : ''
      }));
      setTeachersFilterData(data);
    }
  }, [teachersData]);

  const addModalFun = (e) => {
    e.preventDefault();
    setOpenAddModal(true);
  };

  const updateData = () => {
    setDataUpdate(true);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <div>
      <h2 className="mb-3">O'qituvchilar bo'yicha</h2>
      <div className="flex justify-start mb-4 mt-5">
        <Button size="sm" onClick={addModalFun}>
          O'qituvchi qo&apos;shish
        </Button>
        <Dialog isOpen={openAddModal} onClose={closeAddModal} width={700}>
          <AddTeacherModal updateFun={updateData} closeFun={closeAddModal} />
        </Dialog>
      </div>
      <TableData columns={columns} data={teachersFilterData} updateData={updateData}></TableData>
    </div>
  );
}

export default Teachers;
