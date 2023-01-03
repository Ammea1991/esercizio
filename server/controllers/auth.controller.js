const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.delete = (req, res) => {
  User.deleteOne({ _id: req.body._id })
    .exec((err, user) => {
      if (err) throw err;
      console.log("1 document deleted");
      res.status(200).send({ message: `User ${user.email} deleted!` });
    });
};

exports.update = (req, res) => {
  const body = req.body.user;
  var myquery = { _id: req.body._id };
  var newvalues = {
    $set: {
      name: body.name,
      surname: body.surname,
      birth_date: body.birth_date,
      phone_number: body.phone_number,
      shipping_address: body.shipping_address,
      codice_fiscale: body.codice_fiscale,
      email: body.email,
      created_at: new Date().toISOString(),
      settings: body.settings
    }
  };

  User.updateOne(myquery, newvalues, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("1 document updated");
    res.status(200).send({ message: `User ${body.email} updated!` });
  });
};

exports.signup = (req, res) => {
  const body = req.body.user;
  const user = new User({
    name: body.name,
    surname: body.surname,
    birth_date: body.birth_date,
    phone_number: body.phone_number,
    shipping_address: body.shipping_address,
    codice_fiscale: body.codice_fiscale,
    email: body.email,
    created_at: new Date().toISOString(),
    password: bcrypt.hashSync(body.password, 8),
    settings: body.settings
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ message: `User ${body.email} was registered successfully!` });
  });
};

let loadedUser;

exports.signin = (req, res) => {
  console.log(req.body.email)
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      loadedUser = user;

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ email: loadedUser.email }, config.secret, {
        expiresIn: 3600 // 1 hour
        //expiresIn: 360 // 5 min
      });

      res.status(200).json({ accessToken: token });

      // res.status(200).send({
      //   id: user._id,
      //   user: user.email,
      //   accessToken: token
      // });
    });
};

exports.changePsw = (req, res) => {

  var email = { email: req.body.email };
  var new_psw = { $set: { password: bcrypt.hashSync(req.body.password, 8), update_psw: new Date().toISOString() } };

  console.log(req.body.email)
  console.log(req.body.password)

  User.updateOne(email, new_psw, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Password cambiata con successo" });
  });
};

exports.getUser = (req, res, next) => { // this function will send user data to the front-end as I said above authFetch on the user object in nuxt.config.js will send a request and it will execute
  res.status(200).json({
    user: {
      id: loadedUser._id,
      name: loadedUser.name,
      surname: loadedUser.surname,
      birth_date: loadedUser.birth_date,
      phone_number: loadedUser.phone_number,
      shipping_address: loadedUser.shipping_address,
      codice_fiscale: loadedUser.codice_fiscale,
      email: loadedUser.email,
    },
  });
};

exports.verifyOld = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      res.status(200).send({ message: "Password old corretta!" });
    });
};