const Joi = require('joi');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const R = require('ramda');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: { type: Date, default: Date('2020/04/25') },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  expires: { type: Date, default: Date.now, expires: 43200 },
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return R.omit(['password', '__v', '_id'], this.toObject({ virtuals: true }));
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  };

  return Joi.validate(user, schema);
}

function validateLoginInput(input) {
  const schema = {
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(input, schema);
}

function validateRegisterInput(input) {
  const schema = {
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
  };

  return Joi.validate(input, schema);
}

function validateEmail(input) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
  };

  return Joi.validate(input, schema);
}

function validatePassword(input) {
  const schema = {
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(input, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateRegisterInput = validateRegisterInput;
exports.validateEmail = validateEmail;
exports.validateLoginInput = validateLoginInput;
exports.validatePassword = validatePassword;
