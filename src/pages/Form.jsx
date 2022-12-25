import React, { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { loginCheck } from "../utils";
import axios from "axios";

export default function Form ({}) {
    const query = useParams()
    const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

    const [ userInfo, setUserInfo ] = useState();
    const [ submissionInfo, setSubmissionInfo ] = useState()
    const [ traineesOnThisSubmission, setTraineesOnThisSubmission ] = useState([]);
    const [ isFull, setIsFull ] = useState(false);
    const [ emailDefault, setEmailDefault ] = useState(sessionStorage.getItem(query.id)?JSON.parse(sessionStorage.getItem(query.id)).email:"") 
    const [ nameDefault, setNameDefault ] = useState(sessionStorage.getItem(query.id)?JSON.parse(sessionStorage.getItem(query.id)).name:"")

    const name = useRef();
    const student_id = useRef();
    const jurusan = useRef();
    const gender = useRef();
    const email = useRef();
    const phone = useRef();

    useEffect(() => {
        loginCheck ()
        setUserInfo({
            id: query.id,
            Photo: "/AP logo 1.png", 
            name: "",
            department: "",
        });

        axios.get(`${process.env.REACT_APP_API_HOST}/submissions/${query.id}`)
        .then((response) => {
            setSubmissionInfo(response.data.submission)
            console.log(response.data.submission)
            axios.get(`${process.env.REACT_APP_API_HOST}/trainees/${response.data.submission.code_submission}`)
            .then((result) => {
                
                setTraineesOnThisSubmission(result.data.trainee)
                if(response.data.submission.total_trainee <= result.data.trainee.length) setIsFull(true);
            })
        })

        if(sessionStorage.getItem(query.id)) sessionStorage.removeItem(query.id)
    }, []);

    function addTrainee() {
        axios.post(`${process.env.REACT_APP_API_HOST}/trainees/${query.id}`, {
            name: name.current.value,
            trainee_student_id: student_id.current.value,
            email: email.current.value,
            jurusan: jurusan.current.value,
            gender: gender.current.value,
            phone: phone.current.value
        })
        .then((response) => {
            console.log(response.data)
            window.location.reload()
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
                                    <b className="text-2xl">{ submissionInfo ? submissionInfo.code_submission : "" }</b>
                                    <span className="text-slate-300">{ submissionInfo ? submissionInfo.school_origin : "" }</span>
                                </div>
                                <span className="text-slate-600">{ submissionInfo ? submissionInfo.study_field.name : "" }</span>
                                <span className="text-green-600">{ submissionInfo ? `${month[new Date(submissionInfo.start_date).getMonth()]} - ${month[new Date(submissionInfo.end_date).getMonth()]}` : "" }</span>
                                <button className="border-2 border-black rounded-xl px-3 py-1">Download Surat Pengantar</button>
                            </div>
                          
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Sidebar active={"Tambah Ajuan"} />
                        {
                            !isFull ?
                                <div className="bg-white rounded-xl w-full py-4 px-8 flex flex-col gap-1 h-full min-h-[500px]">
                                    <div className="flex flex-col gap-1">
                                    <div>
                                    <div>Nama</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={name} defaultValue={nameDefault} />
                                    </div>
                                    <div>
                                    <div>NPM</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={student_id} />
                                    </div>
                                    <div>
                                    <div>Jurusan</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={jurusan} />
                                    </div>
                                    <div>
                                    <div>Jenis Kelamin</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={gender} />
                                    </div>
                                    <div>
                                    <div>Email</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={email} defaultValue={emailDefault} />
                                    </div>
                                    <div>
                                    <div>No Telfon</div>
                                    <input className="border-2 w-4/6 border-slate-400 rounded-lg px-3 text-slate-400" ref={phone} />
                                    </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 mt-10">
                                    <button className="mt-5 w-2/6 bg-blue-600 rounded-xl text-white px-10 py-2" onClick={addTrainee}>Submit</button>
                                    </div>
                                </div>
                            : 
                                <div className="bg-white rounded-xl w-full py-4 px-8 flex flex-col items-center justify-center gap-1 h-full min-h-[500px]">
                                    <h2 className="font-bold text-lg">Kuota sudah penuh</h2>
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