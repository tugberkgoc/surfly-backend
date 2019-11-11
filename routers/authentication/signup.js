const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../db/user");

router.post("/", (req, res) => {
  let { Email, Password, Username } = req.body;

  if(!Email || !Password || !Username) {
    return res.json({ status: "failed", error: "All parameters must be provided" });
  }

  let newUser = new User({
    Email,
    Username,
    Password: bcrypt.hashSync(Password, 10), // hash password
  });

  newUser.save().then(() => {
    res.json({ status: "success", message: "Verification code has been sent "});
  })
      .catch(error => {
        return res.json({ status: "failed", error });
      });
});

module.exports = router;
