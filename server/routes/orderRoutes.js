const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product'); // To update stock
const { protect, admin } = require('../middleware/auth');

// POST create order
router.post('/create', protect, async (req, res) => {
  console.log(req.body, 'order addd');
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      items: items.map(item => ({
        product: item.id || item._id,   // FIXED
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      total,
      status: 'Pending'
    });

    const createdOrder = await order.save();

    // FIX: Use id || _id
    for (const item of items) {
      const product = await Product.findById(item.id || item._id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      }
    }

    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all orders (Admin)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update status (Admin)
router.put('/update/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Dashboard stats (Admin)
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await require('../models/User').countDocuments();
    
    console.log(totalOrders,totalProducts,totalUsers,"-------------------------")
    // Calculate Total Revenue
    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

    res.json({
      totalSales,
      totalOrders,
      totalProducts,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;