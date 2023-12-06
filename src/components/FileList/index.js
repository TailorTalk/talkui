import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const CustomDeleteIcon = ({ data, onClick }) => {
  return (
      <DeleteIcon onClick={() => onClick(data)} />
  );
}

const FileList = ({ fileInfos, onDelete }) => {
  return (<>
    {fileInfos && fileInfos.success ?
      fileInfos.result.files.map((file, index) => {
        // console.log("akash", file, index);
        return (<ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <CustomDeleteIcon data={file} onClick={onDelete}/>
            </IconButton>
          }
          divider
          key={index}>
          <ListItemAvatar>
            <Avatar>
              <ArticleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={file.name}
            secondary={false && file.url}
          />
        </ListItem>)
      }) : <div>Error fetching files</div>}
  </>)
};

export default FileList;
