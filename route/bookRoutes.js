const express = require('express')
const route = express.Router()
const bookController = require('../controller/bookController')

route.post('/newUser',bookController.createUser);
route.post('/login',bookController.loginUser);
route.get('/allUsers',bookController.getAllUsers);
route.put('/update/:id',bookController.editUser);
route.delete('/delete/:id',bookController.deleteUser);
// book toutes
route.post('/newBook',bookController.createBook);
route.post('/borrow/:id',bookController.borrowBoook);
route.get('/listBorrowings',bookController.getborrowedBooks);




module.exports=route;