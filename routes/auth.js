//Modules
const express = require('express');

// Definations
const router = express.Router();
const { register, login, forgotpassword, resetpassword } = require('../controllers/auth');

// Routers
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);



module.exports = router;
