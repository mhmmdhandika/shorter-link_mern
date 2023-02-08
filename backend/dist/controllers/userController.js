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
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt = require('jsonwebtoken');
// jwt token generator
function createToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // validation form input
        if (!name) {
            throw Error('Name input must be filled');
        }
        else if (!email) {
            throw Error('Email input must be filled');
        }
        else if (!password) {
            throw Error('Password must be filled');
        }
        // validation email
        if (!validator_1.default.isEmail(email)) {
            throw Error('Email is not valid');
        }
        // check the email exists
        const emailExists = yield userModel_1.default.findOne({ email });
        if (emailExists)
            throw Error('Email already in use');
        // generate hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        // create an user document
        const user = yield userModel_1.default.create({ name, email, password: hash });
        if (!user)
            throw Error('user error');
        // create a token
        const token = createToken(user._id.toString());
        // send a message and token to user
        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        // send the error to the user
        res.status(400).json({
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the email and password from user
    const { email, password } = req.body;
    try {
        // validation form input
        if (!email) {
            throw Error('Email input must be filled');
        }
        else if (!password) {
            throw Error('Password input must be filled');
        }
        // check the user exists
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            throw Error('Incorrect email');
        // compare input password with hashed password
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            throw Error('Incorrect password');
        // create a token
        const token = createToken(user._id.toString());
        // send a message and token to user
        res.status(200).json({ message: 'Login succeed', token });
    }
    catch (error) {
        // send the error
        res.status(400).json({
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
});
module.exports = { loginUser, signUpUser };
