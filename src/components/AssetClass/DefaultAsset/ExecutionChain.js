import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { useGlobals } from '../../../contexts/GlobalsContext';
import SupportedTypeSelector from '../SupportedTypes';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Import the arrow icon
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';

function ChipWithArrow({ selectedItems, onDelete }) {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      {selectedItems.map((item, index) => (
        <React.Fragment key={item.key}>
          <Chip 
            label={item.label} 
            onDelete={()=>onDelete(item)} // Attach the delete handler
            deleteIcon={<CancelIcon />} // Custom delete icon
            />
          {/* Only render the arrow if it's not the last item */}
          {/*index < selectedItems.length - 1 && (
            <Box>
              <ArrowDownwardIcon />
            </Box>
          )*/}
        </React.Fragment>
      ))}
    </Stack>
  );
}


function getExecutionTools(assets) {
    const out = assets.filter((asset) => asset.asset_tool_name !== null)
    return out
}


function ExecutionChain({ asset, handleInputChange, isEditing, bot }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [assets, setAssets] = useState([]);
    const { supportedStrategies } = useGlobals();
    
    useEffect(() => {
        if (bot) {
            const execution_tools = getExecutionTools(bot.assets)
            setAssets(execution_tools)
        }
    }, [bot])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { 
        setAnchorEl(null);
    };

    const handleSelect = (item) => {
        // Get the selected asset corresponding to the clicked name
        console.log("Selected item", item)
        const new_chain = asset.execution_chain ? [...asset.execution_chain] : [];
        new_chain.push(item);
        handleInputChange(new_chain, "execution_chain");
    };

    const onDelete = (item) => {
        console.log("Delete item", item)
        const new_chain = asset.execution_chain.filter((asset) => asset !== item.key);
        handleInputChange(new_chain, "execution_chain");
    };

    return (
        <div>
            {supportedStrategies? <SupportedTypeSelector
                items={supportedStrategies} 
                currentItem={asset.execution_strategy?asset.execution_strategy:supportedStrategies[0]}
                onItemSelected={(value)=>handleInputChange(value, 'execution_strategy')}
                label = {"Execution strategy for your chatbot"}
                editable= {isEditing} />: <Typography color={'red'}> Failed getting supporting strategies </Typography>}
            <SupportedTypeSelector
                items={assets.map((asset) => asset.asset_tool_name)} 
                currentItem={''} 
                onItemSelected={(item)=>{handleSelect(item)}}
                label = "Add the tool you want to execute before running the strategy"
                editable={isEditing}/>
            {asset && asset.execution_chain && 
                <ChipWithArrow
                 selectedItems={asset.execution_chain.map((item) => ({ key: item, label: item }))}
                    onDelete={onDelete}
                />}
        </div>
    );
}

export default ExecutionChain;
