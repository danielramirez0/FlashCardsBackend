const express = require("express");
const router = express.Router();
const { Deck, validateDeck } = require(".././models/Deck");
const { Card, validateCard } = require("../models/Card");

// GET ALL DECKS
router.get("/", async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET DECK BY ID
router.get("/:id", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Add new deck to collection
router.post("/", async (req, res) => {
  try {
    const { error } = validateDeck(req.body);
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

// Update a deck by ID
router.put("/:id", async (req, res) => {
  try {
    const { error } = validateDeck(req.body);
    if (error) return res.status(400).send(error);

    const deck = await deck.findByIdAndUpdate(
      req.params.id,
      {
        technology: req.body.technology,
        cards: req.body.cards,
      },
      { new: true }
    );
    if (!deck) return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ex`);
  }
});

// Delete deck by ID
router.delete("/:id", async (req, res) => {
  try {
    const deck = await Deck.findByIdAndRemove(req.params.id);
    if (!deck) return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//***Card endpoints***
//GET all flashcards linked to a collection's id (deck of cards)
router.get("/:id/cards", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    return res.send(deck.cards);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET a specific card by its id that is linked to a collection's id (deck of cards)

router.get("/:collectionId/cards/:id", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.collectionId);
    const card = await deck.cards.id(req.params.id);
    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//POST a new card to a collection (deck of cards)
router.post("/:id/cards", async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error);
    // const newCard = req.body;
    const newCard = new Card({
      word: req.body.word,
      definition: req.body.definition,
    });

    // Only needed if desiring to create a new collection in MongoDB specific for cards
    // await newCard.save();

    const deck = await Deck.findById(req.params.id);
    deck.cards.push(newCard);
    await deck.save();
    return res.send(newCard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
