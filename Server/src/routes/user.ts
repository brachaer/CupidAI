import express from 'express';
import { createUser, findMatch } from '../controllers/user';

const router= express.Router();

router.route('/').post(createUser);    
router.route('/:id').get(findMatch);

export default router;