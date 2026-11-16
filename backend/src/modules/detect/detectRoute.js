const express = require('express');

const router = express.Router();


const upload = require('../../middlewares/upload')

const detectController = require('./detectController')

router.post('/', upload , detectController.detect)


module.exports = router;