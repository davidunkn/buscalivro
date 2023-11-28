const express = require('express')
const router = express.Router()
const placeController = require('../../controllers/placeController')

router.get('/', placeController.getAll) // get all

router.post('/', placeController.create) // create

router.get('/:id', placeController.getById) // get one

router.put('/:id', placeController.updateById) // update

router.delete('/:id', placeController.deleteById) // delete

module.exports = router