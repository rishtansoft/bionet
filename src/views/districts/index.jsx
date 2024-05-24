import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import TableData from "components/table/TableData";
import { useSelector } from "react-redux";
import { DatePicker } from "components/ui";
import { ExportToExcelStudent } from "../excelConvert";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Districts() {
      const [currentDate, setCurrentDate] = useState(null);
      const [backLinks, setBackLinks] = useState([]);
      const [backLinksNew, setBackLinksNew] = useState([]);

      const [columns] = useState([
            {
                  Header: "N#",
                  accessor: "number",
            },
            {
                  Header: "Tuman nomi",
                  accessor: "name",
            },
            {
                  Header: "Maktablar soni",
                  accessor: "schoolCount",
            },
            {
                  Header: "O`quvchilar soni",
                  accessor: "studentsCount",
            },
            {
                  Header: "Kelganlar soni",
                  accessor: "arrivalsCount",
            },
            {
                  Header: "Kelganlar soni (%)",
                  accessor: "arrivalsCountPercent",
            },
            {
                  Header: "Kelmaganlar soni",
                  accessor: "absenteesCount",
            },
            {
                  Header: "Kelmaganlar soni (%)",
                  accessor: "absenteesCountPercent",
            },
      ]);
      const [redirectTo, setRedirectTo] = useState("");

      const user = useSelector((state) => state.auth.user);
      const params = useParams();
      const navigate = useNavigate();
      function removeDuplicates(arr) {
            
      }

      useEffect(() => {
            if (user.user_type == "VILOYAT") {
                  params.region_id = user.viloyat_id;
            }

            if (!params.region_id) {
                  navigate("/");
            }

            if (user.user_type == "RESPUBLIKA") {
                  setRedirectTo("/republic-regions/" + params.region_id);
            }

            if (user.user_type == "VILOYAT") {
                  setRedirectTo("/region-regions");
            }

            if (user.user_type == "TUMAN") {
                  setRedirectTo("/district-district/" + params.region_id);
            }
            if (user.user_type == "RESPUBLIKA") {
                  setRedirectTo("/republic-regions/" + params.region_id);
            }

            if (user.user_type == "VILOYAT") {
                  setRedirectTo("/region-regions");
            }

            if (user.user_type == "TUMAN") {
                  setRedirectTo("/district-district/" + params.region_id);
            }

            let getBackUrls = localStorage.getItem("backUrls");
            let filterGetBackUrls = removeDuplicates(JSON.parse(getBackUrls));
            setBackLinks(filterGetBackUrls);


            let getBackUrlsNew = localStorage.getItem("locationUrlName");
            let filterGetBackUrlsNew = JSON.parse(getBackUrlsNew);
            setBackLinksNew(filterGetBackUrlsNew);

      }, []);
      function getTodaysDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
      }

      function formatDate(inputDate) {
            const date = new Date(inputDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
      }

      const [data, setData] = useState([]);
      const [apiData, setApiData] = useState([]);

      const token = useSelector((state) => state?.auth?.session?.token);

      useEffect(() => {
            if (token && params.region_id && currentDate) {
                  const sendData = {
                        viloyat_id: params.region_id,
                        sana: currentDate,
                  };
                  fetch(`${process.env.REACT_APP_API_URL}api/v1/davomatviloyat/`, {
                        method: "POST",
                        headers: {
                              Authorization: `Token ${token}`,
                              "Content-type": "application/json",
                        },
                        body: JSON.stringify(sendData),
                  })
                        .then((res) => res.json())
                        .then((d) => {
                              console.log(108, d);
                              setApiData(d);
                        })
                        .catch((err) => {
                              console.log(err);
                        });
            }
      }, [currentDate]);

      useEffect(() => {
            let today = getTodaysDate();
            setCurrentDate(today);
      }, []);

      function handleChangeDate(e) {
            setCurrentDate(formatDate(e));
      }

      useEffect(() => {
            if (apiData.length > 0) {
                  let res = [];
                  apiData.forEach((el, index) => {
                        const reg = {
                              number: index + 1,
                              name: el[0].tuman,
                              schoolCount: el[0].maktabsoni,
                              studentsCount: el[0].bolasoni,
                              arrivalsCount: el[0].kelganlar,
                              arrivalsCountPercent: el[0].foizi,
                              absenteesCount: el[0].kelmaganlar,
                              absenteesCountPercent: 100 - el[0].foizi,
                              id: el[0].tuman_id,
                        };

                        res.push(reg);
                  });

                  setData(res);
            }
      }, [apiData]);
      return (
            <div>
                  <div className="mb-4">
                        <Breadcrumbs
                              separator={<NavigateNextIcon fontSize="small" />}
                              aria-label="breadcrumb">
                              {backLinksNew &&
                                    backLinksNew?.length > 0 &&
                                    backLinksNew.map((value, index) => (
                                          <Link key={index} to={value.old_url} className="hover:underline">
                                                {value.name}
                                          </Link>
                                    ))}
                              {/* <Link className="hover:underline">
                                    Tumanlar
                              </Link> */}
                        </Breadcrumbs>
                  </div>
                  <h2 className="mb-3">Tumanlar bo'yicha</h2>
                  <div
                        className="date-filter text-right mb-4 flex justify-end"
                        style={{
                              alignItems: "center",
                        }}
                  >
                        <ExportToExcelStudent apiData={data} headers={columns} />
                        <DatePicker
                              value={currentDate}
                              onChange={handleChangeDate}
                              placeholder={currentDate}
                              className="w-1/4"
                        />
                  </div>
                  <TableData
                        redirectTo={redirectTo}
                        columns={columns}
                        data={data}
                        is_location={5}
                        locationName={'Tumanlar'}

                  ></TableData>
            </div>
      );
}

export default Districts;
