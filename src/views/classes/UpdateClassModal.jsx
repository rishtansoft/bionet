import React, { useState, useEffect } from "react";
import {
  Input,
  TimeInput,
  Button,
  FormContainer,
  FormItem,
  toast,
  Select,
  Notification,
} from "components/ui";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const UpdateClassModal = ({ item, closeFun, updateFun }) => {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state?.auth?.session?.token);
  const [teachersData, setTeachersData] = useState([]);
  const [name, setName] = useState();
  const [errorName, setErrorName] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [errorStartTime, setErrorStartTime] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [errorTeacher, setErrorTeacher] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/v1/getteachers/${user.school}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((fill) => {
        if (fill && fill.length > 0) {
          const filterData = fill.map((arg) => ({
            value: arg.id,
            label: arg.name,
          }));
          setTeachersData(filterData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/v1/getsinf/${user.school}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((fill) => {
        if (fill && fill.length > 0) {
          const filterData = fill.find((arg) => arg.id == item.id);
          setName(filterData?.name ? filterData?.name : '');
          if(filterData?.startoflesson && filterData?.startoflesson !== null){
            const currentDate = dayjs();
            const apiTime = dayjs(`1970-01-01T${filterData?.startoflesson}`);
    
            // Set the current date's time to the time received from the API
            const parsedTime = currentDate
              .hour(apiTime.hour())
              .minute(apiTime.minute())
              .second(apiTime.second());
              const startTimeFromApi = dayjs(parsedTime, 'hh:mm:ss').toDate();
              setStartTime(startTimeFromApi);
              setStartTimeFilter(dayjs(startTimeFromApi).format('hh:mm:ss'))
          }
          const getTeacher = teachersData.find(e => e.value == filterData?.rahbar)
          setTeacher(filterData?.rahbar && filterData?.rahbar !== null && getTeacher  ? {value: filterData?.rahbar, label: getTeacher.label} : '');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teachersData])
  

  const changeName = (e) => {
    setName(e.target.value);
    setErrorName(false);
  };
  const changeStartTime = (e) => {
    setStartTime(e);
    setStartTimeFilter(e ? dayjs(e).format("hh:mm:ss") : "");
    setErrorStartTime(false);
  };
  const changeTeacher = (e) => {
    setTeacher(e);
    setErrorTeacher(false);
  };

  const updateClassFun = (e) => {
    e.preventDefault();
    if (name && !/^\s*$/.test(name) && startTimeFilter && teacher) {
      setDisabledButton(true);
      const sendData = {
        id: item.id,
        name: name,
        startoflesson: startTimeFilter,
        school: String(user.school),
        rahbar: String(teacher.value),
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/editsinf/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((res) => {
          if (res.status == 200 || 201) {
            toast.push(
              <Notification
                title={"Muvaffaqiyatli"}
                type="success"
                duration={5000}
                transitionType="fade"
              >
                {"Sinf ma'lumotlari muvaffaqiyatli tahrirlandi"}
              </Notification>,
              {
                placement: "top-center",
              }
            );
            setDisabledButton(false);
            updateFun();
            closeFun();
          } else {
            toast.push(
              <Notification
                title={"Xatolik"}
                type="danger"
                duration={5000}
                transitionType="fade"
              >
                {res.statusText}
              </Notification>,
              {
                placement: "top-center",
              }
            );
            setDisabledButton(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.push(
            <Notification
              title={"Xatolik"}
              type="danger"
              duration={5000}
              transitionType="fade"
            >
              Xatolik yuz berdi
            </Notification>,
            {
              placement: "top-center",
            }
          );
          setDisabledButton(false);
        });
    } else {
      if (!name || /^\s*$/.test(name)) {
        setErrorName(true);
      } else {
        setErrorName(false);
      }
      if (!teacher) {
        setErrorTeacher(true);
      } else {
        setErrorTeacher(false);
      }
      if (!startTimeFilter || startTimeFilter.length == 0) {
        setErrorStartTime(true);
      } else {
        setErrorStartTime(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">Sinf ma'lumotlarini tahrirlash</h3>
      <form onSubmit={updateClassFun}>
        <FormContainer className="mt-4 flex flex-col gap-2">
          <FormItem
            label="Sinf nomi"
            invalid={errorName}
            errorMessage="Maydonni to'ldiring"
          >
            <Input placeholder="Sinf Nomi" value={name} onChange={changeName} />
          </FormItem>
          <FormItem
            label="Boshlanish vaqti"
            invalid={errorStartTime}
            errorMessage="Maydonni to'ldiring"
          >
            <TimeInput value={startTime} onChange={changeStartTime} />
          </FormItem>
          <FormItem
            label="Rahbar"
            invalid={errorTeacher}
            errorMessage="Maydonni to'ldiring"
          >
            <Select
              placeholder="Rahbar"
              disabled={true}
              value={teacher}
              onChange={changeTeacher}
              options={teachersData}
            />
          </FormItem>
          <Button
            color="indigo-500"
            variant="solid"
            loading={disabledButton}
            type="submit"
          >
            Saqlash
          </Button>
        </FormContainer>
      </form>
    </div>
  );
};

export default UpdateClassModal;
