import React from 'react'
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io'
const chatMessages = [
  {"role": "user", "content": "Hello, can you help me with some information?"},
  {"role": "assistant", "content": "Of course! What do you need help with?"},
  {"role": "user", "content": "I need information on the latest space missions."},
  {"role": "assistant", "content": "Sure! The most recent notable space mission is the Artemis I mission by NASA."},
  {"role": "user", "content": "That's great! Can you give me more details?"},
  {"role": "assistant", "content": "Certainly! Artemis I is an uncrewed mission planned as the first step in the Artemis program, aimed at returning humans to the Moon."},
  {"role": "user", "content": "Thanks for the information!"},
  {"role": "assistant", "content": "You're welcome! If you have any more questions, feel free to ask."}
]

const Chat = () => {
  const auth = useAuth();
  return (
  <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
    <Box sx={{ display: { md: "flex", sm: "none", xs: "none"}, flex: 0.2, flexDirection: "column" }}>
      <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17, 29, 39)", borderRadius: 5, flexDirection: "column", mx: 3 }}>
        <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700}}>
          {auth?.user?.name[0]}
          {auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Typography sx={{ mx: "auto", fontFamily: "work sans"}}>
          You are talking to a ChatBot.
        </Typography>
        <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3}}>
          You may ask questions related to Knowledge, Business, Advice, Education, etc. Please avoid sharing personal information.
        </Typography>
        <Button sx={{ width: "200px", my: "auto", color: "white", fontWeight: 700, borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": {bgcolor: red.A400} }}>
          Clear
        </Button>
      </Box>
    </Box>
    <Box sx={{ display: "flex", flex: { md: 0.8, sm: 1, xs: 1 }, flexDirection: "column", px: 3 }}>
      <Typography sx={{ textAlign: "center", fontSize: "40px", fontWeight: 600, color: "white", mb: 2, mx: "auto" }}>
        Model - GPT 3.5 Turbo
      </Typography>
      <Box sx={{ width: "100%", height: "60vh", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", overflowY: "auto", scrollBehavior: "smooth"}}>
        {chatMessages.map((chat, index) => (
          //@ts-ignore
          <ChatItem content={ chat.content } role={ chat.role } key={ index } />
        ))}
      </Box>
      <div style={{ width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "rgb(17, 27, 39)", display: "flex", margin: "auto"}}>
        {" "}
        <input type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "10px", border: "none", outline: "none", color: "white", fontSize: "20px"}}/>
        <IconButton sx={{ ml: "auto", color: "white" }}><IoMdSend /></IconButton>
      </div>
    </Box>
  </Box>
  );
};

export default Chat