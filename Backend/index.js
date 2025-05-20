import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/user.auth.js';
import eventRouter from './routes/events.router.js';
import conversationRouter from './routes/converation.route.js';
import messagesRouter from './routes/messages.router.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import announcementRoute from "./routes/annoucements.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ⬇️ NEW: Import image generation routes
import imageRoutes from './routes/image.router.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://party-pals.vercel.app'
    // origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to db");
});

// OLD ROUTES (unchanged)
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messagesRouter);
app.use("/api/announcements", announcementRoute);

// ⬇️ NEW: Serve temp images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/image', express.static(path.join(__dirname, 'temp')));

// ⬇️ NEW: Image generation route
app.use('/api', imageRoutes);

app.listen(3000, () => {
    console.log('App is running at 3000');
});
