import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRouter from './src/routes/auth.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api/auth', authRouter);


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});