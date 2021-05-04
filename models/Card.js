const mongoose = require("mongoose");
const Joi = require("joi");

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   category: String,
//   price: Number,
//   dataModified: Date,
// });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, minlength: 2, maxlength: 255 },
//   description: { type: String, required: true },
//   category: { type: String, required: true, minlength: 5, maxlength: 50 },
//   price: { type: Number, required: true },
//   dateModified: { type: Date, default: Date.now },
// });

const cardSchema = new mongoose.Schema({
  word: { type: String, required: true, minlength: 2, maxlength: 50 },
  definition: { type: String, required: true, minlength: 2, maxlength: 255 },
});

const card = mongoose.model("Card", cardSchema);

// function validateCard(card) {
//   const schema = Joi.object({
//     word: Joi.string().min(2).max(50).required(),
//     definition: Joi.string().min(2).max(255).required(),
//   });
//   return schema.validate(card);
// }

exports.Card = card;
// exports.validate = validateCard;
exports.cardSchema = cardSchema;
