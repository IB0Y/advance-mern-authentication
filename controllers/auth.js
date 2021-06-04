exports.register = (req, res, next) => {
  res.send("Register route");
};


exports.login = (req, res, next) => {
  res.send("Login route");
};


exports.forgotpassword = (req, res, next) => {
  res.send("Forgot password route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset password route");
};
