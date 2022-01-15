const { DataTypes} = require('sequelize');
const  sequelize =require('../database/db');
const User = require("./User");

 const Cards = sequelize.define("Cards",{
      createdBy:{
      type:DataTypes.INTEGER,
       references:{
       model: User,
       key: 'id',
       allowNull: false
       },
      },
     cardType:{
     type:DataTypes.STRING,
     allowNull: false,
     },
    amount:{
     type: DataTypes.STRING,
     allowNull: false,
     },
     
})

Cards.belongsTo(User)

module.exports =Cards;