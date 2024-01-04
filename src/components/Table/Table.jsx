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
import { KeyboardArrowDown, KeyboardArrowUp, UnfoldMore } from '@mui/icons-material';
import DashboardDataTableRow from './DashboardDataTableRow';




function BasicTable({ data, getConversations }) {
  const defaultState = data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('');
  console.log("Table Data: ", data);

  const fieldsToDisplay = ["User", "Chat", "Total Messages", "Time Created", "Time Updated"];
  const fieldsToSort = ["Total Messages", "Time Created", "Time Updated"];

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
    const months = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    // Extract day, month, and year from the date string
    const [day1, month1, year1] = a[orderBy].split(' ').map((part, index) => {
      if (index === 1) return months[part]; // Convert month abbreviation to number
      return parseInt(part);
    });

    const [day2, month2, year2] = b[orderBy].split(' ').map((part, index) => {
      if (index === 1) return months[part];
      return parseInt(part);
    });

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

    if (orderBy === "Time Created" || orderBy === "Time Updated") {
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
    [order, orderBy, page, rowsPerPage, data, defaultState],
  );



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', flex: 1, display: 'flex', flexDirection: "column", justifyContent: "space-between", alignContent: "space-between" }}>
      <TableContainer component={Paper} sx={{
        maxWidth: '100%', boxShadow: 'none', maxHeight: "100%"
      }}>
        <Table aria-label="table" stickyHeader>
          <TableHead>
            <TableRow  >

              {fieldsToDisplay.map((field) => {
                return (
                  <TableCell align="center" sx={{
                    fontSize: '17px',
                    fontWeight: 'normal',
                    padding: "14px 0px",
                    color: '#616161',
                    '@media (max-width: 640px)': {
                      fontSize: '16px',
                    }
                  }}>
                    {/* {field} */}

                    {(fieldsToSort.includes(field)) ? <TableSortLabel
                      active={orderBy === field}
                      direction={orderBy === field ? order : 'asc'}
                      onClick={createSortHandler(field)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          display: 'none'
                        }
                      }}
                    >
                      <span>{field} </span>
                      {(orderBy === field) ? (order === "asc") ? <KeyboardArrowDown /> : (order === "desc") ? <KeyboardArrowUp /> : <UnfoldMore /> : <UnfoldMore />}

                      {orderBy === field ? (

                        <>
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>

                        </>
                      ) : ''}
                    </TableSortLabel> : field}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>


          <TableBody>
            {visibleRows.map((row, index) => {
              return (<DashboardDataTableRow  key={index} row={row} getConversations={getConversations} />)
            })}
          </TableBody>
        </Table>

      </TableContainer>
      <div className='flex items-center relative max-sm:flex-col-reverse  py-4  '>
        <div className='absolute text-l max-md:text-lg  text-tailorFont max-sm:relative right-4'>
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
            fontSize: '16px',
            color: '#717171',
            '@media (max-width: 800px)': {
              justifyContent: 'center',

            },
            '& .MuiToolbar-root': {
              '& .MuiTablePagination-selectLabel': {
                fontSize: '16px',
                color: '#717171',
                '@media (max-width: 800px)': {
                  fontSize: '14px',

                }
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: '16px',
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

export default React.memo(BasicTable);