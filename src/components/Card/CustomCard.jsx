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
    <div onClick={onCardSelect} id={id} className='bg-gray-50 hover:bg-white unselected min-w-[170px] max-2xl:min-w-[150px] max-w-[200px] max-2xl:max-w-[180px] rounded-xl cursor-pointer'  >
      <div className="justify-center flex relative border-b-[1px] py-2 items-center">
        <h3 className="text-xl max-2xl:text-lg text-center text-camelCase max-w-[90px]" style={{whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',  }}>
          {name}
        </h3>

        <IconButton
          aria-label="Add"
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
            right: '0',
            color:"#000",
          }}

        >
          <MoreVert fontSize='small' />
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
          {cardActions.map((action,index) => (
            <MenuItem onClick={action.action} key={index}>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className='flex justify-between flex-col items-center min-h-[120px] max-2xl:min-h-[110px] '>
        <div className='flex-1 flex items-center justify-center'>
          <h3 className="text-lg max-2xl:text-base ">
            {cardBody}
          </h3>
        </div>
        <p className='text-xs   pb-2'>{`Created on ${date}`}</p>
      </div>
    </div >
  )
}

export default CustomCard