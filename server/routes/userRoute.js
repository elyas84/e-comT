const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protected, admin } = require("../middlewares/auth");
const userValidatorChek = require("../middlewares/userValid");

/**
 * These routes are protected and requires user is being login or admin
 *
 */

router.route("/").get(protected, userController.getUsers);

router
  .route("/:id")

  .delete(protected, admin, userController.delete);

/************
 * User register and User login
 * /api/users/register
 * /api/users/login
 */
router.route("/register").post(userValidatorChek, userController.register);
router.route("/login").post(userValidatorChek, userController.login);

/**
 * Updated profile and GET profile
 */
router
  .route("/profile")
  .put(protected, userController.profileUpdate)
  .get(protected, userController.profile);

module.exports = router;
