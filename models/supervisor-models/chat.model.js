const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    studentName: { type: String },
    supervisorName: { type: String },
    studentMsg: { type: String },
    supervisorMsg: { type: String },
}, {
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;