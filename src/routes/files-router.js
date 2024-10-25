import { raw, Router } from 'express';
import { filesControllers } from '../controllers/files-controllers.js';
import { upload } from '../lib/config-multer.js';

const fileRouter = Router();

fileRouter.post('/file-read', upload.single('file'), filesControllers.readFile);

export default fileRouter;