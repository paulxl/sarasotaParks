const mongoose = require('mongoose');
const geocoder = require('./geocoder');

const ParkSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 30
    },

    location: {

        formattedAddress: String,
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        type: {
            type: String,
            enum: ['Point']
        }
    },

    comments: {
        type: String
    },

    dogFriendly: {
        type: Boolean
    }
});

//Geocode & create location
ParkSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);

    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save this address
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Park', ParkSchema);