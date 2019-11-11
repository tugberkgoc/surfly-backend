const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
// const jwtProtection = require("./middlewares/jwt_protection");

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

// use jwt protection after auth routes
//app.use(jwtProtection);

/**
// router for adding interested areas
app.use("/api/addareas", require("./routers/authentication/interested_areas"));


// Posting routers
app.use("/api/post/personal", require("./routers/post_post/personal"));
app.use("/api/post/activity", require("./routers/post_post/activity"));

// Getting posts routers
app.use("/api/get", require("./routers/get_post/feed_discover"));

// Getting on comments on a specific post
app.use("/api/get", require("./routers/get_post/get_comments"));

// adding like & comment & attending to posts
app.use("/api/put", require("./routers/update_post/likes_comments"));
app.use("/api/put", require("./routers/update_post/attendings"));

// editing and deleting posts
app.use("/api/put", require("./routers/update_post/edit_delete"));

// viewing users profile / editing your profile
app.use("/api/user", require("./routers/user_actions/profile"));

// personal messaging
app.use("/api/user", require("./routers/user_actions/messaging"));

// follow & unfollow
app.use("/api/user", require("./routers/user_actions/follow_unfollow"));

// search users
app.use("/api/user", require("./routers/user_actions/search"));

// admin actions
app.use("/api/admin", require("./routers/admin/admin"));
**/

app.listen(process.env.PORT || 3030, () => {
  console.log(`server is listening`);
});
