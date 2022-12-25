import React, { useEffect, useState, useRef } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { loginCheck } from "../utils";
import axios from "axios";
import Modal from 'react-modal';
import { AiOutlineDelete } from "react-icons/ai";


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

export default function EditBidangKeahlian ({}) {
    const query = useParams()
    const [ userInfo, setUserInfo ] = useState();
    const [ bidangKeahlian, setBidangKeahlian ] = useState([]);


    
    const params = useParams()
    const bidangKeahlianName = useRef()

    const navigate = useNavigate()


    useEffect(() => {
      loginCheck()
        setUserInfo({
            Photo: "/AP logo 1.png",
        });
        // populate()
        // getPairOfDivisionAndBidangKeahlian()

        // localStorage.setItem("form-pengajuan", JSON.stringify({
        //     nama: "Dio Farrel",
        //     nim: "101010"
        // }))

        // alert(localStorage.getItem("form-pengajuan"))

        // localStorage.removeItem("form-pengajuan")
        getAllBidangKeahlian()
    }, []);

    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2IsOpen, setIsOpen2] = React.useState(false);
  const [modal3IsOpen, setIsOpen3] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    navigate(-1);
  }

  function openModal2() {
    setIsOpen2(true);
    getAllBidangKeahlian();
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function openModal3() {
    setIsOpen3(true);
  }

  function afterOpenModal3() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function getAllBidangKeahlian() {
    axios.get(`${process.env.REACT_APP_API_HOST}/study_fields`)
    .then((response) => {
      console.log("bk", response.data.study_field)
      setBidangKeahlian(response.data.study_field)
    })
  }

  function submitBidangKeahlian(e) {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_HOST}/study_fields`, {
      name: bidangKeahlianName.current.value
    })
    .then((response) => {
      closeModal3()
      navigate(-1)
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
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3">
                        <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                            <img src={userInfo.Photo} alt="logo" />
                        </div>
                        <div className="bg-white rounded-xl flex flex-row items-center justify-start flex-grow gap-1 px-10">
                            <div className="flex flex-col items-start justify-center flex-grow gap-1">
                                <div className="flex gap-3 items-baseline">
                                    <b className="text-2xl">{"Bidang Keahlian"}</b>
                                    
                                </div>
                                <span className="text-slate-600">{""}</span>
                                <span className="text-green-600">{bidangKeahlian.length>0?bidangKeahlian[0].field_name:""}</span>{/* sementara */}
                                
                            </div>
                            <a href="#" className="bg-blue-600 rounded-lg text-white px-2 py-1 cursor-pointer text-center" onClick={openModal3}>Tambah baru</a>
                            <Modal
                              isOpen={modal3IsOpen}
                              onAfterOpen={afterOpenModal3}
                              onRequestClose={closeModal3}
                              style={customStyles}
                              contentLabel="Example Modal"
                            >
                            <form onSubmit={submitBidangKeahlian} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="namaBidangKeahlian">Nama Bidang Keahlian</label>
                                <input type="text" name="namaBidangKeahlian" id="namaBidangKeahlian" className="outline outline-1 px-3 py-1 rounded-lg" ref={bidangKeahlianName} />
                            </div>
                            <div>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">Tambah</button>
                            </div>
                            </form>
                          </Modal>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 ">
                        <Sidebar active={"B. Keahlian"} />
                        <div className="bg-white rounded-xl flex flex-col items-center justify-center flex-grow gap-5 px-10">
                        <h1  ref={(_subtitle) => (subtitle = _subtitle)}>EDIT {}</h1>
                          <div className="max-h-[400px] overflow-y-auto w-full flex flex-col gap-1">
                            {
                              bidangKeahlian.map((e, i) => {
                                return (
                                  <div key={i} className="rounded hover:bg-gray-200 px-3 py-1 flex justify-between">
                                    <span>{e.name}</span>
                                    <button onClick={()=> {
                                      axios.delete(`${process.env.REACT_APP_API_HOST}/study_fields/${e.id}`)
                                      .then(() => {
                                        getAllBidangKeahlian()
                                      })
                                    }}><AiOutlineDelete className="text-2xl" /></button>
                                  </div>
                                )
                              })
                            }
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