const express = require('express')
const router = express.Router()
const feedbackController = require('../../controllers/feedbackController')
const authMiddleware = require('../../middleware/auth')

router.get('/:placeid/', feedbackController.getAll) // get all

router.post('/:placeid/', authMiddleware, feedbackController.create) // create


module.exports = router