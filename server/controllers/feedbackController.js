const Feedback = require('../models/Feedback')

async function getAll(req, res) {
    const { placeid } = req.params

    if (!placeid) return res.sendStatus(404)

    const Feedbacks = await Feedback.find({place: placeid}).populate('user', '-_id -__v -refreshToken -password')
    return res.status(200).json(Feedbacks)
}

async function create(req, res) {

    const { place, user, message, rating } = req.body

    if (!place || !user || !message || !rating) return res.status(422).json({ message: 'Invalid or blank fields' })

    try {
        const feedback = await Feedback.create({ place, user, message, rating })

        return res.status(200).json({feedback})
    } catch (err) {
        console.log("FeedbackCreate Error:", err)
        return res.status(400).json({ message: 'Could not create the Feedback' })
    }
}


module.exports = { getAll, create }