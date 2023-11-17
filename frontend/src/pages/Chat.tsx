import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io'
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicators';
import toast from 'react-hot-toast';
type Message = {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev)=>[...prev, newMessage])
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  }
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats...", {id: "deletechat"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chat deleted!", {id: "deletechat"});
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chat!", {id: "deletechat"});
    }
  }
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chat...", {id: "loadchats"});
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chat loaded!", {id: "loadchats"})
        })
        .catch(err => {
          console.log(err);
          toast.error("Loading failed!", {id: "loadchats"});
        });
    }
  }, [auth])
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login")
    }
  }, [auth])
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
        <Button onClick={handleDeleteChats} sx={{ width: "200px", my: "auto", color: "white", fontWeight: 700, borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": {bgcolor: red.A400} }}>
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
      <div style={{ width: "100%", borderRadius: 8, backgroundColor: "rgb(17, 27, 39)", display: "flex", margin: "auto"}}>
        {" "}
        <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "30px", border: "none", outline: "none", color: "white", fontSize: "20px"}}/>
        <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white", mx: 1 }}><IoMdSend /></IconButton>
      </div>
    </Box>
  </Box>
  );
};

export default Chat