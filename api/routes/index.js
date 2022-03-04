const express = require("express");
const router = express.Router();


const moviesRouter = require("./movies");
const usersRouter = require("./users");

router.use("/movies", moviesRouter)
router.use("/users", usersRouter)

module.exports = router;