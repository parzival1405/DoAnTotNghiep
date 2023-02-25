import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { readFiles } from "../../../utils/File";

const useStyles = makeStyles((theme) => ({
  listItem: {
    "& .MuiList-root": {
      padding: "0px !important",
    },
  },
  gridCustom: {},
  ImageList: {
    "& .MuiImageList-root": {
      width: "100%",
      margin: "0px",
      height: "634px",
    },

    "& .MuiImageListItemBar-title": {
      fontSize: "12px",
      maxWidth: "222px",
      overflow: "hidden",
    },
  },
}));

function FilesViewer({ files }) {
  const classes = useStyles();

  return (
    <Box className={classes.ImageList}>
      <ImageList sx={{ width: 500, height: 550 }} cols={4} rowHeight={164}>
        {files.map(({ name, src,directory,size }) => {
          return !directory && (
            <ImageListItem key={name}>
              <img src={src} alt={name} loading="lazy" />
              <ImageListItemBar title={`${name}${size}`} position="below" />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

export default FilesViewer;
