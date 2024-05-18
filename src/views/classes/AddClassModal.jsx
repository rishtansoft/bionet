import React, { useState } from "react";
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
import dayjs from "dayjs";

const AddClassModal = ({ closeFun, updateFun }) => {
  const params = useParams();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [errorStartTime, setErrorStartTime] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [errorTeacher, setErrorTeacher] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
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
    setTeacher(e.target.value);
    setErrorTeacher(false);
  };

  const updateClassFun = (e) => {
    e.preventDefault();
    if (
      name &&
      !/^\s*$/.test(name) &&
      startTimeFilter &&
      teacher
    ) {
      setDisabledButton(true);
      const testToken = "eb577759f4ca0dde05b02ea699892ee560920594";
      const sendData = {
        id: item.id,
        name: name,
        startoflesson: startTimeFilter,
        school: params?.id,
        rahbar: teacher,
      };
      fetch(`${process.env.REACT_APP_API_URL}api/v1/addsinf/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${testToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((res) => {
          console.log(65, res);
          if(res.status == 200){
            toast.push(
              <Notification
                title={"Muvaffaqiyatli"}
                type="success"
                duration={5000}
                transitionType="fade"
              >
                {"Sinf muvaffaqiyatli qo'shildi"}
              </Notification>,
              {
                placement: "top-center",
              }
            );
            setDisabledButton(false);
            updateFun();
            closeFun();
          }else{
            toast.push(
              <Notification
                title={"Xatolik"}
                type="error"
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
      <h3 className="text-center">Sinf qo'shish</h3>
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
              value={teacher}
              onChange={changeTeacher}
              options={[]}
            />
          </FormItem>
          <Button
            color="indigo-500"
            variant="solid"
            loading={disabledButton}
            type="submit"
          >
            Qo'shish
          </Button>
        </FormContainer>
      </form>
    </div>
  );
};

export default AddClassModal;
