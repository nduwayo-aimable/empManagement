const express = require('express')
const bodyParser = require('body-parser')
const app = express();
//const db = require('./database/dbConnect')
const routes = require('./route/bookRoutes')
app.use(bodyParser.json())






app.use(routes)
const port = 4001;
app.listen(port,(req,res)=>{
    console.log('server is running at http://localhost:4001')
})