const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlaceSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
    },
)

PlaceSchema.set('toJSON', { getters: true })
PlaceSchema.set('toObject', { getters: true })
PlaceSchema.virtual('position').get(function () {
    return { "lat": this.lat, "lng": this.lng }
})

module.exports = mongoose.model('Place', PlaceSchema)