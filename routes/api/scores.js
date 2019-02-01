const express = require("express");
const router = express.Router();

// Score Model
const Score = require("../../models/Score");

// @route   GET api/scores
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .then(scores => res.json(scores));
});

// @route   POST api/scores
// @desc    Create a score
// @access  Public
router.post("/", (req, res) => {
  const newScore = new Score({
    name: req.body.name,
    score: req.body.score
  });
  newScore.save().then(item => res.json(item));
});

// @route   DELETE api/scores/:id
// @desc    Delete a score
// @access  Public
router.delete("/:id", (req, res) => {
  Score.findById(req.params.id)
    .then(score => score.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


// @route   PUT api/scores/:id
// @desc    Edit a score
// @access  Public
router.put("/:id", (req, res) => {
  Score.findById(req.params.id)
  .then(score => score.updateOne({name: req.body.name, score: req.body.score})
  .then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}))
});

module.exports = router;
