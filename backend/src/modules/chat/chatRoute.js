const express = require('express');

const router = express.Router();


const chatController = require('./chat/chatController')
const historyController = require('./history/historyController')



router.post('/' , chatController.chat)
router.get('/history', historyController.history)


module.exports = router;