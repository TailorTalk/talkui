import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";

function SupportedTypeSelector({
  items,
  currentItem,
  onItemSelected,
  label = "What kind of asset are you adding",
  editable = true,
}) {
  const [selectedItem, setSelectedItem] = React.useState("");

  useEffect(() => {
    if (currentItem && items.some((item) => item === currentItem)) {
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
    <FormControl variant="filled" >
      <InputLabel id={`${selectedItem}-label`}>{label}</InputLabel>
      <Select
        labelId={`${selectedItem}-label`}
        id={`${selectedItem}-id`}
        value={selectedItem}
        onChange={handleChange}
        disabled={editable?false:true}
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

