const chatAi = require("./chatServices");
const {chatSmall} = require('../chatSmall')

exports.chat = async (req, res) => {
    try {
        if (!req.body.question) {
            return res.status(400).json({
                success :false,
                massage: "Pertanyaan wajib diisi" 
            });
        }

        if (!req.session.history) {
            req.session.history = [];
        }
        await chatSmall(req);
        const answer = await chatAi(req, res, req.body.question)

        req.session.history.push({
            role: 'user',
            content: req.body.question
        },);

        req.session.history.push({
            role: 'assistant',
            content: answer.data
        },);
        

        res.status(200).json({
            success: true,
            message: "berhasil mengechat",
            data: answer.data
        })
    } catch (error) {
        res.status(502).json({
            success: false,
            message: 'Gagal menjawab pertanyaan'
        });
    }

}