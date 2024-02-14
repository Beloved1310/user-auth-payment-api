const express = require("express");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");

const router = express.Router();

const userController = require("../controller/user.controller");

router.post("/register", asyncMiddleware(userController.register));
router.post("/login", asyncMiddleware(userController.login));

module.exports = router;