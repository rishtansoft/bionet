import React, { useState } from "react";
import { Input, Button, Select, FormItem, FormContainer, DatePicker, toast, Notification } from "components/ui";
import { useMask } from "@react-input/mask";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const AddStudentModal = ({updateFun, closeFun}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state?.auth?.session?.token);
  const params = useParams();
  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState(false);
  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);
  const [relative, setRelative] = useState("");
  const [errorRelative, setErrorRelative] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [birthdayFilter, setBirthdayFilter] = useState("");
  const [errorBirthday, setErrorBirthday] = useState(false);
  const [relativePhoneNumber, setRelativePhoneNumber] = useState("");
  const [errorRelativeNumber, setErrorRelativeNumber] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  function removeSpaces(inputString) {
    return inputString.replace(/\s/g, '');
  }

  const inputRef = useMask({
    mask: "+998 __ ___ __ __",
    replacement: { _: /\d/ },
  });
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
  const changeRelative = (e) => {
    setRelative(e.target.value);
    setErrorRelative(false);
  };
  const changeRelativeNumber = (e) => {
    setRelativePhoneNumber(e.target.value);
    setErrorRelativeNumber(false);
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
  function handlePasteRelativePhone(event) {
    const inputElement = inputRef.current; // Get the actual input element
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
  const addStudentFun = (e) => {
    e.preventDefault();
    if (
      fullName &&
      !/^\s*$/.test(fullName) &&
      gender &&
      address &&
      !/^\s*$/.test(address) &&
      phoneNumber &&
      phoneNumber.length === 17 &&
      relative &&
      !/^\s*$/.test(relative) &&
      relativePhoneNumber &&
      relativePhoneNumber.length === 17 && birthday
    ) {
      const sendData = {
        name: fullName,
        jinsi: gender.value,
        tug_sana: birthdayFilter,
        address: address,
        phone: removeSpaces(phoneNumber),
        image: null,
        person_id: null,
        qarindoshi: relative,
        qarindoshi_phone: removeSpaces(relativePhoneNumber),
        sinf: params.student_id
    }
    fetch(
      `${process.env.REACT_APP_API_URL}api/v1/addpupil/`, // params.student_id is not student ID, this is class ID
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendData)
      }
    )
      .then((res) => {
        if (res.status == 200 || 201) {
            toast.push(
              <Notification
                title={"Muvaffaqiyatli"}
                type="success"
                duration={5000}
                transitionType="fade"
              >
                {"O'quvchi muvaffaqiyatli qo'shildi"}
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
      if (!relative || /^\s*$/.test(relative)) {
        setErrorRelative(true);
      } else {
        setErrorRelative(false);
      }
      if (!birthday || birthday == null) {
        setErrorBirthday(true);
      } else {
        setErrorBirthday(false);
      }
      if (!relativePhoneNumber || /^\s*$/.test(relativePhoneNumber)) {
        setErrorRelativeNumber(true);
      } else {
        setErrorRelativeNumber(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">O'quvchi qo'shish</h3>
        <FormContainer className="mt-4 grid grid-cols-3 gap-2">
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
            label={"Qarindoshi"}
            invalid={errorRelative}
            errorMessage="Maydonni to'ldiring"
          >
            <Input
              placeholder="Qarindoshi"
              value={relative}
              onChange={changeRelative}
            />
          </FormItem>
          <FormItem
            label={"Qarindoshi telefon raqami"}
            invalid={errorRelativeNumber}
            errorMessage="Maydonni to'ldiring"
          >
            <Input
              ref={inputRef}
              placeholder="Qarindoshi telefon raqami"
              value={relativePhoneNumber}
              onChange={changeRelativeNumber}
              onPaste={handlePasteRelativePhone}
            />
          </FormItem>
        </FormContainer>
        <Button color="indigo-500" variant="solid" onClick={addStudentFun} loading={disabledButton}>
          Qo'shish
        </Button>
    </div>
  );
};

export default AddStudentModal;
