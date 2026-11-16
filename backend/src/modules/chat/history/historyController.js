const { json } = require("express");
const { chatSmall } = require('../chatSmall')

exports.history = async (req, res) => {
    try {
        if (!req.session.history) {
            req.session.history = [];
        }

        await chatSmall(req)
        return res.json({
            success: true,
            data: req.session.history
        })
    }catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    } 
}