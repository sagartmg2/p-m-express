const express = require("express")
const { fetchProduct, store, update,remove } = require("../controller/product")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { checkAuthenctication, isSeller } = require("../middleware/checkAuthentication")


router.get("/", fetchProduct)
router.post("/", checkAuthenctication, isSeller, store)
router.put("/:id", checkAuthenctication, isSeller, update)
router.delete("/:id", checkAuthenctication, isSeller, remove)

module.exports = router
