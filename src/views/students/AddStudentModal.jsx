import React, { useState } from "react";
import { Input, Button, Select, FormItem, FormContainer, DatePicker, toast, Notification } from "components/ui";
import { useMask } from "@react-input/mask";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';


const AddStudentModal = ({ updateFun, closeFun }) => {
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
    const [isHovered, setIsHovered] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    function removeSpaces(inputString) {
        return inputString.replace(/\s/g, '');
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedImageFile(file);
            setSelectedImageUrl(e.target.value)
            setErrorMessage('');
        } else {
            setSelectedImage(null);
            setSelectedImageFile(null);
            setSelectedImageUrl('')
            setErrorMessage('Iltimos rasimlar (png, jpg, jpeg) shu farmatda bo\'lish shart');
        }
    };

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
            birthday
        ) {


            const sendData = {
                name: fullName,
                jinsi: gender.value,
                tug_sana: birthdayFilter,
                address: address,
                phone: removeSpaces(phoneNumber),
                // image: selectedImageFile ? newData[0] : null,
                person_id: null,
                qarindoshi: relative,
                qarindoshi_phone: removeSpaces(relativePhoneNumber),
                sinf: params.student_id
            }

            // formData.append('name', fullName);
            // formData.append('jinsi', gender.value);
            // formData.append('tug_sana', birthdayFilter);
            // formData.append('address', address);
            // formData.append('phone', removeSpaces(phoneNumber));
            // formData.append('person_id', null);
            // formData.append('qarindoshi', relative);
            // formData.append('qarindoshi_phone', removeSpaces(relativePhoneNumber));
            // formData.append('sinf', params.student_id);



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

                        if (selectedImageFile) {
                            const data = JSON.parse(res._bodyInit);
                            const formData = new FormData();
                            formData.append('id', data.id);
                            formData.append('image', selectedImageFile, selectedImageUrl);

                            fetch(
                                `${process.env.REACT_APP_API_URL}api/v1/addpupilimage/`,
                                {
                                    method: "PUT",
                                    headers: {
                                        Authorization: `Token ${token}`,
                                        // "Content-type": "multipart/form-data",
                                    },
                                    body: formData
                                }
                            ).then((res) => {
                                console.log(212, res);
                            }).catch((err) => {
                                console.log(err);
                            });

                        }


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

    const imgDeleteFun = () => {
        setSelectedImage(null);
        setSelectedImageFile(null);
        setSelectedImageUrl('');
    }

    return (
        <div className="flex flex-col gap-4" style={{
            overflowY: 'auto',
            height: selectedImage ? '70vh' : '50vh'
        }}>
            <h3 className="text-center">O'quvchi qo'shish</h3>
            <FormContainer className="mt-4 grid grid-cols-3 gap-2" style={
                {
                    alignItems: 'center'
                }
            }>
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

                <FormItem
                    label={"Rasm yuklash"}
                    // invalid={errorRelativeNumber}
                    errorMessage={errorMessage}
                    style={
                        {
                            display: 'flex'
                        }
                    }
                >
                    <Input
                        // ref={inputRef}
                        accept={".png, .jpg, .jpeg"}
                        onChange={handleImageChange}
                        style={{
                            display: 'none',
                            alignItems: 'cenete'
                        }}
                        required
                        id="file-upload"
                        type={'file'}
                        placeholder="Rasm yuklash"
                    // value={relativePhoneNumber}
                    // onChange={changeRelativeNumber}
                    // onPaste={handlePasteRelativePhone}
                    />

                    <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: '11px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', display: 'block', }}>
                        Rasm yuklash
                    </label>

                </FormItem>
            </FormContainer>

            <div style={{
                width: '100%',
                display: selectedImage ? 'flex' : 'none',
                flexDirection: 'row',
                paddingBottom: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <img src={selectedImage} style={{
                    height: '200px',
                    width: '200px',
                    border: '1px solid #3a3a3a',
                    padding: '1rem',
                    borderRadius: '10px'
                }} alt="" srcset="" />
                <button style={{
                    position: 'absolute',
                    top: '-0.4rem',
                    right: '36%',
                    padding: '0.1rem',
                    transition: 'all 0.3s',
                    borderRadius: '50%',
                    background: isHovered ? '#7c7c7c' : '#b1b1b1',
                    color: isHovered ? '#d9d9d9' : '#5b5b5b',

                }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={imgDeleteFun}
                >
                    <CloseIcon sx={{
                        fontSize: '1.5rem'
                    }} />
                </button>
            </div>

            <Button color="indigo-500" variant="solid" onClick={addStudentFun} loading={disabledButton}>
                Qo'shish
            </Button>
        </div>
    );
};

export default AddStudentModal;
