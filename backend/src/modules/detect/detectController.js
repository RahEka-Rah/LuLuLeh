const detectWaste = require('./scannerServices');
const { unlink } = require('fs/promises');

exports.detect = async (req, res) => {
    try {
        const result = await detectWaste(req.file);

        if (result.success) {
            if (!req.session.history) {
                req.session.history = [];
            }

            const shortData = `
                nama: ${result.data.identifikasi.nama_benda}
                jenis: ${result.data.identifikasi.jenis_sampah}
                kategori: ${result.data.identifikasi.kategori}
                deskripsi: ${result.data.edukasi.deskripsi}
                tips_olah: ${result.data.edukasi.pemanfaatan.join(', ')}
                buang_ke: ${result.data.pemilahan.tempat_pembuangan}
                saran_buang: ${result.data.pemilahan.saran}
                tujuan: ${result.data.pemilahan.tujuan_pengolahan}
            `.replace(/\n/g, "").replace(/\s+/g, " ").trim();

            req.session.history.push({
                role: 'user',
                content :"sampah jenis apakah ini"
            },);
            req.session.history.push({
                role: 'assistant',
                content: shortData
            });

        }

        res.json(result);

    } catch (error) {


        res.status(502).json({
            success: false,
            message: 'Gagal menganalisis gambar'
        });

    } finally {
        if (req.file) {
            await unlink(req.file.path).catch(() => { });
        }
    }
};