import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../../components/Searchbar";
import Sidebar from "../../components/Sidebar";
import { useTable } from "react-table"

export default function Home () {

    const [ userInfo, setUserInfo ] = useState();

    useEffect(() => {
        setUserInfo({
            Photo: "AP logo 1.png", 
            name: "Hasan Nursalim",
            department: "General Manager"
        });
    }, [userInfo]);

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

    const columns = React.useMemo(
        () => [
          {
            Header: 'Nama',
            accessor: 'nama', // accessor is the "key" in the data
          },
          {
            Header: 'Unit Kerja',
            accessor: 'unit',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
        ],
        []
      )

      const data = React.useMemo(
        () => [
          {
            nama: 'Dio Farrel',
            unit: 'AIRPORT TECHNOLOGY SECTION',
            status: 'November - Januari'
          },
          {
            nama: 'Galih Arum Prabowo',
            unit: 'AIRPORT TECHNOLOGY SECTION',
            status: 'November - Januari'
          },
        ],
        []
      )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })


    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="min-h-screen w-screen bg-sky-300 p-5 lg:p-12">
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
                        <div className="bg-white rounded-xl p-5 flex flex-col items-start flex-grow gap-1">
                            <b className="text-2xl">Halo {userInfo.name.split(" ")[0]}!</b>
                            <span className="text-slate-600">Selamat datang kembali!</span>
                            <Searchbar useDropdown={true} dropdownOptions={ddopt} className="mt-5" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Sidebar active={"Home"} />
                        <div className="bg-white rounded-xl">
                            <table {...getTableProps()} className='px-3 py-2'>
                                <thead className="bg-slate-300 h-8 rounded-t-lg">
                                {// Loop over the header rows
                                headerGroups.map(headerGroup => (
                                    // Apply the header row props
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                    {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} className="w-96 text-left px-5">
                                        {// Render the header
                                        column.render('Header')}
                                        </th>
                                    ))}
                                    </tr>
                                ))}
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                {// Loop over the table rows
                                rows.map(row => {
                                    // Prepare the row for display
                                    prepareRow(row)
                                    return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()} className="hover:bg-gray-200 h-8">
                                        {// Loop over the rows cells
                                        row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()} className="px-5">
                                            {// Render the cell contents
                                            cell.render('Cell')}
                                            </td>
                                        )
                                        })}
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}