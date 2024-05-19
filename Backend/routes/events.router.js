import express from 'express';
import { verifyGuest, verifyHost } from '../utils/verifyUser.js';
import { createEvent, addGuests, rsvpGet, rsvpPost, giftRegister, showGifts, selectGift } from '../controller/event.controller.js';

const router = express.Router();

router.post('/create', verifyHost, createEvent)
router.post('/addguests', verifyHost, addGuests)
router.get('/rsvp/:uniqueId', rsvpGet)
router.post('/rsvp/:uniqueId', rsvpPost)


router.post('/giftregister', verifyHost, giftRegister)
router.get('/showgifts', verifyGuest, showGifts);
router.post('/selectgift', verifyGuest, selectGift);

export default router;