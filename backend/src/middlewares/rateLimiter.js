const rateLimit = require('express-rate-limit');

const scanLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: 'Terlalu banyak request. Coba lagi nanti.'
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

module.exports = scanLimiter;