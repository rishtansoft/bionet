import React, {useState} from "react";
import { Button, toast, Notification } from "components/ui";
import { useSelector } from "react-redux";

const DeleteModal = ({ item, updateFun, closeFun }) => {
  const token = useSelector((state) => state?.auth?.session?.token);
  const [disabledButton, setDisabledButton] = useState(false);

  const deleteClassFun = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    fetch(
        `${process.env.REACT_APP_API_URL}api/v1/deletepupil/${item.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            // "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status == 204) {
          toast.push(
            <Notification
              title={"Muvaffaqiyatli"}
              type="success"
              duration={5000}
              transitionType="fade"
            >
              {"O'quvchi muvaffaqiyatli o'chirildi"}
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
        setDisabledButton(false);
      });
  };

  return (
    <div className="flex flex-col gap-4 text-center pt-[20px]">
      <h3>{item?.name}</h3>
      <p>Ushbu o'quvchini o'chirishni hohlaysizmi ?</p>
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
