const mongoose = require('mongoose')

const schemaUsr = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            requied: true,
            auto: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            trim: true, 
            maxLength: 32 
        },
        password: {
            type: String,
            required: true,
            maxLength: 90,
            trim: true
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

module.exports = mongoose.model('user',schemaUsr)

