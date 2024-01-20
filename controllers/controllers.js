const { Grocery, Order } = require('../models/models');

// Admin Controllers
async function addGrocery(req, res) {
  try {
    const { name, price, inventory } = req.body;
    const grocery = await Grocery.create({ name, price, inventory });
    res.json(grocery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function viewGroceries(req, res) {
  try {
    const groceries = await Grocery.findAll();
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateGrocery(req, res) {
  try {
    const { name, price, inventory } = req.body;
    const groceryId = req.params.id;
    const updatedGrocery = await Grocery.update({ name, price, inventory }, { where: { id: groceryId } });
    res.json(updatedGrocery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function removeGrocery(req, res) {
  try {
    const groceryId = req.params.id;
    await Grocery.destroy({ where: { id: groceryId } });
    res.json({ message: 'Grocery removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// User Controllers


async function createOrder(req, res) {
  try {
    const { userId, items } = req.body;
    const order = await Order.create({ userId, items });

    // Update inventory levels for booked items
    for (const item of items) {
      const grocery = await Grocery.findByPk(item.groceryId);
      grocery.inventory -= item.quantity;
      await grocery.save();
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function viewOrders(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function cancelOrder(req, res) {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Restore inventory levels for canceled items
    for (const item of order.items) {
      const grocery = await Grocery.findByPk(item.groceryId);
      grocery.inventory += item.quantity;
      await grocery.save();
    }

    await order.destroy();
    res.json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addGrocery,
  viewGroceries,
  updateGrocery,
  removeGrocery,
  createOrder,
  viewOrders,
  cancelOrder,
};
