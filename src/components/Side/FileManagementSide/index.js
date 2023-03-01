import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useMemo, useState } from "react";
import FilesViewer from "./FilesViewer";
import FolderViewer from "./FolderViewer";
const fs = window.require("fs");
const pathModule = window.require("path");
const { app } = window.require("@electron/remote");

const useStyles = makeStyles((theme) => ({
  listItem: {
    "& .MuiList-root": {
      padding: "0px !important",
    },
  },
  gridCustom: {},
}));

const formatSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

function FileManagementSide() {
  const path = pathModule.join(app.getAppPath(), "..", "anh");

  const [currentPath, setCurrentPath] = useState(path);
  const [currentFolderName, setCurrentFolderName] = useState("anh");
  const classes = useStyles();

  const files = useMemo(
    () =>
      fs
        .readdirSync(currentPath)
        .map((fileName) => {
          const stats = fs.statSync(pathModule.join(currentPath, fileName));
          return {
            name: fileName,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory(),
            src: pathModule.join(currentPath, fileName),
          };
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        }),
    [currentPath]
  );

  const [canMove, setCanMove] = useState(false);

  useEffect(() => {
    const comparePath = (path) => {
      const maxPath = pathModule.join(app.getAppPath(), "..", "anh");
      return maxPath == path ? setCanMove(false) : setCanMove(true);
    };

    comparePath(currentPath);
  }, [currentPath]);

  const onBack = () => {
    if (canMove) {
      setCurrentPath(pathModule.dirname(currentPath));
      const splitArr = pathModule.dirname(currentPath).split("\\");
      setCurrentFolderName(splitArr[splitArr.length - 1]);
    }
  };

  const onOpen = (folder) => {
    setCurrentPath(pathModule.join(currentPath, folder));
    setCurrentFolderName(folder);
  };

  return (
    <Grid container columnSpacing={1} className={classes.gridCustom}>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1 }}
        style={{
            borderRight: "1px solid #c4c4c4",
        }}
      >
        <FolderViewer
          files={files}
          currentFolderName={currentFolderName}
          onBack={onBack}
          onOpen={onOpen}
        />
      </Grid>
      <Grid item xs={9}>
        <FilesViewer path={currentPath} files={files} />
      </Grid>
    </Grid>
  );
}

export default FileManagementSide;
