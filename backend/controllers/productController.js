const Product = require("../models/productModel");
// @desc GET products
// @route /api/products
// @access protected && admin
exports.getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword, // filter that can grap split letter
            $options: "i", // igonre uppercase or lowe case
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    if (!products && products.length === 0) {
      return res.status(404).json({
        message: "There are no product.",
      });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};
// @desc GET product
// @route /api/products
// @access protected || admin
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "There is not product.",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc POST/create a product
// @route /api/prroducts/
// @access prodcuted
exports.createNewProduct = async (req, res) => {
  const {
    name,
    price,
    brand,
    category,
    productImg,
    description,
    countInStock,
  } = req.body;

  try {
    const product = new Product({
      name,
      price,
      createdBy: req.user._id,
      productImg,
      brand,
      category,
      countInStock,
      description,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc Update product
// @route /api/products/:id/edit
// @access proteced || Admin

exports.updateProduct = async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      (product.name = name),
        (product.price = price),
        (product.image = image), // This path is regulare url that we can pass if we want
        (product.brand = brand),
        (product.category = category),
        (product.countInStock = countInStock),
        (product.description = description);
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({
        message: "no product found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc DELETE product
// @route /api/products/:id
// @access proteced && Admin
exports.delete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "This product is already deleted",
      });
    }
    await product.deleteOne({
      _id: product._id,
    });
    res.status(200).json({
      message: product.name + " is deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};
