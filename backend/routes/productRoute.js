const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protected, admin } = require("../middlewares/auth");


router
  .route("/")
  .get(productController.getProducts)
  .post(protected, admin, productController.createNewProduct);
router
  .route("/:id")
  .get(productController.getProduct)
  .delete(protected, admin, productController.delete);

router
  .route("/:id/edit")
  .put(protected, admin, productController.updateProduct);

module.exports = router;
