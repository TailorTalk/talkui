import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TablePagination, TableSortLabel } from '@mui/material';
import TablePaginationActionsComponent from './TablePaginationActionsComponent';
import { visuallyHidden } from '@mui/utils';
import { UnfoldMore } from '@mui/icons-material';



export default function BasicTable({ data }) {

  const defaultState = data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('');


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function defaultComparator(a, b, orderBy) {
    return 0;
  }

  function descendingDateComparator(a, b, orderBy) {
    const [day1, month1, year1] = a[orderBy].split('/').map(Number);
    const [day2, month2, year2] = b[orderBy].split('/').map(Number);

    // Compare years first
    if (year1 !== year2) {
      return year1 - year2;
    }

    // If years are equal, compare months
    if (month1 !== month2) {
      return month1 - month2;
    }

    // If months are equal, compare days
    return day1 - day2;
  }

  function getComparator(order, orderBy) {

    if (order === "") {
      return (a, b) => defaultComparator(a, b, orderBy)
    }

    if (orderBy === "leadCreated" || orderBy === "lastActive") {
      return order === 'desc'
        ? (a, b) => -descendingDateComparator(a, b, orderBy)
        : (a, b) => descendingDateComparator(a, b, orderBy);
    }

    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }


  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return 0;
    });
    return stabilizedThis.map((el) => el[0]);
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === 'asc';
    if (!isAsc) {
      if (property !== orderBy) {
        setOrder('asc');
        setOrderBy(property);
      }
      else {


        if (order === "desc") {
          setOrder("");
          setOrderBy("");
        }
        if (order === "") {
          setOrder("asc");
          setOrderBy(property);
        }
      }
    } else {
      setOrder('desc');
      setOrderBy(property);
    }

  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };


  const visibleRows = React.useMemo(
    () => {
      console.log(orderBy);
      if (order === "") {
        return stableSort(defaultState, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        )
      }
      return stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    },
    [order, orderBy, page, rowsPerPage],
  );


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', flex: 1, display: 'flex', flexDirection: "column", justifyContent: "space-between", alignContent: "space-between" }}>
      <TableContainer component={Paper} sx={{
        maxWidth: '100%', boxShadow: 'none', maxHeight: "100%"
      }}>
        <Table aria-label="table" stickyHeader>
          <TableHead>
            <TableRow  >
              <TableCell align="center" sx={{
                fontSize: '18px',
                padding: "20px",
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>

                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : 'asc'}
                  onClick={createSortHandler("name")}
                >
                  Name
                  {orderBy === "name" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : <UnfoldMore fontSize='small' />}
                </TableSortLabel>

              </TableCell>


              <TableCell align="center" sx={{
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>Contact</TableCell>
              <TableCell align="center" sx={{
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>
                <TableSortLabel
                  active={orderBy === "leadCreated"}
                  direction={orderBy === "leadCreated" ? order : 'asc'}
                  onClick={createSortHandler("leadCreated")}
                >
                  Lead Created
                  {orderBy === "leadCreated" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : <UnfoldMore fontSize='small' />}
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>Status</TableCell>
              <TableCell align="center" sx={{
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>

                <TableSortLabel
                  active={orderBy === "msgExchanged"}
                  direction={orderBy === "msgExchanged" ? order : 'asc'}
                  onClick={createSortHandler("msgExchanged")}
                >
                  Msg Exchanged
                  {orderBy === "msgExchanged" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : <UnfoldMore fontSize='small' />}
                </TableSortLabel>



              </TableCell>
              <TableCell align="center" sx={{
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 640px)': {
                  fontSize: '16px',
                }
              }}>
                <TableSortLabel
                  active={orderBy === "lastActive"}
                  direction={orderBy === "lastActive" ? order : 'asc'}
                  onClick={createSortHandler("lastActive")}
                >
                  Last Active
                  {orderBy === "lastActive" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : <UnfoldMore fontSize='small' />}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {(visibleRows
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  'td': {
                    border: 0
                  }
                }}
              >
                <TableCell align="center" sx={{
                  color: '#717171',
                  maxWidth: '400px',
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}>
                  {row.name}
                </TableCell>
                <TableCell align="center" sx={{
                  color: '#717171',
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}  >{row.contact}</TableCell>
                <TableCell align="center" sx={{
                  color: '#717171',
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}>{row.leadCreated}</TableCell>
                <TableCell align="center" sx={{
                  color: (row.status === "Hot") ? 'green' : (row.status === "Dead") ? 'red' : '#717171',
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}>{row.status}</TableCell>
                <TableCell align="center" sx={{
                  color: '#717171',
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}>{row.msgExchanged}</TableCell>
                <TableCell align="center" sx={{
                  color: '#717171',
                  '@media (max-width: 640px)': {
                    fontSize: '12px',
                  }
                }}>{row.lastActive}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>

      </TableContainer>
      <div className='flex items-center relative max-sm:flex-col-reverse  py-4  '>
        <div className='absolute text-xl max-md:text-lg  text-tailorFont max-sm:relative'>
          Total: <span className='font-semibold'>{data.length}</span>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          colSpan={6}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsComponent}
          sx={{
            display: 'flex',
            borderTop: '1px solid #D3D3D3',
            width: '100%',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#717171',
            '@media (max-width: 800px)': {
              justifyContent: 'center',

            },
            '& .MuiToolbar-root': {
              '& .MuiTablePagination-selectLabel': {
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 800px)': {
                  fontSize: '14px',

                }
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: '18px',
                color: '#717171',
                '@media (max-width: 800px)': {
                  fontSize: '14px',
                }
              }
            }
          }}

        />
      </div>
    </Paper>
  );
}