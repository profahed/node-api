const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

exports.signup = (req, res, next) => {
    console.log(req.body.email);
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    return res.json(error);
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error();
        error.msg = 'A user with this email could not be found.!';
        error.statusCode = 401;
        return res.json(error);
      }
      loadedUser = user;
      //console.log(loadedUser);
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error();
        error.msg = 'Wrong password!';
        error.statusCode = 401;
        return res.json(error);
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString()
        },
        'secret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
