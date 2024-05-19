import React, { useState, useEffect } from "react";
import { Table, Tooltip, Dialog } from "components/ui";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import UpdateClassModal from "views/classes/UpdateClassModal";
import DeleteModal from "views/classes/DeleteModal";

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const TableData = (props) => {
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
  const isClass = headerGroups[0].headers.find((e) => e.Header == "Sinf nomi");
  const openUpdateModal = (arg) => {
    if (isClass) {
      setActionName("class");
      setSelectedItem(arg);
    }
    setUpdateModal(true);
  };

  const openDeleteModal = (arg) => {
    const isClass = headerGroups[0].headers.find(
      (e) => e.Header == "Sinf nomi"
    );
    if (isClass) {
      setActionName("class");
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
              {isClass && <Th>Amallar</Th>}
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
                      style={{
                        background:
                          index == location &&
                          (row?.original?.arrivalsCountPercent <= 20
                            ? "#e55c5c"
                            : row?.original?.arrivalsCountPercent > 20 &&
                              row?.original?.arrivalsCountPercent <= 60
                            ? "#e5d85c"
                            : row?.original?.arrivalsCountPercent > 60
                            ? "#52be4e"
                            : "#e55c5c"),
                      }}
                    >
                      {index == 1 && props.redirectTo && (
                        <Link
                          to={`${props.redirectTo}/${row.original.id}`}
                          onMouseDown={() => {
                            isRegion &&
                              localStorage.setItem("regionId", row.original.id);
                          }}
                        >
                          {cell.render("Cell")}
                        </Link>
                      )}

                      {index == location && props.redirectTo && (
                        <p
                          style={{
                            background:
                              row?.original?.arrivalsCountPercent <= 20
                                ? "#e55c5c"
                                : row?.original?.arrivalsCountPercent > 20 &&
                                  row?.original?.arrivalsCountPercent <= 60
                                ? "#e5d85c"
                                : row?.original?.arrivalsCountPercent > 60
                                ? "#52be4e"
                                : "#e55c5c",
                            textAlign: "center",
                            color: "#fff",
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
                {isClass && (
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
        <Dialog isOpen={updateModal} onClose={closeUpdateModal}>
          {actionName === "class" && (
            <UpdateClassModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeUpdateModal}
            />
          )}
        </Dialog>
        <Dialog isOpen={deleteModal} onClose={closeDeleteModal}>
          {actionName === "class" && (
            <DeleteModal
              item={selectedItem}
              updateFun={updateData}
              closeFun={closeDeleteModal}
            />
          )}
        </Dialog>
      </Table>
    </>
  );
};

export default TableData;
