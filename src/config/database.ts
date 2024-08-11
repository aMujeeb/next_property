import mongoose from "mongoose";


let connected = false;

const connectDb = async () => {
    mongoose.set("strictQuery", true);//Ensure only fields specified in schems are saved to the database.

    if (connected) {
        console.log("Connected to Mongo database");
        return;
    }
    //Connected to the database
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (err) {
        console.error(err);
    }
};

export default connectDb;