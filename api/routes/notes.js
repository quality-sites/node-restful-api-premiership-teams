const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Note = require("../models/notes");

// Get all, http://localhost:4000/notes
// router.get("/", (req, res, next) => {
//   Note.find()
//     .populate('notes')
//     .exec()
//     .then(docs => {
//       console.log('Docccss', docs);
//       res.status(200).json(docs);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });


// Parameters page, limit, search
// TO DO
// =====
// - sort by name, date
// - filter by category


router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    // let sort = req.query.sort || 'rating';
    // let category = req.query.category || 'All';

    // const categoryOptions = [
    //   "Action",
    //   "Romance",
    //   "Fantasy",
    //   "Drama",
    //   "Crime",
    //   "Adventure",
    //   "Thriller",
    //   "Sci-fi",
    //   "Music",
    //   "Family",
    // ];

    // category === 'All'
    //   ? (category = [...categoryOptions])
    //   : (category = req.query.category.split(","));
    // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // let sortBy = {};
    // if (sort[1]) {
    //   sortBy[sort[0]] = sort[1];
    // } else {
    //   sortBy[sort[0]] = 'asc';
    // }

    const notes = await Note.find({ note: { $regex: search, $options: "i" } })
      // .where('category')
      // .in([...category])
      // .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Note.countDocuments({
      // category: { $in: [...category] },
      note: { $regex: search, $options: "i" },
    });

    const response = {
      notes,
      total
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// Add, http://localhost:4000/notes
router.post("/", (req, res, next) => {
  console.log('req.body:', req.body);
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    note: req.body.note,
    category: req.body.category,
    type: req.body.type
  });
  note
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /notes",
        createdNote: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get 1 Item, http://localhost:4000/notes/5e70d431d369bc53101e183d
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log('id:', id);
  Note.findById(id)
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

// Update, http://localhost:4000/notes/5e70d431d369bc53101e183d
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log('id:', id);
  Note.updateOne({ _id: id }, { $set: req.body })
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

// Delete, http://localhost:4000/notes/5e70d431d369bc53101e183d
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Note.remove({ _id: id })
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
