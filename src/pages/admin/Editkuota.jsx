import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../../components/Searchbar";
import Sidebar from "../../components/Sidebar";
import { useTable } from "react-table"
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0, 0.25)'
    }
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function Editkuota () {

    const [ userInfo, setUserInfo ] = useState();

    useEffect(() => {
        setUserInfo({
            Photo: "AP logo 1.png", 
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

    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Unit Kerja',
            accessor: 'unit', // accessor is the "key" in the data
          },
          {
            Header: 'Kuota',
            accessor: 'kuota',
          },
          {
            Header: 'Bidang Keahlian',
            accessor: 'bidangkeahlian',
          },

        ],
        []
      )

      const data = React.useMemo(
        () => [
          {
            unit: 'AIRPORT TECHNOLOGY SECTION',
            kuota: '10',
            bidangkeahlian: 'Teknologi Informasi & Komunikasi',
          },
          {
            unit: 'FINANCE SECTION',
            kuota: '5',
            bidangkeahlian: 'Bisnis & Manajemen'
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
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                            <img src={userInfo.Photo} alt="logo" />
                            <b className="mt-5"></b>
                            <b>{userInfo.name}</b>
                            <span className="text-slate-600">{userInfo.department}</span>
                        </div>
                        <Sidebar active={"Edit Kuota"} />
                    </div>
                    <div className="flex flex-row gap-3">
                        
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
                                        <th className="w-48 text-left px-5">Action</th>
                                    </tr>
                                ))}
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                {// Loop over the table rows
                                rows.map((row, i) => {
                                    
                                    // Prepare the row for display
                                    prepareRow(row)
                                    console.log(row.cells[1].value, rows[i].values.kuota)
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
                                        <div>
                                            <button onClick={openModal}>Open Modal</button>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onAfterOpen={afterOpenModal}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                            >
                                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Kuota</h2>
                                                <button onClick={closeModal}>close</button>
                                                <div>I am a modal</div>
                                                <form>
                                                <input value={rows[i].values.kuota} className="border-2 border-gray-700" disabled />
                                                <button>tab navigation</button>
                                                <button>stays</button>
                                                <button>inside</button>
                                                <button>the modal</button>
                                                </form>
                                            </Modal>
                                        </div>
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