const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = require("../models/team");

// Get all, http://localhost:4000/teams
router.get("/", (req, res, next) => {
  Team.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Add, http://localhost:4000/teams
router.post("/", (req, res, next) => {
  const team = new Team({
    _id: new mongoose.Types.ObjectId(),
    team: req.body.team
  });
  team
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /teams",
        createdTeam: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get 1 Item, http://localhost:4000/teams/5e71018886d2131311ce2cde
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Team.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update, http://localhost:4000/teams/5e71018886d2131311ce2cde
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log('UpdateOps:::::', updateOps);
  Team.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Delete, http://localhost:4000/teams/5e71018886d2131311ce2cde
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Team.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
