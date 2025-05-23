import mongoose from "mongoose";
import dotenv from 'dotenv';
// dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB connected successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
        });
        await mongoose.connect(process.env.MONGO_URI); // No need for extra options
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
