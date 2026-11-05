const express = require('express');
const router = express.Router();

const scanLimiter = require('../middlewares/rateLimiter');
// middlewares
const upload = require('../middlewares/upload');

// controller
const detectController = require('../controllers/detectController');

router.get('/health',scanLimiter, (req, res) => {
    res.json({
        success: 'true',
        message: 'Hello world'
    });
});

router.post('/detect',scanLimiter,  upload, detectController.detect);


module.exports = router;