const sequelize = require('sequelize')
const db = require('../database/dbConnect')

const books= db.define('books',{
    bookTitle:{
        type:sequelize.STRING,
        require:true,
        
    },
    author:{
        type:sequelize.STRING,
        allowNull:false
    },
    staus:{
        type:sequelize.ENUM('available','not available'),
        allowNull:false,
        defaultValue:'available'
    },
    coppy:{
        type:sequelize.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'books'
});
//books.sync({forse:true})
module.exports=books;