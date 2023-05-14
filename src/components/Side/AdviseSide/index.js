import { People, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { ChangeConversation } from "../../../redux/actions/chat";
import { GLOBALTYPES } from "../../../redux/actionType";

const useStyle = makeStyles((theme) => ({
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  left: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

function Message({ mess }) {
  const classes = useStyle();
  return (
    <div className={mess.userId === mess.sendBy ? classes.right : classes.left}>
      <Typography
        variant="caption"
        style={{
          background: "#fff",
          padding: "5px",
          borderRadius: "10px",
          marginTop: "10px",
          fontSize:'16px'
        }}
      >
        {mess.userId === mess.sendBy ? `${mess.msg}:Bạn` : mess.msg}
      </Typography>
    </div>
  );
}

function AdviseSide() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const { socket } = useSelector((state) => state.socket);
  const conversations = useSelector((state) => state.chat.conversations);
  const currentConversation = useSelector(
    (state) => state.chat.currentConversation
  );
  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = () => {
    if (msg.trim) {
      socket.current.emit(
        "receptionistSendMessage",
        JSON.stringify({
          customerId: currentConversation.customerId,
          msg: msg,
          sendBy: user.id,
          userId: user.id,
        })
      );
      dispatch({
        type: GLOBALTYPES.RECEIVE_MESSAGE,
        payload: {
          customerId: currentConversation.customerId,
          msg: msg,
          sendBy: user.id,
          userId: user.id,
        },
      });
      setMsg("");
    }
  };

  const handleChangeText = (event) => {
    setMsg(event.target.value);
  };

  const handleChangeConversation = (item) => {
    dispatch(ChangeConversation(item));
  };

  return (
    <Box>
      <Paper
        style={{
          marginBottom: "50px",
          height: "630px",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <Box style={{ width: "30%", padding: "10px" }}>
          <Typography align="center" style={{ marginBottom: "10px" }}>
            Khách cần Tư vấn
          </Typography>
          <List>
            {conversations.map((item) => (
              <ListItem
                disablePadding
                style={
                  currentConversation?.customerId == item.customerId
                    ? { background: "#4eb0ba" }
                    : {}
                }
              >
                <ListItemButton onClick={() => handleChangeConversation(item)}>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          style={{
            height: "610px",
            background: "#ffd",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: 1,
          }}
        >
          <Typography align="center" style={{ marginBottom: "10px" }}>
            Tư vấn khám bệnh
          </Typography>
          <>
            <Box style={{ width: "100%", flex: 1 }}>
              {currentConversation?.messages?.map((item, index) => (
                <Message key={index} mess={item} />
              ))}
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                value={msg}
                size="small"
                style={{ marginRight: "5px", flex: 1 }}
                onChange={handleChangeText}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<Send />}
                onClick={handleSendMessage}
              >
                Gửi
              </Button>
            </Box>
          </>
        </Box>
      </Paper>
    </Box>
  );
}

export default AdviseSide;
