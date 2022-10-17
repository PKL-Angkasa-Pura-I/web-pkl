import { Link, useHref } from "react-router-dom"

export default function Sidebar({active, className}) {

    const sidebarContent = [
        {
            text: "Home",
            address: "/admin"
        },
        {
            text: "Edit Kuota",
            address: "/editkuota"
            
        },
        {
            text: "Pengajuan",
            address: "/pengajuan"
        },
        {
            text: "Tambah Pengajuan",
            address: "/tambah"
        },
        


    ]

    return (
        <div className={`bg-white rounded-xl ${className}`}>
            <div className="flex flex-col justify-between px-3 py-2 w-48 gap-1 h-full min-h-[400px]">    
                <div className="flex flex-col gap-1">
                {
                    sidebarContent.map((e, i) => {
                        return (
                            <Link key={i} to={e.address} className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg ${active === e.text ? "bg-sky-200 text-sky-800" : ""}`}>{e.text}</Link>
                        )
                    })
                }
                </div>
                <div className="flex flex-col gap-1">
                    <Link to="/settings" className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg ${active === "Settings"? "bg-sky-200 text-sky-800" : ""}`}>Settings</Link>
                    <Link to="/logout" className={`hover:bg-sky-200 hover:text-sky-800 px-4 py-2 rounded-lg ${active === "Logout" ? "bg-sky-200 text-sky-800" : ""}`}>Logout</Link>
                </div>
            </div>      

        </div>
    )
}