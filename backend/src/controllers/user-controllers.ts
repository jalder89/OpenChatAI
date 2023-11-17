import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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

            // Create cookie and store token
            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true,
            });
            const token = createToken(user._id.toString(), user.email, "7d");
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            res.cookie(COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            });

            return res.status(201).json({ message: "OK", name: user.name, email: user.email });
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

            // Create cookie and store token
            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true,
            });
            const token = createToken(user._id.toString(), user.email, "7d");
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            res.cookie(COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            });

            return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        } catch (error) {
            return res.status(200).json({ message: "Server Error", cause: error.message });
        }
    };

export const verifyUser = async (
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
            return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", cause: error.message });
        }
    };

export const userLogout = async (
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
            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true,
            });
            return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", cause: error.message });
        }
    };