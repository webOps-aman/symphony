const User = require("../models/User");
const bcrypt = require('bcryptjs');

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

const LoginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({
                status: "Failed",
                message: "Invalid Credentials",
            })
        }

        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({
                status: "Success",
                message: "Login Successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(), 
            })
        }else{
            res.status(401).json({
                status: "Failed",
                message: "Invalid Credentials",
            })
        }

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
    AdminLogin,
}
