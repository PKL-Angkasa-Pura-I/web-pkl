import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
  import { Chart } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../utils";
import axios from "axios";

export default function Home () {

    const [ userInfo, setUserInfo ] = useState();
    const [ data, setData ] = useState([]);
    const [ chartLabels, setChartLabels ] = useState([]);
    const [ chartValuesKuota, setChartValuesKuota ] = useState([]);
    const [ chartValuesPendaftar, setChartValuesPendaftar ] = useState([]);
    const [ month, setMonth ] = useState(new Date().getMonth());

    function filteredList() {
      if(month > 0 && month < 13) {
        axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
        .then((response) => {
          let accepted = response.data.submission.filter((e) => {
            if(e.status == "Diterima") {
              let dateStart = new Date(e.start_date);
              let dateEnd = new Date(e.end_date);
              let now = new Date(new Date().getFullYear()+"-"+month+"-01");
              // console.log(new Date().getFullYear()+"-"+month+"-01")
              if(now.getFullYear() >= dateStart.getFullYear() && now.getFullYear() <= dateEnd.getFullYear()) {
                if(now.getMonth() >= dateStart.getMonth() && now.getMonth() <= dateEnd.getMonth()) {
                  return e;
                }
              }
              
              // if(now >= dateStart && now <= dateEnd) {
              //   return e;
              // }
            }
          })
          setData(accepted)
          // console.log(accepted)
        })
      } else {
        getAllSubmissions()
      }
    }

    function getAllSubmissions() {
      axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
        .then((response) => {
          let accepted = response.data.submission.filter((e) => {
            return e.status == "Diterima"
          })
          setData(accepted)
          console.log(accepted)

        })
    }

    function handleMonthChange(e) {
      if(month != "*") setMonth(Number.parseInt(e))
      else getAllSubmissions()
    }

    useEffect(() => {
      filteredList()
    }, [month])

    useEffect(() => {
        loginCheck();
        setUserInfo({
            Photo: "/AP logo 1.png", 
            name: "",
            department: ""
        });
        // setMonth(Number.parseInt(new Date().getMonth()))
        // getAllSubmissions()

        axios.get(`${process.env.REACT_APP_API_HOST}/charts/all_division`)
        .then((res) => {
          let labels = []
          let quota = []
          let acc = []
          res.data.division.forEach((e) => {
            labels.push(e.name)
            quota.push(e.quota)
            acc.push(e.total)
            // console.log(e)
          })
          setChartLabels(labels)
          setChartValuesKuota(quota)
          setChartValuesPendaftar(acc)
        })
    }, []);

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
            Header: 'No Registrasi',
            accessor: 'code_submission',
          },
          {
            Header: 'Nama',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Unit Kerja',
            accessor: 'division',
          },
          {
            Header: 'Asal Sekolah / Universitas',
            accessor: 'school_origin',
          },
          {
            Header: 'Status',
            accessor: 'status',
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

      ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip,
        LineController,
        BarController
      );

      const labels = ['STAKEHOLDER RELATION', 'OPERATION AIR SIDE', 'OPERATION LANDSIDE AND TERMINAL', 'SERVICE IMPROVEMEN', 'RESCUE AND FIRE FIGHTING', 'SECURITY PROTECTION', 'SECURITY SCREENING', 'AIRSIDE FACILITIES', 'LANDSIDE FACILITIES','AIRPORT EQUIPMENT','AIRPORT TECHNOLOGY','AIRPORT AERONAUTICAL','AIRPORT NON AERONAUTICAL TERMINAL 1','AIRPORT NON AERONAUTICAL TERMINAL 2','FINANCE SECTION', 'ACCOUNTING SECTION', 'HUMAN CAPITAL BUSINESS PARTNER', 'GENERAL SERVICES'];
      const chartdata = {
          labels: chartLabels,
          datasets: [
            {
              type: 'line',
              label: 'Kuota',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
              data: chartValuesKuota,
            },
            {
              type: 'bar',
              label: 'Jumlah Pendaftar Diterima',
              backgroundColor: 'rgb(75, 192, 192)',
              data: chartValuesPendaftar,
              borderColor: 'white',
              borderWidth: 2,
            },
          ],
        };
      

    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="h-screen w-screen bg-sky-300 p-5 lg:p-12 lg:py-6 overflow-y-hidden">
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
                            <Searchbar useDropdown={true} dropdownOptions={ddopt} className="mt-5" onMonthChange={handleMonthChange} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Sidebar active={"Home"} />
                        <div className="bg-white rounded-xl overflow-y-auto h-[500px]">
                            <Chart type='bar' data={chartdata} options={{aspectRatio:4}} />
                            <table {...getTableProps()} className='px-3 py-2 mt-5'>
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
                                  row.values.division = row.original.division.name
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
