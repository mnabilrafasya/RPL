import { Router } from 'express';
import { getAllNews } from '../controllers/newsController.js';

const router = Router();

router.get('/', getAllNews);

export default router;
