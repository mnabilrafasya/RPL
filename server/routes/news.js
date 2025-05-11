import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { getAllNews, addNews, deleteNews } from '../controllers/newsController.js';

const router = Router();

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.get('/', getAllNews);
router.post('/', upload.single('image'), addNews);
router.delete('/:id', deleteNews);

export default router;
