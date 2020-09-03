var authRouter = require("express").Router();
var validator = require("../middlewares/validator");
var authController = require("../controllers/auth");

authRouter.post("/login", validator.loginValidator, authController.clientLogin);

module.exports = authRouter;
