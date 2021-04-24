import express from 'express';

const router = express.Router();

import auth from './auth';
router.use('/auth', auth);

import room from './room';
router.use('/room', room);

export default router;