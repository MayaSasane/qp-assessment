const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('grocery_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Change dialect to mysql
});

const Grocery = sequelize.define('Grocery', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = { Grocery, Order };
