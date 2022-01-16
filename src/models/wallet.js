const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./User");

const  Wallet  = sequelize.define("Wallet",{
income:{
    type:DataTypes.STRING,
    allowNull: false,
    required: true,
},
spent:{
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
Wallet.belongsTo(User)

module.exports =Wallet