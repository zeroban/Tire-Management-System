const mongoose = require('mongoose')

const tireSchema = new mongoose.Schema({
    brand: {
        type: String,
        require: [true, 'Please provide the brand of the tire'],
        maxlenght: 50
    },
    size: {
        type: String,
        require: [true, 'please enter in the size of the tire'],
        maxlenght: 15
    },
    location: {
        type: String,
        require: [true, 'Please provide a location of where the tires are located'],
        enum: ['Mebane', 'Greensboro'],
        default: 'Mebane'
    },
    price: {
        type: Number,
        require: [true, 'please enter in the price of each tire'],
        min: 0
    },
    quantity: {
        type: Number,
        require: [true, 'please enter the quantity of tires you have'],
        min: 0
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })



module.exports = mongoose.model('tires', tireSchema)