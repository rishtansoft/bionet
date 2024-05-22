import React, { useState, useEffect } from "react";
import { Table, Tooltip, Dialog } from "components/ui";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import UpdateClassModal from "views/classes/UpdateClassModal";
import DeleteModal from "views/classes/DeleteModal";
import UpdateTeacherModal from "views/teachers/UpdateTeacher";
import UpdateStudentModal from "views/students/UpdateStudentModal";
import DeleteTeacherModal from "views/teachers/DeleteTeacher";
import DeleteStudentModal from "views/students/DeleteStudent";
import { useSelector } from "react-redux";

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const TableData = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { columns, data, is_location, updateData } = props;
  const [location, setlocation] = useState(4);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [actionName, setActionName] = useState("");
  const [regionId, setRegionId] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    setlocation(is_location);
  }, [is_location]);
  useEffect(() => {
    let getId = localStorage.getItem("regionId");
    setRegionId(getId);
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const isRegion = headerGroups[0].headers.find(
    (e) => e.Header == "Viloyat nomi"
  );
  const isDistrict = headerGroups[0].headers.find(
    (e) => e.Header == "Tuman nomi"
  );
  const isSchool = headerGroups[0].headers.find(
    (e) => e.Header == "Maktab nomi"
  );
  const isTeacher = headerGroups[0].headers.find(
    (e) => e.Header == "O'qituvchi"
  );
  const isClass = headerGroups[0].headers.find((e) => e.Header == "Sinf Nomi");
  const isStudent = headerGroups[0].headers.find((e) => e.Header == "O'quvchi");
  const openUpdateModal = (arg) => {
    if (isClass) {
      setActionName("class");
      setSelectedItem(arg);
    }
    if (isTeacher) {
      setActionName("teacher");
      setSelectedItem(arg);
    }
    if (isStudent) {
      setActionName("student");
      setSelectedItem(arg);
    }
    setUpdateModal(true);
  };

  const openDeleteModal = (arg) => {
    if (isClass) {
      setActionName("class");
      setSelectedItem(arg);
    }
    if (isTeacher) {
      setActionName("teacher");
      setSelectedItem(arg);
    }
    if (isStudent) {
      setActionName("student");
      setSelectedItem(arg);
    }
    setDeleteModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
    setActionName("");
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setActionName("");
  };

  const writeRegionId = (e) => {
    isRegion && localStorage.setItem("regionId", e);
  };

  const callBreadCrump = (value) => {
    if(user.user_type == "RESPUBLIKA"){
      let backPages = localStorage.getItem('backUrls');
      let backPagesFilter = JSON.parse(backPages);
      if(isDistrict){
        backPagesFilter?.push({url: `${props.redirectTo}`, label: 'Tumanlar'})
      }else if(isSchool){
        backPagesFilter?.push({url: `${props.redirectTo}/${value}`, label: 'Maktablar'})
      }
      localStorage.setItem('backUrls', JSON.stringify(backPagesFilter))
    }
  }

  return (
    <>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  {column.render("Header")}
                  {index > 0 && (
                    <span>
                      <Sorter sort={column.isSortedDesc} />
                    </span>
                  )}
                </Th>
              ))}
              {isTeacher && user.user_type == "MAKTAB" && (
                <Th style={{ textAlign: "end" }}>Amallar</Th>
              )}
              {isClass && user.user_type == "MAKTAB" && (
                <Th style={{ textAlign: "end" }}>Amallar</Th>
              )}
              {isStudent && user.user_type == "MAKTAB" && (
                <Th style={{ textAlign: "end" }}>Amallar</Th>
              )}
            </Tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                    >
                      {index == 1 && props.redirectTo && (
                        <Link
                          to={`${props.redirectTo}/${row.original.id}`}
                          onMouseDown={() => {
                            callBreadCrump(row.original.id)
                            writeRegionId(row.original.id);
                          }}
                        >
                          {cell.render("Cell")}
                        </Link>
                      )}

                      {index == location && props.redirectTo && (
                        <p
                          style={{
                            color:
                              row?.original?.arrivalsCountPercent <= 20
                                ? "#e55c5c"
                                : row?.original?.arrivalsCountPercent > 20 &&
                                  row?.original?.arrivalsCountPercent <= 60
                                ? "#e5d85c"
                                : row?.original?.arrivalsCountPercent > 60
                                ? "#52be4e"
                                : "#e55c5c",
                            textAlign: "center",
                          }}
                        >
                          {row?.original?.arrivalsCountPercent == null
                            ? "-"
                            : row?.original?.arrivalsCountPercent}
                        </p>
                      )}
                      {((index != 1 && index != location) ||
                        !props.redirectTo) &&
                        cell.render("Cell")}
                    </Td>
                  );
                })}
                {isClass && user.user_type == "MAKTAB" && (
                  <Td className="text-end">
                    <div className="flex justify-end items-center gap-4">
                      <Tooltip title={"Tahrirlash"}>
                        <FaPen
                          className="cursor-pointer"
                          onClick={() => {
                            openUpdateModal(row.original);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={"O'chirish"}>
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => {
                            openDeleteModal(row.original);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Td>
                )}
                {isTeacher && user.user_type == "MAKTAB" && (
                  <Td className="text-end">
                    <div className="flex justify-end items-center gap-4">
                      <Tooltip title={"Tahrirlash"}>
                        <FaPen
                          className="cursor-pointer"
                          onClick={() => {
                            openUpdateModal(row.original);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={"O'chirish"}>
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => {
                            openDeleteModal(row.original);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Td>
                )}
                {isStudent && user.user_type == "MAKTAB" && (
                  <Td className="text-end">
                    <div className="flex justify-end items-center gap-4">
                      <Tooltip title={"Tahrirlash"}>
                        <FaPen
                          className="cursor-pointer"
                          onClick={() => {
                            openUpdateModal(row.original);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={"O'chirish"}>
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => {
                            openDeleteModal(row.original);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Td>
                )}
              </Tr>
            );
          })}
        </TBody>
        {actionName === "class" && (
          <Dialog isOpen={updateModal} onClose={closeUpdateModal}>
            <UpdateClassModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeUpdateModal}
            />
          </Dialog>
        )}
        {actionName === "teacher" && (
          <Dialog isOpen={updateModal} onClose={closeUpdateModal} width={700}>
            <UpdateTeacherModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeUpdateModal}
            />
          </Dialog>
        )}
        {actionName === "student" && (
          <Dialog isOpen={updateModal} onClose={closeUpdateModal} width={700}>
            <UpdateStudentModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeUpdateModal}
            />
          </Dialog>
        )}

        {actionName === "class" && (
          <Dialog isOpen={deleteModal} onClose={closeDeleteModal}>
            <DeleteModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeDeleteModal}
            />
          </Dialog>
        )}
        {actionName == "teacher" && (
          <Dialog isOpen={deleteModal} onClose={closeDeleteModal}>
            <DeleteTeacherModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeDeleteModal}
            />
          </Dialog>
        )}
        {actionName == "student" && (
          <Dialog isOpen={deleteModal} onClose={closeDeleteModal}>
            <DeleteStudentModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeDeleteModal}
            />
          </Dialog>
        )}
      </Table>
    </>
  );
};

export default TableData;
