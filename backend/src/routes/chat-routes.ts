import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { deleteChats, generateChatCompletion, getAllChats } from "../controllers/chat-controllers.js";

const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/allChats", verifyToken, getAllChats);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;