
const sequelize = require('sequelize');
const db = require('../database/dbConnect')

const users=db.define('userTB',{
    userID:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        alowNull:false
    },
    userName:{
        type:sequelize.STRING,
        alowNull:false
    },
    email:{
        type:sequelize.STRING,
        alowNull:sequelize.STRING
    },
    password:{
        type:sequelize.STRING,
        alowNull:false
    }
 

},{timestamps:false,
  tableName:'userTB'})
 //users.sync({force:true});

  module.exports=users;