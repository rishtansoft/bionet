import React, {useState} from "react";
import { Button, toast, Notification } from "components/ui";

const DeleteModal = ({ item, updateFun, closeFun }) => {
  const [disabledButton, setDisabledButton] = useState(false);

  const deleteClassFun = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    const testToken = "eb577759f4ca0dde05b02ea699892ee560920594";
    fetch(`${process.env.REACT_APP_API_URL}api/v1/deletesinf/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${testToken}`,
        // "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 204) {
          toast.push(
            <Notification
              title={"Muvaffaqiyatli"}
              type="success"
              duration={5000}
              transitionType="fade"
            >
              {"Sinf muvaffaqiyatli o'qhirildi"}
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
  };

  return (
    <div className="flex flex-col gap-4 text-center pt-[20px]">
      <h3>{item?.name}</h3>
      <p>Ushbu sinfni o'chirishni hohlaysizmi ?</p>
      <div className="flex justify-between items-center pt-4">
        <Button onClick={closeFun}>Bekor qilish</Button>
        <Button
          variant={"solid"}
          color={"red-500"}
          className="w-1/4"
          onClick={deleteClassFun}
          loading={disabledButton}
        >
          Ha
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
