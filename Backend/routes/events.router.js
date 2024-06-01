import express from 'express';
import { verifyGuest, verifyHost } from '../utils/verifyUser.js';
import { createEvent, addGuests, rsvpGet, rsvpPost, giftRegister, showGifts, selectGift, addVendors, rsvpGetVendor, rsvpPostVendor, getGuestList, getHostsEvent, getEventDetails, getVendorList, addBudget, getBudget, addExpense, getExpenses } from '../controller/event.controller.js';

const router = express.Router();
router.get('/guestList/:eventId' , getGuestList)
router.get('/getevents',  getHostsEvent)
router.get('/geteventdetails/:eventId', getEventDetails)

router.post('/create', createEvent)
router.post('/addguests/:eventId', addGuests)

router.get('/rsvp/:uniqueId', rsvpGet)
router.post('/rsvp/:uniqueId', rsvpPost)


router.get('/vendors/:eventId', getVendorList)
router.post('/addvendors/:eventId', addVendors)
router.get('/rsvpvendor/:uniqueId', rsvpGetVendor)
router.post('/rsvpvendor/:uniqueId', rsvpPostVendor)

router.post('/giftregister/:eventId', giftRegister)
router.get('/showgifts/:eventId', showGifts);
router.post('/selectgift', selectGift);

router.post('/addBudget/:eventId', addBudget)
router.get('/getBudget/:eventId', getBudget)
router.post('/addExpense/:eventId', addExpense)
router.get('/getexpenses/:eventId', getExpenses)

export default router;