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

export default function FormBidangKeahlian ({}) {
    const query = useParams()
    const [ userInfo, setUserInfo ] = useState();
    const [ data, setData ] = useState([])
    const [ bidangKeahlian, setBidangKeahlian ] = useState([]);
    const [ defaultBidangKeahlian, setDefaultBidangKeahlian ] = useState()
    const [ divisi, setDivisi ] = useState();
    const [ bidang, setBidang ] = useState()

    
    const params = useParams()

    const unitKerjaNameEdit = useRef()
    const unitKerjaQuotaEdit = useRef()
    const unitKerjaIdEdit = useRef()
    const bidangKeahlianName = useRef()
    const navigate = useNavigate()
  
    function getAllUnitKerja() {
      axios.get(`${process.env.REACT_APP_API_HOST}/divisions`)
      .then((response)=>{
        getPairOfDivisionAndBidangKeahlian(response.data.division)
      })
    }

    function populate() {
      getAllUnitKerja()
      getAllBidangKeahlian()
    }

    useEffect(() => {
      loginCheck()
        setUserInfo({
            Photo: "AP-logo-1.png", 
            name: "Hasan Nursalim",
            department: "General Manager"
        });
        // populate()
        // getPairOfDivisionAndBidangKeahlian()

        // localStorage.setItem("form-pengajuan", JSON.stringify({
        //     nama: "Dio Farrel",
        //     nim: "101010"
        // }))

        // alert(localStorage.getItem("form-pengajuan"))

        // localStorage.removeItem("form-pengajuan")
        axios.get(`${process.env.REACT_APP_API_HOST}/divisions/${params.id}`)
        .then((response) => {
          console.log("data",response.data)
          setDivisi(response.data.division)
          axios.get(`${process.env.REACT_APP_API_HOST}/list_division_fields/${params.id}`)
          .then((response) => {
            console.log(response.data.list_study_field)
            setDefaultBidangKeahlian(response.data.list_study_field)
            console.log("default_bk", response.data.list_study_field)
            getAllBidangKeahlian()
          })
        })
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

  function submitEditUnitKerja(e) {
    console.log(e)
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_API_HOST}/divisions/${params.id}`, {
      name: unitKerjaNameEdit.current.value,
      quota: Number.parseInt(unitKerjaQuotaEdit.current.value)
    })
    .then((response) => {
      pairDivisionAndBidangKeahlian(params.id, bidang)
    })
    .catch((response) => {
      if(response.response.status === 404) {
        pairDivisionAndBidangKeahlian(params.id, bidang)
        // navigate("/editkuota")
      }
    })
    .finally(()=>{
      navigate(-1)
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

  function getAllBidangKeahlian() {
    axios.get(`${process.env.REACT_APP_API_HOST}/study_fields`)
    .then((response) => {
      console.log("bk", response.data)
      setBidangKeahlian(response.data.study_field)
    })
  }

  function pairDivisionAndBidangKeahlian(divisionId, bidangKeahlianArray) {
    // for(let i = 0; i < bidangKeahlianArray.length; ++i) {
    //   axios.post(`${process.env.REACT_APP_API_HOST}/list_division_fields/${divisionId}`, {
    //     study_field_id: Number.parseInt(bidangKeahlianArray[i])
    //   })
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch(console.error)
    // }
    axios.post(`${process.env.REACT_APP_API_HOST}/list_division_fields/${divisionId}`, {
      study_field_id: Number.parseInt(bidangKeahlianArray)
    })
    .then((response) => {
      console.log(response)
    })
    .catch(console.error)
  }

  function getPairOfDivisionAndBidangKeahlian(dataApiResponse) {
    console.log("run pair")
    for(let i = 0; i < dataApiResponse.length; ++i) {
      axios.get(`${process.env.REACT_APP_API_HOST}/list_division_fields/${dataApiResponse[i].id}`)
      .then((response) => {
        let arr = dataApiResponse;
        for(let j = 0; j < arr.length; ++j) {
          let str = "-";
          arr[j].bidangkeahlian = str;
          console.log(arr[j].id, dataApiResponse[i].id)
          if(arr[j].id == dataApiResponse[i].id) {
            console.log("match")
            response.data.list_study_field.forEach((val, index) => {
              if(index < response.data.list_study_field.length - 1) {
                str = ""
                str += val.field_name + ", ";
              } else str += val.field_name;
            })
            console.log(arr[j])
            arr[j].bidangkeahlian = str
          }
          
        }
        setData(arr)
        return arr;
        
      })
      .finally((arr) => {
        // setData(arr)
      })
    }
  }

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
                                    <b className="text-2xl">{divisi?divisi.name:""}</b>
                                    
                                </div>
                                <span className="text-slate-600">{divisi?divisi.quota:""}</span>
                                <span className="text-green-600">{bidangKeahlian.length>0?bidangKeahlian[0].field_name:""}</span>{/* sementara */}
                                
                            </div>
                          
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 ">
                        <Sidebar active={"Edit Kuota"} />
                        <div className="bg-white rounded-xl flex flex-col items-center justify-center flex-grow gap-8 px-10">
                        <button onClick={closeModal}>< AiOutlineClose className="text-2xl absolute right-20 top-64"/></button>
                        <h1  ref={(_subtitle) => (subtitle = _subtitle)}>EDIT {}</h1>
                        
                        <form className="-mt-5" onSubmit={submitEditUnitKerja}>
                            <input type="hidden" name="id" ref={unitKerjaIdEdit} value={""} />
                            <div>Unit Kerja</div>
                            <input defaultValue={divisi?divisi.name:""} className="border-2 w-80 border-gray-700 rounded-lg px-3 py-1" ref={unitKerjaNameEdit} />
                            <div>Kuota</div>
                            <input defaultValue={divisi?divisi.quota:""} className="border-2 w-80 border-gray-700 rounded-lg px-3 py-1" ref={unitKerjaQuotaEdit}/>
                            <div>Bidang Keahlian</div>
                            <div className="flex flex-col gap-1 w-full">
                            {/* <select name="bidangkeahlian" id="bidangkeahlian" className="outline outline-1 rounded-lg px-1 flex-grow">
                                <option value="">Pilih bidang keahlian</option>
                                {
                                bidangKeahlian.map((items, k) => {
                                    return (
                                    <option value={items.id} key={k}>{items.name}</option>
                                    )
                                })
                                }
                            </select> */}
                            {/* {
                                bidangKeahlian.map((items, k) => {
                                return (
                                    <div className="flex items-center gap-1">
                                    <input type="checkbox" name={"bidang-"+items.id} id={"bidang-"+items.id} value={items.id} onClick={(e) => {
                                        if(e.target.checked) {
                                        setCheckedBK([
                                            ...checkedBK,
                                            items.id
                                        ])
                                        } else {
                                            let removeVal = checkedBK.filter(e => e !== items.id)
                                            setCheckedBK(removeVal)
                                        }
                                        } 
                                    } />
                                    <label htmlFor={"bidang"+items.id}>{items.name}</label>
                                    </div>
                                )
                                })
                            } */}
                            <select className="border-gray-700 border-2 rounded-lg px-3 py-1" name="bidangkeahlian" id="bidangkeahlian" onChange={(e)=>{
                              setBidang(e.currentTarget.value)
                            }}>
                              <option value="">Pilih bidang keahlian</option>
                              {
                                bidangKeahlian.map((items, k) => {
                                  return (
                                    <option value={items.id} key={k}>{items.name}</option>
                                  )
                                })
                              }
                            </select>
                            <a href="#" className="bg-blue-600 rounded-lg text-white px-2 py-1 cursor-pointer text-center" onClick={openModal3}>Tambah baru</a>
                            </div>
                            <br></br>
                            <div className="flex items-center gap-8 justify-center w-full">
                            <button className="mt-5 bg-blue-600 rounded-lg text-white px-5 py-1" type="submit">Submit</button>
                            <button className="mt-5 bg-red-600 rounded-lg text-white px-5 py-1" onClick={() => {
                                axios.delete(`${process.env.REACT_APP_API_HOST}/divisions/${data[0].id}`)
                                .then((response) => {
                                console.log(response)
                                })
                            }}>Hapus</button>
                            </div>

                        </form>

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
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}