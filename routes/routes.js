const express = require('express');
const {
  addGrocery,
  viewGroceries,
  updateGrocery,
  removeGrocery,
  createOrder,
  viewOrders,
  cancelOrder,
} = require('../controllers/controllers');

const router = express.Router();

// Admin Routes
router.post('/admin/addGrocery', addGrocery);
router.get('/admin/viewGroceries', viewGroceries);
router.put('/admin/updateGrocery/:id', updateGrocery);
router.delete('/admin/removeGrocery/:id', removeGrocery);

// User Routes
router.post('/user/createOrder', createOrder);
router.get('/user/viewOrders/:userId', viewOrders);
router.delete('/user/cancelOrder/:orderId', cancelOrder);

module.exports = router;
