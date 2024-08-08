const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    date: { 
        type: Date,
        default: Date.now 
    },
    address: { 
        type: String, 
        required: true
     },
    locationLink: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

module.exports = mongoose.model('Event', EventSchema);
