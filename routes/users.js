const { User, validate: uValidate } = require("../models/user");
const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     return res.send(products);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
//     return res.send(product);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });
router.post("/", async (req, res) => {
  try {
    const { error } = uValidate(req.body);
    if (error) return res.status(400).send(error);
    const user = new user({
      name: req.body.name,
    });

    await user.save();

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/:userId/shoppingcard/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist`);

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(400).send(`The product with id "${req.params.userId}" does not exist`);

    user.shoppingCart.push(product);

    await user.save();

    return res.send(user.shoppingCart);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:userId/shoppingcard/:productId", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist`);

    const product = user.shoppingCart.id(req.params.productId);
    if (!product) return res.status(400).send(`The product with id "${req.params.userId}" does not exist`);

    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.price = req.body.price;
    product.dateModified = Date.now();

    await user.save();
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:userId/shoppingcart/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
    let product = user.shoppingCart.id(req.params.productId);
    if (!product) return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

    product = await product.remove();

    await user.save();
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
