import express from 'express';
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


// update route
router.put('/:id', updateUser);

// delete route
router.delete('/:id', deleteUser);

// get route
router.get('/:id', getUser)

// get all route
router.get('/', getUsers)

export default router;