// Import node and 3rd party modules first befor custom modules
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var http = require("http");
var config = require("./config");

//connect database
mongoose
  .connect(
    "mongodb+srv://backend-user:Sikrit@123!@goralstask.xqjm6.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(`mongodb connected successfully`))
  .catch((err) => {
    console.error(error);
    process.exit();
  });

//initialize express instance
var app = express();

//request setup
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//main entry for api endpoints
app.use("/api", require("./routes"));

//error handlng routes
app.use((req, res, next) => {
  next({
    status: 404,
    message: "resource not found",
  });
});

app.use(({ status, message }, req, res, next) => {
  res.json({
    status,
    message,
  });
});

//initialize server and listen for requests
var server = http.createServer(app);
const port = config.PORT;

server.listen(port, function () {
  return console.log(`server running on port ${port}`);
});
