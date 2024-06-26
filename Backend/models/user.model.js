import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
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
        enum: ['ACCEPTED', 'DECLINED', 'PENDING'],
        default: 'PENDING'
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    uniqueId: {
        type: String,
        unique: true,
        sparse: true,
    },
    plusOne: String,
    numberOfChildren: Number,
    dietaryRestrictions: String,
    allergies: String,
    companyName: String,
    serviceType: String,
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    startDateTime: Date,
    endDateTime: Date,
    description: {
        type: String,
    },
    coverPhoto: {
        type: String, // URL or file path of the cover photo
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    venue: {
        address: { type: String },
        mapLink: { type: String }
    },
    guestList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    gifts: [{
        name: String,
        link: String,
        status: {
            type: String,
            enum: ['UNBOUGHT', 'BOUGHT', 'DELIVERED'],
            default: 'UNBOUGHT'
        },
        boughtBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    budget: {
        total: Number,
        expenses: [{
            transactionTo: String,
            status: {
                type: String,
                enum: ['PENDING', 'PAID', 'DECLINED', 'APPROVED'], // Added 'APPROVED' here
                default: 'PENDING'
            },
            date: String,
            amount: Number
        }]
    },
}, { timestamps: true });


export const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);

export default User;