const { Card, validateCard } = require("../models/Card");
const { Deck, validateDeck } = require(".././models/Deck");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);
    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    // Need to validate body before continuing
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error);
    // const flashCard = new FlashCard({
    //   category: req.body.category,
    //   question: req.body.question,
    //   answer: req.body.answer,
    // });

    // await flashCard.save();

    // return res.send(flashCard);

    const { error } = validateDeck;
    if (error) return res.status(400).send(error);
    const deck = new Deck({
      technology: req.body.technology,
      cards: req.body.cards,
    });

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        category: req.body.category,
        question: req.body.question,
        answer: req.body.answer,
      },
      { new: true }
    );
    if (!card) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);

    await card.save();

    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ex`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card) return res.status(400).send(`The flash card with id "${req.params.id}" does not exist.`);
    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
