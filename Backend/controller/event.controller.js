import User, { Event } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import crypto from 'crypto';


export const getGuestList = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId).populate('guestList');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ guests: event.guestList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getHostsEvent = async (req, res, next) => {
    try {
        const user = req.body.user;
        const events = await Event.find({ host: user._id });

        res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getEventDetails = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            console.log(`Event not found for ID: ${eventId}`);
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ event });
    } catch (error) {
        console.error(`Error fetching event details: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const createEvent = async (req, res, next) => {
    try {
        const host= req.body.user;
        const { eventName, startDateTime, endDateTime, venue, description } = req.body;

        if (!eventName || !startDateTime || !endDateTime || !venue) {
            return res.status(400).json({ error: 'Incomplete event data' });
        }

        const newEvent = new Event({
            eventName,
            startDateTime,
            endDateTime,
            venue,
            description,
            host: host
        });

        await newEvent.save();

        await User.findByIdAndUpdate(host, { $push: { events: newEvent._id } });

        res.status(200).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addGuests = async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const { guests } = req.body;
  
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
  
        if (!email) {
          return res.status(400).json({ error: 'Email is required for all guests' });
        }
  
        const uniqueId = crypto.randomBytes(16).toString('hex');
        const password = name.split(' ').join('').toLowerCase() + '123';
        const hashedPassword = await bcryptjs.hash(password, 10);
  
        const newGuest = new User({
          name,
          email,
          password: hashedPassword,
          phone,
          role: 'GUEST',
          uniqueId,
          rsvp: 'PENDING',
          events: [eventId]
        });
  
        await newGuest.save();
  
        event.guestList.push(newGuest._id);
        addedGuests.push(newGuest);
  
        const uniqueLink = `https://party-pals.vercel.app/rsvp/${uniqueId}`;
  
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_HOST,
            pass: process.env.SMTP_PASSWORD// Generate this in your Google account security settings
          }
        });
  
        const mailOptions = {
          from: '"Event Manager" <priyam9maini@gmail.com>',
          to: email,
          subject: 'RSVP for Event',
          text: `Hello ${name},\n\nPlease RSVP for the event by clicking the link below:\n${uniqueLink}\n\nThank you!`,
        };
  
        await transporter.sendMail(mailOptions);
      }
  
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


export const rsvpPost = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const { 
            willAttend,
            plusOne = 'no', // Default to 'no' if not provided
            numberOfChildren = 0, // Default to 0 if not provided
            dietaryRestrictions = ''
        } = req.body;

        // Validate required fields
        if (!willAttend) {
            return res.status(400).send('WillAttend field is required');
        }

        // Find the guest by uniqueId and role
        const guest = await User.findOne({ uniqueId, role: 'GUEST' });

        if (!guest) {
            return res.status(404).send('Guest not found');
        }

        // Update the guest object with RSVP details
        guest.rsvp = willAttend === 'yes' ? 'ACCEPTED' : 'DECLINED';
        guest.plusOne = plusOne;
        guest.numberOfChildren = numberOfChildren;
        guest.dietaryRestrictions = dietaryRestrictions;

        // Generate guestPass (only if the guest will attend)
        if (willAttend === 'yes') {
            const guestPass = guest.name.toLowerCase().split(' ').join('') + '123';
            // Note: Ideally, passwords should be hashed before saving.
        }

        // Save the updated guest object
        await guest.save();

        // Send email only if the guest is attending
        if (willAttend === 'yes') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_HOST,
                    pass: process.env.SMTP_PASSWORD // Generate this in your Google account security settings
                }
            });

            const mailOptions = {
                from: '"Event Manager" <priyam9maini@gmail.com>',
                to: guest.email,
                subject: 'Your Event Credentials',
                text: `Hello ${guest.name},\n\nYour RSVP has been accepted. Here are your credentials:\nUsername: ${guest.email}\nPassword: ${guestPass}, use them to login at \n  https://party-pals.vercel.app \n\nThank you!`
            };

            await transporter.sendMail(mailOptions);
        }

        res.send('RSVP submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


export const giftRegister = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { name, link } = req.body;
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
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId).populate({
            path: 'gifts',
            populate: {
                path: 'boughtBy',
                select: 'name' // Only select the 'name' field of the boughtBy user
            }
        });

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
        const guestId = req.body.user;
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

