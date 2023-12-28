import { Collapse, IconButton } from '@mui/material'
import React from 'react'
import OrgsList from '../Assets/OrgsList'
import BotsList from '../Assets/BotsList'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const OrgsAndBotsSidePanel = ({ isCollapsed, onOrgSelect, selectedOrgId, onBotSelect, toggleCollapse }) => {
  return (
    <div className="flex absolute z-10 bg-tailorBlue-500 rounded-tr-xl rounded-br-xl h-full   py-6 px-[10px] ">
      <div className="h-full overflow-y-scroll scrollbar-hidden">
        <Collapse in={!isCollapsed} orientation="horizontal">
          <OrgsList onSelect={onOrgSelect} />
        </Collapse>
      </div>
      <div className="h-full overflow-y-scroll scrollbar-hidden">
        <Collapse in={!isCollapsed} orientation="horizontal">
          {selectedOrgId && (
            <BotsList orgId={selectedOrgId} onSelect={onBotSelect} />
          )}
        </Collapse>
      </div>

      <IconButton
        onClick={toggleCollapse}
        size="small"
        sx={{
          backgroundColor: "#FBFBFB",
          boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.2 )",
          position: "absolute",
          right: "0",
          top: "50%",
          translate: "50% -50%",
          "&:hover": {
            backgroundColor: "#FBFBFB",
          },
        }}
      >
        {isCollapsed ? (
          <ChevronRight color="primary" fontSize="medium" />
        ) : (
          <ChevronLeft color="primary" fontSize="medium" />
        )}
      </IconButton>
    </div>
  )
}

export default OrgsAndBotsSidePanel