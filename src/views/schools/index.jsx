import React, { useState, useEffect } from "react";
import TableData from "components/table/TableData";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, DatePicker, Dialog } from "components/ui";
import { Loading } from "components/shared";

function Schools() {
  const [currentDate, setCurrentDate] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [columns] = useState([
    {
      Header: "N#",
      accessor: "number",
    },
    {
      Header: "Maktab nomi",
      accessor: "name",
    },
    {
      Header: "O`quvchilar soni",
      accessor: "studentsCount",
    },
    {
      Header: "Davomat",
      accessor: "arrivalsCount",
    },
    {
      Header: "Davomat (%)",
      accessor: "arrivalsCountPercent",
    },
    {
      Header: "Kelmaganlar soni",
      accessor: "absenteesCount",
    },
    {
      Header: "Kelmaganlar soni (%)",
      accessor: "absenteesCountPercent",
    },
  ]);

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
    if (!params.id) {
      navigate("/regions");
    }
  }, []);

  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const token = useSelector((state) => state?.auth?.session?.token);
  useEffect(() => {
    if (token && params.id) {
      const testToken = "eb577759f4ca0dde05b02ea699892ee560920594";
      const sendData = {
        tuman_id: params.id,
        sana: currentDate,
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/davomattuman/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${testToken}`,
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
    if (token && params.id) {
      const testToken = "eb577759f4ca0dde05b02ea699892ee560920594";
      const sendData = {
        tuman_id: params.id,
        sana: currentDate,
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/davomattuman/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${testToken}`,
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
    setLoading(false);
  }, [apiData]);

  const closeAddModal = () => {
    setAddModal(false);
  };

  const updateData = () => {
    setDataUpdate(true);
    setLoading(true);
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex flex-auto flex-col justify-center items-center h-full">
          <Loading loading={loading} />
        </div>
      ) : (
        <div>
          <h2 className="mb-3">Maktablar bo'yicha</h2>
          <div className="date-filter text-right mb-4 flex justify-end">
            <DatePicker
              value={currentDate}
              onChange={handleChangeDate}
              placeholder={currentDate}
              className="w-1/4"
            />
          </div>
          <TableData
            redirectTo="/classes"
            columns={columns}
            data={data}
            is_location={4}
          ></TableData>
        </div>
      )}
    </div>
  );
}

export default Schools;
