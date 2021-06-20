const { check } = require("express-validator");

const userCheck = [
  check("name", "Name can not be empety").not().isEmpty().bail(),
  check("email", "Email must be given ").not().isEmpty().isEmail().bail(),
  check("password", "Password must be more than 5 chars").isLength({
    min: 5,
    max: 12,
  }),
];

module.exports = userCheck;
