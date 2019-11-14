const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
// mongodb connection
mongoose.connect("mongodb://goct:Tugberk2238+@ds149732.mlab.com:49732/surfly", { useNewUrlParser: true }, () => {
  console.log("connected to db");
});
mongoose.set('useCreateIndex', true);


// allowing all request
// will be changed later for security purposes
app.use(require("./middlewares/allow_request"));

// middleware setup
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting image folder as static
app.use(express.static("public"));

// auth routers // dont require a authentication check
app.use("/auth/signup", require("./routers/authentication/signup"));
app.use("/auth/login", require("./routers/authentication/login"));

app.use("/station", require("./routers/station"));

const portNumber = 3030;
app.listen(process.env.PORT || 3030, () => {
  console.log(`server is listening ${portNumber}`);
});
