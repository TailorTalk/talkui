import React, { useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


function SupportedTypeSelector({ items, currentItem, onItemSelected, label = "What kind of asset are you adding", editable = true }) {
  const [selectedItem, setSelectedItem] = React.useState('');

  useEffect(() => {
    if (currentItem && (items.some((item) => item === currentItem))) {
      setSelectedItem(currentItem);
    }
  }, [items, currentItem]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    if (onItemSelected) {
      onItemSelected(value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedItem}
        onChange={handleChange}
        label={label}
        {...(editable ? {} : { disabled: true })}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SupportedTypeSelector;
