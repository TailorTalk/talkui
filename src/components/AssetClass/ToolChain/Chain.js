import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import SupportedTypeSelector from '../SupportedTypes';
import Stack from '@mui/material/Stack';
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


function Chain({ asset, handleInputChange, isEditing, bot }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [assets, setAssets] = useState([]);
    
    useEffect(() => {
        if (bot) {
            const execution_tools = getExecutionTools(bot.assets)
            setAssets(execution_tools)
        }
    }, [bot])

    const handleSelect = (item) => {
        // Get the selected asset corresponding to the clicked name
        console.log("Selected item", item)
        const new_chain = asset.sequence_of_tools ? [...asset.sequence_of_tools] : [];
        new_chain.push(item);
        handleInputChange(new_chain, "sequence_of_tools");
    };

    const onDelete = (item) => {
        console.log("Delete item", item)
        const new_chain = asset.sequence_of_tools.filter((asset) => asset !== item.key);
        handleInputChange(new_chain, "sequence_of_tools");
    };

    return (
        <div>
            <SupportedTypeSelector
                items={assets.map((asset) => asset.asset_tool_name)} 
                currentItem={''} 
                onItemSelected={(item)=>{handleSelect(item)}}
                label = "The tool you want to add as a part of this chain"
                editable={isEditing}/>
            {asset && asset.sequence_of_tools && 
                <ChipWithArrow
                 selectedItems={asset.sequence_of_tools.map((item) => ({ key: item, label: item }))}
                    onDelete={onDelete}
                />}
        </div>
    );
}

export default Chain;
