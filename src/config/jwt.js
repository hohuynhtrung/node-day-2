const jwt = {
  authSecret: process.env.AUTH_JWT_SECRET,
  verifyEmailSecret: process.env.VERUFY_EMAIL_JWT_SECRET,
};

module.exports = jwt;
