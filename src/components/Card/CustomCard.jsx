import { MoreVert } from '@mui/icons-material'
import { Card, CardActions, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'

const CustomCard = ({ name, dataItem, cardBody, date, cardActions }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{
      minWidth: '170px', borderRadius: '10px', boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",cursor:"pointer",
      fontFamily:'Roboto',
      "&:hover":{
       boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.4 )",
       backgroundColor:'#FBFBFB'
      }
    }} >
      <CardActions className="justify-center flex relative border-b-[1px] border-black ">
        <h3 className="text-xl font-medium font-[Roboto] text-center">
          {name}
        </h3>

        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            if (event) {
              event.stopPropagation();
            }
            handleClick(event);
          }}
          sx={{
            position: 'absolute',
            right: '0'
          }}

        >
          <MoreVert />
        </IconButton >
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {cardActions.map((action) => (
            <MenuItem onClick={action.action}>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </CardActions>
      <CardContent className='flex justify-between !p-2 flex-col items-center min-h-[120px]'>
        <div className='flex-1 flex items-center justify-center'>
          <h3 className="text-lg text-black font-medium font-[Roboto]">
            {cardBody}
          </h3>
        </div>
        <p className='text-sm text-tailorFont'>Created on 26 Jul, 23</p>
      </CardContent>
    </Card >
  )
}

export default CustomCard