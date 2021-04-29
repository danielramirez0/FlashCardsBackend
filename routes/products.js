const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here

// Example with Hardcoded values which results in the POST creating a product in the MongoDB products collection
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product({
//       name: "Stanley Classic Vacuum Bottle",
//       description: `Our Stanley Classic Vacuum Bottle is made with superior insulation that keeps liquids (soup, coffee, tea) hot or cold drinks cool for up to 24 hours.`,
//       category: "Travel",
//       price: 19.82,
//     });
//     await product.save();

//     return res.send(product);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    // Need to validate body before continuing
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
    });

    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      },
      { new: true }
    );
    if (!product) return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ex`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
