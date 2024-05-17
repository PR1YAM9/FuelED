import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createEvent, addGuests, rsvpGet, rsvpPost } from '../controller/event.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createEvent)
router.post('/addguests', verifyUser, addGuests)
router.get('/rsvp/:uniqueId', rsvpGet)
router.post('/rsvp/:uniqueId', rsvpPost)

export default router;