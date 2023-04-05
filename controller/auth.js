const Joi = require('joi');
const User = require("../model/User");
const bcrypt = require("bcrypt")


const signup = async (req, res, next) => {
    console.log(req.body)

    try {
        let hashed_pw = await bcrypt.hash(req.body.password, 10);
        let user = await User.create({ ...req.body, password: hashed_pw })
        res.send(user);
    } catch (err) {
        next(err)
    }

}



const login = async (req, res) => {

    /* check if valid use email   */
    /* check if valid password  */

    let user = await User.findOne({ email: req.body.email })
    console.log(user);

    if (user) {
        let status = await bcrypt.compare(req.body.password, user.password);
        if (status) {
            let obj = { ...user.toObject() }
            delete obj.password
            return res.send({ data: obj })
        }
    }

    return res.status(401).send({ msg: "unauthencitaed." })

}

module.exports = {
    login: login,
    signup
}