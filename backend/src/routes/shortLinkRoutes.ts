import express from 'express';

// controller functions
import {
  getAllShortLinks,
  addNewShortLink,
  deleteAShortLink,
} from '../controllers/shortLinkControllers';

const router = express.Router();

// get all short links
router.get('/', getAllShortLinks);

// add new short link
router.post('/add-new', addNewShortLink);

// delete a short link
router.post('/delete/:id', deleteAShortLink);

export default router;
