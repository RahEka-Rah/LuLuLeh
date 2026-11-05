const multer = require('multer');
const path = require('path');

const upload = multer({
    dest: path.resolve(__dirname, '../uploads/'),
    limits: {
        fileSize: 3 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

const handleUpload = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    success: false,
                    message: 'Ukuran foto maksimal 3 MB'
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Terjadi kesalahan saat upload foto'
            });
        }

        if (err) return next(err);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Foto belum dikirim atau format tidak didukung'
            });
        }

        next();
    });
};

module.exports = handleUpload;