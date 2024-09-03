// models/book.js
const mongoose = require('mongoose');

// Definir o esquema do livro
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  pages: { type: Number, required: true },
});

// Criar o modelo do livro
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;