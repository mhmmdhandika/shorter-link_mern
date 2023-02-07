"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controller functions
const shortLinkControllers_1 = require("../controllers/shortLinkControllers");
const router = express_1.default.Router();
// get all short links
router.get('/', shortLinkControllers_1.getAllShortLinks);
// add new short link
router.post('/add-new', shortLinkControllers_1.addNewShortLink);
// delete a short link
router.post('/delete/:id', shortLinkControllers_1.deleteAShortLink);
exports.default = router;
