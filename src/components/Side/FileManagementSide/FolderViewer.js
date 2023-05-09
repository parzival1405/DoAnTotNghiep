// import { DriveFileMove, Folder, Undo } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import React from "react";
// const { app } = window.require("@electron/remote");
// const dialog = window.electron?.dialog;
// const BrowserWindow = window.electron?.BrowserWindow;
// const pathModule = window.require("path");
// const useStyles = makeStyles((theme) => ({
//   list: {
//     padding: "0",
//   },
//   folderConfig: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "8px 16px 8px 8px",
//   },
// }));

// let options = {
//   // See place holder 1 in above image
//   title: "Chọn folder lưu ảnh",

//   // See place holder 2 in above image
//   defaultPath: pathModule?.join(app?.getAppPath(), ".."),

//   // See place holder 3 in above image
//   buttonLabel: "Chọn làm thư mục lưu ảnh chính",

//   properties: ["openDirectory"],
// };

// function FolderViewer({ files, currentFolderName, onBack, onOpen }) {
//   const classes = useStyles();

//   const handleConfigFolder =async  () => {
//     let filePaths = await dialog.showOpenDialog(options).then((obj) => obj.filePaths);
//   };

//   return (
//     <Box className={classes.listItem}>
//       <Box className={classes.folderConfig}>
//         <IconButton aria-label="delete" size="medium" onClick={onBack}>
//           <Undo fontSize="inherit" />
//         </IconButton>
//         <Button
//           variant="outlined"
//           // onClick={handleConfigFolder}
//           startIcon={<DriveFileMove />}
//           size="small"
//         >
//           Cấu hình thư mục
//         </Button>
//       </Box>
//       <Divider variant="middle" />
//       <ListItemButton>
//         <ListItemIcon>
//           <Folder style={{ color: "#fcda6d" }} />
//         </ListItemIcon>
//         <ListItemText primary={currentFolderName} />
//       </ListItemButton>
//       <List className={classes.list}>
//         {files.map(({ name, directory, size }) => {
//           return (
//             directory && (
//               <ListItem key={name} disablePadding onClick={() => onOpen(name)}>
//                 <ListItemButton sx={{ pl: 4 }}>
//                   <ListItemIcon>
//                     <Folder style={{ color: "#FFE9A2" }} />
//                   </ListItemIcon>
//                   <ListItemText primary={name} />
//                 </ListItemButton>
//               </ListItem>
//             )
//           );
//         })}
//       </List>
//     </Box>
//   );
// }

// export default FolderViewer;
