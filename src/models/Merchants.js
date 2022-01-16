const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./User");

const  Merchants  = sequelize.define("Merchants",{
merchantName:{
    type:DataTypes.STRING,
    allowNull: false,
},
merchantTransaction:{
    type:DataTypes.STRING,
    allowNull: false,
},
amount:{
    type:DataTypes.STRING,
    allowNull: false,
},
    usersId:{
        type:DataTypes.INTEGER,
        references:{
         model: User,
         key: 'id'
        }
    },
    
})
Merchants.belongsTo(User)

module.exports =Merchants