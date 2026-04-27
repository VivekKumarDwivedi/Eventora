import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routers/auth.router.js';
import eventsRouter from './src/routers/events.router.js';
import bookingRouter from './src/routers/booking.router.js';
import { corsOptions, connectDB, config } from './src/config/index.js';

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Routes 
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingRouter);    


connectDB();

const PORT = config.port;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS allowed origins: ${config.corsOrigins.join(', ')}`);
});