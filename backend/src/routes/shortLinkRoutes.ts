import express from 'express';

// controller functions
const { addNewShortLink } = require('../controllers/shortLinkControllers');

const router = express.Router();

// add new short link
router.post('/add-new', addNewShortLink);

export default router;
