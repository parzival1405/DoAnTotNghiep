import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    positionNone:{
      position:"unset !important",
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
      },
      searchInput: {
        width: "20%",
        paddingRight: "10px",
      },
      selected: {
        width: "15%",
      },
      selectedD: {
        width: "15%",
      },
      selected20: {
        width: "20%",
      },
      selectedR: {
        width: "10%",
      },
      newButton: {
        right: "10px",
      },
      toolBar: {
        "& .MuiFormControl-root": {
          paddingRight: "10px",
        },
      },
}))