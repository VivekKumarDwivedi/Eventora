import express from 'express';
import { protect,admin } from '../middlewares/auth.middleware.js';
import { bookEvent,getMyBookings,confirmBooking,cancelBooking,sendBookingOTP } from '../controllers/booking.controller.js';

const router = express.Router();


router.post('/', protect, bookEvent);
router.post('/send-otp', protect, sendBookingOTP);
router.get('/my-bookings', protect, getMyBookings);
router.put('/:id/confirm', protect, admin, confirmBooking);
router.delete('/:id', protect, cancelBooking);


export default router;