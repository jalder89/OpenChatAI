import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ContentBlock = 
  | { type: 'code'; code: string; language: string }
  | { type: 'text'; content: string };

function extractCodeFromString(message: string): ContentBlock[] {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let blocks: ContentBlock[] = [];
  let lastIdx = 0;

  message.replace(regex, (match, lang = "javascript", code, offset) => {
    // Push the text before the code block, if any
    if (lastIdx !== offset) {
      blocks.push({ type: "text", content: message.slice(lastIdx, offset) });
    }
    // Push the code block
    blocks.push({ type: "code", language: lang, code });
    lastIdx = offset + match.length;
    return ''; // Needed for TypeScript, but not used
  });

  // Push remaining text after the last code block
  if (lastIdx < message.length) {
    blocks.push({ type: "text", content: message.slice(lastIdx) });
  }

  return blocks;
}

const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant"; }) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === "assistant" ? (
  <Box sx={{ display: "flex", p: 2, bgcolor: "#105d7612", my: 2, gap: 2 }}>
    <Avatar sx={{ ml: "0" }}>
      <img src='openai.png' alt='OpenAI' width={"32px"} />
    </Avatar>
    <Box>
      {
        messageBlocks.map((block, index) => {
          if (block.type === "code") {
            return (
              <SyntaxHighlighter key={index} language={block.language} style={coldarkDark}>
                {block.code}
              </SyntaxHighlighter>
            );
          } else {
            return (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block.content}
              </Typography>
            );
          }
        })
      }
    </Box>
  </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", my: 2, gap: 2 }}>
    <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
      {auth?.user?.name[0]}
      {auth?.user?.name.split(" ")[1][0]}
    </Avatar>
    <Box>
      {
        messageBlocks.map((block, index) => {
          if (block.type === "code") {
            return (
              <SyntaxHighlighter key={index} language={block.language} style={coldarkDark}>
                {block.code}
              </SyntaxHighlighter>
            );
          } else {
            return (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block.content}
              </Typography>
            );
          }
        })
      }
    </Box>
  </Box>
  )
}

export default ChatItem