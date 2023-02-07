import { RequestHandler } from 'express';

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// jwt token generator
function createToken(_id: string) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser: RequestHandler = async (req, res) => {
  // get the email and password from user
  const { email, password } = req.body;

  try {
    // auth user login
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    // send the result to the user
    res.status(200).json({ email, token });
  } catch (error: any) {
    // send the error
    res.status(400).json({ error: error.message });
  }
};

const signUpUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // auth user sign up
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    // send the result to the user
    res.status(200).json({ email, user });
  } catch (error: any) {
    // send the error to the user
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
