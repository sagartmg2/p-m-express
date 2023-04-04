const Joi = require('joi');
const User = require("../model/User");

const schema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .email()
        .required()
})

const signup = async (req, res, next) => {
    console.log(req.body)

    try {
        const value = await schema.validateAsync(req.body, { abortEarly: false });
    }
    catch (err) {
        res.send(err)
    }



    try {

        let user = await User.create(req.body)
        res.send(user);
    } catch (err) {
        next(err)
    }

}

const login = (req, res) => {
    // fetch data from requesst 
    // validation 
    // store in database 
    res.send("user created");

}

module.exports = {
    login: login,
    signup
}