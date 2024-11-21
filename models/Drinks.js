const { Sequelize, DataTypes } = require('sequelize');
const connectDb = require("../config/connectDB");
const sequelize = connectDb;

const Drink = sequelize.define('Drink', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  totalStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Default stock is 0
  },
  leftInStock:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 
  },
  totalSales:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});



Drink.sync({alter:true});

module.exports = Drink;
