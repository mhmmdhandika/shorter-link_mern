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
userSchema.statics.signup = async function (email: object, password: object) {
  // validation
  if (!email || !password) {
    throw Error('All field must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  // check the email exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  // generate hashed password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create an user document
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email: object, password: object) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // check the email
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  // compare input password with hashes password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

// define collection database
module.exports = mongoose.model('User', userSchema);
