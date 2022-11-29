import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import Table from "../components/Table";
import { loginCheck } from "../utils";
import axios from "axios";



  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export default function Pengajuan () {

    const [ userInfo, setUserInfo ] = useState();
    const [ data, setData ] = useState();
    const [ active, setActive ] = useState("proses");
    // const [ submissions, setSubmissions ] = useState([]);

    useEffect(() => {
      loginCheck ()
        setUserInfo({
            Photo: "AP-logo-1.png", 
            name: "Hasan Nursalim",
            department: "General Manager"
        });

        
        axios
          .get(`${process.env.REACT_APP_API_HOST}/submissions`)
          .then((response) => {
            console.log(response.data)
          })
          .catch(console.error)
        
    }, []);

    useEffect(() => {
      if(active === "proses") {
        setData([
          {
            regis: 'AP121',
            nama: 'Dio Farrel',  
            jumlah: '3',
            tanggal: '24-10-2022, 12.43',  
            unit: 'Teknologi Informasi & Komunikasi',
            bulan: 'November - Januari',
          },
          {
            regis: 'AP122',
            nama: 'Galih Arum',  
            jumlah: '4',
            tanggal: '24-10-2022, 12.44',  
            unit: 'Teknologi Informasi & Komunikasi',
            bulan: 'November',
          },
        ]) 
      } else if(active === "diterima") {
        setData([
          {
            regis: 'AP121',
            nama: 'Dio Farrel',  
            jumlah: '3',
            tanggal: '24-10-2022, 12.43',  
            unit: 'Teknologi Informasi & Komunikasi',
            bulan: 'November - Januari',
          },
        ]) 
      } else {
        setData([])
      }
    }, [active])

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
                              <b className="text-2xl">Halo {userInfo.name.split(" ")[0]}!</b>
                              <span className="text-slate-600">Selamat datang kembali!</span>
                              <Searchbar useDropdown={true} dropdownOptions={ddopt} className="mt-5" />
                        </div>
                        <div className="bg-white rounded-xl min-h-[500px]">
                          <div className="flex flex-row justify-around">
                            <button className={`py-4 w-full ${active === "proses" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("proses")}>Proses</button>
                            <button className={`py-4 w-full ${active === "diterima" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("diterima")}>Diterima</button>
                            <button className={`py-4 w-full ${active === "ditolak" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("ditolak")}>Ditolak</button>
                            <button className={`py-4 w-full ${active === "dibatalkan" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("dibatalkan")}>Dibatalkan</button>
                          </div>
                          <Table data={data} />
                        </div>
                    </div>
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}