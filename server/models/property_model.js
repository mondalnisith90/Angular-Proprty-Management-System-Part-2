const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    propertySize: {
        type: Number,
        required: true
    }
});

const PropertyModel = mongoose.model("property", propertySchema);

module.exports = PropertyModel;