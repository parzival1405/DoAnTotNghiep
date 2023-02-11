import { makeStyles } from "@mui/styles";
import background from "../../../assets/img/background_login.jpg";
export default makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    // background: `linear-gradient(to bottom, rgba(47, 93, 98, 0.9), rgba(94, 139, 126,1)),
    //     url('../../../assets/img/background_login.jpg')`,
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: { display: "flex", justifyContent: "center", alignItems: "center" },
  avatar: {
    width: "90px !important",
    height: "90px !important ",
  },
  footer: {
    flex: 0.4,
  },
  block: {
    backgroundImage: `linear-gradient(to bottom,rgba(247, 247, 247,0.9) , rgba(218, 245, 242,0.9));`,
    padding: "10px",
    borderRadius: "10px",
    minWidth:"300px"
  },
}));
