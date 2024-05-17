import express from 'express';
import { resgisterHost , signinHost } from '../controller/auth.controller.js';

const router = express.Router();


router.post("/register-host", resgisterHost);
router.post("/signin",signinHost)


export default router;