const createAccount  = require("./registerServices");

exports.register = async (req, res) => {
    return createAccount(req,res);


}