var apiRouter = require("express").Router();
var { inSession } = require("../middlewares/auth");
var authRoutes = require("./auth");
var adminRoutes = require("./admin");

apiRouter.get("/", (req, res) => {
  res.json({
    message: "welcome to the api route",
  });
});

apiRouter.use("/auth", authRoutes);
apiRouter.use("/admin", adminRoutes);

module.exports = apiRouter;
