const createAccount = require("./registerServices");

exports.register = async (req, res) => {
    const MinPasswordLength = 8
    const MinUsernameLength = 5
    const MaxUsernameLength = 50

    const { username, password, email } = req.body;
    if (!username || !username.trim() || !password || !email || !email.trim()) {
        return res.status(400).json({
            success: false,
            message: "kolom wajib diisi"
        });
    }

    const usernameRegex =new RegExp(`^[a-z0-9]{${MinUsernameLength},${MaxUsernameLength}}$`);
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            success: false,
            message:`Username hanya boleh berisi huruf dan angka (tanpa spasi/simbol), antara ${MinUsernameLength} sampai ${MaxUsernameLength} karakter.`
        })
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


    return createAccount(req, res);


}