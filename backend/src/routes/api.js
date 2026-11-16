const express = require('express');
const router = express.Router();



// middlewares
const scanLimiter = require('../middlewares/rateLimiter');

const session = require('../middlewares/session');

// controller

// new routing
const detect = require('../modules/detect/detectRoute');
const chat = require('../modules/chat/chatRoute');
const auth = require('../modules/auth/authRoute');


// const post = require('../modules/post/postRoute');


router.use(session);


// new routing

router.use('/detect',scanLimiter , detect);
router.use('/chat' ,scanLimiter,chat)
router.use('/auth' ,scanLimiter,auth)


// old routing 
router.get('/health',scanLimiter, (req, res) => {
    res.json({
        success: true,
        message: 'Hello world'
    });
});




module.exports = router;