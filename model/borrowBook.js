const sequelize = require('sequelize')
const db = require('../database/dbConnect')
const book = require('../model/bookModel')
const user = require('../model/userModel')
const date = new Date()
const newDAte = date.toISOString().split('T')[0];

const borrowed =db.define('borrowed_books',{

    borrowID:{
        
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,

        },
     
      
    
        returnDate:{
            type:sequelize.DATEONLY,
            allowNull:false,
            defaultValue:newDAte

        },
        number_of_Coppy:{
            type:sequelize.INTEGER,
            allowNull:false
        }

      
    }

,{
    timestamps:false,
    tableName:'borrowed_books'
});

//every book should be of one user
borrowed.belongsTo(user,{foreignKey:'borrowerID', as:'userTB'});

//every book should be from book table
borrowed.belongsTo(book,{foreignKey:'book_id', as:'book'});
//one or many books cak be borrowed
book.hasMany(borrowed,{foreignKey:'book_id', as:'borrowed_book'});
//many book can be borrowed by user
user.hasMany(borrowed,{foreignKey:'borrowerID', as:'borrowed_book'});

//borrowed.sync({force:true})
module.exports=borrowed;

