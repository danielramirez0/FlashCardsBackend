const { FlashCard, validate } = require("../models/flashCard");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const flashCards = await FlashCard.find();
    return res.send(flashCards);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flashCard = await FlashCard.findById(req.params.id);
    if (!flashCard) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);
    return res.send(flashCard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    // Need to validate body before continuing
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const flashCard = new FlashCard({
      name: req.body.name,
      category: req.body.category,
      question: req.body.question,
      answer: req.body.answer,
    });

    await flashCard.save();

    return res.send(flashCard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const flashCard = await FlashCard.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        question: req.body.question,
        answer: req.body.answer,
      },
      { new: true }
    );
    if (!flashCard) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);

    await flashCard.save();

    return res.send(flashCard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ex`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const flashCard = await FlashCard.findByIdAndRemove(req.params.id);
    if (!flashCard) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);
    return res.send(flashCard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
