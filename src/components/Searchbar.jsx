import { useState } from "react"
import Button from "./Button"

export default function Searchbar({useDropdown = false, dropdownOptions = [], placeholder = "Cari Nama", className, leftSide, inputClass, onMonthChange}) {
    
    const [ month, setMonth ] = useState();

    function handleMonthChange(e) {
        setMonth(e.target.value)
        console.log("child", e.target.value)
        onMonthChange(e.target.value)
    }
    
    return (
        <div className={`flex flex-row w-full ${className}`}>
            {
                leftSide ? leftSide : null
            }
            {
                useDropdown ?
                <div className="border rounded-l-xl">
                    <select className="pl-4 pr-2 mr-2 py-2" onChange={handleMonthChange}>
                        <option value={new Date().getMonth()}>Bulan ini</option>
                        <option value="*">Semua</option>
                        {
                            dropdownOptions.map((e, i) => {
                                return (
                                    <option key={i} value={e.value}>{e.text}</option>
                                )
                            })
                        }
                    </select>
                </div>
                : null
            }
            <input type="text" className={"px-4 py-2 -ml-0.5 border rounded-r-xl flex-grow "+inputClass} placeholder={placeholder}></input>
            <Button text={"Search"} onClick={()=>{}} className="ml-5" />
        </div>
    )
}