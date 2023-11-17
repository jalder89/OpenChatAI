import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Failed to login user");
    }
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

export const sendChatRequest = async (message:string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};

export const getUserChats = async () => {
    const res = await axios.get("/chat/allChats");
    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
        throw new Error("Unable to delete chat");
    }
    const data = await res.data;
    return data;
};