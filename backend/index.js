require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/employee");
const DeviceModel = require("./models/device"); // Add this line

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Authentication Routes (existing)
app.post('/users', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                // Return user data without password
                const { password, ...userData } = user.toObject();
                res.json({status: "Success", user: userData});
            } else {
                res.json("Password Is Incorrect");
            }
        } else {
            res.json("No Record Existed");
        }
    })
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findById(id)
    .then(user => {
        if(user) {
            const { password, ...userData } = user.toObject();
            res.json(userData);
        } else {
            res.status(404).json("User not found");
        }
    })
    .catch(err => res.status(500).json(err));
})

// Device Routes (new)
app.get('/devices/:userId', async (req, res) => {
    try {
        const devices = await DeviceModel.find({ userId: req.params.userId });
        res.json(devices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/devices', async (req, res) => {
    try {
        const device = new DeviceModel(req.body);
        const savedDevice = await device.save();
        res.status(201).json(savedDevice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/devices/:id', async (req, res) => {
    try {
        const updatedDevice = await DeviceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDevice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/devices/:id', async (req, res) => {
    try {
        await DeviceModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Device deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});