const prisma = require('../../../config/prisma')
const bcrypt = require('bcryptjs');

const createAccount = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { username: username.toLowerCase() },
                    { email: email.toLowerCase() }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username atau email sudah terdaftar."
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.users.create({
            data: {
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword
            }
        });

        return res.status(201).json({
            success: true,
            message: "Registrasi akun berhasil!",
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server."
        });
    }



}
module.exports = createAccount