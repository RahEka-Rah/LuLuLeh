const prisma = require('../../../config/prisma')
const bcrypt = require('bcryptjs');

const loginAccount = async (req, res) => {
    const { password, email } = req.body;

    const userData = await prisma.users.findFirst({
        where: {
            email: email.toLowerCase(),
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            password: true 
        }

    });

    if (!userData)
        return res.json({
            success: false,
            massage: "akun anda belum terdaftar"
        })


    const passwordIsValid =await bcrypt.compare(password, userData.password);

    if (!passwordIsValid) {
        return res.json({
            success: false,
            massage: "username atau password anda salah"
        })
    }

    return res.json({
        succes : true,
        massage : "login berhasil",
        data : {
            userId : userData.user_id,
            username :userData.username,
            email : userData.email
        }
    })
}


module.exports = loginAccount;