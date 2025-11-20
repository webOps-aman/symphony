const User = require("../models/User");

const LoginUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.log()
    }
}

const RegisterUser = async (req, res) => {
    try {
        const { email } = req.body;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                status: "Failed",
                message: "Email Already Exists",
            })
        }

        const userData = await User.create(req.body);

        res.status(200).json({
            status: "Success",
            message: "Register Successfully",
            // data: userData,
            msg: "Registration Successful",
            token: await userData.generateToken(),
            userId: userData._id.toString(),
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}

const AdminLogin = async (req, res) => {
    try {
        
    } catch (error) {
        console.log()
    }
}


module.exports = {
    LoginUser,
    RegisterUser,
    AdminLogin
}
