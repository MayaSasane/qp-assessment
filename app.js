const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
