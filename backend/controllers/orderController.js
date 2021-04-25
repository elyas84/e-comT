const Order = require("../models/orderModel");

// @desc ADD new order
// @route /api/orders
// @access protected
exports.addNewOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    price,
    totalPrice,
    isPaid,
  } = req.body;

  try {
    if (!orderItems) {
      return res.status(404).json({
        message: "There are no order.",
      });
    }

    const order = new Order({
      orderItems,
      costumer: req.user._id,
      shippingAddress,
      paymentMethod,
      price,
      totalPrice,
      isPaid,
    });

    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc GET order
// @route /api/orders
// @access protected || admin
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "costumer",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order is not created.",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc GET order
// @route /api/orders/myorders
// @access protected || admin

exports.costumerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ costumer: req.user._id }).populate(
      "costumer",
      "name email"
    );
    if (orders.length === 0) {
      return res.status(404).json({
        message: "You have any order yet.",
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc GET orders
// @route /api/orders
// @access protected || admin

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("costumer", "name email");

    if (orders.length === 0) {
      return res.status(404).json({
        message: "There are any orders.",
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc UPDATE orders to Paid
// @route /api/orders/:id/paid
// @access protected || admin

exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      // order paymentResult is holding a banch of properties,, see the orderModel
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    }
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};

// @desc DELETE order
// @route /api/orders/:id
// @access proteced && Admin
exports.delete = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "This order is already deleted",
      });
    }
    await order.deleteOne({
      _id: order._id,
    });
    res.status(200).json({
      message: order._id + " is deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error,
    });
  }
};
