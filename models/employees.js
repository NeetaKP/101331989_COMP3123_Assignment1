const mongoose = require('mongoose')

const schemaEmp = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            requied: true,
            auto: true
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            trim: true, 
            maxLength: 90 
        },
        position: {
            type: String,
            required: true,
            trim: true, 
            maxLength: 32 
        },
        salary: {
            type: Number,
            required: true,
            trim: true, 
            maxLength: 24 
        },
        date_of_joining: {
            type: Date,
        },
        department: {
            type: String,
            trim: true, 
            maxLength: 32 
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model('employee',schemaEmp)

