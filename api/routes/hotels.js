import express from 'express';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

const router = express.Router();

// create
router.post('/', async (req, res) => {

    const newHotel = Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update
router.put('/:id', async (req, res) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete
router.delete('/:id', async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json('Hotel has been deleted.');
    } catch (error) {
        res.status(500).json(error);
    }
})

// get
router.get('/:id', async (req, res) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all
router.get('/', async (req, res, next) => {
    
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
})

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