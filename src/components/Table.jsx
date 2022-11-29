import { useTable } from "react-table"
import React from "react"
import { useNavigate } from "react-router-dom"
export default function Table({data}) {

    const navigate = useNavigate()

    React.useMemo(
        () => data,
        []
      )

      const columns = React.useMemo(
        () => [
          { 
            Header: 'No Registrasi',
            accessor: 'regis', // accessor is the "key" in the data
          },
          {
            Header: 'Nama',
            accessor: 'nama',
          },
          {
            Header: 'Jumlah',
            accessor: 'jumlah',
          },
          {
            Header: 'Tanggal Pengajuan',
            accessor: 'tanggal',
          },
          {
            Header: 'Unit Kerja',
            accessor: 'unit',
          },
          {
            Header: 'Bulan',
            accessor: 'bulan',
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
rows.map((row, i) => {
    
    // Prepare the row for display
    prepareRow(row)
    console.log(row.cells[1].value, rows[i].values.kuota)
    return (
    // Apply the row props
    <tr {...row.getRowProps()} className="hover:bg-gray-200 h-8 cursor-pointer" onClick={()=>navigate("/profile/"+row.cells[0].value)} key={i}>
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
    )
}