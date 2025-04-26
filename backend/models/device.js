const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'Google Sheets' },
    scriptUrl: { type: String, required: true },
    metrics: { type: [String], default: ['temperature', 'humidity'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);