import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { loginCheck } from "../utils";

export default function Form ({}) {
    const query = useParams()
    const navigate = useNavigate()

    const [ userInfo, setUserInfo ] = useState();
    const [ currentProfile, setCurrentProfile ] = useState(0);

    useEffect(() => {
        loginCheck ()
        setUserInfo({
            id: query.id,
            Photo: "/AP-logo-1.png", 
            name: "Hasan Nursalim",
            department: "General Manager",
        });
    }, []);


     

    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="h-screen w-screen bg-sky-300 p-5 lg:p-12 lg:py-6">
                {
                userInfo ?
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3">
                        <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                            <img src={userInfo.Photo} alt="logo" />
                            <b className="mt-5"></b>
                            <b>{userInfo.name}</b>
                            <span className="text-slate-600">{userInfo.department}</span>
                        </div>
                        <div className="bg-white rounded-xl flex flex-row items-center justify-start flex-grow gap-1 px-10">
                            <div className="flex flex-col items-start justify-center flex-grow gap-1">
                                <div className="flex gap-3 items-baseline">
                                    <b className="text-2xl">AP125</b>
                                    <span className="text-slate-300">UPN Veteran Jawa Timur</span>
                                </div>
                                <span className="text-slate-600">Teknologi Informasi & Komunikasi</span>
                                <span className="text-green-600">November - Januari</span>
                                <button className="border-2 border-black rounded-xl px-3 py-1">Download Surat Pengantar</button>
                            </div>
                          
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Sidebar active={"Tambah Ajuan"} />
                        <div className="bg-white rounded-xl w-full py-4 px-8 flex flex-col gap-1 h-full min-h-[500px]">
                            <div className="flex flex-col gap-1">
                            <div>
                            <div>Nama</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            <div>
                            <div>NPM</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            <div>
                            <div>Jurusan</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            <div>
                            <div>Jenis Kelamin</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            <div>
                            <div>Email</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            <div>
                            <div>No Telfon</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" />
                            </div>
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-10">
                            <button className="mt-5 w-2/6 bg-blue-600 rounded-xl text-white px-10 py-2" >Submit</button>
                            </div>
                        </div>
                    
                    </div>
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}