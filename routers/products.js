const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

// Read
router.get("/", async (req, res) => {
  const productlist = await Product.find().limit(8);
  if (!productlist) {
    res.status(500).json({ success: false }); //or use {error}
  }
  res.send(productlist);
});

router.get(`/get/featured/:count`, async (req, res) =>{
  const count = req.params.count ? req.params.count : 0
  const products = await Product.find({isFeatured: true}).limit(+count);

  if(!products) {
      res.status(500).json({success: false})
  } 
  res.send(products);
})


router.get("/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    // Mengirim respons jika productCount berhasil dihitung
    res.send({ productCount: productCount });
  } catch (error) {
    // Jika ada error, kirim respons status 500 dengan pesan error
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ success: false }); //or use {error}
  }
  res.send(product);
});

// Create
router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    Stock: req.body.Stock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    // dateCreated: req.body.dateCreated,
  });
  product = await product.save();

  if (!product) return res.status(500).send("the product cannot be created!");

  res.send(product);
});

// update
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("invalid product id!");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findById(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    Stock: req.body.Stock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    // dateCreated: req.body.dateCreated,
  });

  if (!product) return res.status(500).send("the product cannot be updated!");

  res.send(product);
});

// delete
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "category deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
