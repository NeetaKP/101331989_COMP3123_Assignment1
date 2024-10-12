const express = require('express')
const app = express();
const mongoose = require('mongoose')

const routesUsr = require('./routes/users')
const routesEmp = require('./routes/employees')
const bodyParser =require('body-parser');
const expressValidator = require('express-validator');
const SERVER_PORT = 8081;

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
//app.use(expressValidator());

 
const DATABASE_CONN = "mongodb+srv://neetukoirala:SNQpRlXPGg2piEgO@cluster0.thpsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DATABASE_CONN, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.route('/').get((req,res) =>{
    res.send('<h1>Assignment 1 - Neeta Pant</h1>');
}) 

app.use('/api/v1/emp',routesEmp);
app.use('/api/v1/user',routesUsr);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${SERVER_PORT}/`)
})