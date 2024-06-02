import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/user.auth.js'
import eventRouter from './routes/events.router.js';
import conversationRouter from './routes/converation.route.js';
import messagesRouter from './routes/messages.router.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import announcementRoute from "./routes/annoucements.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use(cors({
    origin: 'https://party-pals.vercel.app'
}));

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to db");
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use('/api/event',eventRouter);

app.use('/api/conversations',conversationRouter)
app.use('/api/messages',messagesRouter)

app.use("/api/announcements", announcementRoute);

app.listen(3000,()=>{
    console.log('App is running at 3000')
})