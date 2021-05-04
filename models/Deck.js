const mongoose = require("mongoose");
const { Card } = require("./Card");

const deckSchema = new mongoose.Schema({
  technology: { type: String, required: true, minlength: 2, maxlength: 50 },
  cards: [Card.schema],
});

const deck = mongoose.model("Deck", deckSchema);

exports.Deck = deck;
exports.deckSchema = deckSchema;
