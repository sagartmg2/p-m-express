const express = require("express")
const { store } = require("../controller/order")
const Joi = require("joi")
const validateSchema = require("../middleware/validateSchema")
const { isBuyer, checkAuthenctication } = require("../middleware/checkAuthentication")

const router = express.Router()

router.post("/", checkAuthenctication, isBuyer, store)

module.exports = router
