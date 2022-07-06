import express from 'express';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from '../controllers/room.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create route
router.post('/:hotelid', verifyAdmin, createRoom);

// update route
router.put('/:id', verifyAdmin, updateRoom);

// delete route
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// get route
router.get('/:id', getRoom)

// get all route
router.get('/', getRooms)

export default router;