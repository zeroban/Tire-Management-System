const express = require('express')
const router = express.Router()

const { getAllTires, getTire, createTire, updateTire, deleteTire } = require('../controllers/tires')

router.route('/').post(createTire).get(getAllTires)
router.route('/:id').get(getTire).delete(deleteTire).patch(updateTire)

module.exports = router