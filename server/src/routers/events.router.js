import express from 'express';
import { protect, admin } from '../middlewares/auth.middleware.js';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js';


const router = express.Router();


// GET ALL events
router.get('/', getAllEvents);

// Get Event By ID
router.get('/:id', getEventById);

// Create Event By Admin Only
router.post('/', protect, admin, createEvent);

// Update Event By Admin Only
router.put('/:id', protect, admin, updateEvent);

// Delete Event By Admin Only
router.delete('/:id', protect, admin, deleteEvent);


export default router;