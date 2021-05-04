const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  word: { type: String, required: true, minlength: 2, maxlength: 50 },
  definition: { type: String, required: true, minlength: 2, maxlength: 255 },
});

const card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    word: Joi.string().min(2).max(50).required(),
    definition: Joi.string().min(2).max(255).required(),
  });
  return schema.validate(card);
}

exports.Card = card;
exports.validateCard = validateCard;
exports.cardSchema = cardSchema;