export const getVendorList = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId).populate('vendors');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ vendors: event.vendors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addVendors = async (req, res, next) => {
    try {
        console.log(req.body); // Log the entire request body
        const eventId = req.params.eventId;
        const vendors = req.body.vendors; // Check the structure of req.body

        // Check if vendors is an array
        if (!Array.isArray(vendors)) {
            return res.status(400).json({ error: 'Vendors should be an array' });
        }

        console.log(vendors); // Log the value of req.body.vendors

        if (!eventId) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const addedVendors = [];

        for (const vendor of vendors) {
            const { name, email, phone, vendorName, serviceType, companyName } = vendor;

            // Generate a unique identifier for the vendor
            const uniqueId = crypto.randomBytes(16).toString('hex');
            // Generate vendor password from their name
            const password = name.split(' ').join('').toLowerCase() + '123';
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Create a new vendor and store in the database
            const newVendor = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                role: 'VENDOR',
                uniqueId,
                vendorName,
                serviceType,
                companyName,
                events: [eventId]
            });

            await newVendor.save();

            // Add vendor to event's vendor list
            event.vendors.push(newVendor._id);
            addedVendors.push(newVendor);

            // Send an email to the vendor with the unique RSVP link
            const uniqueLink = `http://localhost:5173/rsvp/${uniqueId}`;

            // Configure the email transport using nodemailer with Gmail SMTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_HOST,
                    pass: process.env.SMTP_PASSWORD // Generate this in your Google account security settings
                }
            });

            // Define the email options
            const mailOptions = {
                from: '"Event Manager" <your-email@gmail.com>',
                to: email,
                subject: 'RSVP for Event',
                text: `Hello ${name},\n\nWelcome Onboard !! \n\nKindly access our website https://party-pals.vercel.app using username: ${email} password: ${password}`,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
        }

        // Save the updated event
        await event.save();

        res.status(201).json({ message: 'Vendors added and emails sent successfully', vendors: addedVendors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}


export const rsvpGetVendor = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const vendor = await User.findOne({ uniqueId, role: 'VENDOR' });

        if (!vendor) {
            return res.status(404).send('Vendor not found');
        }

        // Render the RSVP form (you can use a template engine or send a simple HTML form)
        res.send(`
            <form action="/api/event/rsvpvendor/${uniqueId}" method="POST">
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

export const rsvpPostVendor = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const { name, email, phone, vendorName, serviceType, companyName } = req.body;

        const vendor = await User.findOne({ uniqueId, role: 'VENDOR' });

        if (!vendor) {
            return res.status(404).send('Vendor not found');
        }

        // Update vendor details with RSVP
        vendor.name = name;
        vendor.email = email;
        vendor.phone = phone;
        vendor.vendorName = vendorName;
        vendor.serviceType = serviceType;
        vendor.companyName = companyName;

        await vendor.save();

        res.send('RSVP submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


export const addBudget = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { totalBudget } = req.body;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.budget.total = totalBudget;

        await event.save();

        res.status(200).json({ message: 'Budget added successfully', event });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getBudget = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ budget: event.budget });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addExpense = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { transactionTo, status, date, amount } = req.body;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newExpense = {
            transactionTo,
            status: status || 'PENDING',  // Default to 'PENDING' if status is not provided
            date ,
            amount
        };

        event.budget.expenses.push(newExpense);

        await event.save();

        res.status(200).json({ message: 'Expense added successfully', event });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getExpenses = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ expenses: event.budget.expenses });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}