import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config.js";
import booksRouter from "./routes/booksRoutes.js";
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT
const app = express();
app.use(express.json());
app.use(cors())
connectDB()

app.use('/api', booksRouter)



app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})