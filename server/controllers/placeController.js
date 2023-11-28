const Place = require('../models/Place')

async function getAll(req, res) {

    const places = await Place.find()

    return res.status(200).json(places)
}

async function getById(req, res) {

    const { id } = req.params

    if (!id) return res.sendStatus(404)

    try {
        const place = await Place.findById(id)

        if (!place) return res.sendStatus(404)

        return res.status(200).json(place)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Could not retrieve the place' })
    }
}

async function create(req, res) {

    const { name, address, lat, lng } = req.body

    if (!name || !address || !lat || !lng) return res.status(422).json({ message: 'Invalid or blank fields' })

    try {
        const place = await Place.create({ name, address, lat, lng })

        return res.status(200).json(place)
    } catch (err) {
        console.log("PlaceCreate Error:", err)
        return res.status(400).json({ message: 'Could not create the place' })
    }
}

async function updateById(req, res) {
    const { name, address, lat, lng } = req.body
    const { id } = req.params

    if (!id) return res.sendStatus(404)
    if (!name || !address || !lat || !lng) return res.status(422).json({ message: 'Invalid or blank fields' })

    try {
        const update = await Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

        if (!update) return res.status(404).json({ message: `Unable to update ${id} place, maybe it was not found.` })

        return res.sendStatus(200)
    } catch (err) {
        console.log("PlaceUpdate Error:", err)
        return res.status(400).json({ message: 'Could not update the place' })
    }
}

async function deleteById(req, res) {
    const { id } = req.params

    if (!id) return res.sendStatus(404)

    try {
        const deletePlace = await Place.findByIdAndDelete(id)

        if (!deletePlace) return res.status(404).json({ message: `Unable to remove ${id} place, maybe it was not found.` })

        return res.sendStatus(200)

    } catch (err) {
        console.log("PlaceRemove Error:", err)
        return res.status(400).json({ message: 'Could not remove the place' })
    }
}

module.exports = { getAll, getById, create, updateById, deleteById }