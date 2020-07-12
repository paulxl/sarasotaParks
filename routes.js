const express = require('express');

const {
    getParks
} = require('./controller');

const router = express.Router();

router.route('/').get(getParks);

module.exports = router;