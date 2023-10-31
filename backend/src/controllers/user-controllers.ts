import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
            // Get all users
            const users = await User.find();
            return res.status(200).json({ message: "OK", users });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", cause: error.message });
        }
    };

export const userSignup = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
            // User signup
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(200).send({ message: "User already registered" })
            };
            const hashedPassword = await hash(password, 10);
            const user = new User({ name, email, password:hashedPassword });
            await user.save();
            return res.status(201).json({ message: "OK", id: user._id.toString() });
        } catch (error) {
            return res.status(200).json({ message: "Server Error", cause: error.message });
        }
    };

export const userLogin = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
            // User login
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ message: "User not registered" })
            };
            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(403).send({ message: "Incorrect password" })
            }

            return res.status(200).json({ message: "OK", id: user._id.toString() });
        } catch (error) {
            return res.status(200).json({ message: "Server Error", cause: error.message });
        }
    };