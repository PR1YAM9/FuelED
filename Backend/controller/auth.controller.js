import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
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
        next(error)
    }
}

export const signinHost = async (req,res,next)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        let role;
        if (user.role === 'HOST') {
            role = 'host';
        } else if (user.role === 'VENDOR') {
            role = 'vendor';
        } else if (user.role === 'GUEST') {
            role = 'guest';
        } else {
            return res.status(500).json({ error: 'Unknown user role' });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        const {password: pass , ...rest} = user._doc; //remove password from the details
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);

    } catch (error) {
        next(error)
    }
}