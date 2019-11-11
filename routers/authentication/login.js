const router = require("express").Router();
const User = require("../../db/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  let { Username, Password } = req.body;
  if(!Username || !Password) {
    return res.json({ status: "failed", error: "All parameters must be provided" });
  }
  // reach the user by email
  User.findOne({ Username })
      .then(user => {
        if(!user) return res.json({ status: "failed", error: "No user was found" });

        let passwordCheck = bcrypt.compare(Password, user.Password, (err, doc) => {
          if(doc === false) return res.json({ status: "failed", error: "Email or password is incorrect" });
          // create a jwt token and return it
          let jwtToken = jwt.sign({ userId: user.id }, "surfly-app", { expiresIn: "14d" });
          res.json({ status: "success", jwtToken });
        });

      })
      .catch(error => {
        return res.json({ status: "failed", error: "Unexpected database error" });
      });
});


module.exports = router;
