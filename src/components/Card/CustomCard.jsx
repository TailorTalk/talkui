import { Groups, InfoOutlined, MoreVert } from '@mui/icons-material'
import { Card, CardActions, CardContent, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'

const CustomCard = ({ name,dataItem, cardBody, date, cardActions }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ minWidth: 200,borderRadius:'10px', border:'2px solid #000' }} >

      <CardActions className="justify-center flex relative border-b-2 border-black ">
        <h3 className="text-2xl font-medium font-[Roboto] text-center">
          {name}
        </h3>

        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event)=>{
           if(event){
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
          PaperProps={{
            // style: {
            //   maxHeight: ITEM_HEIGHT * 4.5,
            //   width: '20ch',
            // },
          }}
        >
          {cardActions.map((action) => (
          <MenuItem onClick={action.action}>
            {action.name}
          </MenuItem>
         ))}
        </Menu>
        {/* {dataItem.is_admin && (
          <IconButton
            onClick={(event) => cardActions.handleCollaborateClick(event, dataItem.name)}
          >
            <Groups fontSize="medium" />
          </IconButton>
        )}
        <IconButton onClick={(event) => cardActions.handleInfoClick(event, dataItem)}>
          <InfoOutlined fontSize="medium" />
        </IconButton> */}
      </CardActions>
      <CardContent className='flex justify-between !p-2 flex-col items-center min-h-[120px]'>
        <div className='flex-1 flex items-center justify-center'>
        <h3 className="text-lg text-black font-medium font-[Roboto]">
          {cardBody}
        </h3>
        </div>
        <p>Created on 26 Jul, 23</p>
      </CardContent>
    </Card>
  )
}

export default CustomCard