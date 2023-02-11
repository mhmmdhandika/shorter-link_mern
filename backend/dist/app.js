"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const shortLinkRoutes_1 = __importDefault(require("./routes/shortLinkRoutes"));
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
// middleware
app.use(express.json());
// enable pre-flight requests
app.options('*', cors());
// connect to db
const dbURI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose
    .connect(dbURI)
    .then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// user routes
app.use('/api/user', userRoutes);
// short link routes
app.use('/api/short-link', shortLinkRoutes_1.default);
module.exports = app;
