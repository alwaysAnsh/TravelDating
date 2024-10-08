import express from 'express'
import { createTrip } from '../controller/createTrip.js';
import { auth } from '../middleware/auth.js';
import { getTripDetails } from '../controller/getTrips.js';
import { test } from '../controller/test.js';
import { getAllTrips } from '../controller/getAllTrips.js';
import { joinTrip } from '../controller/joinTrip.controller.js';
import { getJoinRequests } from '../controller/joinRequests.controller.js';
import { deleteTrip } from '../controller/Trips/delete.controller.js';
const router = express.Router();

router.post('/create-trip', auth, createTrip)
router.post('/test', auth, test)
router.get('/get-trip/:id', getTripDetails)
router.get('/getAllTrips', getAllTrips)
router.delete('/delete-trip', auth, deleteTrip)

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ROUTE FOR JOINING A TRIP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************

router.post('/join-trip/:userId', auth, joinTrip)
router.get('/:userId/join-requests', getJoinRequests)

export default router