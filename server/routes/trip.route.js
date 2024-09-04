import express from 'express'
import { createTrip } from '../controller/createTrip.js';
import { auth } from '../middleware/auth.js';
import { getTripDetails } from '../controller/getTrips.js';
import { test } from '../controller/test.js';
const router = express.Router();

router.post('/create-trip', auth, createTrip)
router.post('/test', auth, test)
router.get('/get-trip/:id', getTripDetails)

export default router