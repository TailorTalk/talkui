import { MoreVert } from '@mui/icons-material'
import { Card, CardActions, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'


const CustomCard = ({ name, dataItem, cardBody, date, cardActions, onSelect, id }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCardSelect = () => {
    if (id.startsWith('org')) {
      const selectedElement = document.querySelector('.selectedOrg');
      if (selectedElement) {
        selectedElement.classList.remove('selectedOrg');
      }

      document.getElementById(id).classList.add("selectedOrg");
    }

    if (id.startsWith('bot')) {
      const selectedElement = document.querySelector('.selectedBot');
      if (selectedElement) {
        selectedElement.classList.remove('selectedBot');
      }

      document.getElementById(id).classList.add("selectedBot");
    }

    onSelect();
  }


  return (
    <div onClick={onCardSelect} id={id} className='bg-gray-50 hover:text-tailorBlue-500 hover:scale(1.05) hover:bg-white unselected ' style={{
      minWidth: '170px', borderRadius: '10px', cursor: "pointer",
      fontFamily: 'Roboto',
      border: '1px solid #fff',
      margin: '2px',

    }} >
      <div className="justify-center flex relative border-b-[1px] py-2 items-center ">
        <h3 className="text-xl font-medium font-[Roboto] text-center text-camelCase">
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
      </div>
      <CardContent className='flex justify-between !p-2 flex-col items-center min-h-[120px]'>
        <div className='flex-1 flex items-center justify-center'>
          <h3 className="text-lg text-black font-medium font-[Roboto]">
            {cardBody}
          </h3>
        </div>
        <p className='text-sm text-tailorFont'>{`Created on ${date}`}</p>
      </CardContent>
    </div >
  )
}

export default CustomCard