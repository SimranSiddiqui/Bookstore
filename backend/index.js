import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { mongoURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res)=>{
    //res.set('Cache-Control', 'no-store');
    res.status(205).send('this is my server');
});

app.use('/books', booksRoute);

mongoose.connect(mongoURL)
.then(() => {
    console.log('app connnected to database');
    
    app.listen(PORT, ()=>{
        console.log(`The app is running on port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})

//console.log(typeof x.then === 'function');
