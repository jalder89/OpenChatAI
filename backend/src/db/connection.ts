import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
        console.log("Connected to database")
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from database");
    } catch (error) {
        console.log(error);
        throw new Error("Error disconnecting from database");
    }
}

export { connectToDatabase, disconnectFromDatabase };