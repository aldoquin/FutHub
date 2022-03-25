const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../middleware/auth');

const User = require('../schema/user');

router.post('/', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: 'email already taken' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => res.sendStatus(201))
              .catch((err) => res.status(500).json({ error: err }));
          }
        });
      }
    });
});

router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.sendStatus(404);
      }
      bcrypt.compare(req.body.password, user[0].password, (err, isEqual) => {
        if (err) return res.sendStatus(401);
        if (isEqual) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: '1h',
            }
          );
          return res.status(200).json({
            message: 'Authorization succesful',
            token: token,
          });
        }
        res.sendStatus(401);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
