import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answer.js';

const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is a Stack Overflow clone API');
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);

const PORT = process.env.PORT || 4000; // Use 3000 as a default if PORT is not provided
const DATABASE_URL = process.env.CONNECTION_URL;

console.log('DATABASE_URL:', DATABASE_URL);
console.log('PORT:', PORT);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });