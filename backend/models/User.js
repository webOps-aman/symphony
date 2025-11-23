const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    }
}, { 
    minimize: false,
    timestamps: true
});

//hash password
userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
    } catch (error) {
        next(error)
    }
});


//jwt token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            userEmail: this.email,
        }, process.env.JWT_SECRET, {expiresIn: "30d"})
    } catch (error) {
        console.error(error);
    }
}

//compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;
