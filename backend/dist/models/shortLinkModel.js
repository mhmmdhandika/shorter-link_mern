"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const shortLinkSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    shortLink: {
        type: String,
        required: true,
        unique: true,
    },
    fullShortLink: {
        type: String,
        required: true,
        unique: true,
    },
    originalLink: {
        type: String,
        required: true,
    },
    created: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model('ShortLinks', shortLinkSchema);
