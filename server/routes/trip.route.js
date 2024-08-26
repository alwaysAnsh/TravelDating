import express from 'express'
import { createTrip } from '../controller/createTrip.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/create-trip', auth, createTrip)

export default router