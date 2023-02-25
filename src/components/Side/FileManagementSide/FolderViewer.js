import { Folder, Undo } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
    list:{
        padding: "0",
    }
}));

function FolderViewer({ files, currentFolderName, onBack, onOpen }) {
  const classes = useStyles();
  return (
    <Box className={classes.listItem}>
      <IconButton aria-label="delete" size="large" onClick={onBack}>
        <Undo fontSize="inherit" />
      </IconButton>
      <ListItemButton>
        <ListItemIcon>
        <Folder style={{color:"#fcda6d"}} />
        </ListItemIcon>
        <ListItemText primary={currentFolderName} />
      </ListItemButton>
      <List className={classes.list}>
        {files.map(({ name, directory, size }) => {
          return (
            directory && (
              <ListItem key={name} disablePadding onClick={() => onOpen(name)}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Folder style={{color:"#FFE9A2"}} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            )
          );
        })}
      </List>
    </Box>
  );
}

export default FolderViewer;
