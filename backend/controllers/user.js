const User = require("../models/users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createUser = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash
        });
        const result = await user.save();
        res.status(201).json({
            message: 'User Created',
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: "User already exists"
        })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({message: "Auth Failed"})
        } else {
            const comparePassword = await bcrypt.compare(req.body.password, user.password)
            if(comparePassword){
                const token = jwt.sign({email: user.email, userId: user._id}, "dipronil", {expiresIn: '1h'});
                res.status(200).json({token: token, userId: user._id, expiresIn: 3600})
            } else {
                return res.status(401).json({message: "Auth Failed"})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Invalid credentials"})
    }
}