import express from 'express';
import { getAllTeams } from '../controllers/teamController.js';

const router = express.Router();

router.get('/', getAllTeams);

export default router;
