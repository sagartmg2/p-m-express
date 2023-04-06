const jwt = require("jsonwebtoken")
const { SELLER, BUYER } = require("../constants/role")
const checkAuthenctication = (req, res, next) => {

    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1]

        if (token) {

            try {
                var decoded_user_info = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded_user_info
                return next()
            } catch (err) {

            }

        }
    }

    res.status(401).send({ msg: "unauthenticated" })

}

const isSeller = (req, res, next) => {
    if (req.user.role == SELLER) {
        next()
    } else {
        return res.status(403).send({ msg: "access denied - only for seller" })
    }
}
const isBuyer = (req, res, next) => {
    if (req.user.role == BUYER) {
        next()
    } else {
        return res.status(403).send({ msg: "access denied - only for buyer" })
    }
}

module.exports = {
    checkAuthenctication,
    isSeller,
    isBuyer
}