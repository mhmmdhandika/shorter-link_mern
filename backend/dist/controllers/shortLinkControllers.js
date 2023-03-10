"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAShortLink = exports.addNewShortLink = exports.getAllShortLinks = void 0;
const shortLinkModel_1 = __importDefault(require("../models/shortLinkModel"));
const useFormatDateToLocale_1 = __importDefault(require("../hooks/useFormatDateToLocale"));
const useGetCurrentDate_1 = __importDefault(require("../hooks/useGetCurrentDate"));
const baseAPI = 'https://api.shrtco.de/v2';
const getAllShortLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield shortLinkModel_1.default.find();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllShortLinks = getAllShortLinks;
const addNewShortLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, user_id } = req.body;
    try {
        // fetch from public api
        const response = yield fetch(`${baseAPI}/shorten?url=${url}`);
        const data = yield response.json();
        // get the error states from api
        if (!response.ok) {
            const errorMessage = yield data.error;
            throw Error(errorMessage);
        }
        // save to db
        const { result: { code, short_link, full_short_link, original_link }, } = data;
        const newShortLink = yield shortLinkModel_1.default.create({
            code: code,
            shortLink: short_link,
            fullShortLink: full_short_link,
            originalLink: original_link,
            created: (0, useFormatDateToLocale_1.default)((0, useGetCurrentDate_1.default)(), 'en-EN'),
            user_id,
        });
        // send the response
        res.status(200).json({
            message: 'New short link has been added!',
            result: newShortLink,
        });
    }
    catch (error) {
        res.status(400).json({
            error: {
                name: error.name,
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        });
    }
});
exports.addNewShortLink = addNewShortLink;
const deleteAShortLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // delete the link from db
        yield shortLinkModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            result: 'Successfully deleted!',
        });
    }
    catch (error) {
        res.status(400).json({
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
});
exports.deleteAShortLink = deleteAShortLink;
