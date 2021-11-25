const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    replyTo: {
        type: String,
    },
    file: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now
    },
    isSeen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;