const mongoose = require('mongoose');
const Book = require('../models/book');

mongoose.connect(
  'mongodb+srv://ut-node:1234@ut-node.ny8ugbl.mongodb.net/?retryWrites=true&w=majority&appName=UT-NODE',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const seedBooks = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Novel' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Novel' },
  { title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' }
];

const seedDB = async () => {
  await Book.deleteMany({});
  await Book.insertMany(seedBooks);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch(err => console.log(err));
