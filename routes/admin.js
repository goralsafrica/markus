var adminRouter = require("express").Router();
var validator = require("../middlewares/validator");
var adminController = require("../controllers/admin");

// adminRouter.get(
//   "/user",
//   // validator.registerValidator,
//   // adminController.createNewUser
// );

// adminRouter.post(
//   "/user",
//   validator.registerValidator,
//   adminController.createNewUser
// );

// adminRouter.post("/department", adminController.createNewDepartment);

// adminRouter.put("/department/:id");

module.exports = adminRouter;
