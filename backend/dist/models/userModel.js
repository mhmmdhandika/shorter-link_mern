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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// static signup method
userSchema.statics.signup = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // validation
        if (!email || !password) {
            throw Error('All field must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid');
        }
        // check the email exists
        const exists = yield this.findOne({ email });
        if (exists) {
            throw Error('Email already in use');
        }
        // generate hashed password
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        // create an user document
        const user = yield this.create({ email, password: hash });
        return user;
    });
};
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // validation
        if (!email || !password) {
            throw Error('All fields must be filled');
        }
        // check the email
        const user = yield this.findOne({ email });
        if (!user) {
            throw Error('Incorrect email');
        }
        // compare input password with hashes password
        const match = yield bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect password');
        }
        return user;
    });
};
// define collection database
module.exports = mongoose.model('User', userSchema);
