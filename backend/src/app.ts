import type { Express } from 'express';
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
import shortLinkRoutes from './routes/shortLinkRoutes';
const cors = require('cors');

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

// enable pre-flight requests
app.options('*', cors());

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

// origins allow
const allowList = ['http://localhost:3000'];

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (allowList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
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
