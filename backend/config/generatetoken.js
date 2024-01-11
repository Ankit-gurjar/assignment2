const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  JWT_SECRET = "HiiPestoMyNameIsANKIT";
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = generateToken;
