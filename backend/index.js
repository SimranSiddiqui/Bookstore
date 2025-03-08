import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { mongoURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    //res.set('Cache-Control', 'no-store');
    res.status(205).send('this is my server');
})

// route to save a new book
app.post('/books', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.reviews)
        {
            return res.status(400).send({
                message: 'send all the required fields',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            reviews: req.body.reviews,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({mesage: error.message});
    }
});

// route to get all book
app.get('/books', async (req, res) => {
    try {
        const bookList = await Book.find();
        console.log(bookList);

        return res.status(201).json({
            count : bookList.length,
            data : bookList,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

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
