import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { createError } from '../utils/error.js';

// create hotel
export const createHotel = async (req, res, next) => {
    const newHotel = Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error)
    }
};

// update hotel
export const updateHotel = async (req, res, next) => {
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
};

// delete hotel
export const deleteHotel = async (req, res, next) => {
    
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json('Hotel has been deleted.');
    } catch (error) {
        next(error)
    }
};

// get hotel
export const getHotel = async (req, res, next) => {
    
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
};

// get hotels 
export const getHotels = async (req, res, next) => {

    const {minPrice, maxPrice, ...others} = req.query
    
    try {
        /** before query */
        // const hotels = await Hotel.find();

        /** after query - limit  */
        // const hotels = await Hotel.find(req.query).limit(req.query.limit);

        /** after query - advanced */
        const hotels = await Hotel
        .find({
            ...others,
            // cheapestPrice: { $gt: minPrice, $lt: maxPrice },

            /** incase theres no min and max price defined in the query */
            cheapestPrice: { $gt: minPrice | 1, $lt: maxPrice || 999 },
        })
        .limit(req.query.limit);
        
        res.status(200).json(hotels);
    } catch (error) {
        next(createError);
    }
};

// count hotels by city
export const countByCity = async (req, res, next) => {
    
    const cities = req.query.cities.split(",")

    try {
        /** longer process as it sifts through the entire volume */
        // const list = await Promise.all(cities.map(city=> {
        //     return Hotel.find({city:city}).length
        // }))

        /** instead use mongodb count */
        const list = await Promise.all(cities.map(city=> {
            return Hotel.countDocuments({city:city})
        }));
        res.status(201).json(list)
    } catch (error) {
        next(createError);
    }
};

// count hotels by type
export const countByType = async (req, res, next) => {
    
    try {
        
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
        const resortCount = await Hotel.countDocuments({ type: "Resort" })
        const villaCount = await Hotel.countDocuments({ type: "Villa" })

        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
        ]);
    } catch (error) {
        next(createError);
    }
};

export const getHotelRooms= async (req, res, next) => {
    try {
        
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
        }))

        res.status(200).json(list);

    } catch (err) {
        next(err);
    }
}