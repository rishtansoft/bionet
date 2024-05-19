import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatePicker, Button, Dialog } from "components/ui";
import AddStudentModal from "./AddStudentModal";
import { ExportToExcelStudent } from "../excelConvert";
function Students() {
  const [currentDate, setCurrentDate] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [columns] = useState([
    {
      Header: "N#",
      accessor: "number",
    },
    {
      Header: "O'quvchi",
      accessor: "name",
    },
    {
      Header: "Kelgan vaqti",
      accessor: "studentsCount",
    },
  ]);
  const [redirectTo, setRedirectTo] = useState("");

  const user = useSelector((state) => state.auth.user);
  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user_type == "RESPUBLIKA") {
      setRedirectTo(
        "/republic-regions/" +
          params.region_id +
          "/" +
          params.district_id +
          "/" +
          params.school_id +
          "/" +
          params.student_id
      );
    }
  }, []);

  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token = useSelector((state) => state?.auth?.session?.token);

  useEffect(() => {
    if (token && params.student_id) {
      const sendData = {
        sinf_id: params.student_id,
        sana: currentDate,
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatsinf/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
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
    if (token && params.student_id && dataUpdate) {
      const sendData = {
        sinf_id: params.student_id,
        sana: currentDate,
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatsinf/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((res) => res.json())
        .then((d) => {
          setApiData(d);
          setDataUpdate(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dataUpdate]);

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
          name: el[0].pupilname,
          time: el[0].kelganvaqti,
          id: el[0].pupil_id,
        };

        res.push(reg);
      });

      setData(res);
    }
  }, [apiData]);

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
      <h2 className="mb-3">O'quvchilar bo'yicha</h2>
      <div
        className="date-filter text-right mb-4 flex justify-end"
        style={{
          alignItems: "center",
        }}
      >
        <ExportToExcelStudent apiData={data} headers={columns} />
        <DatePicker
          value={currentDate}
          onChange={handleChangeDate}
          placeholder={currentDate}
          className="w-1/4"
        />
      </div>
      {user.user_type == "MAKTAB" && (
        <div className="flex justify-end mb-4">
          <Button size="sm" onClick={addModalFun}>
            Qo&apos;shish
          </Button>
          <Dialog isOpen={openAddModal} onClose={closeAddModal} width={700}>
            <AddStudentModal closeFun={closeAddModal} updateFun={updateData} />
          </Dialog>
        </div>
      )}
      <TableData
        columns={columns}
        data={data}
        updateData={updateData}
      ></TableData>
    </div>
  );
}

export default Students;
