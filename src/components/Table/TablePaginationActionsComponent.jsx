import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function TablePaginationActionsComponent(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  // const handleFirstPageButtonClick = (event) => {
  //   onPageChange(event, 0);
  // };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  // const handleLastPageButtonClick = (event) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight sx={{
          fontSize: '40px', '@media (max-width: 800px)': {
            fontSize: '30px',

          }
        }} /> : <KeyboardArrowLeft sx={{
          fontSize: '40px', '@media (max-width: 800px)': {
            fontSize: '30px',

          }
        }} />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft sx={{
          fontSize: '40px', '@media (max-width: 800px)': {
            fontSize: '30px',

          }
        }} /> : <KeyboardArrowRight sx={{
          fontSize: '40px', '@media (max-width: 800px)': {
            fontSize: '30px',

          }
        }} />}
      </IconButton>

    </Box>
  );
}


export default TablePaginationActionsComponent;
