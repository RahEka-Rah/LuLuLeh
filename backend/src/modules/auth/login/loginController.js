const loginAccount = require("./loginServices");

exports.login = async (req, res) => {
    const MinPasswordLength = 8


    const { password, email } = req.body;
    if (!password || !email || !email.trim()) {
        return res.status(400).json({
            success: false,
            message: "kolom wajib diisi"
        });
    }


    if (password.length < MinPasswordLength) {
        return res.status(400).json({
            success: false,
            message: `Password harus memiliki minimal ${MinPasswordLength} karakter.`
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Format email tidak valid."
        });
    }

    return loginAccount(req, res);



}