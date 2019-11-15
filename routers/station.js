const router = require("express").Router();
const User = require("../db/user");
const uuidv1 = require('uuid/v1');

router.post("/", (req, res) => {
  let {Username} = req.query;

  if (!Username) {
    return res.json({status: "failed", error: "Username must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        for (let i = 0; i < req.body.length; i++) {
          user.Stations.push({
            Id: uuidv1(),
            City: req.body[i].City,
            DateTime: req.body[i].DateTime,
            Icon: req.body[i].Icon,
            Description: req.body[i].Description,
            Temperature: req.body[i].Temperature,
            MinTemperature: req.body[i].MinTemperature,
            MaxTemperature: req.body[i].MaxTemperature,
            WindSpeed: req.body[i].WindSpeed,
            Humidity: req.body[i].Humidity,
            FirstWater: req.body[i].FirstWater,
            FirstWaterHeight: req.body[i].FirstWaterHeight,
            SecondWater: req.body[i].SecondWater,
            SecondWaterHeight: req.body[i].SecondWaterHeight,
            ThirdWater: req.body[i].ThirdWater,
            ThirdWaterHeight: req.body[i].ThirdWaterHeight,
            FourthWater: req.body[i].FourthWater,
            FourthWaterHeight: req.body[i].FourthWaterHeight
          });
        }

        user.save().then(() => {
          res.json({status: "success", message: "Stations are saved"});
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
    Id
  } = req.body;

  let {
    Username
  } = req.query;

  if (!Username || !Id) {
    return res.json({status: "failed", error: "All parameters must be provided"});
  }

  User.findOne({Username})
      .then(user => {
        if (!user) return res.json({status: "failed", error: "No user was found"});

        user.Stations = user.Stations.filter(el => el.Id !== Id);

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

        res.json(user.Stations);

      })
      .catch(error => {
        return res.json({status: "failed", error: "Unexpected database error"});
      });
});


module.exports = router;
