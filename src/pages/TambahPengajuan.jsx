import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import Modal from 'react-modal';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { loginCheck } from "../utils";
import axios from "axios";
import { useRef } from "react";



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0, 0.25)'
    }
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function TambahPengjuan () {

    const navigate = useNavigate();

    const [ userInfo, setUserInfo ] = useState();

    const inputName = useRef();
    const inputEmail = useRef();
    const inputSchool = useRef();
    const inputStudyField = useRef();
    const inputDivision = useRef();
    const inputStartDate = useRef();
    const inputEndDate = useRef();
    const inputTraineeCount = useRef();

    useEffect(() => {
        loginCheck ()
        setUserInfo({
            Photo: "AP-logo-1.png", 
            name: "Hasan Nursalim",
            department: "General Manager"
        });

        // localStorage.setItem("form-pengajuan", JSON.stringify({
        //     nama: "Dio Farrel",
        //     nim: "101010"
        // }))

        // alert(localStorage.getItem("form-pengajuan"))

        // localStorage.removeItem("form-pengajuan")
    }, []);

    function submit() {
        let formData = new FormData();
        let file = document.querySelector('#file').files[0];

        formData.append("name", inputName.current.value);
        formData.append("email", inputEmail.current.value);
        formData.append("school_origin", inputSchool.current.value);
        formData.append("total_trainee", Number.parseInt(inputTraineeCount.current.value));
        formData.append("division_id", Number.parseInt(inputDivision.current.value));
        formData.append("study_field_id", Number.parseInt(inputStudyField.current.value));
        formData.append("start_date", new Date(inputStartDate.current.value).toISOString());
        formData.append("end_date", new Date(inputEndDate.current.value).toISOString());
        formData.append("file", file);

        axios
            .post(`${process.env.REACT_APP_API_HOST}/submissions`, formData)
            .then((response) => {
                console.log(response)
                navigate("/Form")
            })
            .catch(console.error)
        
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
                        <Sidebar active={"Tambah Ajuan"} />
                    </div>
                    <div className=" w-full flex flex-row gap-3">
                        
                        <div className="bg-white rounded-xl w-full pt-10 px-8 flex flex-col gap-1 ">
                        <div>
                            <div>Nama</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={inputName} />
                            </div>
                            <div>
                            <div>Email</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={inputEmail} />
                            </div>
                            <div>
                            <div>Asal Sekolah / Universitas</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" ref={inputSchool} />
                            </div>
                            <div>
                            <div>Bidang Keilmuan</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" ref={inputStudyField} />
                            </div>
                            <div>
                            <div>Unit Kerja</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" ref={inputDivision} />
                            </div>
                            <div>
                            <div>Tanggal Mulai</div>
                            <input type="date" className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" ref={inputStartDate} />
                            </div>
                            <div>
                            <div>Tanggal Selesai</div>
                            <input type="date" className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" ref={inputEndDate} />
                            </div>                            <div>
                            <div>Jumlah Anggota Kelompok</div>
                            <input className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" type={"number"} ref={inputTraineeCount} />
                            </div>
                            <div>
                                <div className="flex flex-col mt-2">
                                    <label htmlFor="file" className="border-2 border-black rounded-xl px-7 py-1 cursor-pointer w-1/4 flex items-center justify-center" aria-readonly>
                                        <AiOutlineUpload className="text-2xl py-1" />
                                        <span>Upload Surat Pengantar</span>
                                    </label>
                                    <input type={"file"} className="border-2 border-black rounded-xl px-7 py-1 hidden" id="file" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-5">
                            <button className="mt-2 w-2/6 bg-blue-600 rounded-xl text-white px-10 py-2" onClick={submit}>Submit</button>
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