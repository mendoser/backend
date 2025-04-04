const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true },
    isCritical: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
