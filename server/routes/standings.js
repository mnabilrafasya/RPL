import { Router } from 'express';
import { getStandings, createStanding, updateStanding, deleteStanding } from '../controllers/standingController.js';

const router = Router();

router.get('/', getStandings);
router.post('/', createStanding);  // Endpoint untuk menambahkan statistik baru
router.put("/:id", updateStanding);
router.delete("/:id", deleteStanding);


export default router;
