const express = require("express")
const { signup, login } = require("../controller/auth")
const Joi = require("joi")
const validateSchema = require("../middleware/validateSchema")

const router = express.Router()

const signupSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    role: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required()
})

const loginSchema = Joi.object({
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required()
})

// (req,res,next) =>{}

router.post("/signup", validateSchema(signupSchema), signup)
router.post("/login", validateSchema(loginSchema), login)

module.exports = router
