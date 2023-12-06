import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton'; 

function ExpandableList({ data, handleToolChange }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [tools, setTools] = useState(data);

  useEffect(() => {
    setTools(data);
  }, [data]);

  const handleExpand = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedTools = [...tools];
    updatedTools[index].tool_details[field] = value;
    setTools(updatedTools);
  };

  const handleSubmit = (index) => {
    // console.log("akash", "toolDetails", tools[index])
    handleToolChange(tools[index])
  };

  return (
    <List>
      {tools.map((tool, index) => (
        <div key={index}>
          <ListItem button onClick={() => handleExpand(index)}>
            <ListItemButton>
                <ListItemText primary={tool.file_name} />
            </ListItemButton>
          </ListItem>
          <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <TextField
                  label="Tool Name"
                  variant="outlined"
                  value={tool.tool_details.name}
                  onChange={e => handleInputChange(index, 'name', e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Tool Description"
                  variant="outlined"
                  value={tool.tool_details.description}
                  onChange={e => handleInputChange(index, 'description', e.target.value)}
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" onClick={() => handleSubmit(index)}>
                  Submit
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
}

export default ExpandableList;
