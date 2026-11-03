const detectWaste = require('../services/aiScanner');
const { unlink } = require('fs/promises');

exports.detect = async (req, res) => {
    try {
        const result = await detectWaste(req.file);

        res.json(result);

    } catch (error) {
        console.error(error);

        res.status(502).json({
            success: false,
            message: 'Gagal menganalisis gambar'
        });

    } finally {
        if (req.file) {
            await unlink(req.file.path).catch(() => {});
        }
    }
};