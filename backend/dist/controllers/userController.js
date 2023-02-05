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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// jwt token generator
function createToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the email and password from user
    const { email, password } = req.body;
    try {
        // auth user login
        const user = yield User.login(email, password);
        // create a token
        const token = createToken(user._id);
        // send the result to the user
        res.status(200).json({ email, token });
    }
    catch (error) {
        // send the error
        res.status(400).json({ error: error.message });
    }
});
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // auth user sign up
        const user = yield User.signup(email, password);
        // create a token
        const token = createToken(user._id);
        // send the result to the user
        res.status(200).json({ email, user });
    }
    catch (error) {
        // send the error to the user
        res.status(400).json({ error: error.message });
    }
});
module.exports = { loginUser, signUpUser };
