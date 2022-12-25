import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table";
import Modal from "react-modal";
import { CiEdit } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { loginCheck } from "../utils";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

let ddopt = [
  {
    text: "January",
    value: "1",
  },
  {
    text: "February",
    value: "2",
  },
  {
    text: "Maret",
    value: "3",
  },
  {
    text: "April",
    value: "4",
  },
  {
    text: "Mei",
    value: "5",
  },
  {
    text: "Juni",
    value: "6",
  },
  {
    text: "Juli",
    value: "7",
  },
  {
    text: "Agustus",
    value: "8",
  },
  {
    text: "September",
    value: "9",
  },
  {
    text: "Oktober",
    value: "10",
  },
  {
    text: "November",
    value: "11",
  },
  {
    text: "Desember",
    value: "12",
  },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.25)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function Editkuota() {
  const [userInfo, setUserInfo] = useState();
  const [data, setData] = useState([]);
  console.log(data, "fsdfsfsdf");
  const [bidangKeahlian, setBidangKeahlian] = useState([]);
  const [checkedBK, setCheckedBK] = useState([]);
  const [tableIndexer, setTableIndexer] = useState(0);

  const namaunitkerja = useRef();
  const kuota = useRef();
  const unitKerjaNameEdit = useRef();
  const unitKerjaQuotaEdit = useRef();
  const unitKerjaIdEdit = useRef();
  const bidangKeahlianName = useRef();
  const navigate = useNavigate();

  function getAllUnitKerja() {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/list_division_fields`)
      .then((response) => {
        //console.log(response, "res");
        setData(response.data.data);
        // getPairOfDivisionAndBidangKeahlian(response.data.division)
      });
  }

  function populate() {
    getAllUnitKerja();
    getAllBidangKeahlian();
  }

  useEffect(() => {
    loginCheck();
    setUserInfo({
      Photo: "/AP logo 1.png",
      name: "",
      department: "",
    });
    populate();
    // getPairOfDivisionAndBidangKeahlian()

    // localStorage.setItem("form-pengajuan", JSON.stringify({
    //     nama: "Dio Farrel",
    //     nim: "101010"
    // }))

    // alert(localStorage.getItem("form-pengajuan"))

    // localStorage.removeItem("form-pengajuan")
  }, []);

  useEffect(() => {
    console.log(checkedBK);
  }, [checkedBK]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2IsOpen, setIsOpen2] = React.useState(false);
  const [modal3IsOpen, setIsOpen3] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
    getAllBidangKeahlian();
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function openModal3() {
    setIsOpen3(true);
  }

  function afterOpenModal3() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function submitEditUnitKerja(e) {
    console.log(e);
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_HOST}/divisions/${unitKerjaIdEdit.current.value}`,
        {
          name: unitKerjaNameEdit.current.value,
          quota: Number.parseInt(unitKerjaQuotaEdit.current.value),
        }
      )
      .then((response) => {
        pairDivisionAndBidangKeahlian(unitKerjaIdEdit.current.value, checkedBK);
      })
      .catch((response) => {
        if (response.response.status === 404) {
          pairDivisionAndBidangKeahlian(
            unitKerjaIdEdit.current.value,
            checkedBK
          );
          closeModal2();
        }
      });
  }

  function submitBidangKeahlian(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_HOST}/study_fields`, {
        name: bidangKeahlianName.current.value,
      })
      .then((response) => {
        closeModal3();
      });
  }

  function getAllBidangKeahlian() {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/study_fields`)
      .then((response) => {
        setBidangKeahlian(response.data.study_field);
      });
  }

  function tambahUnitKerja(e) {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_HOST}/divisions`, {
        name: namaunitkerja.current.value,
        quota: Number.parseInt(kuota.current.value),
      })
      .then((response) => {
        closeModal2();
        getAllUnitKerja();
      });
  }

  function pairDivisionAndBidangKeahlian(divisionId, bidangKeahlianArray) {
    for (let i = 0; i < bidangKeahlianArray.length; ++i) {
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/list_division_fields/${divisionId}`,
          {
            study_field_id: Number.parseInt(bidangKeahlianArray[i]),
          }
        )
        .then((response) => {
          console.log(response, "post");
        })
        .catch(console.error);
    }
  }

  // function getPairOfDivisionAndBidangKeahlian(dataApiResponse) {
  //   console.log("run pair")
  //   for(let i = 0; i < dataApiResponse.length; ++i) {
  //     axios.get(`${process.env.REACT_APP_API_HOST}/list_division_fields/${dataApiResponse[i].id}`)
  //     .then((response) => {
  //       let arr = dataApiResponse;
  //       for(let j = 0; j < arr.length; ++j) {
  //         let str = "-";
  //         arr[j].bidangkeahlian = str;
  //         console.log(arr[j].id, dataApiResponse[i].id)
  //         if(arr[j].id == dataApiResponse[i].id) {
  //           console.log("match")
  //           response.data.list_study_field.forEach((val, index) => {
  //             if(index < response.data.list_study_field.length - 1) {
  //               str = ""
  //               str += val.field_name + ", ";
  //             } else str += val.field_name;
  //           })
  //           console.log(arr[j])
  //           arr[j].bidangkeahlian = str
  //         }

  //       }
  //       setData(arr)
  //       return arr;

  //     })
  //     .finally((arr) => {
  //       // setData(arr)
  //     })
  //   }
  // }

  const columns = React.useMemo(
    () => [
      {
        Header: "Unit Kerja",
        accessor: "division_name", // accessor is the "key" in the data
      },
      {
        Header: "Kuota",
        accessor: "quota",
      },
      {
        Header: "Bidang Keahlian",
        accessor: (row) => {
          console.log(row, "row");
          if (!!row.list_study_field) {
            let str = "";
            row.list_study_field.forEach((val, index) => {
              console.log(val, index, "up");
              if (index < row.list_study_field.length - 1) {
                str += val + ", ";
              } else str += val;
            });
            return str;
          }
          return "-";
        },
      },
    ],
    []
  );

  // const data = React.useMemo(
  //   () => divisi,
  //   []
  // )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <Helmet>
        <title>Home - Angkasa Pura</title>
      </Helmet>
      <div className="h-screen w-screen bg-sky-300 p-3 lg:px-12 lg:py-6">
        {userInfo ? (
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                <img src={userInfo.Photo} alt="logo" />
                <b className="mt-5"></b>
                <b>{userInfo.name}</b>
                <span className="text-slate-600">{userInfo.department}</span>
              </div>
              <Sidebar active={"Edit Kuota"} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-xl p-5 flex flex-col h-48 items-center justify-center gap-1">
                <div className="flex justify-between items-center w-full">
                  <b className="text-2xl">EDIT KUOTA</b>
                  <button
                    className="px-3 bg-blue-600 text-white rounded-xl py-2 self-end hover:bg-blue-700"
                    onClick={openModal2}
                  >
                    Tambah Unit Kerja
                  </button>
                  <Modal
                    isOpen={modal2IsOpen}
                    onAfterOpen={afterOpenModal2}
                    onRequestClose={closeModal2}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h1> Tambah Unit Kerja</h1>
                    <form onSubmit={tambahUnitKerja}>
                      <button onClick={closeModal2}>
                        <AiOutlineClose className="text-2xl absolute right-3 top-5" />
                      </button>
                      <div className="">
                        <label htmlFor="NamaUnitKerja"> Nama Unit Kerja</label>
                        <br />
                        <input
                          type="text"
                          id="NamaUnitKerja"
                          name="namaunitkerja"
                          ref={namaunitkerja}
                          className="border-2 w-80 border-gray-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor="Kuota">Kuota</label>
                        <br />
                        <input
                          type="number"
                          id="Kuota"
                          name="kuota"
                          ref={kuota}
                          className="border-2 w-80 border-gray-700 rounded-lg"
                        />
                        <br />
                        <button
                          type="submit"
                          onClick={tambahUnitKerja}
                          className="mt-5 bg-blue-600 rounded-lg text-white px-5 py-1 flex items-center justify-center"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
                <Searchbar
                  useDropdown={false}
                  dropdownOptions={ddopt}
                  placeholder={"Cari unit kerja"}
                  className="mt-5"
                  inputClass={"rounded-xl"}
                />
              </div>
              <div className="bg-white rounded-xl min-h-[500px] overflow-y-auto h-[500px]">
                <table className="px-3 py-2">
                  <thead className="bg-slate-300 h-8 rounded-t-lg sticky top-0">
                    {
                      // Loop over the header rows
                      headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column, key) => (
                              // Apply the header cell props
                              <th
                                key={key}
                                {...column.getHeaderProps()}
                                className="w-96 text-left px-5"
                              >
                                {
                                  // Render the header
                                  column.render("Header")
                                }
                              </th>
                            ))
                          }
                          <th className="w-48 text-left px-5"></th>
                        </tr>
                      ))
                    }
                  </thead>
                  {/* Apply the table body props */}
                  <tbody {...getTableBodyProps()}>
                    {console.log(rows)}
                    {
                      // Loop over the table rows
                      rows.map((row, i, arr) => {
                        // console.log(row, i, arr)
                        // Prepare the row for display
                        prepareRow(row);

                        // console.log(row.cells[1].value, rows[i].values.kuota)
                        if (tableIndexer < i - 1)
                          setTableIndexer(tableIndexer + 1);
                        // console.log(tableIndexer)
                        return (
                          // Apply the row props
                          <tr key={i} className="hover:bg-gray-200 h-8">
                            {
                              // Loop over the rows cells
                              row.cells.map((cell, j) => {
                                // Apply the cell props
                                return (
                                  <td
                                    key={j}
                                    {...cell.getCellProps()}
                                    className="px-5"
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })
                            }
                            <td className="flex flex-row">
                              <button
                                className="text-center w-full flex items-center justify-center"
                                onClick={openModal}
                              >
                                <CiEdit
                                  className="text-3xl"
                                  onClick={() =>
                                    navigate("/editkuota/" + row.original.id)
                                  }
                                />
                                {/* {row.original.id} */}
                              </button>
                              <button
                                className="text-center w-full flex items-center justify-center"
                                onClick={() => {
                                  axios
                                    .delete(
                                      `${process.env.REACT_APP_API_HOST}/divisions/${row.original.id}`
                                    )
                                    .then((response) => {
                                      getAllUnitKerja();
                                    });
                                }}
                              >
                                <AiOutlineDelete className="text-2xl" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
