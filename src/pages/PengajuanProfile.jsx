import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {AiOutlineDownload} from "react-icons/ai";
import { loginCheck } from "../utils";
import axios from "axios";

export default function PengajuanProfile ({}) {
    const query = useParams()
    const navigate = useNavigate()

    const [ userInfo, setUserInfo ] = useState();
    const [ profiles, setProfiles ] = useState([]);
    const [ currentProfile, setCurrentProfile ] = useState(0);
    const [ isApproved, setIsApproved ] = useState(null); // null/true/false
    const [ letterSent, setLetterSent ] = useState(0);
    const [ data, setData ] = useState();

    useEffect(() => {
        loginCheck ()
        setUserInfo({
            id: query.id,
            Photo: "/AP logo 1.png", 
            name: "",
            department: "",
        });

        axios.get(`${process.env.REACT_APP_API_HOST}/submissions/${query.id}`)
        .then((result) => {
            setData(result.data.submission)
            console.log(result.data.submission)
            axios
                .get(`${process.env.REACT_APP_API_HOST}/trainees/${result.data.submission.code_submission}`)
                .then((response) => {
                    
                    console.log(response.data.trainee)
                    setProfiles(response.data.trainee)
                    if(result.data.submission.status === "Ditolak") setIsApproved(false);
                    else if(result.data.submission.status === "Diterima") setIsApproved(true);

                    if(result.data.submission.respon_path_file) setLetterSent(3);
                })
        })
        
    }, []);

    function submitLetter() {
        let formData = new FormData();
        let file = document.querySelector('input[type="file"]').files[0];
        formData.append("file", file);
        setLetterSent(1);

        axios
            .put(`${process.env.REACT_APP_API_HOST}/submissions/${data.code_submission}/${isApproved ? "accept": "reject"}`, formData)
            .then((response) => {
                console.log(response)
                setLetterSent(2)
            })
            .catch((err) => {
                setLetterSent(-1)
            })
    }

    function acceptSubmission() {
        setIsApproved(true)
    }

    function rejectSubmission() {
        setIsApproved(false)
    }


     

    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="h-screen w-screen bg-sky-300 p-5 lg:p-12 lg:py-6">
                {
                data ?
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
                                    <b className="text-2xl">{data ? data.code_submission : ""}</b>
                                    <span className="text-slate-300">{data ? data.school_origin : ""}</span>
                                </div>
                                <span className="text-slate-600">{ data ?  data.study_field.name : "" }</span>
                                <span className="text-green-600">November - Januari</span>
                                { data ? <a className="border-2 border-black rounded-xl px-3 py-1 flex items-center justify-center" href={`${process.env.REACT_APP_API_HOST}/submissions/${data.code_submission}/download`}>< AiOutlineDownload className="text-2xl py-1 "/><span>Download Surat Pengantar</span></a> : null }
                            </div>
                            {
                                isApproved === null ?
                                <div className="flex flex-col gap-2 min-w-[250px]">
                                    <button className="border-2 bg-blue-600 text-white rounded-xl px-7 py-1" onClick={acceptSubmission}>Diterima</button>
                                    <button className="border-2 bg-red-600 text-white rounded-xl px-7 py-1" onClick={rejectSubmission}>Ditolak</button>
                                </div>
                                :
                                <div className="flex flex-col">
                                    <label htmlFor="file" className="w-fit border-2 border-black rounded-xl px-7 py-1 cursor-pointer" aria-readonly>Upload Surat Balasan</label>
                                    <input type={"file"} className="border-2 border-black rounded-xl px-7 py-1 hidden" id="file" onInput={submitLetter} />
                                    {
                                        letterSent === 1?
                                            <span>Mengirim surat balasan...</span>
                                        : letterSent === 2?
                                            <span>Surat balasan berhasil diupload!</span>
                                        : letterSent === -1?
                                            <span>Gagal mengupload surat balasan!</span>
                                        : letterSent === 3?
                                            <span>Surat balasan telah dikirim.</span>
                                        : null
                                    }
                                </div>
                                
                            }
                            <button onClick={()=>navigate(-1)} className="self-start mt-5 -mr-3">< AiOutlineClose className="text-2xl"/></button>
                        </div>
                    </div>
                        <div className="flex flex-row gap-3">
                            <Sidebar active={"Pengajuan"} />
                            {
                                profiles.length > 0 ?
                                    <div className="bg-white rounded-xl w-full py-4 px-8 flex flex-col gap-1 h-full min-h-[500px] justify-between">
                                        <div className="flex flex-col gap-1">
                                        <div>
                                        <div>Nama</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].name}/>
                                        </div>
                                        <div>
                                        <div>NPM</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].trainee_student_id}/>
                                        </div>
                                        <div>
                                        <div>Jurusan</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].jurusan}/>
                                        </div>
                                        <div>
                                        <div>Jenis Kelamin</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].gender}/>
                                        </div>
                                        <div>
                                        <div>Email</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].email}/>
                                        </div>
                                        <div>
                                        <div>No Telfon</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={profiles[currentProfile].phone}/>
                                        </div>
                                        </div>
                                        
                                    

                                        <div className="flex w-full items-end justify-end ">
                                            <div className="flex gap-1">
                                                <button className="border rounded w-6 h-6 flex items-center justify-center hover:bg-blue-500 hover:text-white" onClick={()=>{
                                                    if(currentProfile > 0) setCurrentProfile(currentProfile-1)}
                                                }><BsChevronLeft /></button>
                                                {
                                                    profiles.map((_e, i) => {
                                                        return (
                                                            <button key={i} className={`border rounded hover:bg-blue-500 hover:text-white ${currentProfile === i ? "bg-blue-600 text-white":""} w-6 h-6 text-sm`} onClick={()=>setCurrentProfile(i)}>{i+1}</button>
                                                        )
                                                    })
                                                }
                                                <button className="border rounded w-6 h-6 flex items-center justify-center hover:bg-blue-500 hover:text-white" onClick={()=>{
                                                    if(currentProfile < profiles.length-1)setCurrentProfile(currentProfile+1)}
                                                }><BsChevronRight /></button>
                                            </div>
                                        </div>
                                    </div>
                                : 
                                <div className="bg-white rounded-xl w-full py-4 px-8 flex flex-col gap-1 h-full min-h-[500px]">
                                    <div>
                                        <div>Nama</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={data.name}/>
                                    </div>
                                    <div>
                                        <div>Email</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={data.email}/>
                                    </div>
                                    <div>
                                        <div>Asal Sekolah</div>
                                        <input disabled className="border-2 w-4/6 border-slate-400 rounded-xl px-3 text-slate-400" value={data.school_origin}/>
                                    </div>
                                    <p className="mt-5">Menunggu pengumpulan form anggota PKL. <Link to={`/Form/${query.id}`} className="text-blue-600">Tambah anggota.</Link></p>
                                </div>
                                
                            }
                        </div> 
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}