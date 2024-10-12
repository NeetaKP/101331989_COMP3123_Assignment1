const express = require('express')
const routesUsr = express.Router()
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const modelUsr = require('../models/users')
const {loginValidator,signUpValidator} = require('../validator')
 
// signs up or lets user created new account
routesUsr.post('/signup',  signUpValidator, async (req, res) => {
    //const username = req.body.content;
    const {username, email, password} = req.body;

    // validation for non-empty body
    if(Object.keys(req.body).length === 0){
        return res.status(400).send(
            {
                status: false,
                message: "User must be non-empty"
            })
    }

    try{
        const existUser = await modelUsr.findOne({username});
        if(existUser){
            return res.status(400).send({
                status:false,
                message: "User already exist"
            });
        }
        // encrypt the password - by hashing 
        hashedPassword = await bcrypt.hash(password,10);
        const usrObject = await modelUsr.create(
            {
                username: username,
                email: email,
                password: hashedPassword,
                createdAt: new Date()
            }
        );
        console.log("cccc")
        console.log(usrObject)
        await usrObject.save();
        console.log("dddd")
        res.status(201).send({
            message: "User created successfully.",
            user_id: usrObject._id
        });

    }catch(error){
        if(!username || !email || !password){
            return res.status(400).send({
                status: false,
                message: "All fields are required"
            });
        }
        res.status(500).send({
            message: "This email is already registered." + error.message,
            //email: usrObject.email
        })
    }
}) 

// lets user account login
routesUsr.post('/login',  loginValidator, async (req, res) => {
    //const username = req.body.content;
    const {username, email, password} = req.body;

    // validation for non-empty body
    if(Object.keys(req.body).length === 0){
        return res.status(400).send(
            {
                status: false,
                message: "User must be non-empty"
            })
    }

    try{
        const {email, password} = req.body;

        const existUser = await modelUsr.findOne({email});
        if(!existUser){
            return res.status(500).send({
                message: "Invalid email or not registered"
            });
        } else {
            if(await bcrypt.compare(password, existUser.password)){
                const usrJwtToken = await jsonwebtoken.sign(
                    {email},
                    "Super-secret-signin-key",
                    { expiresIn: "5 hours"}
                );
                res.status(200).send({
                    message: "Login successful.",
                    jwt_token: `${usrJwtToken}`
                });
            } else {
                res.status(500).send("Invalid password")
            }
        }
    }catch(error){
        res.status(500).send({
            message: error.message,
        })
    }
}) 

 

// for testing 
routesUsr.get('/', async (req, res) => {
    try{
        const users = await modelUsr.find();
        console.log(users)
        res.status(200).send(users);
    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
})

module.exports = routesUsr