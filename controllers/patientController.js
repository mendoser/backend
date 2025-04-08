const Patient = require('../models/Patient'); // Assuming you have a Patient model

// Add patient controller
exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, condition, address, phone } = req.body;
    console.log(req.body);
    const newPatient = new Patient({ name, age, gender, condition, address, phone });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get patients controller
exports.getPatients = async (req, res) => {
    const { hasCriticalData } = req.query; // Get the filter from query params
    let query = {};
    if (hasCriticalData) {
      query = { criticalData: { $exists: true, $ne: [] } }; // Filter for patients with critical data
    }

  try {
    const patients = await Patient.find(query);
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.addCriticalData = async (req, res) => {
  try {
    const { id } = req.params;
    const { bloodPressure, heartRate, oxygenLevel } = req.body;

    if (!bloodPressure || !heartRate || !oxygenLevel) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.criticalData.push({ bloodPressure, heartRate, oxygenLevel });
    await patient.save();

    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// add critical data to patient
exports.addClinicalData = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, reading, date } = req.body;

    if (!type || !reading ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.criticalData.push({ type, reading, date });
    await patient.save();

    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Update patient controller
exports.updatePatient = async (req, res) => {

    try {
        const { id } = req.params;
        const {
            type,
            reading,
            date
        }
        = req.body;
        if (!type || !reading ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!id) {
            return res.status(400).json({ error: "Patient ID is required" });
        }
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
    patient.condition = type + "-" + reading
    await patient.save();
        res.status(200).json(patient);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }}
