"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controller functions
const { addNewShortLink } = require('../controllers/shortLinkControllers');
const router = express_1.default.Router();
// add new short link
router.post('/add-new', addNewShortLink);
exports.default = router;
