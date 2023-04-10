const express = require("express");
const router = express.Router();
const userControler = require("../controllers/user")

router.post("/signup", userControler.createUser)

router.post("/login", userControler.loginUser)

module.exports = router;