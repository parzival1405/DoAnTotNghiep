import {
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { readFiles } from "../../../utils/File";
import "react-image-lightbox/style.css";
import ImageModal from "./ImageModal";
import ContextMenu from "../../TableRow/TableContextMenu/ContextMenu";
import Controls from "../../Form/controls/Controls";
import { RemoveCircleOutline, Search } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  listItem: {
    "& .MuiList-root": {
      padding: "0px !important",
    },
  },
  gridCustom: {},
  ImageList: {
    padding: "8px",
    "& .MuiImageList-root": {
      width: "100%",
      margin: "0px",
      maxHeight: "434px",
    },

    "& .MuiToolbar-root": {
      padding: "0px",
    },

    "& .MuiTypography-root":{
      marginTop:"5px",
    },

    "& .MuiImageListItemBar-title": {
      fontSize: "12px",
      maxWidth: "222px",
      overflow: "hidden",
    },
  },

  fullImage: {
    "& .ReactModal__Overlay": {
      width: "80% !important",
      height: "80% !important",
    },
  },
  // searchInput: {
  //   float: "none",
  //   width: "200px",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  // },

  imageSelected: {
    // padding:"5px",
    backgroundColor: theme.palette.primary.light,
  },

  image: {
    // padding:"5px",
  },

  toolBar: {
    padding: "0px",
    justifyContent: "center",
  },

  chipSelected: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    
  },

  imageChipSelected: {
    paddingBottom:"5px",
    minHeight: "25px",
    maxHeight: "25px",
    overflowY: "scroll",
    "& .MuiChip-root": {
      margin: "0 5px 5px 0",

    },
  },

  input:{
    paddingRight:"10px !important",
  },
}));

const ImageCanClick = ({
  item,
  handleViewFullImageLightBox,
  handleClick,
  selectedImages,
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const classes = useStyles();
  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleAddImage = (name) => {
    handleClick(name);
    handleClose();
  };

  return (
    <>
      <ImageListItem
        className={
          selectedImages.includes(item.name)
            ? classes.imageSelected
            : classes.image
        }
        key={item.name}
        onClick={() => handleViewFullImageLightBox(item.name, item.src)}
        onContextMenu={handleClick ? handleRightClick : null}
      >
        <img src={item.src} alt={item.name} loading="lazy" />
        <ImageListItemBar
          title={`${item.name}-${item.size}`}
          position="below"
        />
      </ImageListItem>
      <ContextMenu
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleClick={() => handleAddImage(item.name)}
        listItemMenu={[{ title: "Thêm" }, { title: "Xóa" }]}
      />
    </>
  );
};

function FilesViewer({ files }) {
  const classes = useStyles();
  const [isShowFullImage, setIsShowFullImage] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFull, setImageFull] = useState({
    image: "",
    title: "",
  });
  const [searchString, setSearchString] = useState("");
  const debounceValue = useDebounce(searchString, 500);

  const handleViewFullImageLightBox = (name, src) => {
    setImageFull({ src: src, name: name });
    setIsShowFullImage(true);
  };

  const handleClick = (name) => {
    if (!selectedImages.includes(name)) {
      setSelectedImages((prev) => [...prev, name]);
    }
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  const filteredFiles = useMemo(
    () => files.filter((s) => s.name.includes(debounceValue)),
    [debounceValue, files]
  );

  const handleAddImage = (item) => {
    // if (listMember.includes(item)) return;
    // setListMember([...listMember, item]);
    // setListMemberErr("");
    // toggleShow(false);
  };
  const handleRemoveImage = (item) => {
    setSelectedImages((selectedImages) =>
      selectedImages.filter((image) => item !== image)
    );
  };

  return (
    <Box className={classes.ImageList}>
      <div
      // className={classes.imageChipSelected}
      // style={{ display: listMember.length > 0 ? "flex" : "none" }}
      >
        <div style={{marginBottom:"5px"}}>
          <Controls.Input label="Mã bệnh nhân" className={classes.input}/>
          <Controls.Input label="Họ & Tên" />
        </div>
        <Typography variant="caption">
          Đã chọn ({selectedImages.length})
        </Typography>
        <div className={classes.imageChipSelected}>
          {selectedImages?.map((item) => (
            <Chip
              key={item}
              size="small"
              label={item}
              onDelete={() => handleRemoveImage(item)}
              className={classes.chipSelected}
              deleteIcon={<RemoveCircleOutline style={{ color: "white" }} />}
            />
          ))}
        </div>
      </div>
      <Toolbar className={classes.toolBar} sx={{ pt: 2 }}>
        <Controls.Input
          label="Tìm kiếm"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      {isShowFullImage && (
        <ImageModal
          src={imageFull.src}
          name={imageFull.name}
          onClose={() => setIsShowFullImage(false)}
          isShowFullImage={isShowFullImage}
        />
      )}
      <ImageList sx={{ width: 500, height: 550 }} cols={4} rowHeight={164}>
        {filteredFiles?.map((item) => {
          return (
            !item.directory && (
              <ImageCanClick
                key={item.name}
                selectedImages={selectedImages}
                item={item}
                handleViewFullImageLightBox={handleViewFullImageLightBox}
                handleClick={handleClick}
              />
            )
          );
        })}
      </ImageList>
    </Box>
  );
}

export default FilesViewer;
