const { DataTypes} = require('sequelize');
const  sequelize =require('../database/db');
const User = require("./User");

 const Category = sequelize.define("Category",{
categoryName:{
    type:DataTypes.STRING,
    allowNull: false,
},
amount:{
    type: DataTypes.STRING,
     allowNull: false,
     },
    
     usersId:{
     type:DataTypes.INTEGER,
      references:{
      model: User,
      key: 'id',
      allowNull: false
      },
    },
    })

Category.belongsTo(User)

module.exports =Category;