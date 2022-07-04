import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();

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

app.get('/', (req, res) => {
    res.send('Hello first request!');
})

app.listen(8300, () => {
    connect();
    console.log('Connected to the server.')
})