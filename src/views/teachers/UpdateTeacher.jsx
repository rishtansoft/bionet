import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  FormItem,
  FormContainer,
  DatePicker,
  toast,
  Notification,
} from "components/ui";
import { useMask } from "@react-input/mask";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const UpdateTeacherModal = ({ updateFun, closeFun, item }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state?.auth?.session?.token);
  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState(false);
  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [birthdayFilter, setBirthdayFilter] = useState("");
  const [errorBirthday, setErrorBirthday] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const handlePutPhoneNumber = (event) => {
    const formattedText = event
      .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "+998 $1 $2 $3 $4")
      .trim();
    return formattedText;
  };

  useEffect(() => {
    setFullName(item.name ? item.name : "");
    setGender(
      item.gender == "ERKAK"
        ? { value: "ERKAK", label: "Erkak" }
        : { value: "AYOL", label: "Ayol" }
    );
    setBirthday(
      item.birthday ? dayjs(item.birthday, "YYY-MM-DD").toDate() : null
    );
    setBirthdayFilter(item.birthday);
    setAddress(item.address ? item.address : "");
    setEmail(item.email ? item.email : "");
    setPhoneNumber(
      item?.phone?.startsWith("+998")
        ? handlePutPhoneNumber(item?.phone?.slice(4))
        : ""
    );
  }, []);

  const inputPhoneRef = useMask({
    mask: "+998 __ ___ __ __",
    replacement: { _: /\d/ },
  });

  const changeFullName = (e) => {
    setFullName(e.target.value);
    setErrorFullName(false);
  };
  const changeGender = (e) => {
    setGender(e);
    setErrorGender(false);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
    setErrorAddress(false);
  };
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setErrorPhoneNumber(false);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  };
  const changeBirthday = (e) => {
    setBirthday(e);
    setBirthdayFilter(dayjs(e).format("YYYY-MM-DD"));
    setErrorBirthday(false);
  };

  const genders = [
    { label: "Erkak", value: "ERKAK" },
    { label: "Ayol", value: "AYOL" },
  ];

  function handlePastePhone(event) {
    const inputElement = inputPhoneRef.current; // Get the actual input element
    const pastedText = event.clipboardData.getData("Text"); // Remove all non-digit characters
    if (pastedText.startsWith("+998")) {
      const formattedText =
        "+998 " +
        pastedText
          .slice(4)
          .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")
          .trim();
      inputElement.value = formattedText; // Manually set value of the input element
    } else {
      const formattedText = pastedText
        .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "+998 $1 $2 $3 $4")
        .trim();
      inputElement.value = formattedText; // Manually set value of the input element
    }
    event.preventDefault(); // Prevent the default paste behavior
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const addTeacherFun = (e) => {
    e.preventDefault();
    if (
      fullName &&
      !/^\s*$/.test(fullName) &&
      gender &&
      address &&
      !/^\s*$/.test(address) &&
      phoneNumber &&
      phoneNumber.length === 17 &&
      email &&
      !/^\s*$/.test(email) &&
      birthday
    ) {
      const sendData = {
        id: item.id,
        name: fullName,
        jinsi: gender.value,
        tug_sana: birthdayFilter,
        address: address,
        phone: phoneNumber,
        email: email,
        category: "",
        datapriyoma: getCurrentDate(),
        primech: null,
        school: user.school,
      };
      fetch(
        `${process.env.REACT_APP_API_URL}api/v1/editteacher/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      )
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            toast.push(
              <Notification
                title={"Muvaffaqiyatli"}
                type="success"
                duration={5000}
                transitionType="fade"
              >
                {"O'qituvchi muvaffaqiyatli qo'shildi"}
              </Notification>,
              {
                placement: "top-center",
              }
            );
            updateFun();
            setDisabledButton(false);
            closeFun();
          } else  {
            toast.push(
              <Notification
                title={"Xatolik"}
                type="danger"
                duration={5000}
                transitionType="fade"
              >
                {" Xatolik yuz berdi"}
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
              {" Xatolik yuz berdi"}
            </Notification>,
            {
              placement: "top-center",
            }
          );
          setDisabledButton(false);
        });
    } else {
      if (!fullName || /^\s*$/.test(fullName)) {
        setErrorFullName(true);
      } else {
        setErrorFullName(false);
      }
      if (!address || /^\s*$/.test(address)) {
        setErrorAddress(true);
      } else {
        setErrorAddress(false);
      }
      if (!gender) {
        setErrorGender(true);
      } else {
        setErrorGender(false);
      }
      if (!phoneNumber || phoneNumber.length !== 17) {
        setErrorPhoneNumber(true);
      } else {
        setErrorPhoneNumber(false);
      }
      if (!email || /^\s*$/.test(email)) {
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
      }
      if (!birthday || birthday == null) {
        setErrorBirthday(true);
      } else {
        setErrorBirthday(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">O'qituvchi ma'lumotlarini tahrirlash</h3>
      <FormContainer
        className="mt-4 grid grid-cols-3 gap-2"
        onSubmit={addTeacherFun}
      >
        <FormItem
          label={"Ism Familiyasi"}
          invalid={errorFullName}
          errorMessage="Maydonni to'ldiring"
        >
          <Input
            placeholder="Ism Familiyasi"
            value={fullName}
            onChange={changeFullName}
          />
        </FormItem>
        <FormItem
          invalid={errorGender}
          label={"Jinsi"}
          errorMessage="Maydonni to'ldiring"
        >
          <Select options={genders} value={gender} onChange={changeGender} />
        </FormItem>
        <FormItem
          label={"Tug'ilgan sana"}
          invalid={errorBirthday}
          errorMessage="Maydonni to'ldiring"
        >
          <DatePicker
            placeholder="Tug'ilgan sana"
            value={birthday}
            name="date"
            onChange={changeBirthday}
          />
        </FormItem>
        <FormItem
          label={"Manzil"}
          invalid={errorAddress}
          errorMessage="Maydonni to'ldiring"
        >
          <Input
            placeholder="Manzil"
            value={address}
            onChange={changeAddress}
          />
        </FormItem>
        <FormItem
          label={"Telefon raqami"}
          invalid={errorPhoneNumber}
          errorMessage="Maydonni to'ldiring"
        >
          <Input
            ref={inputPhoneRef}
            type="text"
            placeholder="Telefon raqami"
            value={phoneNumber}
            onChange={changePhoneNumber}
            onPaste={handlePastePhone}
          />
        </FormItem>
        <FormItem
          label={"Email"}
          invalid={errorEmail}
          errorMessage="Maydonni to'ldiring"
        >
          <Input placeholder="Email" value={email} onChange={changeEmail} />
        </FormItem>
      </FormContainer>
      <Button
        color="indigo-500"
        variant="solid"
        onClick={addTeacherFun}
        loading={disabledButton}
      >
        Qo'shish
      </Button>
    </div>
  );
};

export default UpdateTeacherModal;
