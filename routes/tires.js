const express = require('express');
const router = express.Router();

const { getAllTires, getTire, createTire, updateTire, deleteTire, searchTires } = require('../controllers/tires');



router.route('/').post(createTire).get(getAllTires);
// search route must be above the :id route
router.route('/search').get(searchTires);
router.route('/:id').get(getTire).delete(deleteTire).patch(updateTire);


module.exports = router;
