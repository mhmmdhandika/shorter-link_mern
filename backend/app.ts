import { Express } from 'express';
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

// connect to db
const dbURI = `mongodb://localhost:27017/shorter-link`;

mongoose.set('strictQuery', false);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });

// routes
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
