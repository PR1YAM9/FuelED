import express from 'express';
import { verifyGuest, verifyHost } from '../utils/verifyUser.js';
import { createEvent, addGuests, rsvpGet, rsvpPost, giftRegister, showGifts, selectGift, addVendors, rsvpGetVendor, rsvpPostVendor, getGuestList, getHostsEvent, getEventDetails } from '../controller/event.controller.js';

const router = express.Router();
router.get('/guestList/:eventId' , getGuestList)
router.get('/getevents', verifyHost, getHostsEvent)
router.get('/geteventdetails/:eventId', getEventDetails)

router.post('/create', verifyHost, createEvent)
router.post('/addguests/:eventId', addGuests)

router.get('/rsvp/:uniqueId', rsvpGet)
router.post('/rsvp/:uniqueId', rsvpPost)

router.post('/addvendors/:eventId', addVendors)
router.get('/rsvpvendor/:uniqueId', rsvpGetVendor)
router.post('/rsvpvendor/:uniqueId', rsvpPostVendor)

router.post('/giftregister/:eventId', verifyHost, giftRegister)
router.get('/showgifts/:eventId', showGifts);
router.post('/selectgift', verifyGuest, selectGift);

export default router;