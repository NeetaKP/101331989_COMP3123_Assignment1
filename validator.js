mongoose = require('mongoose')
const {body} = require('express-validator')

const loginValidator = [
    body('username','Invalid username').not().isEmpty().isLength({min:4,max:32}),
    body('email','Email invalid').not().isEmpty().isEmail().isLength({min:4,max:32}),
    body('password','Invalid password').not().isEmpty().isLength({min:4,max:90})
]

const signUpValidator = [
    body('username','Invalid username').not().isEmpty().isLength({min:4,max:32}),
    body('email','Invalid email').not().isEmpty().isEmail().isLength({min:4,max:32}),
    body('password','Invalid password').not().isEmpty().isLength({min:4,max:90})
]

module.exports = {loginValidator,signUpValidator};