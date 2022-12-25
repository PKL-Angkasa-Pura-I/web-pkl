import { useTable } from "react-table"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react";

const Table = React.forwardRef((props, ref) => {


    const navigate = useNavigate()

    const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]

    const tableRef = useRef()

    const data = props.data

    React.useMemo(
        () => props.data,
        []
      )

      const columns = React.useMemo(
        () => [
          { 
            Header: 'No Registrasi',
            accessor: 'code_submission', // accessor is the "key" in the data
          },
          {
            Header: 'Nama',
            accessor: 'name',
          },
          {
            Header: 'Jumlah',
            accessor: 'total_trainee',
          },
          {
            Header: 'Tanggal Pengajuan',
            accessor: 'created_at',
          },
          {
            Header: 'Unit Kerja',
            accessor: 'division',
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
      <div className="bg-white rounded-xl overflow-y-auto max-h-[430px]">
          <table {...getTableProps()} ref={ref} className='px-3 py-2'>
          <thead className="bg-slate-300 h-8 rounded-t-lg sticky top-0">
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
            // console.log(row)
            row.values.division = row.original.division.name;
            let dt = new Date(row.original.created_at);
            row.values.created_at = `${dt.getDate()} ${month[dt.getMonth()]} ${dt.getFullYear()}`;
            row.values.bulan = `${month[new Date(row.original.start_date).getMonth()]} - ${month[new Date(row.original.end_date).getMonth()]}`
            if(props.active === row.original.status) {
              prepareRow(row)
            // console.log(row.cells[1].value, rows[i].values.kuota)
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
            } else return null; 
    
    // Prepare the row for display
    
})}
</tbody>
</table>
      </div>
        
    )
})

export default Table;