import express from 'express'
import { login, signup, test } from '../controller/auth.controller.js';
const router = express.Router();


router.post('/login', login);
router.post('/signup', signup );
router.get('/test',test)

export default router;