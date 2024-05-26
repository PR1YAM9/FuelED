import express from 'express';
import User, { Event } from '../models/user.model.js';

const router = express.Router();

router.get('/participants', async (req, res) => {
    const eventId = req.query.eventId;
    const userId = req.query.userId;

    try {
        const event = await Event.findById(eventId).populate('vendors host');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'HOST') {
            res.status(200).json(event.vendors); // Return vendors if the user is a host
        } else if (user.role === 'VENDOR') {
            res.status(200).json(event.host); // Return host if the user is a vendor
        } else {
            res.status(400).json({ message: 'Invalid role' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;
