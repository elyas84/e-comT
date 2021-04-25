const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protected, admin } = require("../middlewares/auth");

router.route("/").get(protected, admin, orderController.getOrders);
router.route("/").post(protected, orderController.addNewOrder);
router.route("/myorders").get(protected, orderController.costumerOrders);
router
  .route("/:id")
  .get(protected, orderController.getOrder)
  .delete(protected, orderController.delete);

router.route("/:id/paid").put(protected, orderController.updateOrderToPaid);

module.exports = router;
