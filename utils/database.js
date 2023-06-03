import mongoose from "mongoose";

let isConnected = false;// track the connection status

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true)
    if (isConnected) {
        console.log("Mongo db already connected")
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "promptopia",
        });
    
        console.log("Mongo db successfully connected")
    isConnected = true;
    } catch (error) {
        console.log("error",error)
    }
    }