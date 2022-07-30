const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Categories = require("../models/categories");

// Get all, http://localhost:4000/categories
router.get("/", (req, res, next) => {
  Categories.find()
    .populate('categories')
    .exec()
    .then(docs => {
      console.log('Docccss', docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Add, http://localhost:4000/categories
router.post("/", (req, res, next) => {
  const category = new Categories({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    parentCategory: req.body.parentCategory
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /categories",
        createdCategory: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get 1 Item, http://localhost:4000/categories/5e70d431d369bc53101e183d
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Categories.findById(id)
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

// Update, http://localhost:4000/categories/5e70d431d369bc53101e183d
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  Categories.updateOne({ _id: id }, { $set: req.body })
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

// Delete, http://localhost:4000/categories/5e70d431d369bc53101e183d
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Categories.remove({ _id: id })
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
