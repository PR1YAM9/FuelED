import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const resgisterHost = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if all required fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
  
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "HOST",
      });
      await newUser.save();
      res.status(201).json({ message: "Host registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const signin = async (req,res,next)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            console.log('Invalid password');
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


export const registerVendor = async (req,res,next)=>{
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
            role: 'VENDOR' 
        });
        await newUser.save();
        res.status(201).json({ message: 'Vendor registered successfully', user: newUser });
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }
    catch (error) {
        errorHandler(error, res);
    }
}
