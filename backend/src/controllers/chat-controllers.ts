import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
            .status(401)
            .json({
                message: "User not registered or token malfunction."
            })
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user"});
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        await res.status(200).json( {chats: user.chats} ); 
    } catch (error) {
        console.log(error);
        await res.status(500).json( {message: "Something went wrong"} );
    }
}

export const getAllChats = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
            // Verify User
            const user = await User.findById(res.locals.jwtData.id);
            if (!user) {
                return res.status(401).send({ message: "User not registered or token malfunctioned" })
            };
            if (user._id.toString() !== res.locals.jwtData.id) {
                res.status(401).send({ message: "Permissions Invalid" });
            }
            return res.status(200).json({ message: "OK", chats: user.chats});
        } catch (error) {
            return res.status(500).json({ message: "Server Error", cause: error.message });
        }
    };

export const deleteChats = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
            // Verify User
            const user = await User.findById(res.locals.jwtData.id);
            if (!user) {
                return res.status(401).send({ message: "User not registered or token malfunctioned" })
            };
            if (user._id.toString() !== res.locals.jwtData.id) {
                res.status(401).send({ message: "Permissions Invalid" });
            }
            //@ts-ignore
            user.chats = [];
            await user.save();
            return res.status(200).json({ message: "OK"});
        } catch (error) {
            return res.status(500).json({ message: "Server Error", cause: error.message });
        }
    };