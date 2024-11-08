import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number 
}

const connection: ConnectionObject = {}

const dbConnect = async () => {
    if(connection.isConnected){
        console.log("DB is already connected")
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        connection.isConnected = db.connections[0].readyState
        console.log("DB Connected Successfully")
    } catch (error) {
        console.error("Error connecting DB", error)
        process.exit(1)
    }
}

export default dbConnect;