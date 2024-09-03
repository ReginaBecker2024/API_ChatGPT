// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Cadastro de livro
router.post('/livros', async (req, res) => {
  try {
    const { title, author, publisher, year, pages } = req.body;
    const newBook = new Book({ title, author, publisher, year, pages });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listagem de livros
router.get('/livros', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consulta de livro por ID
router.get('/livros/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remoção de livro
router.delete('/livros/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.status(200).json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;