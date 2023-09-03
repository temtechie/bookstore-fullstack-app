import express from 'express';
import { Book } from "../models/bookModels.js";
const router = express.Router();


router.post('/books', async (req, res) => {
    const {title, author, publishYear} = req.body;
    try {
        if(!title || !author || !publishYear){
            res.status(400).json({message: "Bad request. Could not valid payload!"})
        }
        const newBook = {
            title,
            author,
            publishYear
        }
        const book = await Book.create(newBook);
        if (!book) {
            return res.status(500).json({ message: "Failed to create the book." });
        }
        return res.status(200).json({message: "Book created successfully"});
    } catch (error) {
        res.status(500).json({message: "Unable to reach server!"})
        console.log("server failed with error:",error);
    }  
})

router.get('/books', async (req, res) =>{
    try {
        const books = await Book.find().sort({ title: 1 });
        return res.status(200).json(books);
    } catch (error) {
        console.log("Failed to fetch data. Error: ", error.message);
        return res.status(500).json({message: error.message})
    }
})

router.get('/books/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({message: "Bad Request!."})
        }
        const book = await Book.findById(id);
        return res.status(200).json({ book});
    } catch (error) {
        console.log("Failed to fetch data. Error: ", error.message);
        return res.status(500).json({message: error.message})
    }
});


router.put('/books/:id', async (req, res) => {
    const {title, author, publishYear} = req.body;
    const {id} = req.params;
    try {
        if(!title || !author || !publishYear){
            res.status(400).json({message: "Bad request. Could not valid payload!"})
        }
        if(!id){
            res.status(404).json({message: "Book not found!"})
        }
        const updateBook = {
            title,
            author,
            publishYear
        }
        const updatedBook = await Book.findByIdAndUpdate(id, updateBook);
        if (!updatedBook) {
            return res.status(500).json({ message: "Failed to update book." });
        }
        return res.status(200).json({message: "Book updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("server failed with error:",error.message);
    }  
});

router.delete('/books/:id', async (req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            res.status(404).json({message: "Book not found!"})
        }

        const deletedBook = await Book.findByIdAndRemove(id);
        if (!deletedBook) {
            return res.status(500).json({ message: "Failed to delete book." });
        }
        return res.status(200).json({message: `Book with ${id} id successfully deleted!`});
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("server failed with error:",error.message);
    }  
})

export default router