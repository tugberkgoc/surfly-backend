const router = require("express").Router();
const User = require("../db/user");
const uuidv1 = require('uuid/v1');

router.post("/", (req, res) => {
  let {
    Username,
    City,
    Icon,
    Description,
    Temperature,
    MinTemperature,
    MaxTemperature,
    WindSpeed,
    Humidity,
    FirstWater,
    FirstWaterHeight,
    SecondWater,
    SecondWaterHeight,
    ThirdWater,
    ThirdWaterHeight,
    FourthWater,
    FourthWaterHeight
  } = req.body;

  if (!Username || !City || !Description) {
    return res.json({status: "failed", error: "All parameters must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        user.Stations.push({
          Id: uuidv1(),
          City,
          Icon,
          Description,
          Temperature,
          MinTemperature,
          MaxTemperature,
          WindSpeed,
          Humidity,
          FirstWater,
          FirstWaterHeight,
          SecondWater,
          SecondWaterHeight,
          ThirdWater,
          ThirdWaterHeight,
          FourthWater,
          FourthWaterHeight
        });

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

router.post("/delete", (req, res) => {
  let {
    Username,
    Id
  } = req.body;

  if (!Username || !Id) {
    return res.json({status: "failed", error: "All parameters must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        user.Stations.remove(el => el.Id === Id);

        user.save().then(() => {
          res.json({status: "success", message: "Station is deleted"});
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
