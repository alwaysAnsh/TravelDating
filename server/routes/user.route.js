import express from 'express'
import { login, saveFcmToken, signup, test } from '../controller/auth.controller.js';
const router = express.Router();


router.post('/login', login);
router.post('/signup', signup );
router.get('/test',test)

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ROUTE FOR SAVING FCM TOKEN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************

router.post('/saveFcmToken/:userId', saveFcmToken)

export default router;