import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

const connect = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/hotel-booking')
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to mongodb.')
    } catch (error) {
        // handleError(error)
        throw error
    }
}

mongoose.connection.on('connected', () => {
    console.log('Database connected.');
})
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected.');
})

// middlewares
app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    // return res.status(500).json('An error occured! From Handler.');
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong! From Handler.'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});



app.listen(8300, () => {
    connect();
    console.log('Connected to the server.')
})