import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODBURI;

export async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("database connected successfully!");
    } catch (error) {
        console.log("database connection failed!", error);
    }
}




