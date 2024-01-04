import { TableCell } from '@mui/material'
import React from 'react'

const DashboardDataTableCell = ({index,row,getConversations,data,onRowSelect}) => {
  return (
    <TableCell
   
    align="center"
    onClick={() => { getConversations(row['Id']); onRowSelect(row['Id']) }}

    sx={{
      color: '#717171',
      maxWidth: '100px',
      whiteSpace: 'nowrap', // Prevents text from wrapping to the next line
      overflow: 'hidden',   // Hides the content that exceeds the width
      textOverflow: 'ellipsis',  // Displays an ellipsis (...) when content is truncated
      fontSize: '14px',  // Adjust font size as needed
      '@media (max-width: 640px)': {
        fontSize: '12px',
      },
    }}
  >
    {row[data]}

  </TableCell>
  )
}

export default DashboardDataTableCell