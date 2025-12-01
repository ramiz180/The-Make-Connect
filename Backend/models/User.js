const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['CUSTOMER', 'WORKER'], required: true },
    location: { type: String },
    serviceRadius: { type: String },
});

module.exports = mongoose.model('User', userSchema);
