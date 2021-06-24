// Models
const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse');
const SendEmail = require('../utils/sendEmail');

//Register route
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password
    });

    sendToken(user, 201, res);

  } catch (e) {
    next(e);
  }
};


// Login route
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400))
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401))

    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401))

    }

    sendToken(user, 200, res);

  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    })
  }
};


exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  const user = User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Email Could not be sent", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

  const message = `
  <h1> You have requested a password reset</h1>
  <p> Please go to this link to reset your password</p>
  <a href=${resetUrl} clicktraking=off>${resetUrl}</a>
  `;

  try {
    await SendEmail({
      to: user.email,
      subject: "Reset your password request",
      text: message
    });

    res.status(200).json({success: true, data:"Email sent."})
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorResponse("Email could not be send", 500))
  }
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset password route");
};

const sendToken =(user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token })
}
