const express = require('express');
const router = express.Router();

// middlewares
const upload = require('../middlewares/upload');

// controller
const detectController = require('../controllers/detectController');

router.get('/health', (req, res) => {
    res.json({
        success: 'true',
        message: 'Hello world'
    });
});

router.post('/detect', upload, detectController.detect);


module.exports = router;