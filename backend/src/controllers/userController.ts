import { RequestHandler } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';

import User from '../models/userModel';
const jwt = require('jsonwebtoken');

// jwt token generator
function createToken(_id: string) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const signUpUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation form input
    if (!name) {
      throw Error('Name input must be filled');
    } else if (!email || !password) {
      throw Error('Email input must be filled');
    } else if (!password) {
      throw Error('Password must be filled');
    }

    // validation email
    if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
    }

    // check the email exists
    const emailExists = await User.findOne({ email });

    if (emailExists) throw Error('Email already in use');

    // generate hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create an user document
    const user = await User.create({ name, email, password: hash });

    // create a token
    const token = createToken(user._id.toString());

    // send a message and token to user
    res.status(200).json({ message: 'Sign up succeed', token });
  } catch (error: any) {
    // send the error to the user
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

const loginUser: RequestHandler = async (req, res) => {
  // get the email and password from user
  const { email, password } = req.body;

  try {
    // validation form input
    if (!email) {
      throw Error('Email input must be filled');
    } else if (!password) {
      throw Error('Password input must be filled');
    }

    // check the user exists
    const user = await User.findOne({ email });

    if (!user) throw Error('Incorrect email');

    // compare input password with hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error('Incorrect password');

    // create a token
    const token = createToken(user._id.toString());

    // send a message and token to user
    res.status(200).json({ message: 'Login succeed', token });
  } catch (error: any) {
    // send the error
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

module.exports = { loginUser, signUpUser };
