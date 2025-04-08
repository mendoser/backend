const mongoose = require('mongoose');

const clinicalDataSchema = new mongoose.Schema({
type: { type: String },
  reading: { type: String},
  date: { type: String }});

  const criticalDataSchema = new mongoose.Schema({
    bloodPressure: String,
    heartRate: Number,
    oxygenLevel: Number,
    timestamp: { type: Date, default: Date.now }
  });

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  condition: { type: String },
  isCritical: { type: Boolean, default: false },
  address: { type: String },
  phone: { type: String },
    criticalData: [criticalDataSchema],
    clinicalData: [clinicalDataSchema],
});


module.exports = mongoose.model('Patient', patientSchema);
