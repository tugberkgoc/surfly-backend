const router = require("express").Router();
const User = require("../db/user");

router.post("/", (req, res) => {
  let {Username, Id, Name, Country} = req.body;

  if (!Username || !Id || !Name || !Country) {
    return res.json({status: "failed", error: "All parameters must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        user.Stations.push({Id, Name, Country});

        user.save().then(() => {
          res.json({status: "success", message: "Station is saved"});
        }).catch(error => {
          return res.json({status: "failed", error});
        });

      })
      .catch(error => {
        return res.json({status: "failed", error: "Unexpected database error"});
      });
});

router.get("/", (req, res) => {
  let {Username} = req.query;

  if (!Username) {
    return res.json({status: "failed", error: "All parameters must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        res.json({status: "success", Stations: user.Stations});

      })
      .catch(error => {
        return res.json({status: "failed", error: "Unexpected database error"});
      });
});


module.exports = router;
