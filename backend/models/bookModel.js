import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    reviews: {
        type: String,
        require: true
    },
    publishYear: {
        type: Number,
        required: false
    }
},
{
    timestamps: true,
}
)

export const Book = mongoose.model('Book', bookSchema);