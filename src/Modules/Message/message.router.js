import {Router} from 'express';
import * as MessageController from './Controller/message.controller.js';
import { auth } from '../../Middleware/auth.middleware.js';

const router = Router();
router.get('/',auth , MessageController.getMessage);
router.post('/:receiverId', MessageController.sendMessage);
router.delete('/:messageId',auth, MessageController.deleteMessage);

export default router;