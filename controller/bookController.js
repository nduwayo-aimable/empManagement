const usermodel = require('../model/userModel');
const bookmodel = require('../model/bookModel')
const borrowedmodel = require('../model/borrowBook')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

class bookController{
    //create user
    static async createUser(req,res){
       
        const body = req.body;
        const password =body.password;
        const data =({
            userName:body.userName,
            email:body.email,
            password: await bcrypt.hash(password,10)
        })
        try{
            const isEmail = await usermodel.findOne({where:{email:data.email}})
            if(isEmail){
                res.send('email already exist..!')
            }else{
                await usermodel.create(data)
                res.send('user created..!')
            }
        }catch(err){
            console.log(err,' error in creating user')
        }
       
    }
    //login 
    static async loginUser(req,res){
        const {email,password} =req.body;
        const user = await usermodel.findOne({where:{email:email}})
      
       
        try{
            if(user){
                const isPass = await bcrypt.compare(password,user.password)
                if(isPass){
                   res.json(await usermodel.findAll())
                }else{
                    res.send('password did not match......')
                }
            }else{
                res.send('invalid email....')
            }

        }catch(err){
            res.send(' error in loging in....')
        }
    }
    // get all

    static async getAllUsers(req,res){
        try{
            const allUsers = await usermodel.findAll()
            res.json(allUsers)
        }catch(err){
            res.send(err,' error in displaying user')
        }
       
    }
    //edit user
    static async editUser(req,res){
        const id =req.params.id;
         const{ userName,email,password} = req.body;
         const data =({
            userName,
            email,
            password: await bcrypt.hash(password,10)
         })
         try{
            if(await usermodel.findOne({where:{userID:id}})){
                const user = await usermodel.update(data,{ where:{userID:id}})
                res.send(' updated')
            }else{
                res.send('invalid user')
            }
           
         }catch(err){
            console.log(err,' error in updating user')
         }

    }
    //delete user
    static async deleteUser(req,res){
        const id = req.params.id;
        const data = await usermodel.findByPk(id)
        if(data){
            data.destroy(data)
            res.send('user deleted...')
        }else{
            res.send('invalid user')
        }
     
    }

    //create book

    static async createBook(req,res){
        const{bookTitle,author,coppy} = req.body
        const data =({
            bookTitle,
            author,
            coppy

        });
        try{
            await bookmodel.create(data)
            res.send(' created');

        }catch(err){
            console.log(err,' error in creating new book')
        }
    }
    //borrow fuctionality

    static async borrowBoook(req,res){
        const{returnDate,borrowerID,number_of_Coppy}=req.body;
        const bookid = req.params.id;
        const mybook = await bookmodel.findByPk(bookid)
        const users = await usermodel.findByPk(borrowerID)

       if(mybook && users){
        //check if coppies are enough for borrowing
        let mycoppy = mybook.coppy
        if(mycoppy > number_of_Coppy){
            //reduce the coppy from the input coppies user selected
            let leftCoppies = mycoppy - number_of_Coppy;
            const borrowings = ({
                returnDate,
                number_of_Coppy,
                borrowerID,
                book_id:bookid
            });
            await borrowedmodel.create(borrowings)
            await bookmodel.update({coppy:leftCoppies},{where:{id:borrowings.book_id}})

            res.json('book borrowed...');

        }else if(mycoppy < number_of_Coppy){
            res.json('too many coppies')
        }else if(mycoppy==0){
            await bookmodel.update({status:'not available'},{where:{id:borrowings.book_id}})
            res.send('no more coppies left book not available')
        } else{
            res.send('not in the proper way')
        }
       }else{
        res.send('check your user or book IDs')
       }
       
    }

    // retreive data from three tables 
    //username,bookTitle,coppies,returnDate

    static async getborrowedBooks(req,res){

        const data= await borrowedmodel.findAll({
          
           include:[{
            model:usermodel,
            as:'userTB',
            attributes:['userName','email'],
           }],
           include:[{
            model:bookmodel,
            as:'book',
            attributes:['bookTitle','author'],
           }],
           attributes:['returnDate']

        })
        res.json(data)
        console.log('ok')
    }

    



}
module.exports=bookController;