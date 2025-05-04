import { Router } from 'express';
import { getStandings } from '../controllers/standingController.js';

const router = Router();

router.get('/', getStandings);

export default router;
