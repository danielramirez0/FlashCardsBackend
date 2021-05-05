const mongoose = require("mongoose");
const { Card } = require("./Card");
const Joi = require("joi");

const deckSchema = new mongoose.Schema({
  technology: { type: String, required: true, minlength: 2, maxlength: 50 },
  cards: [Card.schema],
});

const deck = mongoose.model("Deck", deckSchema);

function validateDeck(deck) {
  const schema = Joi.object({
    technology: Joi.string().min(2).max(255).required(),
    cards: Joi.array().required(),
  });
  return schema.validate(deck);
}

exports.Deck = deck;
exports.validateDeck = validateDeck;
exports.deckSchema = deckSchema;
