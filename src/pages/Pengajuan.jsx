import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import Table from "../components/Table";
import { loginCheck } from "../utils";
import axios from "axios";
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel';
import { useRef } from "react";


  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export default function Pengajuan () {

    const [ userInfo, setUserInfo ] = useState();
    const [ data, setData ] = useState([]);
    const [ active, setActive ] = useState("Diproses");
    // const [ submissions, setSubmissions ] = useState([]);

    const tableRef = React.createRef()

    useEffect(() => {
      loginCheck ()
        setUserInfo({
            Photo: "AP logo 1.png", 
            name: "",
            department: ""
        });

        console.log("ref", tableRef.current)
        
        axios
          .get(`${process.env.REACT_APP_API_HOST}/submissions`)
          .then((response) => {
            // console.log(response.data)
            setData(response.data.submission)
          })
          .catch(console.error)
        
    }, []);

    // useEffect(() => {
    //   if(active === "proses") {
    //     setData([
    //       {
    //         regis: 'AP121',
    //         nama: 'Dio Farrel',  
    //         jumlah: '3',
    //         tanggal: '24-10-2022, 12.43',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November - Januari',
    //       },
    //       {
    //         regis: 'AP122',
    //         nama: 'Galih Arum',  
    //         jumlah: '4',
    //         tanggal: '24-10-2022, 12.44',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November',
    //       },
    //     ]) 
    //   } else if(active === "diterima") {
    //     setData([
    //       {
    //         regis: 'AP121',
    //         nama: 'Dio Farrel',  
    //         jumlah: '3',
    //         tanggal: '24-10-2022, 12.43',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November - Januari',
    //       },
    //     ]) 
    //   } else {
    //     setData([])
    //   }
    // }, [active])

    let ddopt = [
      {
          text: "January",
          value: "1"
      },
      {
          text: "February",
          value: "2"
      },
      {
          text: "Maret",
          value: "3"
      },
      {
          text: "April",
          value: "4"
      },
      {
          text: "Mei",
          value: "5"
      },
      {
          text: "Juni",
          value: "6"
      },
      {
          text: "Juli",
          value: "7"
      },
      {
          text: "Agustus",
          value: "8"
      },
      {
          text: "September",
          value: "9"
      },
      {
          text: "Oktober",
          value: "10"
      },
      {
          text: "November",
          value: "11"
      },
      {
          text: "Desember",
          value: "12"
      }
    ]

    let subtitle;
  const [setIsOpen] = React.useState(false);

    function handleExport() {
        const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
        let exportData = [];
        for(let i = 0; i< data.length; ++i) {
            let dt = new Date(data[i].created_at)
            exportData.push({
                code_submission: data[i].code_submission,
                name: data[i].name,
                total_trainee: data[i].total_trainee,
                created_at: `${dt.getDate()} ${month[dt.getMonth()]} ${dt.getFullYear()}`,
                division: data[i].division.name,
                month: `${month[new Date(data[i].start_date).getMonth()]} - ${month[new Date(data[i].end_date).getMonth()]}`,
                status: data[i].status
            })
        }
        downloadExcel({
            fileName: `pengajuan_${new Date().getTime()}`,
            sheet: "Pengajuan",
            tablePayload: {
                header: ["No. Registrasi", "Nama", "Jumlah", "Tanngal Pengajuan", "Unit Kerja", "Bulan", "Status"],
                body: exportData
            }
        })
    }

      

    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="h-screen w-screen bg-sky-300 p-5 lg:p-12 lg:py-6">
                {
                userInfo ?
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                            <img src={userInfo.Photo} alt="logo" />
                            <b className="mt-5"></b>
                            <b>{userInfo.name}</b>
                            <span className="text-slate-600">{userInfo.department}</span>
                        </div>
                        <Sidebar active={"Pengajuan"} />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-5 flex flex-col items-start h-48 gap-1">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-1">
                                    <b className="text-2xl">Halo {userInfo.name.split(" ")[0]}!</b>
                                    <span className="text-slate-600">Selamat datang kembali!</span>
                                </div>
                                <button onClick={handleExport} className="bg-blue-600 rounded-lg text-white px-3 py-1 h-fit">Export</button>
                            </div>
                            <Searchbar useDropdown={true} dropdownOptions={ddopt} className="mt-5" />
                            
                        </div>
                        <div className="bg-white rounded-xl h-[500px]">
                          <div className="flex flex-row justify-around">
                            <button className={`py-4 w-full ${active === "Diproses" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Diproses")}>Proses</button>
                            <button className={`py-4 w-full ${active === "Diterima" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Diterima")}>Diterima</button>
                            <button className={`py-4 w-full ${active === "Ditolak" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Ditolak")}>Ditolak</button>
                            <button className={`py-4 w-full ${active === "Dibatalkan" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Dibatalkan")}>Dibatalkan</button>
                          </div>
                          <Table className="bg-white rounded-xl overflow-y-auto max-h-[300px]" data={data} ref={tableRef} active={active} />
                        </div>
                    </div>
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}