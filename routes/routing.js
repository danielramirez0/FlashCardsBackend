
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Collection = require('.././models/Collection');
const { Card } = require('../models/Card');
​
//***Collection endpoints***
//GET all collections (decks of cards)
router.get('/', async (req, res) => {
  
});
​
//GET collection (deck of cards) by id
router.get('/:id', async (req, res) => {
  
});
​
//POST a new collection (deck of cards)
router.post('/', async (req, res) => {
  
});
​
//UPDATE a collection (deck of cards)
router.put('/:id', async (req, res) => {
  
});
​
//DELETE a collection (deck of cards)
router.delete('/:id', async (req, res) => {
  
});
​
//***Card endpoints***
//GET all flashcards linked to a collection's id (deck of cards) 
router.get('/:id/cards', async (req, res) => {
  
});
​
//GET a specific card by its id that is linked to a collection's id (deck of cards)
router.get('/:collectionId/cards/:id', async (req, res) => {
  
});
​
//POST a new card to a collection (deck of cards)
router.post('/:id/cards', async (req, res) => {
  
});
​
//UPDATE a specific card in a collection (deck of cards). Need to pass in the collection id and card id
router.put('/:collectionId/cards/:id', async (req, res) => {
  
});
​
//DELETE a card from a collection (deck of cards). Need to pass in the collection id and card id
router.delete('/:collectionId/cards/:id', async (req, res) => {
  
});
​
​
//***Validation for both card and collection (deck of cards)***
function validateCard(card) {
  const schema = Joi.object({
    word: Joi.string().min(1).required(),
    definition: Joi.string().min(1).required(),
  });
  return schema.validate(card);
}
​
function validateCollection(collection) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
  });
  return schema.validate(collection);
}
​
module.exports = router;