const express = require('express');
const router = express.Router();
const { addPatient, getPatients, updatePatient,addClinicalData, addCriticalData } = require('../controllers/patientController');
const auth = require('../middleware/auth');


// POST to add patient
router.post('/add', auth,addPatient);

// GET to fetch patients
router.get('/', auth,getPatients);

router.put('/:id', auth,updatePatient);

router.post('/:id/clinicaldata', auth,addClinicalData);


router.post("/:id/critical-data", auth, addCriticalData);



module.exports = router;
