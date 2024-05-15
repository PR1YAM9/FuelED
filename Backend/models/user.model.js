import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['HOST', 'VENDOR', 'GUEST'],
        required: true
    },
    phone: String,
    vendorName: String,
    serviceType: String,
    contactInfo: String,
    rsvp: {
        type: String,
        enum: ['ACCEPTED', 'DECLINED', 'PENDING']
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    startDateTime: Date,
    endDateTime: Date,
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    },
    guestList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

const User = mongoose.model('User', userSchema);

export default  User