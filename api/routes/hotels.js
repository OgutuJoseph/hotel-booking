import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType } from '../controllers/hotel.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create route
router.post('/', verifyAdmin, createHotel);

// update route
router.put('/:id', verifyAdmin, updateHotel);

// delete route
router.delete('/:id', verifyAdmin, deleteHotel);

// get route
router.get('/find/:id', getHotel)

// get all route
router.get('/', getHotels)

// count by cisty
router.get('/countByCity', countByCity);

// count by type
router.get('countByType', countByType);

// get all - test express error handler 1
// router.get('/', async (req, res, next) => {
    
//     try {
//         const hotels = await Hotel.findById('asasasasdds');
//         res.status(200).json(hotels);
//     } catch (error) {
//         next(error)
//     }
// })

// get all - test express error handler 2
// router.get('/', async (req, res, next) => {

//     const failed = true;
//     const err = new Error();
//     err.status = 404;
//     err.message = 'Sorry, not found.';
//     if (failed) return next(err);
    
//     try {
//         const hotels = await Hotel.findById('asasasasdds');
//         res.status(200).json(hotels);
//     } catch (errpr) {
//         next(error)
//     }
// })

// get all - test express error handler 3
// router.get('/', async (req, res, next) => {

//     const failed = true;

//     // if (failed) return next(createError(401, 'You are not authenticated!'));
//     if (failed) return next(createError());
    
//     try {
//         const hotels = await Hotel.findById('asasasasdds');
//         res.status(200).json(hotels);
//     } catch (errpr) {
//         next(error)
//     }
// })


export default router;