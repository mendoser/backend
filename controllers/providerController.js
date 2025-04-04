const Provider = require('../models/Provider');

exports.addProvider = async (req, res) => {
    const { name, specialty, contact } = req.body;
    try {
        const newProvider = new Provider({ name, specialty, contact });
        await newProvider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json(providers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
