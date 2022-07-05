import express from 'express';
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send('User authenticated; Logged In.')
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('User authenticated; You can delete your account.')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Admin authenticated; You can delete all accounts.')
// })


// update route
router.put('/:id', verifyUser, updateUser);

// delete route
router.delete('/:id', verifyUser, deleteUser);

// get route
router.get('/:id', verifyUser, getUser)

// get all route
router.get('/', verifyAdmin, getUsers)

export default router;