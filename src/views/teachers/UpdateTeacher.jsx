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
    const [dateOfEmployment, setDateOfEmployment] = useState(null);
    const [dateOfEmploymentError, setDateOfEmploymentError] = useState(false);
    const [dateOfEmploymentFilter, setDateOfEmploymentFilter] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handlePutPhoneNumber = (event) => {
        const formattedText = event
            .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "+998 $1 $2 $3 $4")
            .trim();
        return formattedText;
    };

    const changedescription = (e) => {
        setDescription(e.target.value);
    };

    const changeCategory = (e) => {
        setCategory(e.target.value);
    };


    const changeDateOfEmployment = (e) => {
        setDateOfEmployment(e);
        setDateOfEmploymentFilter(dayjs(e).format('YYYY-MM-DD'))
        setDateOfEmploymentError(false);
    };

    useEffect(() => {
        console.log(62, item);
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

        setCategory(item?.category ? item?.category : '');
        setDescription(item?.primech ? item?.primech : '');
        setDateOfEmploymentFilter(item?.start);

        setDateOfEmployment(
            item?.start ? dayjs(item?.start, "YYY-MM-DD").toDate() : null
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
            birthday
        ) {
            const sendData = {
                id: item.id,
                name: fullName,
                jinsi: gender.value,
                tug_sana: birthdayFilter,
                address: address ? address : null,
                phone: phoneNumber ? phoneNumber : null,
                email: email ? email : null,
                category: category ? category : '',
                datapriyoma: dateOfEmploymentFilter ? dateOfEmploymentFilter : null,
                primech: description ? description : null,
                school: user.school
            }

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
                    } else {
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

            if (!gender) {
                setErrorGender(true);
            } else {
                setErrorGender(false);
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

                >
                    <Input
                        placeholder="Manzil"
                        value={address}
                        onChange={changeAddress}
                    />
                </FormItem>
                <FormItem
                    label={"Telefon raqami"}

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

                >
                    <Input placeholder="Email" value={email} onChange={changeEmail} />
                </FormItem>
                <FormItem
                    label={"Kategoriya"}
                >
                    <Input type='text' placeholder="Kategoriya" value={category} onChange={changeCategory} />
                </FormItem>
                <FormItem
                    label={"Ishga qabul qilingan sana"}
                    invalid={dateOfEmploymentError}
                    errorMessage="Maydonni to'ldiring"
                >
                    <DatePicker
                        placeholder="Ishga qabul qilingan sana"
                        value={dateOfEmployment}
                        name="date"
                        onChange={changeDateOfEmployment}
                    />
                </FormItem>
                <FormItem
                    label={"Eslatma"}
                >
                    <Input type='text' placeholder="Eslatma" value={description} onChange={changedescription} />
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
