import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Styled,
  InputBase,
  TextField,
  Button,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = Styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});
const RecipientsWrapper = Styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid #F5F5F5",
    marginTop: 10,
  },
});
const Footer = Styled(Box)({
  diaplay: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
});

const SendButton = Styled(Button)({
  background: "#0B57D0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});
const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const config = {
    Host: "smtp.elasticemail.com",
    Username: process.env.REACT_APP_USERNAME,
    Password: process.env.REACT_APP_PASSWORD,
    port: 2525,
  };


const closeComposeMail = (e) => {
  e.preventDefault();
  const payload = {
    to: data.to,
    from: "vanmathi291@gmail.com",
    subject: "data.subject",
    body: data.body,
    date: new Date(),
    image: "",
    name: "vanmathi",
    starred: false,
    type: "drafts",
  };
  sentDraftService.call(payload);

  if (!sentDraftService.call.error) {
    setOpenDialog(false);
    setData({});
  } else {
  }
};

const SendMail = (e) => {
  e.preventDefault();
  if (window.Email) {
    window.Email.send({
      ...config,
      To: data.to,
      From: "vanmathi291@gmail.com",
      Subject: data.subject,
      Body: data.body,
    }).then((message) => alert(message));
  }

  setOpenDialog(false);
};

const onValueChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};
return (
  <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
    <Header>
      <Typography>New Message</Typography>
      <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
    </Header>
    <RecipientsWrapper>
      <InputBase
        placeholder="Recipients"
        name="to"
        onChange={(e) => onValueChange(e)}
      />
      <InputBase
        placeholder="Subject"
        name="subject"
        onChange={(e) => onValueChange(e)}
      />
    </RecipientsWrapper>
    <TextField
      miltiline
      row={20}
      sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
      onChange={(e) => onValueChange(e)}
      name="body"
    />
    <Footer>
      <SendButton onClick={(e) => SendMail(e)}>Send</SendButton>
      <DeleteOutline onClick={() => setOpenDialog(false)} />
    </Footer>
  </Dialog>
);
};
export default ComposeMail;
