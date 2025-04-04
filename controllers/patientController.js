const Patient = require('../models/Patient');

// Add new patient
exports.addPatient = async (req, res) => {
    const { name, age, condition, isCritical } = req.body;
    try {
        const newPatient = new Patient({ name, age, condition, isCritical });
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
