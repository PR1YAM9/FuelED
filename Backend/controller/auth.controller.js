import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
// import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const resgisterHost = async (req, res,next)=>{
    try {
        const {name,email,password,} = req.body;
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(500).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'HOST' 
        });
        await newUser.save();
        res.status(201).json({ message: 'Host registered successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}