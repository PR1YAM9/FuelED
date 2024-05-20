import express from 'express';
import { registerVendor, resgisterHost , signin } from '../controller/auth.controller.js';

const router = express.Router();


router.post("/register-host", resgisterHost);

router.post("/signin",signin)

router.post('/register-vendor',registerVendor);

export default router;