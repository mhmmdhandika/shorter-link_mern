import { Express } from 'express';
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
import shortLinkRoutes from './routes/shortLinkRoutes';

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

// connect to db
const dbURI = `mongodb://0.0.0.0:27017/shorter-link`;

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

// user routes
app.use('/api/user', userRoutes);

// short link routes
app.use('/api/short-link', shortLinkRoutes);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

// app.get('/api/short-link', async (req, res) => {
//   const { url } = req.body;

//   const baseAPI = 'https://api.shrtco.de/v2';

//   try {
//     const fetchData = await fetch(`${baseAPI}/shorten?url=${url}`);

//     const response = await fetchData.json();

//     if (!response.ok) {
//       return res.status(400).json({ message: response.error });
//     }

//     res.status(200).json({ response });
//   } catch (error) {
//     res.json({ error });
//   }
// });
