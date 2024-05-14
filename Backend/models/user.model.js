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
        enum: ['HOST', 'VENDOR', 'GUEST']
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
    },
    { timestamps: true }
)

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
        ref: 'Guest'
    }],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }]
},
{ timestamps: true }
);

const guestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: String,
    phone: String,
    rsvp: {
      type: String,
      enum: ['ACCEPTED', 'DECLINED', 'PENDING']
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
},
{ timestamps: true }
);

const vendorSchema = new mongoose.Schema({
    vendorName:{
        type: String,
        required: true,
    },
    serviceType: String,
    contactInfo: String,
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
} ,{ timestamps: true }
);
const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const Guest = mongoose.model('Guest', guestSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);

export { User, Event, Guest, Vendor };