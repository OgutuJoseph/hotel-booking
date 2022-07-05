import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

app.use((req, res, next) => {
    console.log('hi, im a middleware.')
    next();
})

app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);


app.listen(8300, () => {
    connect();
    console.log('Connected to the server.')
})