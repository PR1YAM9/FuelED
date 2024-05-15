import express from 'express';
import { resgisterHost } from '../controller/auth.controller.js';

const router = express.Router();


router.post("/register-host", resgisterHost);


export default router;