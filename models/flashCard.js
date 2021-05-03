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

const flashCardSchema = new mongoose.Schema({
  category: { type: String, required: true, minlength: 2, maxlength: 50 },
  question: { type: String, required: true, minlength: 2, maxlength: 255 },
  answer: { type: String, required: true, minlength: 1, maxlength: 255 },
});

const flashCard = mongoose.model("FlashCard", flashCardSchema);

function validateFlashCard(flashCard) {
  const schema = Joi.object({
    category: Joi.string().min(2).max(50).required(),
    question: Joi.string().min(2).max(255).required(),
    answer: Joi.string().min(1).max(255).required(),
  });
  return schema.validate(flashCard);
}

exports.FlashCard = flashCard;
exports.validate = validateFlashCard;
exports.flashCardSchema = flashCardSchema;
