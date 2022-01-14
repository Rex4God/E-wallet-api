const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./user");

const  Wallet  = sequelize.define("Wallet",{

    walletId:{
        type:DataTypes.INTEGER,
        references:{
         model: User,
         key: 'id'
        }
    },
    income:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    spent:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    balance:{
     type:DataTypes.STRING,
     allowNull: false,
    },
    
})
Wallet.belongsTo(User)

module.exports =Wallet