import express from 'express';
const app = express();

app.listen(8300, () => {
    console.log('Connected to the server.')
})