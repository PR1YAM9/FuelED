import User, { Event } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import crypto from 'crypto';


export const createEvent = async (req, res, next) => {
    try {
        const { eventName, startDateTime, endDateTime, venue, } = req.body;

        if (!eventName || !startDateTime || !endDateTime || !venue) {
            return res.status(400).json({ error: 'Incomplete event data' });
        }

        const newEvent = new Event({
            eventName,
            startDateTime,
            endDateTime,
            venue,
            host: req.user._id
        });

        await newEvent.save();

        await User.findByIdAndUpdate(req.user._id, { $push: { events: newEvent._id } });

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addGuests = async (req, res, next) => {

    try {
        const { guests, eventId } = req.body; // guests is an array of guest details
        
        if (!eventId) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const addedGuests = [];

        for (const guest of guests) {
            const { name, email, phone } = guest;

            // Generate a unique identifier for the guest
            const uniqueId = crypto.randomBytes(16).toString('hex');
            //generate guest password from their name
            const password = name.split(' ').join('').toLowerCase() + '123';
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Create a new guest and store in the database
            const newGuest = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                role: 'GUEST',
                uniqueId,
                rsvp: 'PENDING', // Default RSVP status
                events: [eventId]
            });

            await newGuest.save();

            // Add guest to event's guest list
            event.guestList.push(newGuest._id);
            addedGuests.push(newGuest);

            // Send an email to the guest with the unique RSVP link
            const uniqueLink = `http://localhost:3000/api/event/rsvp/${uniqueId}`;

            // Configure the email transport using nodemailer
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'camryn.swift50@ethereal.email',
                    pass: 'kpMShENbgecV9W3qPm'
                }            
            });

            // Define the email options
            const mailOptions = {
                from: '"Event Manager" <priyam@gmail.com>' ,
                to: email,
                subject: 'RSVP for Event',
                text: `Hello ${name},\n\nPlease RSVP for the event by clicking the link below:\n${uniqueLink}\n\nThank you! username: ${email} password: ${password}`,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
        }

        // Save the updated event
        await event.save();

        res.status(201).json({ message: 'Guests added and emails sent successfully', guests: addedGuests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const rsvpGet = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const guest = await User.findOne({ uniqueId, role: 'GUEST' });

        if (!guest) {
            return res.status(404).send('Guest not found');
        }

        // Render the RSVP form (you can use a template engine or send a simple HTML form)
        res.send(`
            <form action="/api/event/rsvp/${uniqueId}" method="POST">
                <label for="rsvp">Will you attend?</label>
                <select name="rsvp" id="rsvp">
                    <option value="ACCEPTED">Yes</option>
                    <option value="DECLINED">No</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

export const rsvpPost =  async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const { rsvp } = req.body;
        console.log(rsvp);
        const guest = await User.findOne({ uniqueId, role: 'GUEST' });

        if (!guest) {
            return res.status(404).send('Guest not found');
        }

        guest.rsvp = rsvp;
        await guest.save();
        console.log(rsvp);
        res.send('RSVP submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

export const giftRegister = async (req, res) => {
    try {
        const { name, link, eventId } = req.body;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newGift = {
            name,
            link,
            status: 'UNBOUGHT'
        };

        event.gifts.push(newGift);
        await event.save();

        res.status(201).json({ message: 'Gift added successfully', gift: newGift });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export const showGifts = async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ gifts: event.gifts });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};

export const selectGift = async (req, res) => {
    try {
        const guestId = req.user._id;
        const { giftId ,eventId} = req.body;
        const event = await Event.findById(eventId);


        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const gift = event.gifts.id(giftId);
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }

        if (gift.status !== 'UNBOUGHT') {
            return res.status(400).json({ error: 'Gift already selected' });
        }

        gift.status = 'BOUGHT';
        gift.boughtBy = guestId;

        await event.save();

        res.status(200).json({ message: 'Gift selected successfully', gift });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
