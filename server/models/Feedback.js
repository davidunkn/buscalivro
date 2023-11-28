const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = Schema(
    {
        place: {
            type: Schema.Types.ObjectId,
            ref: "Place"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)
FeedbackSchema.set('toJSON', { getters: true })
FeedbackSchema.set('toObject', { getters: true })
FeedbackSchema.virtual('friendlyDate').get(function () {
    return this.createdAt.toLocaleDateString('pt-BR')
});

module.exports = mongoose.model('Feedback', FeedbackSchema)