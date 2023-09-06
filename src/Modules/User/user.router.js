import {Router} from 'express';
import * as UserController from './Controller/user.controller.js';
import { auth } from '../../Middleware/auth.middleware.js';
import { asyncHandler } from '../../Services/errorHandling.js';
import fileUpload, { HME } from '../../Services/multer.js';

const router = Router();
router.get('/profile',auth , asyncHandler(UserController.profile));
router.patch('/profilePic', auth, fileUpload().single('image'), HME, UserController.profilePic);

export default router;