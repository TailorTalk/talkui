import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import DashboardDataTableCell from './DashboardDataTableCell'

const DashboardDataTableRow = ({ row, getConversations }) => {

  const onRowSelect = (id) => {
    const rowId = id;
    const selectedRowElement = document.querySelector('.selectedRow');
    if (selectedRowElement) {
      selectedRowElement.classList.remove('selectedRow');

    } 
      document.getElementById(rowId).classList.add('selectedRow')
    
  }

  return (
    <TableRow
      id={row['Id']}
      sx={{
        'td': {
          border: 0
        },
        '&:hover': {
          backgroundColor: "#F4F4F4"
        }
      }}

    >

      {Object.keys(row).map((data, index) => (
        data !== "Id" &&
        <DashboardDataTableCell key={`${index}-${row['Id']}`} row={row} getConversations={getConversations} data={data} onRowSelect={onRowSelect} />
      ))}
    </TableRow>
  )
}

export default DashboardDataTableRow