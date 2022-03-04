const express = require("express");
const router = express.Router();
const { User } = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false); // user not found
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // invalid password
            }
            done(null, user); // success :D
          });
        })
        .catch(done);
    }
  )
);

// How we save the user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// How we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});

router.post("/register", function (req, res, next) {
  const { name, email, password } = req.body;
  User.create({
    name: name,
    email: email,
    password: password,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.send(err));
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.send(req.user);
  }
);

router.post("/logout", function (req, res) {
  req.logout();
  res.send();
});

router.put("/toggleFavorite", function (req, res) {
  User.findByPk(req.user.id)
    .then((user) => {
      return user.toggleFavorite(req.body.movie.id);
    })
    .then((data) => res.send(data));
});

const isAuthenticated = function (req, res, next) {
  if (req.user) return next();
  else return res.status(401);
};

router.get("/me", isAuthenticated, function (req, res) {
  res.send(req.user);
});



module.exports = router;
