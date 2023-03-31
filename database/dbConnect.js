const sequelize = require('sequelize')
 db = new sequelize('book2','root','',{
    host:'localhost',
    dialect:'mysql'
 });

 try{
    db.authenticate();
    console.log('DATABASE connected...!')
 }catch(err){
    console.log(err,' error in reating db connection')
 }

 module.exports=db;