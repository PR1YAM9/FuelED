import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/user.auth.js'
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to db");
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.listen(3000,()=>{
    console.log('App is running at 3000')
})