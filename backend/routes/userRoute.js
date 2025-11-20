const express = require('express');
const { RegisterUser, LoginUser, AdminLogin } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/register').post(RegisterUser);
userRouter.route('/login').post(LoginUser);
userRouter.route('/admin').post(AdminLogin);

module.exports = userRouter;