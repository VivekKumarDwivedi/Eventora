import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRouter from './src/routers/auth.router.js';
import eventsRouter from './src/routers/events.router.js';
import bookingRouter from './src/routers/booking.router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingRouter);    


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});