import { Link, useHref } from "react-router-dom"
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineLogout, AiOutlineHome, AiOutlineEdit, AiOutlineUserAdd, AiOutlineUsergroupDelete } from "react-icons/ai";



export default function Sidebar({active, className}) {

    const sidebarContent = [
        {
            text: "Home",
            address: "/admin",
            icon: <AiOutlineHome className="text-2xl py-1" />
        },
        {
            text: "Edit Kuota",
            address: "/editkuota",
            icon: <AiOutlineEdit className="text-2xl py-1" />
        },
        {
            text: "Pengajuan",
            address: "/pengajuan",
            icon: <AiOutlineUserAdd className="text-2xl py-1" />
        },
        {
            text: "Tambah Ajuan",
            address: "/tambah",
            icon: <AiOutlineUsergroupDelete className="text-2xl py-1" />
        },
        


    ]

    return (
        <div className={`bg-white rounded-xl ${className}`}>
            <div className="flex flex-col justify-between px-3 py-2 w-48 gap-1 h-[500px] min-h-[400px]">    
                <div className="flex flex-col gap-1">
                {
                    sidebarContent.map((e, i) => {
                        return (
                            <Link key={i} to={e.address} className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg flex items-center ${active === e.text ? "bg-sky-200 text-sky-800" : ""}`}>{e.icon} <span>{e.text}</span></Link>
                        )
                    })
                }
                </div>
                <div className="flex flex-col gap-1">
                    <Link to="/settings" className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg flex items-center ${active === "Settings"? "bg-sky-200 text-sky-800" : ""}`}>< AiOutlineSetting className="text-2xl py-1 "/> Settings</Link>
                    <Link to="/logout" className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg flex items-center ${active === "Logout" ? "bg-sky-200 text-sky-800" : ""}`}>< AiOutlineLogout className="text-2xl py-1 "/>Logout</Link>
                </div>
            </div>
            
                    
            
        </div>
    )
}